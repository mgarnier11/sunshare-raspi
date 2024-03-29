import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ErrorComponent from './components/ErrorHandler';

import './assets/css/index.css';
import App from './components/App';
import store from './redux/store';
import { loadModules } from './redux/actions/board-actions';

import * as serviceWorker from './serviceWorker';

store.dispatch(loadModules());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ErrorComponent />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
