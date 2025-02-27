import clsx from "clsx";
import Image from "next/image";
import { ClassSchema } from "@/api/classApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Checkbox from "@/components/input/Checkbox";

interface StartClassListItemProps {
  checked: boolean;
  data: ClassSchema;
  handleCheck: (targetId: string) => void;
}

export default function StartClassListItem({
  checked,
  data,
  handleCheck,
}: StartClassListItemProps) {
  return (
    <li
      className={clsx(
        "flex gap-8 h-[78px] px-6 border-b border-b-gray-200 text-gray-500 text-sm",
        {
          "bg-gray-50": checked,
          "bg-white": !checked,
        }
      )}
    >
      <div className="flex-center w-6">
        <Checkbox status={checked} handleCheck={() => handleCheck(data.id)} />
      </div>
      <div className="flex-center w-14">
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
          <div className="flex-center size-12 bg-gray-200">
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
      </div>
      <div className="flex items-center w-96 text-gray-900 font-semibold">
        {data.title}
      </div>
    </li>
  );
}
