import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './components/App';
import CounterApp from './containers/CounterApp';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterApp} />
    <Redirect from="*" to="/" />
  </Route>
);
