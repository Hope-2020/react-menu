import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './Redux/store';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Router>
        </ErrorBoundry>
    </Provider>, 
    document.getElementById('root')
);