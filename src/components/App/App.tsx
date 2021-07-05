import { useEffect, useState } from 'react';
import GetCharacters from '../../api/GetCharacters';
import { CharacterT } from '../../Types/Character/Character';
import './App.css';

function App() {
  const [data, setData] = useState<CharacterT[]>([]);

  useEffect(() => {
    (async () => {
      const characters = await GetCharacters()
      setData(characters);
    })()
  }, []);

  return (
    <div className="app">
      <div>
        {data.map((character) => (
          <div key={character.id}>
            <div>
              <img src={character.img_url} alt={character.name} />{" "}
            </div>
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
