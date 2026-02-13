// src/components/TaskBoard.jsx
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskBoard({ tasks, setTasks }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  // Inline styles
  const boardStyle = {
    marginTop: "20px",
  };

  const cardStyle = (isDragging) => ({
    background: isDragging ? "#e9e0ff" : "#fff",
    padding: "18px 20px",
    marginBottom: "15px",
    borderRadius: "12px",
    boxShadow: isDragging
      ? "0 12px 25px rgba(0,0,0,0.25)"
      : "0 4px 15px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    transform: isDragging ? "rotate(2deg) scale(1.03)" : "translateY(0)",
    borderLeft: isDragging ? "4px solid #7b4acf" : "none",
  });

  const titleStyle = {
    margin: "0 0 8px 0",
    color: "#4a2cc1",
  };

  const descStyle = {
    margin: 0,
    color: "#333",
  };

  return (
    <div style={boardStyle}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...cardStyle(snapshot.isDragging),
                        ...provided.draggableProps.style,
                      }}
                    >
                      <h3 style={titleStyle}>{task.title}</h3>
                      <p style={descStyle}>{task.description}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
