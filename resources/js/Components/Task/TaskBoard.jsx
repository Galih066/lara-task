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
                className={`bg-white rounded-xl shadow-sm p-4 transition-colors duration-200 ${
                    snapshot.isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {count}
                    </span>
                </div>
                <div className="space-y-3 min-h-[200px]">
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
                    className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm group ${
                        snapshot.isDragging 
                            ? 'shadow-xl ring-2 ring-blue-500 rotate-3 scale-105 cursor-grabbing z-50' 
                            : 'hover:border-blue-500 hover:shadow-md cursor-grab transition-all duration-200'
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isEditing ? (
                        <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Task title"
                            />
                            <textarea
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Task description"
                                rows={3}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1.5 text-sm text-green-600 hover:text-green-800"
                                >
                                    <CheckIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between">
                                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="inline-block h-6 w-6 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                                        {task.assignee.charAt(0)}
                                    </span>
                                    <span className="text-xs text-gray-500">{task.assignee}</span>
                                </div>
                                {dueStatus && (
                                    <span className={`text-xs ${dueStatus.class}`}>
                                        {dueStatus.text}
                                    </span>
                                )}
                            </div>
                            
                            {/* Quick actions - visible on hover */}
                            <div className={`absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(task.id);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

const TaskBoard = ({ tasks, onUpdateTask, onDeleteTask, onDragEnd }) => {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
