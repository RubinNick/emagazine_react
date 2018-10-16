import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class WelcomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi,  
                {user ?
                    user.FirstName :
                    "Unknown user"
                }
                !</h1>
                <p>Welcome to the "secret shop"</p>
                <p>
                    {
                        localStorage.getItem('user') === null ?
                        <Link to="/login">Login</Link> :
                        <button onClick={ () => this.props.dispatch(userActions.logout()) }> Logout </button>
                    }                    
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedWelcomePage = connect(mapStateToProps)(WelcomePage);
export { connectedWelcomePage as WelcomePage };