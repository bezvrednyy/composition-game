import React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {rootReducer} from "./redux/reducers/rootReducer";
import './index.css';

// const store = createStore(rootReducer, compose(
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

const store = createStore(rootReducer);

const app: JSX.Element = (
  <Provider store={store}>
    <App />
  </Provider>
);
render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
