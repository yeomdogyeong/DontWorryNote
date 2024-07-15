"use client";
import { useSearchParams } from "next/navigation";

function page() {
  const params = useSearchParams();
  const email = params.get("code");
  console.log(email);
  return <div>ddd</div>;
}

export default page;
