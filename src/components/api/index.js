"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export const userInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    function (config) {
      // 토큰을 가져와서
      const token = localStorage.getItem("tokenKey");
      // 요청의 header에 token 넣기
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      const newToken = response.headers["Authorization"];
      console.log("res", response);
      console.log("newToken", newToken);
      if (newToken) {
        localStorage.setItem("tokenKey", newToken);
      }
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        const router = useRouter();
        alert("토큰이 만료되었습니다.");
        router.push("/onboarding");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const onBoarding = userInstance(
  "https://gaezzange.duckdns.org/api/v1/auth/token"
);
