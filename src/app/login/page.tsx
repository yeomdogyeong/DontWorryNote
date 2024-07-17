"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { onBoarding, userInstance } from "../../components/api/index";
function page() {
  const params = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");
  const local = "http://localhost:3000";
  const serverUrl = "https://gaezzange.duckdns.org";
  //   axios.get(serverUrl, {
  //     params: { code: code, state: state },
  //     withCredentials: true,
  //   });
  //   console.log(code);
  //localhost:3000/login?code=0bifG3MkkilLnrhf8E6sbU18lM-LSik6AOzLknFzAkpXakPVNJjzAgAAAAQKPCRaAAABkLt22brUNEQ5evY1pg&state=x_5YeP1kmJxAoR04qJOKG-k99wi4iP0h9qhP_c9fMBc%3D
  useEffect(() => {
    console.log("code", code, "state", state);
    const fetchData = async () => {
      try {
        const response = await onBoarding({
          params: { code: code, state: state },
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (code && state) {
      fetchData();
    }
  }, [code, state]);
  return <div>ddd</div>;
}

export default page;
