import axios from "axios";

const fetchClient = () => {
  let spring = axios.create({
    baseURL: "http://localhost:8080/api/v1",
  });

  // Set the AUTH token for any request
  spring.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  return spring;
};

export default fetchClient();
