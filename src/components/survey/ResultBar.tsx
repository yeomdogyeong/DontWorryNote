import React from "react";

export const ResultBar = ({
  count,
  gaemi,
}: {
  count: number;
  gaemi: boolean;
}) => {
  const validatedCount = Math.max(1, Math.min(count, 10));
  return (
    <div className="w-full bg-slate-50 flex justify-center items-center">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`w-full border-[2px] border-gray-50 h-[15px] ml-[1px] mr-[1px] rounded-md ${
            index < validatedCount
              ? `${gaemi ? "bg-mainBlack" : "bg-mainGreen"}`
              : "bg-white"
          }`}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
};
