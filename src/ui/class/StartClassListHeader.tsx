import { useState } from "react";
import { ClassSchema } from "@/api/classApi";
import Checkbox from "@/components/input/Checkbox";

interface StartClassListHeaderProps {
  data: ClassSchema[][];
  handleAllCheck: (ids: string[]) => void;
}

export default function StartClassListHeader({
  data,
  handleAllCheck,
}: StartClassListHeaderProps) {
  const classIds = data.flatMap((page) => page.map((item) => item.id));
  const [isCheck, setIsCheck] = useState(false);
  const handleClick = () => setIsCheck((prev) => !prev);

  return (
    <div className="flex gap-8 h-10 px-6 border-b border-r border-gray-200 text-gray-500 text-sm">
      <div className="flex-center w-6">
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
      <div className="flex-center w-14">이미지</div>
      <div className="flex items-center w-96">제목</div>
    </div>
  );
}
