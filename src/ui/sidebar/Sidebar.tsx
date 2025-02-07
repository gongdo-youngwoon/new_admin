"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import whiteLogo from "@/assets/images/logo_white.png";
import blackLogo from "@/assets/images/logo_black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./MenuList";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        "h-screen bg-white border-r border-r-gray-200 shadow-lg dark:bg-gray-600 transition-all duration-300 ease-out overflow-hidden",
        {
          "w-[74px]": !isOpen,
          "w-[288px]": isOpen,
        }
      )}
    >
      <div className="flex items-center gap-[24px] h-[64px] pl-[24px] border-b border-b-gray-200">
        <div className="shrink-0 flex-center w-[26px]">
          <FontAwesomeIcon
            className="text-primary-500 text-[28px] hover:cursor-pointer"
            icon={faBars}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
        <div
          className={clsx(
            "shrink-0 relative w-[140px] h-[24px] transition-opacity duration-300 ease-out",
            {
              "opacity-0": !isOpen,
            }
          )}
        >
          <Image
            className="object-contain dark:hidden"
            src={blackLogo}
            alt="로고 이미지"
            fill
            sizes="150px"
            priority
          />
          <Image
            className="object-contain hidden dark:block"
            src={whiteLogo}
            alt="로고 이미지"
            fill
            sizes="150px"
            priority
          />
        </div>
      </div>
      <MenuList />
    </div>
  );
}
