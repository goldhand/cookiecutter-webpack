import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import App from './components/app';


// handle client side rendering
if (typeof document !== 'undefined') {
  ReactDOM.render(
    <App />,
    document.getElementById('main')
  );
}