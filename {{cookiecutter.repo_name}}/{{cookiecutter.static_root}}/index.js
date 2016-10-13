import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import routes from './routes';
import configureStore from './store/configureStore';


const
  STORE = configureStore(),
  ROOT_ELEMENT = 'main';

let ProjectElement;

if (process.env.NODE_ENV !== 'production') {

  // development
  const DevTools = window.devToolsExtension
    ? () => null
    : require('./containers/DevTools').default;

  ProjectElement = (
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  );

} else {

  // production
  ProjectElement = <Router history={browserHistory} routes={routes} />;

}

// handle client side rendering
if (typeof document !== 'undefined') {

  ReactDOM.render(
    <Provider store={STORE}>
      {ProjectElement}
    </Provider>,
    document.getElementById(ROOT_ELEMENT)
  );
}
