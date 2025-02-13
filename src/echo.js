import Echo from "laravel-echo";
import Pusher from "pusher-js";
if (!window.Echo) {
  window.pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "627d4e3594ce53596e94",
    cluster: "ap1",
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
