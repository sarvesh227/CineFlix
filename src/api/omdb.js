import axios from "axios";

const omdb = axios.create({
  baseURL: import.meta.env.VITE_OMDB_API_URL,
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
});

export default omdb;
