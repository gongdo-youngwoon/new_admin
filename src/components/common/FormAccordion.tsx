"use client";

import clsx from "clsx";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";

interface FormAccordionProps {
  isOpened: boolean;
  isRequired: boolean;
  isChecked: boolean;
  label: string;
  children: ReactNode;
}

export default function FormAccordion({
  isOpened,
  isRequired,
  isChecked,
  label,
  children,
}: FormAccordionProps) {
  const [toggle, setToggle] = useState(isOpened);
  const handleToggle = () => setToggle((prev) => !prev);

  return (
    <div>
      <div
        className="flex justify-between items-center h-16 px-8 bg-white border border-gray-200 hover:cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-4">
          <div
            className={clsx("flex-center size-5 border rounded-full", {
              "bg-safe border-safe": isChecked,
              "bg-white border-gray-200": !isChecked,
            })}
          >
            {isChecked && (
              <FontAwesomeIcon className="text-white text-xs" icon={faCheck} />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="pt-[1px]">{label}</span>
            {isRequired && <span className="text-error text-[8px]">●</span>}
          </div>
        </div>
        <FontAwesomeIcon
          className={clsx("text-primary-500 transition-default", {
            "rotate-180": toggle,
          })}
          icon={faAngleDown}
        />
      </div>
      {toggle && (
        <div className="p-8 bg-white border-x border-b border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}
