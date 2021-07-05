import { useEffect, useState } from 'react';
import GetCharacters from '../../utils/api/GetCharacters';
import { CharacterT } from '../../Types/Character/CharacterT';
import { Character } from '../Character/Character';
import './CharacterList.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../utils/helpers/reorder';

export default function CharacterList() {
  const [characters, setCharacters] = useState<CharacterT[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters(10);
      setCharacters(fetchedCharacters);
    })();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newCharacterList = reorder(
      characters,
      result.source.index,
      result.destination.index
    );
    setCharacters(newCharacterList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {characters.map((character, index) => (
              <Character
                character={character}
                index={index}
                key={character.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
