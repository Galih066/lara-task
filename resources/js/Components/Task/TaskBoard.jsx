import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskCard from "./Board/TaskCard";
import TaskDetail from './TaskDetail';
import TaskColumn from "./Board/TaskColumn";
import ErrorAlert from '../AlertComp/ErrorAlert';
import UpdateTaskForm from "./UpdateTaskForm";

const TaskBoard = ({ tasks, onUpdateTask, onDeleteTask, onDragEnd, updatingTaskId }) => {
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
