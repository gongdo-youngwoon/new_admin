import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { ClassSchema } from "@/api/classApi";
import { convertTimestampToDate } from "@/lib/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ActionMenuModal from "@/components/modal/ActionMenuModal";
import Checkbox from "@/components/input/Checkbox";

interface ClassListItemProps {
  checked: boolean;
  data: ClassSchema;
  handleCheck: (targetId: string) => void;
}

export default function ClassListItem({
  checked,
  data,
  handleCheck,
}: ClassListItemProps) {
  const [isHover, setIsHover] = useState(false);
  const [isAction, setIsAction] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const handleModal = () => setIsAction((prev) => !prev);

  return (
    <li
      className={clsx(
        "flex justify-between items-center h-[78px] px-6 border-b border-gray-200 text-gray-500 text-sm hover:bg-gray-50",
        {
          "bg-gray-50": checked,
          "bg-white": !checked,
        }
      )}
    >
      <div className="flex items-center gap-6 shrink-0 w-96">
        <div className="shrink-0 flex-center w-6">
          <Checkbox status={checked} handleCheck={() => handleCheck(data.id)} />
        </div>
        {data.thumbnail ? (
          <div className="relative size-12">
            <Image
              className="object-cover"
              src={data.thumbnail}
              alt="썸네일 이미지"
              fill
              sizes="48px"
            />
          </div>
        ) : (
          <div className="size-12 bg-gray-200" />
        )}
        <div className="">
          <div className="text-gray-900 font-semibold">{data.title}</div>
        </div>
      </div>
      <div className="flex-center w-16">
        <div className="flex-center w-14 h-7 bg-secondary3-50 rounded-full text-secondary3-500 text-xs">
          입문
        </div>
      </div>
      <div className="w-24">
        <ul>
          {data.tags.map((el, idx) => {
            return <li key={idx}>{el}</li>;
          })}
        </ul>
      </div>
      <div className="w-20 flex-center">유형</div>
      <div className="w-24 flex-center">
        <div
          className={clsx("flex-center gap-2 h-7 px-4 rounded-full", {
            "bg-red-50 text-error": !data.display,
            "bg-green-50 text-safe": data.display,
          })}
        >
          <FontAwesomeIcon className="text-[6px]" icon={faCircle} />
          <div className="text-xs">{data.display ? "노출" : "노출안함"}</div>
        </div>
      </div>
      <div className="w-20">{convertTimestampToDate(data.created)}</div>
      <div className="relative flex-center shrink-0 w-10">
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
      </div>
    </li>
  );
}
