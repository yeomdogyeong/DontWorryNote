import { AuthButton } from "@/components/AuthButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-between">
      <div>hello</div> <div>hello2</div> <div>hello3</div>
      <AuthButton text="mango" color="#e0e0e0" />
    </main>
  );
}
