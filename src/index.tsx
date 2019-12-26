import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { App } from "./components/App";
import { GlobalStyle } from "./components/GlobalStyle";
import { createReduxStore } from "./utils/createReduxStore";

const store = createReduxStore();

ReactDOM.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
