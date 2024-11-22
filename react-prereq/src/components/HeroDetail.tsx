import { ChangeEvent } from "react";
import { Hero } from "../types/hero"

type Props = {
  hero?: Hero;
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function HeroDetail({hero, onNameChange}: Props) {
  if (!hero) return null;

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
        <label>Hero Name</label>
        <input type="text"
          placeholder="name"
          className="border border-gray-300 rounded-lg p-2 w-1/4" 
          value={hero.name}
          onChange={onNameChange}
        />
      </div>
    </>
  )
}
