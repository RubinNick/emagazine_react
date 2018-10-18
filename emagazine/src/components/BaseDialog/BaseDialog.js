import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class BaseDialog extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        open: this.props.isOpen
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"> 
                        <Typography className={classes.title} variant="h2" color="inherit" noWrap>
                            {this.props.dialogHeader}
                        </Typography>                      
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                {this.props.dialogContent}
                            </Typography>   
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" variant="contained" className={classes.button} onClick={this.handleClose}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Cancel
                            </Typography>
                        </Button>
                        <Button size="large" variant="contained" className={classes.button} color="secondary" onClick={this.handleClose}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Agree
                            </Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }  
}

BaseDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
}

const connectedBaseDialog = connect(mapStateToProps)(withStyles(styles) (BaseDialog));
export { connectedBaseDialog as BaseDialog };