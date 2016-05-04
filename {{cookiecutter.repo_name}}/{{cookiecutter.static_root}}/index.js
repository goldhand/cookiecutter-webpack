import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import routes from './routes';
import DevTools from './containers/DevTools';
import configureStore from './store/configureStore';


const store = configureStore();

// handle client side rendering
if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory} routes={routes} />
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('main')
  );
}
