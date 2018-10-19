import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../../_actions';

import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },
    ul: {
        listStyleType: 'none'
    },
    button: {
        float: 'right'
    },
    expansionPanel:{
    }
})

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.getUserTradingRole = this.getUserTradingRole.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    handleDeleteDialogOpen = () => {
    }

    handleDeleteDialogClose = () => {
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
        //const { fullInfoToggle } = this.state;
        const { user, users, classes } = this.props;

        return (
            <div className={classes.root}>
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
                <p></p>
                {users.loading && <em>Loading users...</em>}
                {users.error && "12321321312321321321321323213213213"
                }
                {users.items &&
                    <ul className={classes.ul}>
                        {users.items.map((user, index) =>
                            <li key={index} data-id={user.Id} style={{width: '1000px'}}>
                                <ExpansionPanel classes={classes.expansionPanel}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div></div>
                                        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                            {user.FirstName + ' ' + user.LastName}
                                                                                                         
                                        </Typography> 
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div>
                                        <Typography className={classes.title} variant="h5" color="inherit" noWrap>                                
                                            Company name: {user.CompanyName} <br/>
                                            Email: {user.EMail} <br/>
                                            Phone: {user.Phone} <br/>
                                            Trading role: {this.getUserTradingRole(user)} <br/>
                                            UserRole: {this.getUserRole(user)} <br/>   
                                        </Typography>
                                        </div>
                                        <div class="col-md-6 col-md-offset-3">
                                            {user.Id === JSON.parse(localStorage.getItem("user")).Id ?
                                            <Button variant="contained" color="secondary" className={classes.button} disabled title="Can't delete yourself">
                                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                    Can't delete yourself 
                                                </Typography>
                                            </Button> :
                                            <Button variant="contained" color="secondary" className={classes.button} >
                                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                    Delete user 
                                                </Typography>
                                            </Button>
                                            }  
                                        </div>            
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>                                                          
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