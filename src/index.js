import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './redux.store';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Provider>
    </CookiesProvider>, document.getElementById('root'));