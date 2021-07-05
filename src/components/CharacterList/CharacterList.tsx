import { useEffect, useState } from 'react';
import GetCharacters from '../../api/GetCharacters';
import { CharacterT } from '../../Types/Character/Character';
import { Character } from '../Character/Character';
import './CharacterList.css';
export default function CharacterList() {
  const [characters, setCharacters] = useState<CharacterT[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters();
      setCharacters(fetchedCharacters);
    })();
  }, []);

  return (
    <div className="characters">
      {characters.map((character) => (
        <Character character={character} key={character.id} />
      ))}
    </div>
  );
}
