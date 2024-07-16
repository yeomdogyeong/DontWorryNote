import axios from "axios";
export const userApiInstance = axios.create({
  baseURL: "https://gaezzange.duckdns.org/login/oauth2/code/kakaol",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
