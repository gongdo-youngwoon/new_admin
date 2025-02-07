"use client";

import ThemeToggle from "@/component/theme/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed w-full h-[64px] border-b border-b-gray-200 shadow-md">
      <ThemeToggle />
    </header>
  );
}
