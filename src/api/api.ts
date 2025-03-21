import axios from "axios";

const ApiRawg = axios.create({
  baseURL: "https://api.rawg.io/api/games",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_RAWG_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default ApiRawg;
