import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>, document.getElementById('root'));

serviceWorker.unregister();
