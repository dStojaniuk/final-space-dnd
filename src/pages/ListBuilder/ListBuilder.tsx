import { Fragment, useCallback } from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';
import { Character } from '../../components/Character/Character';
import { DraggableCharacter } from '../../components/DraggableCharacter/DraggableCharacter';
import { CharacterT } from '../../utils/types/CharacterT';
import './ListBuilder.css';

const reorder = (list: CharacterT[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (
  characters: CharacterT[],
  destination: CharacterT[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const character = characters[droppableSource.index];
  destination.splice(droppableDestination.index, 0, {
    ...character,
    id: Date.now()
  });
  return destination;
};

const getCharacter =
  (characters: CharacterT[]) =>
  (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    rubric: DraggableRubric
  ) => {
    const character = characters[rubric.source.index];
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={
          snapshot.isDragging ? 'character character-selected' : 'character'
        }
      >
        <img src={character.img_url} alt={character.name} />
        <div>{character.name}</div>
      </div>
    );
  };

const ToolbarList = (props: {
  characters: CharacterT[];
  className: string;
  droppableId: string;
}) => {
  return (
    <Droppable
      renderClone={getCharacter(props.characters)}
      droppableId={props.droppableId}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={props.className}>
          {props.characters.map((item, index) => {
            const shouldRenderClone =
              item.id ===
              (snapshot.draggingFromThisWith
                ? +snapshot.draggingFromThisWith
                : 0);

            return (
              <Fragment key={item.id}>
                {shouldRenderClone ? (
                  <Character className="copy" character={item} />
                ) : (
                  <DraggableCharacter
                    character={item}
                    index={index}
                    key={item.id}
                  />
                )}
              </Fragment>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const List = (props: {
  items: CharacterT[];
  setItems: React.Dispatch<React.SetStateAction<CharacterT[]>>;
}) => {
  const deleteCharacter = (characterId: number) => {
    const newCharactersList = props.items.filter((c) => c.id !== characterId);
    props.setItems(newCharactersList);
  };

  return (
    <Droppable droppableId="LIST">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {props.items.length > 0 ? (
            props.items.map((item, index) => (
              <DraggableCharacter
                character={item}
                index={index}
                key={item.id}
                showDeleteIcon
                handleOnDeleteClick={() => deleteCharacter(item.id)}
              />
            ))
          ) : (
            <div
              className={
                snapshot.isDraggingOver ? 'character dragOver' : 'character'
              }
            >
              Drop characters here
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const ListBuilder = (props: ListBuilderProps) => {
  const { selectedCharacters, setSelectedCharacters, toolbarListCharacters } =
    props;

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setSelectedCharacters((state) =>
            reorder(state, source.index, destination.index)
          );
          break;
        case 'TOOLBARLIST':
          setSelectedCharacters((items) =>
            copy(toolbarListCharacters, items, source, destination)
          );
          break;
        default:
          console.error('Error: onDragEnd');
          break;
      }
    },
    [toolbarListCharacters, setSelectedCharacters]
  );

  return (
    <div className="list-builder">
      <DragDropContext onDragEnd={onDragEnd}>
        <List items={selectedCharacters} setItems={setSelectedCharacters} />
        <ToolbarList
          characters={toolbarListCharacters}
          className="toolbarlist"
          droppableId="TOOLBARLIST"
        />
      </DragDropContext>
    </div>
  );
};

type ListBuilderProps = {
  toolbarListCharacters: CharacterT[];
  selectedCharacters: CharacterT[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterT[]>>;
};
