import 'src/mock';
import React from 'react';
import ReactDOM from 'react-dom';
import { enableES5 } from 'immer';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';


enableES5();

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);
