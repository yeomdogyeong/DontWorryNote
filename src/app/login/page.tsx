"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { onBoarding } from "../../components/api/index";
function page() {
  const params = useSearchParams();
  const tokenKey = params.get("tokenKey");
  const state = params.get("state");
  const local = "http://localhost:3000";
  const serverUrl = "https://gaezzange.duckdns.org";
  const router = useRouter();
  console.log("router", router);
  //   axios.get(serverUrl, {
  //     params: { code: code, state: state },
  //     withCredentials: true,
  //   });
  //   console.log(code);
  //localhost:3000/login?code=0bifG3MkkilLnrhf8E6sbU18lM-LSik6AOzLknFzAkpXakPVNJjzAgAAAAQKPCRaAAABkLt22brUNEQ5evY1pg&state=x_5YeP1kmJxAoR04qJOKG-k99wi4iP0h9qhP_c9fMBc%3D
  useEffect(() => {
    console.log("tokenKey", tokenKey);
    const fetchData = async () => {
      try {
        const response = await onBoarding({
          params: { tokenKey: tokenKey },
        });
        console.log(router);
        router.push("/main");
        console.log("mmmain");
        return response;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (tokenKey) {
      fetchData();
    }
  }, [tokenKey]);
  return <div>ddd</div>;
}

export default page;
