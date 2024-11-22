import { ChangeEvent, useState } from "react";
import { Hero } from "./types/hero";
import { HEROES } from "./data/mock-heroes";

export default function App() {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

  const selectedHero = heroes.find(hero => hero.id === selectedHeroId);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedName = event.target.value;

    setHeroes(prevHeroes => prevHeroes.map(hero => {
      if (hero.id === selectedHeroId) {
        return {...hero, name: updatedName};
      }

      return hero;
    }));
  };

  const handleSelectHero = (id: number) => {
    setSelectedHeroId(id);
  }

  return (
    <div className="container mt-5 mx-auto">
      <h2 className="text-2xl">My heroes</h2>
      <ul className="flex flex-col gap-2 my-3 border-b pb-2">
        {heroes.map(hero => (
          <li key={hero.id} className="flex cursor-pointer" onClick={() => handleSelectHero(hero.id)}>
            <span className="bg-slate-700 text-white rounded-l p-2">{hero.id}</span>
            <span className="p-2 bg-slate-300 rounded-r w-1/4">{hero.name}</span>
          </li>
        ))}
      </ul>

      {selectedHero &&
      <>
        <h2 className="text-2xl">Details</h2>
        <div>
          <span className="font-bold">ID:</span> {selectedHero.id}
        </div>
        <div className="space-x-2">
          <span className="font-bold">Name:</span>
          <span className="uppercase">{selectedHero.name}</span>
        </div>
        <div className="flex flex-col gap-2 mt-3 border-t">
          <label>Hero Name</label>
          <input type="text"
            placeholder="name"
            className="border border-gray-300 rounded-lg p-2 w-1/4" 
            value={selectedHero.name}
            onChange={handleNameChange}
          />
        </div>
      </> }
    </div>
  )
}