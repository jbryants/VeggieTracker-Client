import axios from "axios";

const fetchClient = () => {
  let spring = axios.create({
    baseURL: "http://veggietracker-env.eba-jpegpwk2.ap-south-1.elasticbeanstalk.com/api/v1",
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
