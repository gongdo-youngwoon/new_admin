import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import FilterDropdown from "../dropdown/FilterDropdown";
import {
  ClASS_DISPLAY,
  ClASS_LEVEL,
  ClASS_RECOMMEND,
  ClASS_TYPE,
} from "@/constant/dropdownMenu";

interface FilterModalProps {
  handleModal: () => void;
}

export default function ClassFilterModal({ handleModal }: FilterModalProps) {
  const [openDropdown, setOpenDropdown] = useState<number>(0);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [queryObj, setQueryObj] = useState<{ [key: string]: string }>(
    Object.fromEntries(searchParams.entries())
  );

  const handleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? 0 : id));
  };

  const handleSelect = (key: string, value: string) => {
    setQueryObj({ ...queryObj, [key]: value });
  };

  const handleReset = () => {
    setQueryObj({});
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    if (queryObj.type) {
      params.set("type", queryObj.type);
    } else {
      params.delete("type");
    }

    if (queryObj.level) {
      params.set("level", queryObj.level);
    } else {
      params.delete("level");
    }

    if (queryObj.recommend) {
      params.set("recommend", queryObj.recommend);
    } else {
      params.delete("recommend");
    }

    if (queryObj.display) {
      params.set("display", queryObj.display);
    } else {
      params.delete("display");
    }

    replace(`${pathname}?${params.toString()}`);
    handleModal();
  };

  return (
    <div
      className="absolute top-8 right-1/2 w-96 bg-white border border-gray-200
    text-gray-500 text-sm rounded-lg shadow-md z-10"
    >
      <div className="flex items-center h-14 px-5 border-b border-b-gray-200 font-bold">
        필터 설정
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 px-5 py-7">
        <FilterDropdown
          label="난이도"
          menu={ClASS_LEVEL}
          queryValue={queryObj.level}
          isOpen={openDropdown === 2}
          handleDropdown={() => handleDropdown(2)}
          handleSelect={handleSelect}
        />
        <FilterDropdown
          label="유형"
          menu={ClASS_TYPE}
          queryValue={
            queryObj.type ? (queryObj.type === "Y" ? "오픈형" : "폐쇄형") : null
          }
          isOpen={openDropdown === 1}
          handleDropdown={() => handleDropdown(1)}
          handleSelect={handleSelect}
        />
        <FilterDropdown
          label="추천 여부"
          menu={ClASS_RECOMMEND}
          queryValue={
            queryObj.recommend
              ? queryObj.recommend === "Y"
                ? "추천"
                : "일반"
              : null
          }
          isOpen={openDropdown === 3}
          handleDropdown={() => handleDropdown(3)}
          handleSelect={handleSelect}
        />
        <FilterDropdown
          label="전시 상태"
          menu={ClASS_DISPLAY}
          queryValue={
            queryObj.display
              ? queryObj.display === "Y"
                ? "전시중"
                : "전시중지"
              : null
          }
          isOpen={openDropdown === 4}
          handleDropdown={() => handleDropdown(4)}
          handleSelect={handleSelect}
        />
      </div>
      <div className="flex justify-between items-center h-14 px-5 border-t border-t-gray-200">
        <div
          className="flex items-center gap-2 text-primary-400 hover:cursor-pointer"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          <div>초기화</div>
        </div>
        <div
          className="flex items-center gap-2 text-primary-400 hover:cursor-pointer"
          onClick={handleApply}
        >
          <div>적용</div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}
