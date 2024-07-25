"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { onBoarding } from "../../apis/index";
import base64 from "base-64";
import { HOME_PATH } from "@/store/path";
import useMyStore from "@/store/useMyStore";
import { useShallow } from "zustand/react/shallow";
import { getUserMyInfo } from "@/apis/user/user";
function TokenPage() {
  const params = useParams();
  const tokenKey = params.tokenKey;
  const router = useRouter();

  const { setInitializeState } = useMyStore(
    useShallow((state) => ({
      setInitializeState: state.setInitializeState,
    }))
  );

  const handleTokenParsing = async () => {
    const userToken = localStorage.getItem("tokenKey");

    let payload = userToken?.substring(
      userToken.indexOf(".") + 1,
      userToken.lastIndexOf(".")
    );

    if (payload) {
      let dec = base64.decode(payload);

      const parseDec = JSON.parse(dec);
      if (parseDec.hasOwnProperty("userId")) {
        const { data } = await getUserMyInfo();
        setInitializeState({
          ...data.data,
        });

        router.push(HOME_PATH);
      } else {
        router.push("/survey");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await onBoarding({
          params: { tokenKey: tokenKey },
        });

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }

      handleTokenParsing();
    };

    fetchData();
  }, [tokenKey]);
  return <div></div>;
}

export default TokenPage;
