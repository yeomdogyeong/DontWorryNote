import axios from "axios";
export const userInstance = (baseURL, ...props) => {
  const instance = axios.create({
    baseURL: "https://gaezzange.duckdns.org",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
  return instance;
};

export const onBoarding = userInstance("/login/oauth2/code/kakaol");
