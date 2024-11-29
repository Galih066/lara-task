import { UsersIcon, UserGroupIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const MemberSummary = () => {
    // Static dummy data for demonstration
    const summaryData = [
        {
            title: "Total Members",
            value: "156",
            change: "+12%",
            trend: "up",
            icon: UsersIcon,
            color: "blue"
        },
        {
            title: "Active Members",
            value: "142",
            change: "+5%",
            trend: "up",
            icon: UserGroupIcon,
            color: "green"
        },
        {
            title: "Departments",
            value: "8",
            change: "0%",
            trend: "neutral",
            icon: BriefcaseIcon,
            color: "purple"
        },
        {
            title: "Member Growth",
            value: "24",
            change: "+18%",
            trend: "up",
            icon: ChartBarIcon,
            color: "indigo"
        }
    ];

    const getColorClasses = (color) => {
        const classes = {
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                icon: 'bg-blue-100',
                trend: 'text-blue-700'
            },
            green: {
                bg: 'bg-green-50',
                text: 'text-green-600',
                icon: 'bg-green-100',
                trend: 'text-green-700'
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-600',
                icon: 'bg-purple-100',
                trend: 'text-purple-700'
            },
            indigo: {
                bg: 'bg-indigo-50',
                text: 'text-indigo-600',
                icon: 'bg-indigo-100',
                trend: 'text-indigo-700'
            }
        };
        return classes[color];
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
            {summaryData.map((item, index) => {
                const colorClasses = getColorClasses(item.color);
                return (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${colorClasses.bg} relative overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                                <div className="mt-2 flex items-baseline">
                                    <p className={`text-2xl font-semibold ${colorClasses.text}`}>
                                        {item.value}
                                    </p>
                                    <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                                        item.trend === 'up' ? 'text-green-600' : 
                                        item.trend === 'down' ? 'text-red-600' : 
                                        'text-gray-600'
                                    }`}>
                                        {item.change}
                                    </p>
                                </div>
                            </div>
                            <div className={`${colorClasses.icon} rounded-lg p-3`}>
                                <item.icon className={`h-6 w-6 ${colorClasses.text}`} aria-hidden="true" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/5 to-white/5" />
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default MemberSummary;
