import { CharacterT } from '../../utils/types/CharacterT';
import './CharacterList.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../utils/helpers/reorder';
import { DraggableCharacter } from '../DraggableCharacter/DraggableCharacter';

export const CharacterList = (props: CharacterListProps) => {
  const { selectedCharacters, setSelectedCharacters } = props;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newCharacterList = reorder(
      selectedCharacters,
      result.source.index,
      result.destination.index
    );
    setSelectedCharacters(newCharacterList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {selectedCharacters.map((character, index) => (
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
};

type CharacterListProps = {
  selectedCharacters: CharacterT[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterT[]>>;
};
