import ax from "axios";

const axios = ax.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default axios;
