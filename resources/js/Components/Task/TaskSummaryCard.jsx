import { motion } from "framer-motion";
import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarIcon
} from "@heroicons/react/24/outline";

const TaskSummaryCard = ({ icon: Icon, title, value, description, color, trend, trendValue }) => (
    <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-sm p-6"
    >
        <div className="flex items-start">
            <div className={`flex-shrink-0 rounded-lg p-3 ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
                <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                    <dd>
                        <div className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{value}</div>
                            {trend && (
                                <span className={`ml-2 text-sm font-medium ${trend === 'up'
                                    ? 'text-green-600'
                                    : trend === 'down'
                                        ? 'text-red-600'
                                        : 'text-gray-500'
                                    }`}>
                                    {trend === 'up' ? (
                                        <span className="flex items-center">
                                            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                                            {trendValue}
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                                            {trendValue}
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </dd>
                </dl>
            </div>
        </div>
    </motion.div>
);

export default TaskSummaryCard;
