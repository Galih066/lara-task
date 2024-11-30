import TaskSummaryCard from "./TaskSummaryCard";
import {
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const TaskSummary = ({ tasks }) => {
    const calculateStats = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const stats = {
            total: tasks.length,
            inProgress: tasks.filter(t => t.status === 'in_progress').length,
            completed: tasks.filter(t => t.status === 'done').length,
            todo: tasks.filter(t => t.status === 'todo').length,
            priority: {
                high: tasks.filter(t => t.priority === 'high').length,
                medium: tasks.filter(t => t.priority === 'medium').length,
                low: tasks.filter(t => t.priority === 'low').length
            },
            dueToday: tasks.filter(t => {
                const dueDate = new Date(t.dueDate);
                dueDate.setHours(0, 0, 0, 0);
                return dueDate.getTime() === today.getTime();
            }).length,
            overdue: tasks.filter(t => {
                const dueDate = new Date(t.dueDate);
                dueDate.setHours(0, 0, 0, 0);
                return dueDate < today;
            }).length
        };

        return stats;
    };

    const stats = calculateStats();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <TaskSummaryCard
                icon={ChartBarIcon}
                title="Total Tasks"
                value={stats.total}
                description={`${stats.inProgress} active, ${stats.overdue} overdue`}
                color="bg-blue-600"
                dueToday={stats.dueToday}
            />
            <TaskSummaryCard
                icon={ClockIcon}
                title="In Progress"
                value={stats.inProgress}
                description={`${stats.todo} to do, ${stats.completed} completed`}
                color="bg-yellow-500"
                dueToday={stats.dueToday}
            />
            <TaskSummaryCard
                icon={CheckCircleIcon}
                title="Completed"
                value={stats.completed}
                description={`${Math.round((stats.completed / stats.total) * 100)}% completion rate`}
                color="bg-green-500"
            />
            <TaskSummaryCard
                icon={ExclamationTriangleIcon}
                title="Priority Tasks"
                value={stats.priority.high}
                description={`${stats.priority.medium} medium, ${stats.priority.low} low priority`}
                color="bg-red-500"
                dueToday={stats.overdue}
            />
        </div>
    );
};

export default TaskSummary;
