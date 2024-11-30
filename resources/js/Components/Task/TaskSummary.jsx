import TaskSummaryCard from "./TaskSummaryCard";
import {
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const TaskSummary = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <TaskSummaryCard
                icon={ChartBarIcon}
                title="Total Tasks"
                value={stats.total.count}
                description={`${stats.inProgress.count} active, ${stats.priority.overdue} overdue`}
                color="bg-blue-600"
                trend="up"
                trendValue={stats.total.trendValue}
                dueToday={stats.total.dueTodayCount}
            />
            <TaskSummaryCard
                icon={ClockIcon}
                title="In Progress"
                value={stats.inProgress.count}
                description={`${stats.inProgress.onTrack} on track, ${stats.inProgress.delayed} delayed`}
                color="bg-yellow-500"
                dueToday={stats.inProgress.delayed}
            />
            <TaskSummaryCard
                icon={CheckCircleIcon}
                title="Completed"
                value={stats.completed.count}
                description={`${stats.completed.thisMonth} this month`}
                color="bg-green-500"
                trend="up"
                trendValue={stats.completed.trendValue}
            />
            <TaskSummaryCard
                icon={ExclamationTriangleIcon}
                title="Priority Tasks"
                value={stats.priority.high}
                description={`${stats.priority.medium} medium, ${stats.priority.low} low priority`}
                color="bg-red-500"
                dueToday={stats.priority.overdue}
            />
        </div>
    );
};

export default TaskSummary;
