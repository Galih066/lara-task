import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import TaskDetail from './TaskDetail';
import ErrorAlert from '../AlertComp/ErrorAlert';

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
                    className={`p-4 border border-gray-200 rounded-lg shadow-sm group relative hover:shadow-md ${snapshot.isDragging
                            ? 'shadow-lg ring-2 ring-blue-500 bg-white'
                            : getBackgroundColor(task.priority)
                        } transition-all duration-200`}
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
    const [showError, setShowError] = useState(false);

    const priorityOrder = { high: 0, medium: 1, low: 2 };

    const handleTaskClick = (task) => {
        setSelectedTaskId(task.id);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedTaskId(null);
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const task = tasks.find(t => t.id.toString() === draggableId);

        if (!task.start_date && !task.due_date && destination.droppableId !== 'todo') {
            setShowError(true);
            return;
        }

        onDragEnd(result);
    };

    const groupedTasks = {
        todo: tasks.filter(task => task.status === 'todo'),
        in_progress: tasks.filter(task => task.status === 'in_progress'),
        review: tasks.filter(task => task.status === 'review'),
        done: tasks.filter(task => task.status === 'done')
    };

    return (
        <div className="h-full">
            {showError && (
                <ErrorAlert
                    title="Task Dates Required"
                    description="Please set start and due dates before moving the task"
                    onClose={() => setShowError(false)}
                />
            )}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col h-full">
                    <div className="overflow-x-auto -mx-4 px-4 mb-4">
                        <div className="inline-flex gap-4 min-w-max py-2">
                            <div className="w-[400px]">
                                <TaskColumn
                                    title="To Do"
                                    count={groupedTasks.todo.length}
                                    droppableId="todo"
                                >
                                    {groupedTasks.todo
                                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                        .map((task, index) => (
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

                            <div className="w-[400px]">
                                <TaskColumn
                                    title="In Progress"
                                    count={groupedTasks.in_progress.length}
                                    droppableId="in_progress"
                                >
                                    {groupedTasks.in_progress
                                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                        .map((task, index) => (
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

                            <div className="w-[400px]">
                                <TaskColumn
                                    title="Review"
                                    count={groupedTasks.review.length}
                                    droppableId="review"
                                >
                                    {groupedTasks.review
                                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                        .map((task, index) => (
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

                            <div className="w-[400px]">
                                <TaskColumn
                                    title="Done"
                                    count={groupedTasks.done.length}
                                    droppableId="done"
                                >
                                    {groupedTasks.done
                                        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                        .map((task, index) => (
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
                        </div>
                    </div>
                </div>
            </DragDropContext>

            {selectedTaskId && (
                <TaskDetail
                    taskId={selectedTaskId}
                    isModalOpen={isDetailOpen}
                    onClose={handleCloseDetail}
                    onSuccess={() => {
                        handleCloseDetail();
                        // router.visit(window.location.pathname);
                    }}
                />
            )}
        </div>
    );
};

export default TaskBoard;
