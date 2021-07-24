import { Draggable } from 'react-beautiful-dnd';
import { CharacterT } from '../../utils/types/CharacterT';
import './DraggableCharacter.css';

type DraggableCharacterProps = {
  character: CharacterT;
  index: number;
};

export const DraggableCharacter = (props: DraggableCharacterProps) => {
  const {
    index,
    character: { id, name, img_url }
  } = props;
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            snapshot.isDragging ? 'character character-selected' : 'character'
          }
        >
          <img src={img_url} alt={name} />
          <div>{name}</div>
        </div>
      )}
    </Draggable>
  );
};
