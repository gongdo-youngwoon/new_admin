import { useState } from "react";
import { BannerSchema } from "@/api/bannerApi";
import Checkbox from "@/components/input/Checkbox";

interface BannerListHeaderProps {
  data: BannerSchema[][];
  handleAllCheck: (ids: string[]) => void;
}

export default function BannerListHeader({
  data,
  handleAllCheck,
}: BannerListHeaderProps) {
  const classIds = data.flatMap((page) => page.map((item) => item.id));
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => setIsChecked((prev) => !prev);

  return (
    <div
      className="flex justify-between items-center gap-10 h-10 px-6
    bg-white border-b border-b-gray-200 text-gray-500 text-sm z-10"
    >
      <div className="shrink-0 flex-center w-6">
        <Checkbox
          status={isChecked}
          handleCheck={() => {
            handleClick();
            if (!isChecked) {
              handleAllCheck(classIds);
            } else {
              handleAllCheck([]);
            }
          }}
        />
      </div>
      <div className="w-10 text-center">순서</div>
      <div className="w-[120px] text-center">배경 이미지</div>
      <div className="flex-1">배너 제목</div>
      <div className="w-24 text-center">전시상태</div>
      <div className="w-20 text-center">등록일</div>
      <div className="w-10" />
    </div>
  );
}
