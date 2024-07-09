import React from "react";

export const ProgressBar2 = ({ stepNumber }: { stepNumber: number }) => {
  const widthClass = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];
  const barWidth = widthClass[stepNumber];
  return (
    <div className="w-full bg-gray-200">
      <p className={`${barWidth} bg-mainGreen h-[10px]`}>&nbsp;</p>
    </div>
  );
};
