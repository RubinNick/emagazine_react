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
    },
    buttonGrid: {
        display: 'flex'
    }
})

class AdminUsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            dialogHeader: null,
            dialogTargetId: null,
            currentOpenExpandId: null,
            disableEdit: true
        }

        this.getUserTradingRole = this.getUserTradingRole.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    handleExpandSelected(id) {
        this.state.currentOpenExpandId === id ?
            this.setState({
                currentOpenExpandId: null,
                disableEdit: true
            }) 
        :
            this.setState({
                currentOpenExpandId: id
            })
            
        this.props.dispatch(userActions.getById(id));
            
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

    handleExpandSelected(id) {
        this.state.currentOpenExpandId === id ?
            this.setState({
                currentOpenExpandId: null,
                disableEdit: true
            }) 
        :
            this.setState({
                currentOpenExpandId: id
            })
            
        
        this.props.dispatch(userActions.getById(id));
    }

    handleModalOpen(id, name){
        this.setState({
            dialogOpen: true,
            dialogHeader: name,
            dialogTargetId: id
        })
    }

    handleModalClose(){
        this.setState({
            dialogOpen: false,
            dialogHeader: null,
            dialogTargetId: null
        })
    }

    handleModalAgree() {
        this.props.dispatch(userActions.delete(this.state.dialogTargetId))
        this.handleModalClose();
    }

    render() {
        const { dialogOpen, dialogHeader, disableEdit, currentOpenExpandId  } = this.state;
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
                {users.error && "Something goes wrong. Try to reload page"
                }
                {users.items &&
                        users.items.map((user, index) => {
                            var isOpenExpand = currentOpenExpandId === user.Id;

                            return (
                                <ExpansionPanel key={index} data-id={user.Id} expanded={isOpenExpand} classes={classes.expansionPanel}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={ () => this.handleExpandSelected(user.Id) }>
                                        <div></div>
                                        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                            {user.Username}
                                                                                                         
                                        </Typography> 
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    { user.userInfo &&
                                        <Grid item xs={12}>
                                        <Typography className={classes.title} variant="h5" color="inherit" noWrap> 
                                            First Name: {user.userInfo.FirstName} <br />     
                                            Last Name : {user.userInfo.LastName} <br />                        
                                            Company name: {user.userInfo.CompanyName} <br/>
                                            Email: {user.userInfo.EMail} <br/>
                                            Phone: {user.userInfo.Phone} <br/>
                                            Trading role: {this.getUserTradingRole(user)} <br/>
                                            UserRole: {this.getUserRole(user)} <br/>   
                                        </Typography>
                                        <Grid item xs={12} alignItems={"flex-end"} justify={"flex-end"} className={classes.buttonGrid}>
                                            {user.Id === JSON.parse(localStorage.getItem("user")).Id ?
                                            <Button variant="contained" color="secondary" className={classes.button} disabled title="Can't delete yourself">
                                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                    Can't delete yourself 
                                                </Typography>
                                            </Button> :
                                            <Button variant="contained" color="secondary" className={classes.button} 
                                                onClick={ () => this.handleDelete(user.Id, user.Username)}>
                                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                    Delete user 
                                                </Typography>
                                            </Button>
                                            }  
                                        </Grid>
                                        </Grid>
                                    }          
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>                                                          
                            )
                        })
                }                                     
            </div>
        );
    }
}

AdminUsersPage.propTypes = {
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

const connectedAdminUsersPage = connect(mapStateToProps)(withStyles(styles) (AdminUsersPage));
export { connectedAdminUsersPage as AdminUsersPage };