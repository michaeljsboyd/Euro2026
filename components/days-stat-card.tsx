"use client";

import { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

import { StatCard } from "@/components/stat-card";

interface DaysStatCardProps {
  value: string;
  detail: string;
  icon: React.ReactNode;
}

export function DaysStatCard({ value, detail, icon }: DaysStatCardProps) {
  const router = useRouter();

  const navigateToOverview = () => {
    router.push("/overview");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigateToOverview();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={navigateToOverview}
      onKeyDown={handleKeyDown}
      className="cursor-pointer rounded-[24px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(31,36,48,0.07)]"
    >
      <StatCard
        label="Days"
        value={value}
        detail={detail}
        icon={icon}
      />
    </div>
  );
}
