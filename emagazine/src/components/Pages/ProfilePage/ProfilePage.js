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

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.getUserTradingRole = this.getUserTradingRole.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    handleDeleteDialogOpen = () => {
    }

    handleDeleteDialogClose = () => {
    }

    handleDelete = (id) => {

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
        this.props.dispatch(userActions.getById(id));
    }

    render() {
        //const { fullInfoToggle } = this.state;
        const { user, users, classes } = this.props;

        return (
            <div className={classes.root}>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedProfilePage = connect(mapStateToProps)(withStyles(styles) (ProfilePage));
export { connectedProfilePage as ProfilePage };