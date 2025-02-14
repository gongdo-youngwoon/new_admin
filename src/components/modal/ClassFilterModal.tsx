import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../common/Dropdown";

const ClASS_TYPE = [
  { id: 1, label: "오픈형", value: "Y" },
  { id: 2, label: "폐쇄형", value: "N" },
];

const ClASS_LEVEL = [
  { id: 1, label: "입문", value: "1" },
  { id: 2, label: "초급", value: "2" },
  { id: 3, label: "중급", value: "3" },
  { id: 4, label: "심화", value: "4" },
];

const ClASS_RECOMMEND = [
  { id: 1, label: "추천", value: "Y" },
  { id: 2, label: "일반", value: "N" },
];

const ClASS_DISPLAY = [
  { id: 1, label: "노출중", value: "Y" },
  { id: 2, label: "노출중지", value: "N" },
];

interface FilterModalProps {
  handleModal: () => void;
}

export default function ClassFilterModal({ handleModal }: FilterModalProps) {
  const [openDropdown, setOpenDropdown] = useState<number>(0);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [queryObj, setQueryObj] = useState({
    type: searchParams.get("type"),
    level: searchParams.get("level"),
    recommend: searchParams.get("recommend"),
    display: searchParams.get("display"),
  });

  const handleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? 0 : id));
  };

  const handleSelect = (key: string, value: string) => {
    setQueryObj({ ...queryObj, [key]: value });
  };

  const handleReset = () => {
    setQueryObj({
      ...queryObj,
      type: null,
      level: null,
      recommend: null,
      display: null,
    });
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
        <Dropdown
          label="유형"
          menu={ClASS_TYPE}
          queryKey="type"
          queryValue={queryObj.type}
          isOpen={openDropdown === 1}
          handleDropdown={() => handleDropdown(1)}
          handleSelect={handleSelect}
        />
        <Dropdown
          label="난이도"
          menu={ClASS_LEVEL}
          queryKey="level"
          queryValue={queryObj.level}
          isOpen={openDropdown === 2}
          handleDropdown={() => handleDropdown(2)}
          handleSelect={handleSelect}
        />
        <Dropdown
          label="추천 여부"
          menu={ClASS_RECOMMEND}
          queryKey="recommend"
          queryValue={queryObj.recommend}
          isOpen={openDropdown === 3}
          handleDropdown={() => handleDropdown(3)}
          handleSelect={handleSelect}
        />
        <Dropdown
          label="노출 상태"
          menu={ClASS_DISPLAY}
          queryKey="display"
          queryValue={queryObj.display}
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
