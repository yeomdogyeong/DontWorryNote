import { getUserMyInfo } from "@/apis/user/user";
import useMyStore from "@/store/useMyStore";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props extends PropsWithChildren {}

const PUBLIC_PATH = ["/", "/token", "/survey", "/survey/profile"];

export default function GlobalContextWrapper(props: Props) {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { setInitializeState, setIsSignedIn, isSignedIn } = useMyStore(
    useShallow((state) => ({
      setInitializeState: state.setInitializeState,
      setIsSignedIn: state.setIsSignedIn,
      isSignedIn: state.isSignedIn,
    }))
  );

  useEffect(() => {
    console.log("isSignedInWrapper", isSignedIn);
    if (PUBLIC_PATH.includes(pathname)) {
      return;
    }

    const requestMyInfo = async () => {
      const userToken = localStorage.getItem("tokenKey");
      //토큰이 있고 로그인 상태가 아닐때 token o signin x
      if (userToken && !isSignedIn) {
        const { data } = await getUserMyInfo();
        setInitializeState({
          ...data.data,
        });
      } else if (userToken && isSignedIn) {
        //token o signin o
        setIsSignedIn(true);
      } else {
        //token x signin o
        setIsSignedIn(false);
        router.push("/onboarding");
      }
    };

    requestMyInfo();
  }, [isSignedIn]);
  return <>{children}</>;
}
