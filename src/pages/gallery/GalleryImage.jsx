import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GalleryImage = ({ images, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-4 gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
          >
            {images.map((image, index) => (
              <Draggable key={image.id.toString()} draggableId={image.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative p-4"
                        // style={{
                        //   aspectRatio: "1/1",
                        // }}
                  >
                    <img
                      src={image.webformatURL}
                      alt={image.tags}
                      className="w-full h-full object-cover max-h-[300px]"
                    />
                    <div className="bg-white p-2">
                      <h1 className="text-sm capitalize text-slate-500">Tags</h1>
                      <p className="capitalize">{image.tags}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default GalleryImage;
