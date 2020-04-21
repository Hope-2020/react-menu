import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, requested, hasError, addToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import PropTypes from 'prop-types';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        const { RestoService, menuItems, menuLoaded, requested, hasError } = this.props;

        if (!menuItems.length) {
            requested();
      
            RestoService.getMenuItems()
              .then(result => menuLoaded(result))
              .catch(error => hasError());
        }
    }
    

    render() {
        const { menuItems, isLoading, isError, addToCart } = this.props;

        if (isError) {
            return (
                <div className="item__page">
                  <Error />
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="item__page">
                  <Spinner />
                </div>
            );
        }

        return (
            <ul className="menu__list">
                {menuItems.map(menuItem => {
                    return <MenuListItem 
                                key={menuItem.id} 
                                menuItem={menuItem} 
                                onAddToCart={() => addToCart(menuItem.id)} />
                })}
            </ul>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        isLoading: state.isLoading,
        isError: state.isError
    };
};

const mapDispatchToProps = {
    menuLoaded, 
    requested, 
    hasError, 
    addToCart 
};

MenuList.propTypes = {
    RestoService: PropTypes.object.isRequired,
    menuItems: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    menuLoaded: PropTypes.func.isRequired,
    requested: PropTypes.func.isRequired,
    hasError: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
};

export default WithRestoService()(connect(
    mapStateToProps, 
    mapDispatchToProps
)(MenuList));