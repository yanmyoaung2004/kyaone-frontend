import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const storedToken = localStorage.getItem("token");
const token = storedToken
  ? storedToken.startsWith('"')
    ? JSON.parse(storedToken)
    : storedToken
  : null;

const echo = new Echo({
  broadcaster: "pusher",
  key: "1320b6c967e0876bca0f",
  cluster: "ap1",
  // forceTLS: true,
  encrypted: true,
  // authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  // authEndpoint: "http://192.168.99.21:8000/broadcasting/auth",
  // authEndpoint: "http://192.168.43.75:8000/broadcasting/auth",
  authEndpoint: "http://192.168.1.38:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;
