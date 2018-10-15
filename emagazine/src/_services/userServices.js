import { authHeader, configBackend } from '../_helpers/index';
import fetch from 'cross-fetch';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        'data': "grant_type=password&password=" + password + "&username=" + username
    };
    return fetch(configBackend.apiUrl + '/token', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            console.log(user);
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
 
            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    console.log('into get all method')
    let user = JSON.parse(localStorage.getItem('user'));
    let header = new Headers({
        'Authorization': 'Bearer ' + user.token,
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        });
    const requestOptions = {
        method: 'Get',
        mode: 'cors',
        headers: header,
        //authHeader(),
        //body: JSON.stringify({}),
    };

    return fetch(configBackend.apiUrl + '/api/Account/Get', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
 
    return fetch(configBackend.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
 
    return fetch(configBackend.apiUrl + '/users/register', requestOptions).then(handleResponse, handleError);
}
 
function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
 
    return fetch(configBackend.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
}
 
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
 
    return fetch(configBackend.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}
 
function handleError(error) {
    return Promise.reject(error && error.message);
}