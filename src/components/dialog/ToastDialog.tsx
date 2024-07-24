"use client";
import React, { useEffect, useState } from "react";

export const ToastDialog = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`absolute bottom-10 flex justify-start border-2 p-4 rounded-lg bg-gray-700 text-gray-200 w-[360px] max-w-[80vw]
      ${visible ? "opacity-90" : "opacity-0"}
      `}
    >
      {text}
    </div>
  );
};
