import axios from "axios";

const django = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

// Alter defaults after instance has been created
django.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") !== null
    ? `token ${localStorage.getItem("token")}`
    : null;

export default django;
