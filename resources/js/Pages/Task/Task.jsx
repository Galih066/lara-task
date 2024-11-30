import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import TaskHeader from "@/Components/Task/TaskHeader";
import TaskFilters from "@/Components/Task/TaskFilters";
import TaskSummary from "@/Components/Task/TaskSummary";
import TaskBoard from "@/Components/Task/TaskBoard";

const Task = ({ user }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design new landing page',
            description: 'Create a modern and responsive landing page design...',
            priority: 'high',
            status: 'todo',
            assignee: 'John Doe',
            dueDate: 'Due in 3 days'
        },
        {
            id: 2,
            title: 'Implement authentication',
            description: 'Set up user authentication system with Laravel Breeze...',
            priority: 'medium',
            status: 'in_progress',
            assignee: 'Alice Smith',
            dueDate: 'Due tomorrow'
        },
        {
            id: 3,
            title: 'Setup project structure',
            description: 'Initialize project and set up basic folder structure...',
            priority: 'low',
            status: 'done',
            assignee: 'Robert King',
            dueDate: 'Completed'
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
            dueDate: 'Not set'
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

        // If there's no destination or the item was dropped in its original position
        if (!destination || 
            (destination.droppableId === source.droppableId && 
             destination.index === source.index)) {
            return;
        }

        // Create a new array to avoid mutating state directly
        const updatedTasks = Array.from(tasks);
        const draggedTask = updatedTasks.find(task => task.id.toString() === draggableId);
        
        if (!draggedTask) return;

        // Remove task from source
        updatedTasks.splice(updatedTasks.indexOf(draggedTask), 1);
        
        // Find the correct position to insert the task
        const destinationTasks = updatedTasks.filter(task => task.status === destination.droppableId);
        const otherTasks = updatedTasks.filter(task => task.status !== destination.droppableId);
        
        // Update task status
        draggedTask.status = destination.droppableId;
        
        // Insert at the correct position
        destinationTasks.splice(destination.index, 0, draggedTask);
        
        // Combine all tasks
        setTasks([...otherTasks, ...destinationTasks]);
    };

    // Calculate task stats based on current tasks
    const taskStats = {
        total: {
            count: tasks.length,
            trend: 'up',
            trendValue: '12% vs last week',
            dueTodayCount: tasks.filter(t => t.dueDate === 'Due today').length
        },
        inProgress: {
            count: tasks.filter(t => t.status === 'in_progress').length,
            completion: '45%',
            onTrack: tasks.filter(t => t.status === 'in_progress' && t.priority !== 'high').length,
            delayed: tasks.filter(t => t.status === 'in_progress' && t.priority === 'high').length
        },
        completed: {
            count: tasks.filter(t => t.status === 'done').length,
            trend: 'up',
            trendValue: '23% this week',
            thisMonth: tasks.filter(t => t.status === 'done').length
        },
        priority: {
            high: tasks.filter(t => t.priority === 'high').length,
            medium: tasks.filter(t => t.priority === 'medium').length,
            low: tasks.filter(t => t.priority === 'low').length,
            overdue: tasks.filter(t => t.dueDate === 'Overdue').length
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <TaskHeader 
                        onToggleFilters={() => setShowFilters(!showFilters)}
                        onNewTask={handleNewTask}
                    />
                    <TaskSummary stats={taskStats} />
                    <TaskFilters showFilters={showFilters} />
                    <TaskBoard 
                        tasks={tasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        onDragEnd={handleDragEnd}
                    />
                </main>
            </div>
        </>
    );
};

export default Task;
