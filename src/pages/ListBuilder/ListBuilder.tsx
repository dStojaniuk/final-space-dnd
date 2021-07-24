import React from 'react';
import { useState, useEffect } from 'react';
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
import GetCharacters from '../../utils/api/GetCharacters';
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
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <Character className="copy" character={item} />
                ) : (
                  <DraggableCharacter
                    character={item}
                    index={index}
                    key={item.id}
                  />
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const List = (props: { items: CharacterT[] }) => {
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

export default function ListBuilder() {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [shoppingBagItems, setShoppingBagItems] = useState<CharacterT[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters();
      setCharacters(fetchedCharacters);
    })();
  }, []);

  const onDragEnd = React.useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setShoppingBagItems((state) =>
            reorder(state, source.index, destination.index)
          );
          break;
        case 'TOOLBARLIST':
          setShoppingBagItems((items) =>
            copy(characters, items, source, destination)
          );
          break;
        default:
          console.error('Error onDragEnd');
          break;
      }
    },
    [characters]
  );

  return (
    <div className="list-builder">
      <DragDropContext onDragEnd={onDragEnd}>
        <List items={shoppingBagItems} />
        <ToolbarList
          characters={characters}
          className="toolbarlist"
          droppableId="TOOLBARLIST"
        />
      </DragDropContext>
    </div>
  );
}
