"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutStore } from "@/store/layoutStore";
import ThemeToggleButton from "@/components/button/ThemeToggleButton";

export default function Header() {
  const layoutState = useLayoutStore((state) => state.state);
  const pathname = usePathname();
  const router = useRouter();
  const parsedPathname = pathname.split("/");
  const classId = parsedPathname[3];

  const getBreadcrumb = () => {
    const depthList: { id: number; label: string; href?: string }[] = [];
    if (pathname === "/") {
      depthList.push({ id: 1, label: "대시보드" });
    } else if (pathname === "/class") {
      depthList.push({ id: 1, label: "클래스 관리" });
      depthList.push({ id: 2, label: ">" });
      depthList.push({ id: 3, label: "클래스 조회", href: "/class" });
    } else if (pathname === "/class/create") {
      depthList.push({ id: 1, label: "클래스 관리" });
      depthList.push({ id: 2, label: ">" });
      depthList.push({ id: 3, label: "클래스 등록", href: "/class/create" });
    } else if (pathname.startsWith("/class/") && classId) {
      depthList.push({ id: 1, label: "클래스 관리" });
      depthList.push({ id: 2, label: ">" });
      depthList.push({ id: 3, label: "클래스 조회", href: "/class/create" });
      depthList.push({ id: 4, label: ">" });
      depthList.push({
        id: 3,
        label: "클래스 수정",
        href: `/class/${classId}/update`,
      });
    }
    return depthList;
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header
      className={clsx(
        "fixed right-0 flex items-center justify-between h-16 px-8 bg-white border-b border-b-gray-200 shadow-sm z-10 transition-default",
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
    </header>
  );
}
