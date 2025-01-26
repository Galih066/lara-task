import { Droppable } from "@hello-pangea/dnd";

const TaskColumn = ({ title, count, children, droppableId }) => (
    <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-50 rounded-lg p-4 min-h-[24rem] h-full flex flex-col border-2 ${snapshot.isDraggingOver
                    ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200 ring-opacity-50'
                    : 'border-transparent'
                    } transition-all duration-200`}
            >
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                    {title} ({count})
                </h3>
                <div className={`space-y-4 flex-1 ${snapshot.isDraggingOver ? 'opacity-50' : ''
                    } ${children ? '' : 'flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg'}`}>
                    {children || (
                        <p className="text-gray-400 text-sm">Drop tasks here</p>
                    )}
                    {provided.placeholder}
                </div>
            </div>
        )}
    </Droppable>
);

export default TaskColumn;