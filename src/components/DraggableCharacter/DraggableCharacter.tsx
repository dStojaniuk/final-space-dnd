import { Draggable } from 'react-beautiful-dnd';
import { CharacterT } from '../../utils/types/CharacterT';
import './DraggableCharacter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type DraggableCharacterProps = {
  character: CharacterT;
  index: number;
  showDeleteIcon?: boolean;
  handleOnDeleteClick?: any;
};

export const DraggableCharacter = (props: DraggableCharacterProps) => {
  const {
    index,
    character: { id, name, img_url },
    showDeleteIcon,
    handleOnDeleteClick
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
          {showDeleteIcon && (
            <FontAwesomeIcon
              icon={faTrash}
              className="trashIcon"
              onClick={handleOnDeleteClick}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};
