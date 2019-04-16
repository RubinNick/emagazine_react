import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions, notificationActions } from '../_actions';
import { PrivateRoute, AdminRoute } from '../_components';

import { HeaderAppBar } from '../components/Header';
import { BaseSnackbars } from '../components/BaseSnackbars'

import { WelcomePage } from '../components/Pages/WelcomePage';
import { LoginPage } from '../components/Pages/LoginPage';
import { RegisterPage } from '../components/Pages/RegisterPage'
import { AdminUsersPage } from '../components/Pages/AdminUsersPage';
import { AdminProductsPage } from '../components/Pages/AdminProductsPage';
import { AdminCreateProductPage } from '../components/Pages/AdminCreateProductPage';
import { ProfilePage } from '../components/Pages/ProfilePage';
import { HomePage } from '../components/Pages/HomePage';
import { ProductPage } from '../components/Pages/ProductPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
            //clear notifications on location change
            dispatch(notificationActions.clear(false));
        });
    }

    render() {
        const { notification } = this.props;
        return (
            <div>
                <HeaderAppBar />
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            { notification.isOpen && 
                                <BaseSnackbars isOpen={true} snackbarVariant={notification.snackbarVariant} snackbarMessage={notification.message}/>
                            }
                            <Router history={history}>
                                <div>
                                    <Route exact path="/" component={WelcomePage} />
                                    {//need to add a homepage
                                    //<Route path="/home" component={HomePage} />
                                    }
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component = {RegisterPage} />
                                    <AdminRoute exact path='/adminUsers' component={AdminUsersPage} />
                                    <AdminRoute exact path='/adminProducts' component={AdminProductsPage} />
                                    <AdminRoute exact path='/createProduct' component={AdminCreateProductPage} />
                                    <Route path="/profile" component={ProfilePage} />
                                    <Route path="/home" component={HomePage} />
                                    <Route path="/product/:id" render={(router) => {
                                        const { id } = router.match.params;
                                        return <ProductPage id={id} />}} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { notification } = state;
    return {
        notification
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 