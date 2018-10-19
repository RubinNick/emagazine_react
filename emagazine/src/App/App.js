import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, AdminRoute } from '../_components';

import { HeaderAppBar } from '../components/Header'

import { WelcomePage } from '../components/Pages/WelcomePage';
import { LoginPage } from '../components/Pages/LoginPage';
import { RegisterPage } from '../components/Pages/RegisterPage'
import { AdminPage } from '../components/Pages/AdminPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <HeaderAppBar />
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <Route exact path="/" component={WelcomePage} />
                                    {//need to add a homepage
                                    //<Route path="/home" component={HomePage} />
                                    }
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component = {RegisterPage} />
                                    <AdminRoute exact path='/admin' component={AdminPage} />
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
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 