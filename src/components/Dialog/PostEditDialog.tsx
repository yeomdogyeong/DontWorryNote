import React from "react";

export const PostEditDialog = () => {
  return (
    <div className="flex flex-col items-center justify-center absolute w-[400px] max-w-[80vw] h-[220px] bg-gray-100 bottom-0 p-2 rounded-t-sm">
      <button className="flex justify-center items-center h-1/3 w-full text-lg border-b-2">
        게시글편집
      </button>
      <button className="flex justify-center items-center h-1/3 w-full text-lg border-b-2 text-red-500">
        게시글삭제
      </button>{" "}
      <button className="flex justify-center items-center h-1/3 w-full text-lg ">
        취소
      </button>
    </div>
  );
};
