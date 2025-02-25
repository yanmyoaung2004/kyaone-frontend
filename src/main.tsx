import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { store, persistor } from "./redux/store";
import App from "./App";
import axios from "axios";
import "./echo";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
