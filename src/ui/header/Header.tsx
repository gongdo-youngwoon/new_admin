"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutStore } from "@/store/layoutStore";
import { getBreadcrumb } from "@/lib/breadcrumb";
import ThemeToggleButton from "@/components/button/ThemeToggleButton";
import HeaderProfile from "./HeaderProfile";

export default function Header() {
  const layoutState = useLayoutStore((state) => state.state);
  const pathname = usePathname();
  const router = useRouter();
  const parsedPathname = pathname.split("/");
  const detailId = parsedPathname[2];
  const breadcrumb = getBreadcrumb(pathname, detailId);

  return (
    <header
      className={clsx(
        "fixed top-0 right-0 flex items-center justify-between h-16 px-8 bg-white border-b border-b-gray-200 shadow-sm transition-default z-10",
        {
          "left-72": layoutState,
          "left-20": !layoutState,
        }
      )}
    >
      <ul className="flex items-center gap-2 text-gray-500 text-sm">
        {breadcrumb.map((el) => (
          <li
            className={clsx({
              "text-gray-800 font-semibold": el.href === pathname,
              "hover:cursor-pointer": el.href,
            })}
            key={el.id}
            onClick={() => {
              if (el.href) {
                router.push(el.href);
              }
            }}
          >
            {el.label}
          </li>
        ))}
      </ul>
      <ThemeToggleButton />
      <HeaderProfile />
    </header>
  );
}
