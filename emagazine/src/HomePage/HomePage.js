import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi,  
                {user ?
                    user.firstName :
                    "Unknown user"
                }
                !</h1>
                <p>Welcome to the "secret shop"</p>
                <p>
                    {
                        localStorage.getItem('user') === null ?
                        <Link to="/login">Login</Link> :
                        <Link onClick={this.props.dispatch(userActions.logout())}> Logout </Link>
                    }                    
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };