import { FormEvent, useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero"
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {
  const [hero, setHero] = useState<Hero | null>(null);
  const params = useParams();

  const fetched = useRef(false);

  const {addMessage} = useMessages();

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${apiUrl}/heroes/${params.id}`).then(res => {
        return res.json();
      }).then(data => {
        setHero(data)
        addMessage(`Hero ${data.name} loaded.`);
      });
      fetched.current = true;
    }
  }, [params.id, addMessage]);
    
  if (!hero) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = `${apiUrl}/heroes/${hero.id}`;

    try {
      const response = await fetch(`${url}`, {
        method: 'PUT',
        body: JSON.stringify({name: formData.get('name')})
      });

      if (!response.ok) throw new Error('Request failed - ' + response.statusText);

      const data = await response.json();
      addMessage(`Hero ${hero.name} updated to ${data.name}`);
      setHero(data);
    }
    catch (error) {
      console.log(error);
      addMessage(`Failed to update hero: ${hero.id}`);
    }
  }

  return (
    <>
      <h2 className="text-2xl">Details</h2>
      <div>
        <span className="font-bold">ID:</span> {hero.id}
      </div>
      <div className="space-x-2">
        <span className="font-bold">Name:</span>
        <span className="uppercase">{hero.name}</span>
      </div>
      <div className="flex flex-col gap-2 mt-3 border-t">
        <form onSubmit={onSubmit}>
          <label>Hero Name</label>
          <div className="flex gap-3">
            <input type="text"
              name="name"
              placeholder="name"
              className="border border-gray-300 rounded-lg p-2 w-1/4" 
              defaultValue={hero.name}
            />
            <button type="submit" className="btn">Submit!</button>
          </div>
        </form>
      </div>
    </>
  )
}
