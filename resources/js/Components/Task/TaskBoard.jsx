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

const TaskCard = ({ task, index, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleSave = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask(task);
        setIsEditing(false);
    };

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
                >
                    {isEditing ? (
                        <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <textarea
                                value={editedTask.description}
                                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                            />
                            <select
                                value={editedTask.priority}
                                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <div className="flex justify-end space-x-2">
                                <button 
                                    onClick={handleSave} 
                                    className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                >
                                    <CheckIcon className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={handleCancel} 
                                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between">
                                <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                                <div className="flex space-x-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                                            {task.assignee.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditing(true);
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(task.id);
                                        }}
                                        className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
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
