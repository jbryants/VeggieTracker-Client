import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3090",
});

// const response = await nodejs.post("/signup", formProps);
// const response = await nodejs.post("/signin", formProps);
