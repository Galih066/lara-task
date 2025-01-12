import moment from 'moment';

export const utils = {
    formatText: (text) => {
        if (!text) return '';
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },

    formatDate: (date) => {
        if (!date) return '';
        return moment(date).format('MMM D, YYYY');
    },

    getTimeDifference: (dueDate) => {
        if (!dueDate) return null;
        const now = moment();
        const due = moment(dueDate);
        return {
            days: due.diff(now, 'days'),
            hours: due.diff(now, 'hours'),
            due: due
        };
    },

    pluralize: (number, singular, plural) => {
        return `${number} ${Math.abs(number) === 1 ? singular : (plural || singular + 's')}`;
    }
};

export const styles = {
    priority: {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800',
        default: 'bg-gray-100 text-gray-800'
    },
    status: {
        todo: 'bg-gray-100 text-gray-800',
        in_progress: 'bg-blue-100 text-blue-800',
        done: 'bg-green-100 text-green-800',
        default: 'bg-gray-100 text-gray-800'
    },
    dueDate: {
        overdue: 'text-red-600 font-bold',
        today: 'text-orange-600',
        soon: 'text-yellow-600',
        upcoming: 'text-blue-600',
        future: 'text-gray-600',
        notSet: 'text-gray-600 font-semibold'
    }
};

export const getDueDateStatus = (dueDate) => {
    if (!dueDate) {
        return { class: styles.dueDate.notSet, text: 'Not Set' };
    }

    const { days, hours, due } = utils.getTimeDifference(dueDate);

    if (days < 0) {
        return {
            class: styles.dueDate.overdue,
            text: `Overdue by ${utils.pluralize(Math.abs(days), 'day')}`
        };
    }

    if (hours < 24) {
        if (hours < 0) {
            return {
                class: styles.dueDate.overdue,
                text: `Overdue by ${utils.pluralize(Math.abs(hours), 'hour')}`
            };
        }
        return {
            class: styles.dueDate.today,
            text: hours === 0 ? 'Due now' : `Due in ${utils.pluralize(hours, 'hour')}`
        };
    }

    if (days === 0) {
        return { class: styles.dueDate.today, text: 'Due Today' };
    }
    if (days <= 2) {
        return { 
            class: styles.dueDate.soon, 
            text: `Due in ${utils.pluralize(days, 'day')}` 
        };
    }
    if (days <= 7) {
        return { 
            class: styles.dueDate.upcoming, 
            text: `Due in ${utils.pluralize(days, 'day')}` 
        };
    }

    return { 
        class: styles.dueDate.future, 
        text: `Due ${due.format('MMM D')}` 
    };
};

export const getStatusColor = (status) => {
    return styles.status[status?.toLowerCase()] || styles.status.default;
};

export const getPriorityColor = (priority) => {
    return styles.priority[priority?.toLowerCase()] || styles.priority.default;
};
