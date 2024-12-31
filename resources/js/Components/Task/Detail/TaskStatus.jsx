import { FlagIcon, ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';

const TaskStatus = ({ task, getPriorityColor, getStatusColor, formatStatus, getTimeRemaining }) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
                <FlagIcon className="h-4 w-4 text-gray-400" />
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <ArrowPathIcon className="h-4 w-4 text-gray-400" />
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {formatStatus(task.status)}
                </span>
            </div>
            <span className={`inline-flex items-center gap-1 text-sm ${getTimeRemaining(task.start_date, task.due_date).class}`}>
                <ClockIcon className="h-4 w-4" />
                {getTimeRemaining(task.start_date, task.due_date).text}
            </span>
        </div>
    );
};

export default TaskStatus;
