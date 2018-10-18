import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../../_actions';

import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      }
})

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.getUserTradingRole = this.getUserTradingRole.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    state = {
        fullInfoToggle: null
    }

    handleFullInfoOpen = event => {
        this.setState({
            fullInfoToggle: event.currentTarget
        })
    }

    handleFullInfoClose = () => {
        this.setState({
            fullInfoToggle: null
        })
    }

    handleClickDialogOpen = () => {
        this.setState({
            openAlertDialog: true
        })
    }

    handleClickDialogClose = () => {
        this.setState({
            openAlertDialog: false
        })
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
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { fullInfoToggle } = this.state;
        const { user, users, classes } = this.props;
        const isFullInfoOpen = Boolean(fullInfoToggle);

        return (
            <div className="col-md-6 col-md-offset-3">
                <Typography className={classes.title} variant="h1" color="inherit" noWrap>
                    Hi, {user.Username}!
                </Typography>
                <p></p>
                <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                    You're logged as admin
                </Typography>
                <p></p>
                <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                    List of all registred users: 
                </Typography>
                {users.loading && <em>Loading users...</em>}
                {users.error && "12321321312321321321321323213213213"
                }
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={index} data-id={user.Id} style={{width: '1000px'}}>
                                <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                {user.FirstName + ' ' + user.LastName}
                                <Button variant="contained" color="primary" className={classes.button} style={{margin: '15px'}}>
                                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                        Show full info 
                                    </Typography>
                                </Button>
                                {user.Id === JSON.parse(localStorage.getItem("user")).Id ?
                                    <Button variant="contained" color="secondary" className={classes.button} style={{margin: '15px'}} disabled title="Can't delete you">
                                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                            Delete user 
                                        </Typography>
                                    </Button> :
                                    <Button variant="contained" color="secondary" className={classes.button} style={{margin: '15px'}} >
                                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                            Delete user 
                                        </Typography>
                                    </Button>
                                }                               
                                
                                {fullInfoToggle && 
                                    <ExpansionPanel>                                
                                        Company name: {user.CompanyName}
                                        Email: {user.EMail} <br/>
                                        Phone: {user.Phone} <br/>
                                        Trading role: {this.getUserTradingRole(user)} <br/>
                                        UserRole: {this.getUserRole(user)} <br/>   
                                    </ExpansionPanel>
                                }  
                                </Typography>                                                         
                            </li>
                        )}                       
                    </ul>
                }               
            </div>
        );
    }
}

AdminPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
    };
}

const connectedAdminPage = connect(mapStateToProps)(withStyles(styles) (AdminPage));
export { connectedAdminPage as AdminPage };