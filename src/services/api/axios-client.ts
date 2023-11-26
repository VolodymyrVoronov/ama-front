import axios from "axios";

const URL = "http://localhost:8080";

const client = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
