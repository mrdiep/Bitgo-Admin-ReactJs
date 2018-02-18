import React from "react";
import { render } from "react-dom";
import App from "./App/App.js";
import "adslot-ui/dist/adslot-ui-main.css";

import { Provider } from "react-redux";

import configureStore from "./configureStore";

const store = configureStore();

const StartUp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<StartUp />, document.getElementById("root"));
