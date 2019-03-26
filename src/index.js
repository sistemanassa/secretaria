import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { urls } from './utils/urlUtils';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route path={urls.home.path} component={App} />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
