import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import TaskHeader from "@/Components/Task/TaskHeader";
import TaskFilters from "@/Components/Task/TaskFilters";
import TaskSummary from "@/Components/Task/TaskSummary";
import TaskBoard from "@/Components/Task/TaskBoard";
import TaskList from "@/Components/Task/TaskList";
import TaskCalendar from "@/Components/Task/TaskCalendar";

const Task = ({ user }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [currentView, setCurrentView] = useState('board');
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design new landing page',
            description: 'Create a modern and responsive landing page design...',
            priority: 'high',
            status: 'todo',
            assignee: 'John Doe',
            dueDate: '2024-04-20'
        },
        {
            id: 2,
            title: 'Implement authentication',
            description: 'Set up user authentication system with Laravel Breeze...',
            priority: 'medium',
            status: 'in_progress',
            assignee: 'Alice Smith',
            dueDate: '2024-04-15'
        },
        {
            id: 3,
            title: 'Setup project structure',
            description: 'Initialize project and set up basic folder structure...',
            priority: 'low',
            status: 'done',
            assignee: 'Robert King',
            dueDate: '2024-04-10'
        }
    ]);

    const handleNewTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: 'New Task',
            description: 'Add description here...',
            priority: 'medium',
            status: 'todo',
            assignee: user.name,
            dueDate: new Date().toISOString().split('T')[0]
        };
        setTasks([...tasks, newTask]);
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
            task.assignee.toLowerCase().includes(searchLower)
        );
    });

    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <TaskList
                        tasks={filteredTasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                    />
                );
            case 'calendar':
                return (
                    <TaskCalendar
                        tasks={filteredTasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                    />
                );
            default:
                return (
                    <TaskBoard
                        tasks={filteredTasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        onDragEnd={handleDragEnd}
                    />
                );
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <Navigation user={user} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TaskHeader 
                        onToggleFilters={() => setShowFilters(!showFilters)}
                        onNewTask={handleNewTask}
                        view={currentView}
                        onViewChange={setCurrentView}
                        onSearch={setSearchQuery}
                    />
                    
                    <TaskFilters showFilters={showFilters} />
                    
                    <TaskSummary tasks={filteredTasks} />
                    
                    <div className="mt-6">
                        {renderView()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;
