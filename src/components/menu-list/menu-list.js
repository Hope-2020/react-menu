import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, addToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        const { RestoService, menuLoaded, menuRequested, menuError } = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(result => menuLoaded(result))
            .catch(error => menuError());
    }
    

    render() {
        const { menuItems, isLoading, isError, addToCart } = this.props;

        if (isError) {
            return <Error />
        }

        if (isLoading) {
            return <Spinner />
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

export default WithRestoService()(connect(
    mapStateToProps, 
    { menuLoaded, menuRequested, menuError, addToCart }
)(MenuList));