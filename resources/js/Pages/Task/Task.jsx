import { useState } from "react";
import { Head } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import TaskHeader from "@/Components/Task/TaskHeader";
import TaskFilters from "@/Components/Task/TaskFilters";
import TaskSummary from "@/Components/Task/TaskSummary";
import TaskBoard from "@/Components/Task/TaskBoard";

const Task = ({ user }) => {
    const [showFilters, setShowFilters] = useState(false);

    // Sample data - replace with actual data from backend
    const taskStats = {
        total: {
            count: 24,
            trend: 'up',
            trendValue: '12% vs last week',
            dueTodayCount: 3
        },
        inProgress: {
            count: 8,
            completion: '45%',
            onTrack: 6,
            delayed: 2
        },
        completed: {
            count: 16,
            trend: 'up',
            trendValue: '23% this week',
            thisMonth: 42
        },
        priority: {
            high: 5,
            medium: 12,
            low: 7,
            overdue: 2
        }
    };

    // Sample tasks data
    const tasks = [
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
    ];

    const handleNewTask = () => {
        // TODO: Implement new task creation
        console.log('Create new task');
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
                    <TaskBoard tasks={tasks} />
                </main>
            </div>
        </>
    );
};

export default Task;
