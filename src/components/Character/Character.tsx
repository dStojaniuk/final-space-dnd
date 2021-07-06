import { Draggable } from 'react-beautiful-dnd';
import { CharacterT } from '../../utils/types/CharacterT';
import './Character.css';

type CharacterProps = {
  character: CharacterT;
  index: number;
};

export const Character = (props: CharacterProps) => {
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
