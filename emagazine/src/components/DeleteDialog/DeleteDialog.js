import React from 'react';
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

class DeleteDialog extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            open: this.props.isOpen,
            dialogHeader: this.props.dialogHeader,
            onDisagree: this.props.onDisagree,
            onAgree: this.props.onAgree
        }
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            open: newProps.isOpen,
            dialogHeader: newProps.dialogHeader,
            onDisagree: newProps.onDisagree,
            onAgree: newProps.onAgree
        })
    }

    render() {
        const { classes } = this.props;
        const { open, dialogHeader, onDisagree, onAgree } = this.state;
        return(
            <div>
                <Dialog
                    open={ open }
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={onDisagree}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"> 
                        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                            Are you sure want to delete { dialogHeader } ?
                        </Typography>                      
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                This action can not be undone.
                            </Typography>   
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" variant="contained" className={classes.button} onClick={onDisagree}>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Cancel
                            </Typography>
                        </Button>
                        <Button size="large" variant="contained" className={classes.button} color="secondary" onClick={onAgree}>
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

DeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
}

const connectedDeleteDialog = connect(mapStateToProps)(withStyles(styles) (DeleteDialog));
export { connectedDeleteDialog as DeleteDialog };