import { motion } from "framer-motion";

const TaskColumn = ({ title, count, children }) => (
    <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {count}
            </span>
        </div>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const TaskCard = ({ title, priority, description, assignee, dueDate }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-blue-500 transition-colors duration-200"
    >
        <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priority === 'high' ? 'bg-red-100 text-red-800' :
                    priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                }`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        {assignee.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                </div>
            </div>
            <span className="text-xs text-gray-500">{dueDate}</span>
        </div>
    </motion.div>
);

const TaskBoard = ({ tasks }) => {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn title="To Do" count={todoTasks.length}>
                {todoTasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </TaskColumn>

            <TaskColumn title="In Progress" count={inProgressTasks.length}>
                {inProgressTasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </TaskColumn>

            <TaskColumn title="Done" count={doneTasks.length}>
                {doneTasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </TaskColumn>
        </div>
    );
};

export default TaskBoard;
