import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "store/store";

import { AppProviders } from "providers/AppProviders";

import { App } from "./App";

import "../public/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProviders>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProviders>
  </BrowserRouter>
);
