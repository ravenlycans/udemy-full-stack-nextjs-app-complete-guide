import { useState, useRef, useEffect } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const fetched = useRef(false);

    const {addMessage} = useMessages();


    useEffect(() => {
      if (!fetched.current) {
        fetch(`${apiUrl}/heroes`).then(res => {
          return res.json();
        }).then(data => {
          setHeroes(data);
          addMessage('Herolist loaded.');
        });
        fetched.current = true;
      }
    }, [addMessage]);

    async function deleteHero(hero: Hero) {
      try {
        const reponse = await fetch(`${apiUrl}/heroes/${hero.id}`, {
          method: 'DELETE'
        });

        if (!reponse.ok) throw new Error('Request failed: ' + reponse.statusText);

        setHeroes(prevHeroes => prevHeroes.filter(h => h.id !== hero.id));
        addMessage(`Hero ${hero.name} deleted!`);
      } catch (error) {
        console.log(error);
        addMessage('Failed to delete hero.');
      }
    }
  
    return (
      <>
        <div className="flex gap-3">
          <h2 className="text-2xl">My heroes</h2>
          <Link to='/heroes/create' className='btn'>Create New</Link>
        </div>
        <ul className="flex flex-col gap-2 my-3 border-b pb-2">
          {heroes.map(hero => (
            <Link to={`/heroes/${hero.id}`} key={hero.id} className="flex cursor-pointer">
              <span 
                className="bg-slate-700 text-white rounded-l p-2">
                  {hero.id}
              </span>
              <div className="p-2 bg-slate-300 rounded-r w-full flex justify-between">
                <span>{hero.name}</span>
                <span 
                  onClick={(e) => {
                    e.preventDefault();
                    deleteHero(hero);
                  }}
                  className="bg-white px-1 pointer-cursor text-red-700">
                    X
                </span>
              </div>
            </Link>
          ))}
        </ul>
      </>
    )    
}