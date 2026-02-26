import axios from "axios";

// use VITE_API_URL if provided (points to deployed server); otherwise default to localhost
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default axios.create({
  baseURL,
});
