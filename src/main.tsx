import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { store, persistor } from "./redux/store";
import App from "./App";
import axios from "axios";
import "./echo";

axios.defaults.baseURL = "https://modern-opossum-singular.ngrok-free.app";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";

createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
