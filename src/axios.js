import axios from "axios";
// https://basic-sm.onrender.com/api/v1/
axios.defaults.baseURL = "https://basic-sm.onrender.com/api/v1/";

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }
  return req;
});
