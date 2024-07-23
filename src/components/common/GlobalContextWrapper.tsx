import { getUserMyInfo } from "@/apis/user/user";
import useMyStore from "@/store/useMyStore";
import { usePathname } from "next/navigation";
import path from "path";
import { PropsWithChildren, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props extends PropsWithChildren {}

const PUBLIC_PATH = ["/", "/token", "/survey", "/survey/profile"];

export default function GlobalContextWrapper(props: Props) {
  const { children } = props;
  const pathname = usePathname();
  const { setInitializeState, setIsSignedIn } = useMyStore(
    useShallow((state) => ({
      setInitializeState: state.setInitializeState,
      setIsSignedIn: state.setIsSignedIn,
    }))
  );

  useEffect(() => {
    if (PUBLIC_PATH.includes(pathname)) {
      return;
    }

    const requestMyInfo = async () => {
      const userToken = localStorage.getItem("tokenKey");
      if (userToken) {
        const { data } = await getUserMyInfo();
        setInitializeState({
          ...data.data,
        });
      } else {
        setIsSignedIn(false);
      }
    };

    requestMyInfo();
  });
  return <>{children}</>;
}
