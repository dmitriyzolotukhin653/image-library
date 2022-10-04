import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import "antd/dist/antd.css";

import { persistor, store } from "./redux/state";
import App from "./containers/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
