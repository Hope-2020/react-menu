import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from "../private-route/private-route";
import { MainPage, CartPage, ItemPage, AuthPage } from '../pages';
import AppHeader from '../app-header';
import AppFooter from '../app-footer/app-footer';
import UserTable from '../user-table/user-table';
import { checkUserIsLogin } from '../../Redux/actions/auth';

import Background from './food-bg.jpg';

const AppBackground = styled.main`
    background: url(${Background}) center center/cover no-repeat;
`;

const App = ({ checkUserIsLogin }) => {
    useEffect(() => {
        checkUserIsLogin();
    
    }, [checkUserIsLogin]);

    return (
        <AppBackground>
            <AppHeader />
            <Switch>
                <Route path='/react-menu-app/' exact component={MainPage} />
                <Route path='/react-menu-app/cart/' exact component={CartPage} />
                <Route path='/react-menu-app/menu/:id' component={ItemPage} />
                <Route path='/react-menu-app/authorization/' exact component={AuthPage} />
                <PrivateRoute exact path='/react-menu-app/dashboard/' component={UserTable} />
            </Switch>
            <AppFooter />
        </AppBackground>
    );
};

const mapDispatchToProps = {
    checkUserIsLogin
};

App.propTypes = {
    checkUserIsLogin: PropTypes.func.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(App);