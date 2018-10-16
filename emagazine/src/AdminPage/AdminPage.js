import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import { userActions } from '../_actions';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo(e, userId) {
        e.preventDefault();
    
        this.props.dispatch(userActions.getById(userId))
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }   

    render() {
        const { user, users, userInfo } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi, {user.Username}!</h1>
                <p>You're logged as admin</p>
                <h3>List of all registred users: </h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={index} data-id={user.Id} style={{width: '1000px'}}>
                                <h4>
                                {user.FirstName + ' ' + user.LastName}
                                <Button bsStyle="info" style={{marginLeft: '20px'}} onClick={(event) => this.getUserInfo(event, user.Id)}> Show full info </Button>
                                <Button bsStyle="danger" style={{marginLeft: '20px'}}> Delete user </Button>
                                </h4>
                                {userInfo && 
                                    <h5>
                                        {userInfo.FirstName + ' ! ' + userInfo.LastName}
                                    </h5>
                                }                                
                            </li>
                        )}                       
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, userInfo, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
        userInfo
    };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };