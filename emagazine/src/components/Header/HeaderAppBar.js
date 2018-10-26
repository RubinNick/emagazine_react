import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { userActions } from '../../_actions';
import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class HeaderAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    navMenuAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleNavMenuOpen = event => {
    this.setState({ navMenuAnchorEl: event.currentTarget });
  };

  handleNavMenuClose = () => {
    this.setState({ navMenuAnchorEl: null });
  };

  handleLoggingIn = () => {
    if(localStorage.getItem("user") === null){
      return(
        <div>
          <MenuItem onClick={() => history.push("/register")}> Register </MenuItem>
          <MenuItem onClick={() => history.push("/login")}> Login </MenuItem>
        </div>
      );
    }else{
      return(
        <div>
          <MenuItem onClick={() => history.push('/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            My account
          </MenuItem>
          <MenuItem onClick={ () => {history.push("/"); this.props.dispatch(userActions.logout())} }> Logout </MenuItem>
        </div>);
    }
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, navMenuAnchorEl } = this.state;
    const { classes, user } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isNavMenuOpen = Boolean(navMenuAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        { this.handleLoggingIn() }
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Shopping cart</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const renderNavMenu = (
      <Menu
        anchorEl={navMenuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isNavMenuOpen}
        onClose={this.handleNavMenuClose}
      >
        <MenuItem onClick={ () => (history.push('/home')) }>Home</MenuItem>
        <MenuItem onClick={ () => (history.push('/shoppingCart')) }>Shopping Cart</MenuItem>
        {
          user && user.UserRole === "1" &&
          <div>
            <MenuItem onClick={ () => (history.push('/adminUsers')) }>Edit users</MenuItem>
            <MenuItem onClick={ () => (history.push('/adminProducts')) }>Edit products</MenuItem>
          </div>
        }   
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.handleNavMenuOpen}>
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
              <Typography className={classes.title} variant="h3" color="inherit" noWrap onClick={ () => (history.push('/')) }>
                E-magazine
              </Typography>
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                {//need to pass here count of mails (wrap it to show count)               
                 //<Badge className={classes.margin} badgeContent={0} color="secondary">
                }
                  <ShoppingCart /> 
                {//</Badge>
                }
              </IconButton>
              <IconButton color="inherit">
                {// need to pass here count of notifications (wrap it to show count)
                 //<Badge className={classes.margin} badgeContent={0} color="secondary">
                }
                  <NotificationsIcon />
                {//</Badge>
                }
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {renderNavMenu}
      </div>
    );
  }
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user,
  };
}

const connectedHeaderAppBar = connect(mapStateToProps)(withStyles(styles)(HeaderAppBar));
export { connectedHeaderAppBar as HeaderAppBar }; 