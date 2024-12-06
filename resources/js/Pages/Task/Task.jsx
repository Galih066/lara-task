import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import TaskHeader from "@/Components/Task/TaskHeader";
import TaskFilters from "@/Components/Task/TaskFilters";
import TaskSummary from "@/Components/Task/TaskSummary";
import TaskBoard from "@/Components/Task/TaskBoard";
import TaskList from "@/Components/Task/TaskList";
import TaskCalendar from "@/Components/Task/TaskCalendar";
import CreateTaskForm from "@/Components/Task/CreateTaskForm";

const Task = ({ auth, users }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [currentView, setCurrentView] = useState('board');
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design new landing page',
            description: 'Create a modern and responsive landing page design...',
            priority: 'high',
            status: 'todo',
            initiator: auth?.user?.name || 'Unknown',
            assignees: [auth?.user?.id || 1],
            dueDate: '2024-04-20'
        },
        {
            id: 2,
            title: 'Implement authentication',
            description: 'Set up user authentication system with Laravel Breeze...',
            priority: 'medium',
            status: 'in_progress',
            initiator: auth?.user?.name || 'Unknown',
            assignees: [auth?.user?.id || 1],
            dueDate: '2024-04-15'
        },
        {
            id: 3,
            title: 'Setup project structure',
            description: 'Initialize project and set up basic folder structure...',
            priority: 'low',
            status: 'done',
            initiator: auth?.user?.name || 'Unknown',
            assignees: [auth?.user?.id || 1],
            dueDate: '2024-04-10'
        }
    ]);

    const handleNewTask = () => {
        setShowCreateForm(true);
        // Start entrance animation after a brief delay
        setTimeout(() => setIsEntering(true), 50);
    };

    const handleCloseTask = () => {
        setIsEntering(false);
        // Wait for exit animation to complete before hiding modal
        setTimeout(() => setShowCreateForm(false), 300);
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
            <div className="min-h-screen bg-gray-50">
                <Navigation user={auth.user} />

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
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                                onDragEnd={handleDragEnd}
                            />
                        )}
                        {currentView === 'list' && (
                            <TaskList
                                tasks={filteredTasks}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                            />
                        )}
                        {currentView === 'calendar' && (
                            <TaskCalendar
                                tasks={filteredTasks}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                            />
                        )}
                    </div>
                </div>

                {showCreateForm && (
                    <CreateTaskForm
                        onClose={handleCloseTask}
                        users={users || []}
                        isModalOpen={showCreateForm}
                        isEntering={isEntering}
                    />
                )}
            </div>
        </>
    );
};

export default Task;
