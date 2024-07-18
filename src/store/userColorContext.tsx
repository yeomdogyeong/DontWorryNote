import React, { createContext, useContext, useState, useEffect } from "react";
import useUserStore from "./useUserStore";

// Context 생성
const UserColorContext = createContext("");

// Context Provider 생성
export const UserColorProvider = ({ children }: any) => {
  const [userColor, setUserColor] = useState("");
  const { userType } = useUserStore();
  useEffect(() => {
    // userType이 gaejjange일 때는 mainGreen, gaemi일 때는 mainBlack으로 설정

    if (userType === "baejjange") {
      setUserColor("mainGreen");
    } else if (userType === "gaemi") {
      setUserColor("mainBlack");
    }
  }, [userType]);

  return (
    <UserColorContext.Provider value={userColor}>
      {children}
    </UserColorContext.Provider>
  );
};

// Custom hook 생성
export const useUserColor = () => {
  return useContext(UserColorContext);
};
