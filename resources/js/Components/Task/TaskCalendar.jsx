import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import TaskListModal from './TaskListModal';
import moment from 'moment';

const TaskCalendar = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getDaysInMonth = (date) => {
        return date.daysInMonth();
    };

    const getFirstDayOfMonth = (date) => {
        return moment(date).startOf('month').day();
    };

    const formatDate = (date) => {
        return date.format('MMMM YYYY');
    };

    const previousMonth = () => {
        setCurrentDate(moment(currentDate).subtract(1, 'month'));
    };

    const nextMonth = () => {
        setCurrentDate(moment(currentDate).add(1, 'month'));
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

    const renderCell = (dayNumber) => {
        if (!dayNumber) return <div className="h-32 bg-gray-50" />;

        const date = moment(currentDate).date(dayNumber);
        const dayTasks = tasks.filter(task => {
            const startDate = moment(task.start_date);
            const endDate = moment(task.due_date);
            return date.isSameOrAfter(startDate, 'day') && 
                   date.isSameOrBefore(endDate, 'day');
        });
        const isToday = moment().isSame(date, 'day');
        const isCurrentMonth = moment(currentDate).isSame(date, 'month');

        return (
            <div
                className={`min-h-[8rem] p-2 ${isToday ? 'bg-blue-50' : 'bg-white'
                    } hover:bg-gray-50 transition-colors cursor-pointer group relative`}
                onClick={() => {
                    setSelectedDate(date);
                    setIsModalOpen(true);
                }}
            >
                <div className="flex items-center justify-between">
                    <span className={`
                        flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full
                        ${isToday ? 'bg-blue-500 text-white' : 'text-gray-900 group-hover:bg-gray-200'}
                        ${!isCurrentMonth ? 'text-gray-400' : ''}
                    `}>
                        {dayNumber}
                    </span>
                    {dayTasks.length > 0 && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            {dayTasks.length}
                        </span>
                    )}
                </div>
                <div className="mt-2 space-y-1 overflow-y-auto max-h-24 custom-scrollbar">
                    {dayTasks.map(task => {
                        const isStart = moment(task.start_date).isSame(date, 'day');
                        const isEnd = moment(task.due_date).isSame(date, 'day');
                        return (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`
                                    p-1.5 text-xs border group/task
                                    ${getPriorityColor(task.priority)}
                                    hover:shadow-sm transition-shadow
                                    ${isStart ? 'rounded-l-md' : 'border-l-0 rounded-l-none'}
                                    ${isEnd ? 'rounded-r-md' : 'border-r-0 rounded-r-none'}
                                    relative
                                `}
                                style={{
                                    marginLeft: isStart ? '0' : '-1px',
                                    marginRight: isEnd ? '0' : '-1px',
                                    zIndex: 10
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="truncate flex-1">{task.title}</span>
                                    {(isStart || isEnd) && (
                                        <span className={`
                                            ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium opacity-0 
                                            group-hover/task:opacity-100 transition-opacity
                                            ${task.status === 'todo' ? 'bg-gray-100 text-gray-600' :
                                                task.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                                                    task.status === 'review' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-green-100 text-green-600'}
                                        `}>
                                            {task.status === 'in_progress' ? 'IP' :
                                                task.status === 'todo' ? 'TD' :
                                                    task.status === 'review' ? 'RV' : 'DN'}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{formatDate(currentDate)}</h2>
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={previousMonth}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-7 gap-px mb-px bg-gray-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-gray-50 px-2 py-3 text-center text-sm font-semibold text-gray-900">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {[...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth).keys()].map((day, index) => (
                        <div key={index} className="bg-white relative">
                            {renderCell(day !== null ? day + 1 : null)}
                        </div>
                    ))}
                </div>
            </div>

            {selectedDate && (
                <TaskListModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedDate(null);
                    }}
                    date={selectedDate.toDate()}
                    tasks={tasks.filter(task => {
                        const startDate = moment(task.start_date);
                        const endDate = moment(task.due_date);
                        return moment(selectedDate).isSameOrAfter(startDate, 'day') && 
                               moment(selectedDate).isSameOrBefore(endDate, 'day');
                    })}
                />
            )}
        </div>
    );
};

export default TaskCalendar;
