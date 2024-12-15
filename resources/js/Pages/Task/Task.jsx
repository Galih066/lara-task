import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import TaskHeader from "@/Components/Task/TaskHeader";
import TaskFilters from "@/Components/Task/TaskFilters";
import TaskSummary from "@/Components/Task/TaskSummary";
import TaskBoard from "@/Components/Task/TaskBoard";
import TaskList from "@/Components/Task/TaskList";
import TaskCalendar from "@/Components/Task/TaskCalendar";
import CreateTaskForm from "@/Components/Task/CreateTaskForm";
import TaskDetail from "@/Components/Task/TaskDetail";
import SuccessAlert from "@/Components/AlertComp/SuccessAlert";

const Task = ({ user, empOrg, initialTasks }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEntering, setIsEntering] = useState(false);
    const [currentView, setCurrentView] = useState('board');
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState(initialTasks);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleNewTask = () => {
        setShowCreateForm(true);
        setTimeout(() => setIsEntering(true), 50);
    };

    const handleTaskCreated = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCloseTask = () => {
        setIsEntering(false);
        setTimeout(() => {
            setShowCreateForm(false);
            setShowTaskDetail(false);
            setSelectedTask(null);
        }, 300);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowTaskDetail(true);
        setTimeout(() => setIsEntering(true), 50);
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const draggedTask = updatedTasks.find(task => task.id.toString() === draggableId);

        if (!draggedTask) return;

        draggedTask.status = destination.droppableId;
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.initiator.toLowerCase().includes(searchLower)
        );
    });

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />
                {showSuccess && (
                    <SuccessAlert
                        title="Task Created"
                        message="Your task has been successfully created."
                        duration={5000}
                        onClose={() => setShowSuccess(false)}
                    />
                )}
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <TaskHeader
                        onNewTask={handleNewTask}
                        onToggleFilters={() => setShowFilters(!showFilters)}
                        onViewChange={setCurrentView}
                        view={currentView}
                        onSearch={setSearchQuery}
                        searchQuery={searchQuery}
                    />

                    {showFilters && (
                        <TaskFilters
                            className="mb-6"
                        />
                    )}

                    <TaskSummary tasks={filteredTasks} />

                    <div className="mt-6">
                        {currentView === 'board' && (
                            <TaskBoard
                                tasks={filteredTasks}
                                onTaskClick={handleTaskClick}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                                onDragEnd={handleDragEnd}
                            />
                        )}
                        {currentView === 'list' && (
                            <TaskList
                                tasks={filteredTasks}
                                onTaskClick={handleTaskClick}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                            />
                        )}
                        {currentView === 'calendar' && (
                            <TaskCalendar
                                tasks={filteredTasks}
                                onTaskClick={handleTaskClick}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                            />
                        )}
                    </div>
                </div>

                {showCreateForm && (
                    <CreateTaskForm
                        onClose={handleCloseTask}
                        users={empOrg}
                        isModalOpen={showCreateForm}
                        isEntering={isEntering}
                        onSuccess={handleTaskCreated}
                    />
                )}

                {showTaskDetail && selectedTask && (
                    <TaskDetail
                        task={selectedTask}
                        onClose={handleCloseTask}
                        isModalOpen={showTaskDetail}
                        isEntering={isEntering}
                    />
                )}
            </div>
        </>
    );
};

export default Task;
