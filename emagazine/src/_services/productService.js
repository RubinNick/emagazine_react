import { authHeader, configBackend } from '../_helpers/index';
import fetch from 'cross-fetch';
import { history } from '../_helpers/index';

export const productService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function create(product) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(product)
    };
 
    return fetch(configBackend.apiUrl + '/api/Product/Add', requestOptions).then(handleResponse, handleError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(configBackend.apiUrl + '/api/Product/GetAll', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
 
    return fetch(configBackend.apiUrl + '/api/Product/Get/' + id, requestOptions)
        .then(handleResponse, handleError)
        .then(productInfo => {          
            return productInfo;
        });
}

function update(product) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(product)
    };
 
    return fetch(configBackend.apiUrl + '/api/Product/Update/' + product.id, requestOptions).then(handleResponse, handleError);
}
 
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
 
    return fetch(configBackend.apiUrl + '/api/Product/Delete/' + id, requestOptions).then(handleResponse, handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function redirectToWelcome(){
    history.push('/');
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
            //response message
            var msg = response.text();
            //check for unauthorize
            if(response.status === 401){
                msg.then(text => alert(text));
                logout();
                redirectToWelcome();
            }else{
                // return error message from response body
            msg.then(text => reject(text));
            }                                     
        }
    });
}
 
function handleError(error) {
    return Promise.reject(error && error.message);
}