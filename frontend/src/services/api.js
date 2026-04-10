import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export function sendMessage(payload) {
  return api.post("/chat", payload);
}

export function getProgress() {
  return api.get("/progress");
}

export default api;

