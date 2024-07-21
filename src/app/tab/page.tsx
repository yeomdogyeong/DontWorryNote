"use client";
import { OptionDialog } from "@/components/dialog/OptionDialog";
import AskDialog from "@/components/dialog/AskDialog";
import { ToastDialog } from "@/components/dialog/ToastDialog";
import React, { useState } from "react";
import { PostEditDialog } from "@/components/dialog/PostEditDialog";
import { PostButton } from "@/components/button/PostButton";
import { SubjectType } from "@/types/common";
import { BasicButton } from "@/components/button/BasicButton";
export default function Tap() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {/* <OptionDialog /> */}
      <PostButton bgColor={SubjectType.BAEJJANGE} />
      <PostButton bgColor={SubjectType.GAEMI} />
      <BasicButton text="dogyeong" bgColor="baejjange" />
      <BasicButton text="dogyeong" bgColor="gaemi" />
      <BasicButton text="dogyeong" bgColor="mainGreen" />
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
