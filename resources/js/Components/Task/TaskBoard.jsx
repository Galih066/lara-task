import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TaskColumn = ({ title, count, children, droppableId }) => (
    <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-white rounded-xl shadow-sm p-4 transition-colors duration-200 flex flex-col h-full ${
                    snapshot.isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                }`}
            >
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {count}
                    </span>
                </div>
                <div className="space-y-3 overflow-y-auto flex-grow">
                    {children}
                    {provided.placeholder}
                </div>
            </div>
        )}
    </Droppable>
);

const getDragStyle = (style, snapshot) => {
    if (!style) return {};
    
    if (snapshot.isDragging) {
        return {
            ...style,
            transition: `all 0.001s ease`,
        };
    }
    
    if (snapshot.isDropAnimating) {
        return {
            ...style,
            transition: `all 0.2s cubic-bezier(.2,1,.1,1)`,
        };
    }
    
    return style;
};

const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { class: 'text-red-600', text: 'Overdue' };
    if (diffDays === 0) return { class: 'text-orange-600', text: 'Due Today' };
    if (diffDays <= 2) return { class: 'text-yellow-600', text: 'Due Soon' };
    return { class: 'text-gray-600', text: `Due in ${diffDays} days` };
};

const TaskCard = ({ task, index, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask(task);
        setIsEditing(false);
    };

    const dueStatus = getDueDateStatus(task.dueDate);

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragStyle(provided.draggableProps.style, snapshot)}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>
                        <div className={`flex space-x-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                        {dueStatus && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${dueStatus.class}`}>
                                {dueStatus.text}
                            </span>
                        )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Initiator:</span>
                            <span className="text-xs font-medium text-gray-700">{task.initiator}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Assignees:</span>
                            <span className="text-xs font-medium text-gray-700">{task.assignees?.length || 0}</span>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

const TaskBoard = ({ tasks, onUpdateTask, onDeleteTask, onDragEnd }) => {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
    const reviewTasks = tasks.filter(task => task.status === 'review');
    const doneTasks = tasks.filter(task => task.status === 'done');

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-16rem)]">
                <TaskColumn title="To Do" count={todoTasks.length} droppableId="todo">
                    {todoTasks.map((task, index) => (
                        <TaskCard 
                            key={task.id} 
                            task={task}
                            index={index}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </TaskColumn>

                <TaskColumn title="In Progress" count={inProgressTasks.length} droppableId="in_progress">
                    {inProgressTasks.map((task, index) => (
                        <TaskCard 
                            key={task.id} 
                            task={task}
                            index={index}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </TaskColumn>

                <TaskColumn title="Review" count={reviewTasks.length} droppableId="review">
                    {reviewTasks.map((task, index) => (
                        <TaskCard 
                            key={task.id} 
                            task={task}
                            index={index}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </TaskColumn>

                <TaskColumn title="Done" count={doneTasks.length} droppableId="done">
                    {doneTasks.map((task, index) => (
                        <TaskCard 
                            key={task.id} 
                            task={task}
                            index={index}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </TaskColumn>
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
