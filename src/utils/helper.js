import axios from "axios";

const axiosCat = axios.create({
  baseURL:"",
  withCredentials: true,
});

export default axiosCat;
