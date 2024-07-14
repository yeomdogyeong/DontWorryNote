"use client";

import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";

interface Props {}

export default function ReportPage(props: Props) {
  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <BottomNavigation />
    </div>
  );
}
