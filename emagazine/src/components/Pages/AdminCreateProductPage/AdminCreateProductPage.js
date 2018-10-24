import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../../_helpers'
import PropTypes from 'prop-types';

import { productActions } from '../../../_actions';
import { notificationActions } from '../../../_actions'

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
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%'
    },
    button: {
      marginRight: theme.spacing.unit,
      float: 'right'
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

class AdminCreateProductPage extends React.Component{
    state = {
        product: {
            name: null,
            type: null,
            description: null,
            count: null,
            price: null
        }        
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ product: {...this.state.product, [name]: value }});
    }

    handleCreateRequest = () => {
        const { dispatch } = this.props;
        const { product } = this.state;

        dispatch(productActions.create(product));
    }

    render() {
        const { classes, product } = this.props;

        return(
            <div className={classes.root}>   
                <div className={this.props.classes.container} noValidate autoComplete="off">
                    <TextField
                        id="filled-name-input"
                        label="Product name"
                        className={this.props.classes.textField}
                        type="text"
                        name="name"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        id="filled-type-input"
                        label="Product type"
                        className={this.props.classes.textField}
                        type="text"
                        name="type"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        id="filled-description-input"
                        label="Product description"
                        className={this.props.classes.textField}
                        type="text"
                        name="description"
                        autoComplete="off"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        id="filled-count-input"
                        label="Product count"
                        className={classes.textField}
                        type="number"
                        name="count"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        id="filled-price-input"
                        label="Product price"
                        className={this.props.classes.textField}
                        type="text"
                        name="price"
                        margin="normal"
                        variant="filled"
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <Button variant="contained" color="primary" className={classes.button} onClick={ this.handleCreateRequest } >
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Add product 
                    </Typography>
                </Button> 
                <Button variant="contained" color="secondary" className={classes.button} onClick={ () => (history.push('/adminProducts')) } >
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Back to list of products
                    </Typography>
                </Button>
            </div>
        )
    }
}

AdminCreateProductPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedAdminCreateProductPage = connect(mapStateToProps)(withStyles(styles)(AdminCreateProductPage));
export { connectedAdminCreateProductPage as AdminCreateProductPage }; 