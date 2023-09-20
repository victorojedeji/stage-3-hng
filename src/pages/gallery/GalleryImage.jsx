import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GalleryImage = ({ images, onDragEnd }) => {
  if (!images || images.length === 0) {
    return <div className='text-slate-600 italic text-xl w-full h-full flex items-center justify-center'>No images available</div>;
  }

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
                    className="relative p-4 mb-5"
                  >
                    <img
                      src={image.webformatURL}
                      alt={image.tags}
                      className="w-full h-full object-cover max-h-[300px]"
                    />
                    <div className="bg-white p-2">
                      <h1 className="text-sm capitalize text-slate-500">Tags</h1>
                      <p className="capitalize text-sm">{image.tags}</p>
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
