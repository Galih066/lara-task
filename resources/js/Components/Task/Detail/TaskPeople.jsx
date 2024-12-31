import { UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';

const TaskPeople = ({ task }) => {
    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <UserCircleIcon className="h-4 w-4 text-gray-400" />
                    <h4 className="text-sm font-medium text-gray-500">Initiator</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                    {task.initiator.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{task.initiator.name}</p>
                            <p className="text-sm text-gray-500">{task.initiator.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-2">
                    <UsersIcon className="h-4 w-4 text-gray-400" />
                    <h4 className="text-sm font-medium text-gray-500">Assignees</h4>
                </div>
                <div className="space-y-2">
                    {task.assignees.map((assignee) => (
                        <div key={assignee.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {assignee.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{assignee.name}</p>
                                    <p className="text-sm text-gray-500">{assignee.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">{assignee.job_title}</span>
                                        {assignee.department && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs text-gray-500">{assignee.department}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskPeople;
