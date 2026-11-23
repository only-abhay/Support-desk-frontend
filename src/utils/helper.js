import axios from "axios";

const axiosCat = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosCat;
