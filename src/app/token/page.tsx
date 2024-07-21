"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { onBoarding } from "../../apis/index";
import base64 from "base-64";
import { HOME_PATH } from "@/store/path";
function page() {
  const params = useSearchParams();
  const tokenKey = params.get("tokenKey");
  const userToken = localStorage.getItem("tokenKey");
  const router = useRouter();

  const handleTokenParsing = () => {
    let payload = userToken?.substring(
      userToken.indexOf(".") + 1,
      userToken.lastIndexOf(".")
    );
    console.log("payload", payload);
    if (payload) {
      let dec = base64.decode(payload);
      const parseDec = JSON.parse(dec);
      if (parseDec.hasOwnProperty("userId")) {
        router.push(HOME_PATH);
      } else {
        router.push("/survey");
      }
    }
  };

  useEffect(() => {
    console.log("tokenKey", tokenKey);
    const fetchData = async () => {
      try {
        const response = await onBoarding({
          params: { tokenKey: tokenKey },
        });

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (tokenKey) {
      fetchData();
      handleTokenParsing();
    }
  }, [tokenKey]);
  return <div>ddd</div>;
}

export default page;
