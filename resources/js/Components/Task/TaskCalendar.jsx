import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import TaskListModal from './TaskListModal';

const TaskCalendar = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long'
        }).format(date);
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-100 border-red-200 text-red-800';
            case 'medium':
                return 'bg-yellow-100 border-yellow-200 text-yellow-800';
            case 'low':
                return 'bg-green-100 border-green-200 text-green-800';
            default:
                return 'bg-gray-100 border-gray-200 text-gray-800';
        }
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();

    // Group tasks by date
    const tasksByDate = tasks.reduce((acc, task) => {
        const date = new Date(task.dueDate);
        const key = date.toISOString().split('T')[0];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(task);
        return acc;
    }, {});

    const renderCell = (dayNumber) => {
        if (!dayNumber) return <div className="h-32" />;

        const date = new Date(year, month, dayNumber);
        const dateKey = date.toISOString().split('T')[0];
        const dayTasks = tasksByDate[dateKey] || [];
        const isToday = today.getDate() === dayNumber &&
            today.getMonth() === month &&
            today.getFullYear() === year;

        return (
            <div
                className={`h-32 border border-gray-200 p-2 ${isToday ? 'bg-blue-50' : 'bg-white'} cursor-pointer hover:bg-gray-50 transition-colors`}
                onClick={() => {
                    setSelectedDate(date);
                    setIsModalOpen(true);
                }}
            >
                <div className="flex justify-between items-start">
                    <span className={`inline-flex items-center justify-center w-6 h-6 text-sm ${isToday ? 'bg-blue-500 text-white rounded-full' : 'text-gray-700'
                        }`}>
                        {dayNumber}
                    </span>
                </div>
                <div className="mt-2 space-y-1 overflow-y-auto max-h-24">
                    {dayTasks.map(task => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-1 rounded text-xs border ${getPriorityColor(task.priority)}`}
                        >
                            {task.title}
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
        const dayNumber = i - firstDayOfMonth + 1;
        cells.push(dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{formatDate(currentDate)}</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={previousMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}
                {[...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).keys()].map((day, index) => (
                    <div key={index} className="bg-white">
                        {renderCell(day !== null ? day + 1 : null)}
                    </div>
                ))}
            </div>

            {selectedDate && (
                <TaskListModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedDate(null);
                    }}
                    date={selectedDate}
                    tasks={tasksByDate[selectedDate.toISOString().split('T')[0]] || []}
                />
            )}
        </div>
    );
};

export default TaskCalendar;
