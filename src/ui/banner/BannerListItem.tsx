import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { convertTimestampToDate } from "@/lib/dateFormatter";
import { BannerSchema } from "@/api/bannerApi";
import ActionMenuModal from "@/components/modal/ActionMenuModal";
import Checkbox from "@/components/input/Checkbox";

interface BannerListItemProps {
  checked: boolean;
  data: BannerSchema;
  handleCheck: (targetId: string) => void;
}

export default function BannerListItem({
  checked,
  data,
  handleCheck,
}: BannerListItemProps) {
  const [isHover, setIsHover] = useState(false);
  const [isAction, setIsAction] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const handleModal = () => setIsAction((prev) => !prev);

  return (
    <li
      className={clsx(
        "flex justify-between items-center gap-10 h-[78px] px-6 border-b border-b-gray-200 text-gray-500 text-sm",
        {
          "bg-gray-50": checked,
          "bg-white": !checked,
        }
      )}
    >
      <div className="shrink-0 flex-center w-6">
        <Checkbox status={checked} handleCheck={() => handleCheck(data.id)} />
      </div>
      <div className="flex-center w-10">{data.order}</div>
      <div className="w-[120px]">
        {data.image ? (
          <div className="relative w-[120px] h-[48px]">
            <Image
              className="object-cover"
              src={data.image}
              alt="배너 이미지"
              fill
              sizes="120px"
            />
          </div>
        ) : (
          <div className="flex-center w-[120px] h-[42px] bg-gray-200">
            <FontAwesomeIcon className="text-lg" icon={faImage} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-gray-900 font-semibold">{data.title}</div>
      </div>
      <div className="flex-center w-24 ">
        <div
          className={clsx("flex-center h-7 px-4 text-xs rounded-full", {
            "bg-red-50 text-error": !data.display,
            "bg-green-50 text-safe": data.display,
          })}
        >
          {data.display ? "전시중" : "전시중지"}
        </div>
      </div>
      <div className="w-20 text-center">
        {convertTimestampToDate(data.created)}
      </div>
      <div className="relative flex-center w-10">
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
            <ActionMenuModal href={`/banner/${data.id}/update`} />
          </>
        )}
      </div>
    </li>
  );
}
