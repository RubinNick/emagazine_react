import { pageConstants } from '../_constants/pageConstants';
import { alertActions  } from './index';
import {  history } from '../_helpers/index';

export const pageActions = {
    toogleIsOn,
    toogleIsOff
};

function toogleIsOn() {
    return { type: pageConstants.CONTENT_IS_SHOWED };
}

function toogleIsOff() {
    return { type: pageConstants.CONTENT_IS_HIDDEN };
}