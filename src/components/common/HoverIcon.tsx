"use client";

import clsx from "clsx";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface HoverIconProps {
  children: (handleModal: () => void) => ReactNode;
  icon: IconDefinition;
}

export default function HoverIcon({ children, icon }: HoverIconProps) {
  const [isHover, setIsHover] = useState(false);
  const [isAction, setIsAction] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const handleModal = () => setIsAction((prev) => !prev);

  return (
    <div className="relative">
      <div
        className={clsx(
          "absolute flex-center size-10 bg-gray-200 rounded-full transition-default",
          {
            "scale-0": !isHover && !isAction,
            "scale-1": isHover || isAction,
          }
        )}
      />
      <div
        className="relative flex-center size-10 rounded-full hover:cursor-pointer"
        onClick={handleModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon className="text-gray-500" icon={icon} />
      </div>

      {isAction && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleModal} />
          {children(handleModal)}
        </>
      )}
    </div>
  );
}
