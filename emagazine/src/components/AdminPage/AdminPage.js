import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Alert } from 'react-bootstrap';

import { userActions, pageActions } from '../../_actions';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.changeToogle = this.changeToogle.bind(this);
        this.getUserTradingRole = this.getUserTradingRole.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    getUserTradingRole(user) {
        switch (user.TradingRole) {
            case 1:
                return "Supplier"
            case 2:
                return "Seller"
            case 3:
                return "Buyer"
            default:
                return "Buyer";
        }
    }

    getUserRole(user){
        switch(user.UserRole) {
            case 1:
                return "Admin"
            case 2:
                return "User"
            default:
                return "User"
        }
    }

    componentDidMount() {
        this.props.dispatch(pageActions.toogleIsOff());

        this.props.dispatch(userActions.getAll());

        window.allProps = this.props;
    }
    
    changeToogle() {
        this.props.contentToggle.toogle ?
            this.props.dispatch(pageActions.toogleIsOff()) :
            this.props.dispatch(pageActions.toogleIsOn());  
    }

    render() {
        const { user, users, contentToggle } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi, {user.Username}!</h1>
                <p>You're logged as admin</p>
                <h3>List of all registred users: </h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <Alert bsStyle="warning" className="text-danger">ERROR: {users.error}</Alert>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={index} data-id={user.Id} style={{width: '1000px'}}>
                                <h4>
                                {user.FirstName + ' ' + user.LastName}
                                <Button bsStyle="info" style={{marginLeft: '20px'}} onClick={() => this.changeToogle()}> Show full info </Button>
                                { user.Id === JSON.parse(localStorage.getItem("user")).Id ?
                                    <Button bsStyle="danger" style={{marginLeft: '20px'}} disabled title="Can't delete you"> Delete user </Button> :
                                    <Button bsStyle="danger" style={{marginLeft: '20px'}} > Delete user </Button>
                                }                               
                                
                                { contentToggle.toggle && 
                                    <text>                                
                                        Company name: {user.CompanyName}
                                        Email: {user.EMail} <br/>
                                        Phone: {user.Phone} <br/>
                                        Trading role: {this.getUserTradingRole(user)} <br/>
                                        UserRole: {this.getUserRole(user)} <br/>   
                                    </text>
                                }  
                                </h4>                                                         
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
    const { users, authentication, contentToggle } = state;
    const { user } = authentication;
    return {
        user,
        users,
        contentToggle
    };
}

const connectedAdminPage = (connect(mapStateToProps)(AdminPage));
export { connectedAdminPage as AdminPage };