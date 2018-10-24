import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../_helpers';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { productActions } from '../../../_actions';

import { DeleteDialog } from '../../DeleteDialog'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
    typographyPrice: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block'
        },
        textAlign: 'right'
    },
    ul: {
        listStyleType: 'none',
        outside: 'none',
        alignText: 'center'
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    expansionPanel:{
        flexDirection: 'column'
    },
    input: {
        fontSize: 'medium',
        marginLeft: '20px'
    },
    buttonGrid: {
        display: 'flex'
    }
    
})

class AdminProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            dialogHeader: null,
            dialogTargetId: null,
            expandCurrent: false,
            disableEdit: true,
            editProductState: {
                id: null,
                name: null,
                type: null,
                description: null,
                count: null,
                price: null
            }
        }

        this.handleModalAgree = this.handleModalAgree.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }

    handleExpandSelected(event, id) {
        this.props.dispatch(productActions.getById(id));
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
        this.props.dispatch(productActions.delete(this.state.dialogTargetId))
        this.handleModalClose();
    }

    handleEdit(productId) {
        this.setState({
            disableEdit: false,
            editProductState: {
                id: productId
            }
        })
    }

    render() {
        const { user, products, classes } = this.props;
        const { dialogOpen, dialogHeader, disableEdit  } = this.state;

        return (
            <Grid className={classes.root}>
                <DeleteDialog isOpen={ dialogOpen } dialogHeader = { dialogHeader } onDisagree={ this.handleModalClose } onAgree ={ this.handleModalAgree }/>
                <Typography className={classes.title} variant="h1" color="inherit" noWrap>
                    Hi, {user.Username}!
                </Typography>
                <p></p>
                <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                    You're logged as admin
                </Typography>
                <p></p>
                <Typography className={classes.title} variant="h3" color="inherit" noWrap>
                    List of all products: 
                </Typography>
                <p></p>
                {products.loading && <em> Loading products... </em>}
                {products.error && 
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Some error ocured due to: {products.error}
                    </Typography>
                }
                {products.items &&
                    <ul className={classes.ul}>
                        {products.items.map((product, index) =>
                            <li key={index} data-id={product.Id} >
                                <ExpansionPanel classes={classes.expansionPanel} onClick={ (event) => this.handleExpandSelected(event, product.Id)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                                            {product.Name}<br />
                                            Only {product.Price} $ per count!<br />                                                               
                                        </Typography> 
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography className={classes.title} variant="h5" color="inherit">
                                                    Product type: 
                                                </Typography>
                                            </Grid> 
                                            <Grid item xs={6}>
                                                <Input className={classes.input} value={ product.Type } disabled={ disableEdit } /><br />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className={classes.title} variant="h5" color="inherit">      
                                                    We have:  
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input className={classes.input} value={ product.Count } disabled={ disableEdit } /><br />   
                                            </Grid> 
                                            <Grid item xs={6}>
                                                <Typography className={classes.title} variant="h5" color="inherit">                     
                                                    Additional info: 
                                                </Typography>
                                            </Grid> 
                                            <Grid item xs={6}>
                                                <Input className={classes.input} value={ product.Description } disabled={ disableEdit } /><br />    
                                            </Grid>                                   
                                        </Grid>
                                        {
                                            disableEdit ?
                                            <Grid item xs={12} alignItems={"flex-end"} justify={"flex-end"} className={classes.buttonGrid}>
                                                <Button variant="contained" color="default" className={classes.button} title='edit product'
                                                    onClick={() => this.handleEdit(product.Id) }>
                                                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                        Edit product 
                                                    </Typography>
                                                </Button> 
                                                <Button data-id={product.Id} variant="contained" color="secondary" className={classes.button} onClick={() => 
                                                    this.handleModalOpen(product.Id, product.Name)}>
                                                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                        Delete product 
                                                    </Typography>
                                                </Button> 
                                            </Grid> 
                                            :
                                            <Grid item xs={12} alignItems={"flex-end"} justify={"flex-end"} className={classes.buttonGrid}>
                                                <Button variant="contained" color="default" className={classes.button} title='edit product'>
                                                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                        Save changes 
                                                    </Typography>
                                                </Button> 
                                                <Button data-id={product.Id} variant="contained" color="secondary" className={classes.button} onClick={() => 
                                                    this.handleModalOpen(product.Id, product.Name)}>
                                                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                                        Cancel 
                                                    </Typography>
                                                </Button> 
                                            </Grid> 
                                        }
                                                
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>                                                          
                            </li>
                        )}                       
                    </ul>
                }  
                <Button variant="fab" color="secondary" className={classes.button} title='add product' onClick={ () => (history.push('/createProduct'))} >
                    <AddIcon />
                </Button>             
            </Grid>
        );
    }
}

AdminProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    const { products, authentication } = state;
    const { user } = authentication;
    return {
        user,
        products
    };
}

const connectedAdminProductsPage = connect(mapStateToProps)(withStyles(styles) (AdminProductsPage));
export { connectedAdminProductsPage as AdminProductsPage };