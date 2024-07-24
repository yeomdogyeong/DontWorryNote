"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export const userInstance = (baseURL, headers) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    function (config) {
      // 토큰을 가져와서
      const token = localStorage.getItem("tokenKey");
      // 요청의 header에 token 넣기
      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const newToken = response.headers["authorization"];

      // console.log("res", response);
      // console.log("res.headers", response.headers);
      // console.log("newToken", newToken);
      if (newToken) {
        localStorage.setItem("tokenKey", newToken.split("Bearer ")[1]);
      }
      return response;
    },
    function (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        // const router = useRouter();
        alert("토큰이 만료되었습니다.");
        localStorage.removeItem("tokenKey");
        window.location.href = "/onboarding";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const onBoarding = userInstance(
  "https://gaezzange.duckdns.org/api/v1/auth/token"
);

export const Axios = userInstance("https://gaezzange.duckdns.org/api");
export const FileRequest = userInstance("https://gaezzange.duckdns.org/api", {
  "Content-Type": "multipart/form-data",
});
