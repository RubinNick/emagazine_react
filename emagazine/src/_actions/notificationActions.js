import { notificationConstants } from '../_constants'

export const notificationActions = {
    success,
    error,
    warning,
    clear
};

function success(open, message) {
    return { type: notificationConstants.SUCCESS, open, message };
}

function error(open, message) {
    return { type: notificationConstants.ERROR, open, message };
}

function warning(open, message) {
    return { type: notificationConstants.WARNING, open, message };
}

function clear(open) {
    return { type: notificationConstants.CLEAR, open}
}