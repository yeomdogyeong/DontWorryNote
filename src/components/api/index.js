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

export const userInterceptorInstance = axios.interceptors.request.use(
  function some(config) {
    //토큰을 가져와서
    const token = localStorage.setItem("tokenKey");
    //요청의 header에 token 넣기
    if (token) {
      config.header["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const onBoarding = userInstance(
  "https://gaezzange.duckdns.org/api/v1/auth/token"
);
