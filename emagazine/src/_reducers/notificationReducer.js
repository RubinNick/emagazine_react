import { notificationConstants } from '../_constants';

export function notification(state = {}, action) {
    switch (action.type) {
      case notificationConstants.SUCCESS:
        return {
          isOpen: action.open,
          snackbarVariant: 'success',
          snackbarMessage: action.message
        };
      case notificationConstants.ERROR:
        return {
          isOpen: action.open,
          snackbarVariant: 'error',
          message: action.message
        };
      case notificationConstants.WARNING:
        return {
            isOpen: action.open,
            snackbarVariant: 'warning',
            message: action.message
        };
      case notificationConstants.CLEAR:
        return {
        }
      default:
        return state
    }
  }