import { productConstants } from '../_constants/index';
import { productService } from '../_services/index';
import { alertActions } from './index';
import { notificationActions } from './index';

export const productActions = {
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function create(product) {
    return dispatch => {
        dispatch(request(product));

        productService.create(product)
            .then(
                product => {
                    dispatch(success(product));
                    dispatch(alertActions.success('Product succesfull created'));
                    dispatch(notificationActions.success(true, 'Product succesfull created!'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(notificationActions.error(true, error));
                }
            );
    };

    function request(product) { return { type: productConstants.CREATE_REQUEST, product } }
    function success(product) { return { type: productConstants.CREATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.CREATE_FAILURE, error } }
}

function update(product){
    return dispatch => {
        dispatch(request(product));

        productService.update(product)
            .then(
                product => {
                    dispatch(success(product));
                    dispatch(alertActions.success('Product successfull updated'));
                    dispatch(notificationActions.success(true, 'Product successfull updated'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(notificationActions.error(true, error));
                }
            )
    };

    function request(product) { return { type: productConstants.UPDATE_REQUEST, product } }
    function success(product) { return { type: productConstants.UPDATE_SUCCESS, product } } 
    function failure(error) {return { type: productConstants.UPDATE_FAILURE, error}}
}

function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                products => {
                    dispatch(success(products))
                    dispatch(notificationActions.success(true, 'Success'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                    dispatch(notificationActions.error(true, error))
                }
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants, error } }
}

function getById(id){
    return dispatch => {
        dispatch(request(id));

        productService.getById(id)
            .then(
                productInfo => {
                    dispatch(success(productInfo))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(notificationActions.error(error))
                }
            )
    };

    function request(id) { return { type: productConstants.GETBYID_REQUEST, id } }
    function success(productInfo) { return { type: productConstants.GETBYID_SUCCESS, productInfo } }
    function failure(error) { return { type: productConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
 
        productService.delete(id)
            .then(
                product => { 
                    dispatch(success(id));
                    dispatch(notificationActions.success(true, 'Successful deleted'))
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };
 
    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}