import Echo from "laravel-echo";
import Pusher from "pusher-js";
if (!window.Echo) {
  window.pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const userID = window.userID;
  window.Echo.channel("public-updates").listen(
    "public.notification",
    (response) => {
      console.log("Event received:", response);
    }
  );
});
