import moment from "moment";
import TaskSummaryCard from "./TaskSummaryCard";
import {
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const TaskSummary = ({ tasks }) => {
    const calculateStats = () => {
        const today = moment().startOf('day');

        const stats = {
            total: tasks.length,
            inProgress: tasks.filter(t => t.status === 'in_progress').length,
            completed: tasks.filter(t => t.status === 'done').length,
            todo: tasks.filter(t => t.status === 'todo').length,
            review: tasks.filter(t => t.status === 'review').length,
            priority: {
                high: tasks.filter(t => t.priority === 'high').length,
                medium: tasks.filter(t => t.priority === 'medium').length,
                low: tasks.filter(t => t.priority === 'low').length
            },
            dueToday: tasks.filter(t => moment(t.dueDate).startOf('day').isSame(today)).length,
            overdue: tasks.filter(t => moment(t.dueDate).startOf('day').isBefore(today)).length
        };

        return stats;
    };

    const stats = calculateStats();
    const percentage = stats.completed || stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <TaskSummaryCard
                icon={ChartBarIcon}
                title="Total Tasks"
                value={stats.total}
                description={`${stats.inProgress} active, ${stats.review} in review`}
                color="bg-blue-600"
            />
            <TaskSummaryCard
                icon={ClockIcon}
                title="In Progress"
                value={stats.inProgress}
                description={`${stats.todo} to do, ${stats.completed} completed`}
                color="bg-yellow-500"
            />
            <TaskSummaryCard
                icon={CheckCircleIcon}
                title="Completed"
                value={stats.completed}
                description={`${percentage}% completion rate`}
                color="bg-green-500"
            />
            <TaskSummaryCard
                icon={ExclamationTriangleIcon}
                title="Priority Tasks"
                value={stats.priority.high}
                description={`${stats.priority.medium} medium, ${stats.priority.low} low priority`}
                color="bg-red-500"
            />
        </div>
    );
};

export default TaskSummary;
