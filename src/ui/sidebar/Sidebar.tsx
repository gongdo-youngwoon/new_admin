"use client";

import clsx from "clsx";
import Image from "next/image";
import { useLayoutStore } from "@/store/layoutStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./MenuList";
import whiteLogo from "@/assets/images/logo_white.png";
import blackLogo from "@/assets/images/logo_black.png";

export default function Sidebar() {
  const layoutState = useLayoutStore((state) => state.state);
  const { open, close } = useLayoutStore((state) => state.actions);

  return (
    <div
      className={clsx(
        "fixed min-h-screen bg-white border-r border-r-gray-200 transition-default overflow-hidden z-10 dark:bg-gray-600",
        {
          "w-20": !layoutState,
          "w-72": layoutState,
        }
      )}
    >
      <div className="flex items-center gap-7 h-16 pl-7 border-b border-b-gray-200">
        <div className="shrink-0 flex-center w-6">
          <FontAwesomeIcon
            className="text-primary-500 text-2xl hover:cursor-pointer"
            icon={faBarsStaggered}
            onClick={() => {
              if (layoutState) {
                close();
              } else {
                open();
              }
            }}
          />
        </div>
        <div
          className={clsx("shrink-0 relative w-28 h-6 transition-default", {
            "opacity-0": !layoutState,
          })}
        >
          <Image
            className="object-contain dark:hidden"
            src={blackLogo}
            alt="로고 이미지"
            fill
            sizes="128px"
            priority
          />
          <Image
            className="object-contain hidden dark:block"
            src={whiteLogo}
            alt="로고 이미지"
            fill
            sizes="128px"
            priority
          />
        </div>
      </div>
      <MenuList />
    </div>
  );
}
