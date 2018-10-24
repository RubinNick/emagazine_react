import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={props => (
        JSON.parse(localStorage.getItem('user')).UserRole === '1'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)