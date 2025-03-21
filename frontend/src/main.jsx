import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./stores/store";
import ScrollToTop from "./components/commons/ScrollToTop";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
