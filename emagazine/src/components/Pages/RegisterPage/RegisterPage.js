import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../../_actions';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { BaseSnackbars } from '../../BaseSnackbars'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%'
    },
    button: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '340px'
      },
  });

class RegisterPage extends React.Component{
    state = {
        activeStep: 0,
        skipped: new Set(),
        role: 3,
        user: {
            email: null,
            confirmEmail: null,
            password: null,
            confirmPassword: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            userName: null
        }        
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ user: {...this.state.user, [name]: value }});
    }

    getSteps(){
        return ['Select your role', 'Fill your personal information'];
    }


    getStepContent(step){
        switch (step) {
            case 0:
                return (
                    <FormControl component="fieldset" >
                                        <FormLabel component="legend">
                                            <Typography variant="h6" color="inherit" noWrap>
                                                Choose your role, please: 
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup  value={this.state.role} onClick={this.handleRoleChange}>
                                            <FormControlLabel style={{fontSize: '500%'}} value={1} control={<Radio />} label={
                                                <Typography variant='h5'>
                                                    Supplier
                                                </Typography>
                                            } />
                                            <FormControlLabel value={2} control={<Radio />} label={
                                                <Typography variant='h5'>
                                                    Seller
                                                </Typography>
                                            } />
                                            <FormControlLabel value={3} control={<Radio />} label={
                                                <Typography variant='h5'>
                                                    Byuer
                                                </Typography>
                                            } />
                                        </RadioGroup>
                                    </FormControl>     
                );
            case 1:
                return(
                    <form className={this.props.classes.container} noValidate autoComplete="off">
                        <TextField
                            id="filled-email-input"
                            label="Email"
                            className={this.props.classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-confirmEmail-input"
                            label="Confirm email"
                            className={this.props.classes.textField}
                            type="email"
                            name="confirmEmail"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            className={this.props.classes.textField}
                            type="password"
                            name="Password"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-matchPassword-input"
                            label="Confirm password"
                            className={this.props.classes.textField}
                            type="password"
                            name="confirmPassword"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-firstName-input"
                            label="First name"
                            className={this.props.classes.textField}
                            type="text"
                            name="firstName"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-lastName-input"
                            label="Last name"
                            className={this.props.classes.textField}
                            type="text"
                            name="lastName"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-phoneNumber-input"
                            label="Phone number"
                            className={this.props.classes.textField}
                            type="tel"
                            autoComplete="tel"
                            name="phoneNumber"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            id="filled-username-input"
                            label="Username"
                            className={this.props.classes.textField}
                            type="username"
                            name="userName"
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                            required
                        />
                    </form>
                );
            default:
                return 'Unknown step'
        }
    }

    //mark step as optional with skip btn
    isStepOptional = step => {
        return step === 2
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        if(this.isStepSkipped(activeStep)){
            skipped = new Set(skipped.values());
        }

        this.setState({
            activeStep: activeStep + 1,
            skipped 
        })
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }))
    }

    handleSkip = () => {
        const { activeStep } = this.state;

        if(!this.isStepOptional(activeStep)){
            throw new Error(" Can't skip non-optional step");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());

            skipped.add(activeStep)
            return {
                activeStep: state.activeStep + 1,
                skipped
            }
        })
    }

    handleReset = () => {
        this.setState({
            activeStep: 0
        })
    }

    handleRegister = () => {
        const { dispatch } = this.props;
        const { user } = this.state;

        if(user.email !== user.confirmEmail){
            <BaseSnackbars isOpen={true} snackbarVariant={'error'} snackbarMessage={'Emails does not match!'}/>
        }else if(user.password !== user.confirmPassword){
            return new Error("Passwords doesn't match");
        }else{
            dispatch(userActions.register(user))
        }
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleRoleChange = event => {
        console.log(this.state);
        this.setState({
            role: parseInt(event.target.value)
        });
        console.log(this.state);
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return(
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const props = {};
                    const labelProps = {};
                    if (this.isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (this.isStepSkipped(index)) {
                        props.completed = false;
                    }
                    return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>
                                <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                    { label }
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                <div>
                        <div>
                            <Typography className={classes.instructions} variant='h6'>{this.getStepContent(activeStep)}</Typography>
                            <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            {this.isStepOptional(activeStep) && (
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSkip}
                                className={classes.button}
                                >
                                Skip
                                </Button>
                            )}
                            {
                                activeStep === steps.length - 1 ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleRegister}
                                        className={classes.button}
                                    >
                                        Finish
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button> 
                            }
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
}

const connectedRegisterPage = connect(mapStateToProps)(withStyles(styles)(RegisterPage));
export { connectedRegisterPage as RegisterPage }; 