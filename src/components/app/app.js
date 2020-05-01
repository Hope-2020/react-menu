import React from 'react';
import { MainPage, CartPage, ItemPage } from '../pages';
import AppHeader from '../app-header';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Background from './food-bg.jpg';

const AppBlock = styled.div`
    background: url(${Background}) center center/cover no-repeat;
`;

const App = () => (
    <AppBlock>
        <AppHeader />
        <Switch>
            <Route path='/react-menu-app/' exact component={MainPage} />
            <Route path='/react-menu-app/cart/' exact component={CartPage} />
            <Route path='/react-menu-app/menu/:id' component={ItemPage} />
        </Switch>
    </AppBlock>
);

export default App;