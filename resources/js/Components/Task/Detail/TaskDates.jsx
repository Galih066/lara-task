import { CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TaskDates = ({ task, formatDate }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                </div>
                <p className="mt-1 text-sm text-gray-900 pl-6">{formatDate(task.start_date)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                </div>
                <p className="mt-1 text-sm text-gray-900 pl-6">{formatDate(task.due_date)}</p>
            </div>
            {task.completed_date && (
                <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <h4 className="text-sm font-medium text-gray-500">Completed</h4>
                    </div>
                    <p className="mt-1 text-sm text-gray-900 pl-6">{formatDate(task.completed_date)}</p>
                </div>
            )}
        </div>
    );
};

export default TaskDates;
