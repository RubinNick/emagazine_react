import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../../../_helpers';

import { productActions } from '../../../_actions';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    gridTileContent: {
        width: '25%'
    }
  });

class HomePage extends React.Component{


    componentDidMount() {
        this.props.dispatch(productActions.getAll())
    }

    handleOpenProductPage(id){
        history.push('/product/' + id)
    }

    render(){
        const { classes, products } = this.props;
        const imageFromBase64 = 'data:image/jpeg;base64,';

        return(
            <div className={classes.root}>
                <GridList cellHeight={180} >
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">
                            <Typography align='center'>
                                Availible products
                            </Typography>
                        </ListSubheader>
                    </GridListTile>
                    {
                        products.loading &&
                        <Typography>
                            Loading products...
                        </Typography>
                    }
                    {products.items &&
                        products.items.map(product => (
                        <GridListTile key={product.Id} style={{width: '25%'}}>
                            <img src={imageFromBase64 + product.Image} />
                            <GridListTileBar
                            onClick={() => this.handleOpenProductPage(product.Id)}
                            title={product.Name}
                            actionIcon={
                                <IconButton className={classes.icon}>
                                <AddCircle/>
                                </IconButton>
                            }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { products } = state;
    return {
        products
    };
}

const connectedHomePage = connect(mapStateToProps)(withStyles(styles)(HomePage));
export { connectedHomePage as HomePage }; 
  