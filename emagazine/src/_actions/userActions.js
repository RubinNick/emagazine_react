import { userConstants } from '../_constants/index';
import { userService } from '../_services/index';
import { alertActions } from './index';
import { history } from '../_helpers/index';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    {user.Role === "1" ?
                    history.push('/admin') :
                    history.push('/home');
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login')
                    dispatch(alertActions.success('Successfull registerd'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id){
    return dispatch => {
        dispatch(request(id));

        userService.getById(id)
            .then(
                userInfo => {
                    dispatch(success(userInfo))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request(id) { return { type: userConstants.GETBYID_REQUEST, id } }
    function success(userInfo) { return { type: userConstants.GETBYID_SUCCESS, userInfo } }
    function failure(userInfo) { return { type: userConstants.GETBYID_FAILURE, userInfo } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
 
        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };
 
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}