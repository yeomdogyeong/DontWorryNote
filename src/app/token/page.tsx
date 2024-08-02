"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { onBoarding } from "../../apis/index";
import base64 from "base-64";
import { HOME_PATH } from "@/store/path";
import useMyStore from "@/store/useMyStore";
import { useShallow } from "zustand/react/shallow";
import { getUserMyInfo } from "@/apis/user/user";
function TokenPage() {
  const params = useSearchParams();
  const tokenKey = params.get("tokenKey");
  const router = useRouter();
  const { isSignedIn, setIsSignedIn } = useMyStore();

  const { setInitializeState } = useMyStore(
    useShallow((state) => ({
      setInitializeState: state.setInitializeState,
    }))
  );

  const handleTokenParsing = async () => {
    console.log("1", isSignedIn);
    const userToken = localStorage.getItem("tokenKey");

    let payload = userToken?.substring(
      userToken.indexOf(".") + 1,
      userToken.lastIndexOf(".")
    );

    if (payload) {
      let dec = base64.decode(payload);

      const parseDec = JSON.parse(dec);
      console.log(parseDec);
      if (parseDec.hasOwnProperty("userId")) {
        const { data } = await getUserMyInfo();
        setInitializeState({
          ...data.data,
        });

        router.push(HOME_PATH);
        setIsSignedIn(true);
        console.log("2", isSignedIn);
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
