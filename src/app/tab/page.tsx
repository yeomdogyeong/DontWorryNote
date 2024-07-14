"use client";
import { OptionDialog } from "@/components/dialog/OptionDialog";
import AskDialog from "@/components/dialog/AskDialog";
import { ToastDialog } from "@/components/dialog/ToastDialog";
import React, { useState } from "react";
import { PostEditDialog } from "@/components/dialog/PostEditDialog";
export default function Tap() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* <OptionDialog /> */}
      <PostEditDialog />
      <ToastDialog text={"게시물이 성공적으로 삭제되엇다능."} />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={openModal}
      >
        Open Modal
      </button>
      <AskDialog isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
