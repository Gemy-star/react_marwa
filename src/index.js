import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter } from 'react-router-dom';

// optional cofiguration
const options = {

    timeout: 2000,
    offset: '30px',
    transition: 'scale'
}
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
          <App />
          </AlertProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
