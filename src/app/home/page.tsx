"use client";

import { useAlertOverlay } from "@/components/alert/AlertOverlay";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { useCallback } from "react";

export default function HomePage() {
  const { active } = useAlertOverlay();

  const handleClick = useCallback(() => {
    active({ contents: "삭제하시겠습니까?", onConfirm: async () => {} });
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <div onClick={handleClick}>alert</div>
      <BottomNavigation />
    </div>
  );
}
