import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { productActions } from '../../../_actions';
import { notificationActions } from '../../../_actions'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: theme.spacing.unit
    },
    paperAdditionalMargin: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: '50px'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    typography: {
        marginTop: theme.spacing.unit * 4
    },
    button: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    },
    iconButton: {
        marginTop: '20px'
    }
  });
  

class ProductPage extends React.Component{
    constructor(props){
        super(props)

        this.state={
            count: 1
        }

        this.handleCountDecrement = this.handleCountDecrement.bind(this)
        this.handleCountIncrement = this.handleCountIncrement.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(productActions.getById(this.props.id));
    }

    showCountError(){
        this.props.dispatch(notificationActions.error(true, "Invalid count =("))
    }

    handleCountChange(event, count){
        event.target.value > count || event.target.value < 1 ?
        this.showCountError()
        :
        this.setState({
            count: parseInt(event.target.value)
        })
    }
    
    handleCountIncrement(count){
        this.state.count + 1 > count || this.state.count + 1 < 1 ?
        this.showCountError()
        :
        this.setState({
            count: this.state.count + 1
        })
    }

    handleCountDecrement(count){
        this.state.count - 1 > count || this.state.count - 1 < 1 ?
        this.showCountError()
        :
        this.setState({
            count: this.state.count - 1
        })
    }

    handleAddToCart(id, count, price){
        
    }

    render(){
        const { classes, products } = this.props;
        const product = products.items;
        const { count } = this.state
        const imageFromBase64 = 'data:image/jpeg;base64,';

        return(
            <div className={classes.root}>
                {products.items &&
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                    <Typography variant='h2'>
                                        {products.items.Name}
                                    </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>                            
                                    <Paper className={classes.paper}>
                                        <img src={imageFromBase64 + product.Image} style={{maxWidth: '50%'}}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{width: '50%', height: '200px'}}>
                                    <Paper className={classes.paper}>
                                        <Typography variant='h4'>
                                            We have: {product.Count}
                                        </Typography>
                                        <Typography variant='h4'>
                                            Price per once: {product.Price} $
                                        </Typography>
                                        <Typography variant='h4'>
                                            You wanna: <br/>
                                            <Remove className={classes.button} onClick={(event) => this.handleCountDecrement(product.Count)}/>
                                            <TextField
                                                className={classes.textField}
                                                variant='filled'
                                                type='number'
                                                defaultValue={count}
                                                value={count}
                                                onChange={(event) => this.handleCountChange(event, product.Count)}
                                            />
                                            <Add className={classes.button} onClick={() => this.handleCountIncrement(product.Count)}/>
                                            <Typography variant='h4' className={classes.Typography}>
                                                Total count: {products.items.Price * count} $
                                            </Typography>
                                        </Typography>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            Buy now
                                        </Button>
                                        <Button variant='contained' color="secondary" className={classes.button} onClick={
                                            () => this.handleAddToCart(product.Id, count, product.Price)
                                        }>
                                            Add to cart
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}> 
                                    <Paper className={classes.paperAdditionalMargin}>
                                        <Typography variant='h5'>
                                            Special for you:
                                        </Typography> 
                                    </Paper>                        
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paperAdditionalMargin}>
                                        <Typography variant='h5'>
                                            More info: <br/>
                                        </Typography>
                                        <Typography variant='h6'>
                                            {products.items.Description}
                                        </Typography> 
                                    </Paper>                        
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paperAdditionalMargin}>
                                        <Typography variant='h5'>
                                            Few feedbacks: 
                                        </Typography> 
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Paper className={classes.paperAdditionalMargin}>
                                        <Typography variant='h5'>
                                            Contact us 
                                        </Typography> 
                                    </Paper>
                                </Grid>  
                            </Grid>
                        }
                </div>
        )
    }
}

ProductPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { products } = state;
    return {
        products
    };
}

const connectedProductPage = connect(mapStateToProps)(withStyles(styles)(ProductPage));
export { connectedProductPage as ProductPage }; 
  