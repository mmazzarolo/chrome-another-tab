import React from "react";
import ReactDOM from "react-dom";
import { StoreContext } from "redux-react-hook";
import { App } from "./components/App";
import { GlobalStyle } from "./components/GlobalStyle";
import { createReduxStore } from "./utils/createReduxStore";

const store = createReduxStore();

ReactDOM.render(
  <>
    <GlobalStyle />
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </>,
  document.getElementById("root")
);
