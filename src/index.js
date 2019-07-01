import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer/index";

import App from "./components/App";

const STORE = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById("root")
);
