import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../../_actions';

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

class WelcomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render() {
        const { classes, user } = this.props;       
        return (
            <div className="col-md-6 col-md-offset-3">
                <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                    Hi  
                    {user ?
                        ", " + user.Username :
                        ", Unknown user"
                    }
                    !
                </Typography>
                <p>Welcome to our shop</p>
            </div>
        );
    }
}

WelcomePage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedWelcomePage = connect(mapStateToProps)(withStyles(styles) (WelcomePage));
export { connectedWelcomePage as WelcomePage };