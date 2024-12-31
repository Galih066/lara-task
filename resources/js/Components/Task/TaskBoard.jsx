import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { PencilIcon, TrashIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import TaskDetail from './TaskDetail';
import EmptyState from '../EmptyState';

const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-900 border-t-transparent"></div>
    </div>
);

const TaskCard = ({ task, index, onUpdate, onDelete, onClick, isUpdating }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dueStatus = getDueDateStatus(task.dueDate);

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDragStyle(provided.draggableProps.style, snapshot)}
                    className={`p-4 border border-gray-200 rounded-lg shadow-sm group relative hover:shadow-md transition-shadow duration-200 ${getBackgroundColor(task.priority)}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => onClick(task)}
                >
                    {isUpdating && <LoadingOverlay />}
                    <div className="flex justify-between items-start space-x-4">
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-gray-900 truncate">{task.title}</h4>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</p>
                        </div>
                        <div className={`flex space-x-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdate(task);
                                }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            {dueStatus && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${dueStatus.class}`}>
                                    {dueStatus.text}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <span>By:</span>
                                <span className="font-medium text-gray-700">{task.initiator}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>Assignees:</span>
                                <span className="font-medium text-gray-700">{task.assignees?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

const TaskColumn = ({ title, count, children, droppableId }) => (
    <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-50 rounded-lg p-4`}
            >
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                    {title} ({count})
                </h3>
                <div
                    {...provided.droppableProps}
                    className="space-y-3"
                >
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
            transition: 'all 0.001s ease',
        };
    }

    if (snapshot.isDropAnimating) {
        return {
            ...style,
            transition: 'all 0.2s cubic-bezier(.2,1,.1,1)',
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

const getBackgroundColor = (priority) => {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-red-50';
        case 'medium':
            return 'bg-yellow-50';
        case 'low':
            return 'bg-green-50';
        default:
            return 'bg-white';
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

const formatStatus = (status) => {
    switch (status) {
        case 'todo':
            return 'To Do';
        case 'in_progress':
            return 'In Progress';
        case 'review':
            return 'Review';
        case 'done':
            return 'Done';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
};

const TaskBoard = ({ tasks, onUpdateTask, onDeleteTask, onTaskClick, onDragEnd, updatingTaskId }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const priorityOrder = { high: 0, medium: 1, low: 2 };

    const handleTaskClick = (task) => {
        setSelectedTaskId(task.id);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedTaskId(null);
        setIsDetailOpen(false);
    };

    // Group and sort tasks
    const tasksByStatus = {
        todo: tasks.filter(task => task.status === 'todo')
            .sort((a, b) => {
                // First sort by priority
                const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
                if (priorityDiff !== 0) return priorityDiff;
                // Then by due date
                return new Date(a.dueDate) - new Date(b.dueDate);
            }),
        in_progress: tasks.filter(task => task.status === 'in_progress'),
        review: tasks.filter(task => task.status === 'review'),
        done: tasks.filter(task => task.status === 'done'),
    };

    if (!tasks.length) {
        return (
            <EmptyState
                icon={ClipboardDocumentCheckIcon}
                title="No tasks yet"
                description="Add a task to start organizing your work"
            />
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col h-full">
                <div className="overflow-x-auto -mx-4 px-4 mb-4">
                    <div className="flex space-x-4 min-w-max py-2">
                        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                            <div key={status} className="flex-none w-[400px]">
                                <TaskColumn title={formatStatus(status)} count={statusTasks.length} droppableId={status}>
                                    {statusTasks.map((task, index) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            index={index}
                                            onUpdate={onUpdateTask}
                                            onDelete={onDeleteTask}
                                            onClick={handleTaskClick}
                                            isUpdating={updatingTaskId === task.id}
                                        />
                                    ))}
                                </TaskColumn>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <TaskDetail
                taskId={selectedTaskId}
                isModalOpen={isDetailOpen}
                onClose={handleCloseDetail}
            />
        </DragDropContext>
    );
};

export default TaskBoard;
