import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ClassSchema } from "@/api/classApi";
import ActionMenuModal from "@/components/modal/ActionMenuModal";

interface EndClassListItemProps {
  data: ClassSchema;
  checked: boolean;
}

export default function EndClassListItem({
  data,
  checked,
}: EndClassListItemProps) {
  const [isHover, setIsHover] = useState(false);
  const [isAction, setIsAction] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const handleModal = () => setIsAction((prev) => !prev);
  return (
    <li
      key={data.id}
      className={clsx("relative flex-center w-16 h-[78px] border-l border-b", {
        "bg-gray-50": checked,
        "bg-white": !checked,
      })}
    >
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
        <FontAwesomeIcon className="text-xl" icon={faEllipsis} />
      </div>
      {isAction && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleModal} />
          <ActionMenuModal href={`/class/${data.id}/update`} />
        </>
      )}
    </li>
  );
}
