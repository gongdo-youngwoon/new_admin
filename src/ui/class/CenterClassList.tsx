import { ClassSchema } from "@/api/classApi";
import ClassScrollListItem from "./CenterClassListItem";

interface CenterClassListProps {
  data: ClassSchema[][];
  checkList: string[];
}

export default function CenterClassList({
  data,
  checkList,
}: CenterClassListProps) {
  return (
    <div className="flex-1 overflow-x-scroll scrollbar-visible">
      <div
        className="flex h-10 text-gray-500 text-sm
        *:shrink-0 *:h-full *:border-b *:border-gray-200"
      >
        <div className="flex-center w-28 border-r">난이도</div>
        <div className="flex items-center w-60 px-6 border-r">태그</div>
        <div className="flex items-center w-32 px-6 border-r">제공자</div>
        <div className="flex-center w-28 border-r">유형</div>
        <div className="flex-center w-28 border-r">추천여부</div>
        <div className="flex-center w-28 border-r">전시상태</div>
        <div className="flex-center w-32">등록일</div>
      </div>
      {data.map((page, idx) => {
        return (
          <ul key={idx}>
            {page.map((el) => {
              return (
                <ClassScrollListItem
                  key={el.id}
                  data={el}
                  checked={checkList.includes(el.id)}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
