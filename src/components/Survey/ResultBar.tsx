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
          className={`w-full border-[2px] h-[15px] rounded-xl ${
            index < validatedCount
              ? `${gaemi ? "bg-slate-500" : "bg-mainGreen"}`
              : "bg-slate-50"
          }`}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
};
