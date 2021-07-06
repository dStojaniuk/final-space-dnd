import React from "react";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Character } from "../../components/Character/Character";
import GetCharacters from "../../utils/api/GetCharacters";
import { reorder } from "../../utils/helpers/reorder";
import { CharacterT } from "../../utils/types/CharacterT";
import "./ListBuilder.css";

/**
 * Moves an item from one list to another list.
 */
const copy = (
  source: CharacterT[],
  destination: CharacterT[],
  droppableSource: any,
  droppableDestination: any
) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: Date.now() });
  return destClone;
};

const move = (
  source: CharacterT[],
  destination: CharacterT[],
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = [];

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function ListBuilder() {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [state, setState] = useState<number>(Date.now());

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters();
      setCharacters(fetchedCharacters);
    })();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    // switch (source.droppableId) {
    //   case destination.droppableId:
    //     setState({
    //       [destination.droppableId]: reorder(
    //         state[source.droppableId],
    //         source.index,
    //         destination.index
    //       ),
    //     });
    //     break;
    //   case "ITEMS":
    //     setState({
    //       [destination.droppableId]: copy(
    //         ITEMS,
    //         state[destination.droppableId],
    //         source,
    //         destination
    //       ),
    //     });
    //     break;
    //   default:
    //     setState(
    //       move(
    //         state[source.droppableId],
    //         state[destination.droppableId],
    //         source,
    //         destination
    //       )
    //     );
    //     break;
    // }
  };

  const addList = (e: any) => {
    setState(Date.now());
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="characters" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            className="characters-toolbox"
            ref={provided.innerRef}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {characters.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <>
                    <div
                      className="item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // isDragging={snapshot.isDragging}
                      // style={provided.draggableProps.style}
                    >
                      {item.name}
                    </div>
                    {snapshot.isDragging && (
                      <div className="item clone">{item.name}</div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      {/* <div>
        {Object.keys(state).map((list, i) => {
          console.log("==> list", list);
          return (
            <Droppable key={list} droppableId={list}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {state[list].length
                    ? state[list].map((item, index) => (
                  <Draggable key={"1"} draggableId={"1"} index={1}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        <div {...provided.dragHandleProps}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                            />
                          </svg>
                        </div>
                        item.content
                      </div>
                    )}
                  </Draggable>
                  )
                  : !provided.placeholder && <div>Drop items here</div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div> */}
    </DragDropContext>
  );
}
