import axios from "axios";
export const userInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
  return instance;
};

export const onBoarding = userInstance(
  "https://gaezzange.duckdns.org/api/v1/auth/token"
);
