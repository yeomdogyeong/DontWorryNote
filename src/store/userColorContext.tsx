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

  // const userScore = useUserStore();
  const { users } = useUserStore();
  useEffect(() => {
    if (users.score > 3) {
      setUserColor("mainBlack");
    } else {
      setUserColor("mainGreen");
    }
  }, [users]);

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
