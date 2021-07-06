import { useEffect, useState } from "react";
import GetCharacters from "../../utils/api/GetCharacters";
import { CharacterT } from "../../utils/types/CharacterT";
import "./CharacterList.css";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { reorder } from "../../utils/helpers/reorder";
import { DraggableCharacter } from "../DraggableCharacter/DraggableCharacter";

export default function CharacterList() {
  const [characters, setCharacters] = useState<CharacterT[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters();
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
              <DraggableCharacter
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
