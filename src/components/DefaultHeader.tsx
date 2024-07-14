import React from "react";

interface Props {
  title: string;
}

export const DefaultHeader = (props: Props) => {
  const { title } = props;

  return (
    <div className="pt-[14px] pb-[8px] px-[20px] flex items-center w-full h-[56px] font-[700] text-[24px]">
      {title}
    </div>
  );
};
