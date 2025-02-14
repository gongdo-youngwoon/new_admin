import { useState } from "react";
import { ClassSchema } from "@/api/classApi";
import Checkbox from "@/components/input/Checkbox";

interface ClassTableHeaderProps {
  data: ClassSchema[][];
  handleAllCheck: (ids: string[]) => void;
}

export default function ClassTableHeader({
  data,
  handleAllCheck,
}: ClassTableHeaderProps) {
  const classIds = data.flatMap((page) => page.map((item) => item.id));
  const [isCheck, setIsCheck] = useState(false);
  const handleClick = () => setIsCheck((prev) => !prev);

  return (
    <div className="flex justify-between items-center h-10 px-6 border-t border-b border-gray-200 text-gray-500 text-sm">
      <div className="flex items-center gap-6 shrink-0 w-96">
        <div className="shrink-0 flex-center w-6">
          <Checkbox
            status={isCheck}
            handleCheck={() => {
              handleClick();
              if (!isCheck) {
                handleAllCheck(classIds);
              } else {
                handleAllCheck([]);
              }
            }}
          />
        </div>
        <div className="w-[48px] text-center">이미지</div>
        <div className="w-3/12">클래스명</div>
      </div>
      <div className="w-16 text-center">난이도</div>
      <div className="w-24">태그</div>
      <div className="w-20 text-center">유형</div>
      <div className="w-24 text-center">노출상태</div>
      <div className="w-20">등록일</div>
      <div className="shrink-0 w-10"></div>
    </div>
  );
}
