import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary fallback={<h1>포괄적인 에러바운더리....</h1>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
