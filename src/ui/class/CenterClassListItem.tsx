import clsx from "clsx";
import { ClassSchema } from "@/api/classApi";
import { convertTimestampToDate } from "@/lib/dateFormatter";

interface CenterClassListItemProps {
  checked: boolean;
  data: ClassSchema;
}

export default function CenterClassListItem({
  checked,
  data,
}: CenterClassListItemProps) {
  return (
    <li className="flex h-[78px] text-gray-500 text-sm *:shrink-0 *:border-b *:border-gray-200">
      <div
        className={clsx("flex-center w-28 border-r", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        <div className="flex-center w-14 h-7 bg-secondary3-50 text-secondary3-500 text-xs rounded-full">
          입문
        </div>
      </div>
      <div
        className={clsx("flex items-center w-60 px-6 border-r line-clamp-2", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        {data.tags.length > 0 ? data.tags.join(", ") : "-"}
      </div>
      <div
        className={clsx("flex items-center w-32 px-6 border-r line-clamp-1", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        {data.by.length > 12 ? data.by.slice(0, 12) + "..." : data.by}
      </div>
      <div
        className={clsx("flex-center w-28 border-r", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        {data.published ? "오픈형" : "폐쇄형"}
      </div>
      <div
        className={clsx("flex-center w-28 border-r", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        <div>{data.recommend ? "추천" : "일반"}</div>
      </div>
      <div
        className={clsx("flex-center w-28 border-r", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        <div
          className={clsx("flex-center gap-2 h-7 px-4 text-xs rounded-full", {
            "bg-red-50 text-error": !data.display,
            "bg-green-50 text-safe": data.display,
          })}
        >
          {data.display ? "전시중" : "전시중지"}
        </div>
      </div>
      <div
        className={clsx("flex-center w-32", {
          "bg-gray-50": checked,
          "bg-white": !checked,
        })}
      >
        {convertTimestampToDate(data.created)}
      </div>
    </li>
  );
}
