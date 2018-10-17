import { pageConstants } from '../_constants/pageConstants';

export function contentToggle(state={}, action) {
    switch (action.type){
        case pageConstants.CONTENT_IS_SHOWED: 
            return {
                toggle: true
            }
        case pageConstants.CONTENT_IS_HIDDEN:
            return {
                toggle: false
            }
        default:
            return state;
    }
}