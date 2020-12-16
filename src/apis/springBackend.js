import axios from "axios";

const spring = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Alter defaults after instance has been created
spring.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") !== null
    ? `Bearer ${localStorage.getItem("token")}`
    : null;

export default spring;
