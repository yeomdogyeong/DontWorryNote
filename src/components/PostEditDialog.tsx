import React from "react";

const PostEditDialog = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 "
      onClick={onClose}
    >
      <div className="bg-white w-[400px] max-w-[80vw] p-6 rounded-lg shadow-lg relative">
        <div className="text-left">Title</div>
        <div className="mt-4">
          <p>뭔가를 여기에 쓰는중...</p>
        </div>
        <button
          className="absolute rounded-full w-6 h-6 top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default PostEditDialog;
