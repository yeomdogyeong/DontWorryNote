import React, { createContext, useContext, useState, useEffect } from "react";
import useUserStore from "./useUserStore";
import { SubjectType } from "@/types/common";
import useMyStore from "./useMyStore";

// Context 생성
const UserColorContext = createContext("");

// Context Provider 생성
export const UserColorProvider = ({ children }: any) => {
  const [userColor, setUserColor] = useState("");
  const userType = useMyStore((state) => state.tendency);
  const storedUserScore = localStorage.getItem("userScore");
  const userScore =
    storedUserScore !== null ? parseInt(storedUserScore, 10) : null;
  useEffect(() => {
    // userType이 gaejjange일 때는 mainGreen, gaemi일 때는 mainBlack으로 설정
    if (userScore !== null && userScore > 4) {
      userType === SubjectType.GAEMI;
      setUserColor("mainBlack");
    } else {
      setUserColor("mainGreen");
      userType === SubjectType.BAEZZANGE;
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
