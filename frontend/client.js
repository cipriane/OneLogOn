import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Root from 'common/Root';
import rootReducer from 'reducers';
import 'bootstrap/dist/css/bootstrap.css';

const persistedState = { jwt: localStorage.getItem('jwt') || null };
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('jwt', store.getState().jwt);
});

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app'),
);
