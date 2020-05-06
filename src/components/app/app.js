import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from "components/Private-route";
import { 
    MainPage, 
    CartPage, 
    MenuItemPage,
    AuthPage,
    UserDashboardPage
} from 'Pages';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { checkUserIsLogin } from 'Redux/actions/auth';

import Background from './food-bg.jpg';

const AppBackground = styled.div`
    background: url(${Background}) center center/cover no-repeat;
`;

const App = ({ checkUserIsLogin }) => {
    useEffect(() => {
        checkUserIsLogin();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppBackground>
            <Header />
            <Switch>
                <Route path='/react-menu-app/' exact component={MainPage} />
                <Route path='/react-menu-app/cart/' exact component={CartPage} />
                <Route path='/react-menu-app/menu/:id' component={MenuItemPage} />
                <Route path='/react-menu-app/authorization/' exact component={AuthPage} />
                <PrivateRoute exact path='/react-menu-app/dashboard/' component={UserDashboardPage} />
            </Switch>
            <Footer />
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