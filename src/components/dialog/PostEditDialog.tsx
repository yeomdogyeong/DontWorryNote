import React from "react";

export const PostEditDialog = () => {
  return (
    // <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
    <div className="flex flex-col items-center justify-center absolute w-[400px] max-w-[80vw] h-[220px] max-h-[25vh] bg-gray-100 bottom-0 p-2 rounded-t-sm">
      <button className="flex justify-center items-center h-1/3 w-full text-lg border-b-2">
        게시글편집
      </button>
      <button className="flex justify-center items-center h-1/3 w-full text-lg border-b-2 text-red-500">
        게시글삭제
      </button>
      <button className="flex justify-center items-center h-1/3 w-full text-lg ">
        취소
      </button>
    </div>
    // </div>
  );
};
