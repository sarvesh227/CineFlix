import axios from "axios";

const omdb = axios.create({
  baseURL: "https://www.omdbapi.com/",
  params: {
    apikey: "42f6a69e",
  },
});

export default omdb;
