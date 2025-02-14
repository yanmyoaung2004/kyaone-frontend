import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { store, persistor } from "./redux/store";
import App from "./App";
import axios from "axios";
import "./echo";

axios.defaults.baseURL = "http://192.168.0.52:8000";
// axios.defaults.baseURL = "http://127.0.0.1:8000";

createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
