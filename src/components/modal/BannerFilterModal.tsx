import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DISPLAY_STATUS } from "@/constant/dropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import FilterDropdown from "../dropdown/FilterDropdown";

interface FilterModalProps {
  handleModal: () => void;
}

export default function BannerFilterModal({ handleModal }: FilterModalProps) {
  const [openDropdown, setOpenDropdown] = useState<number>(0);
  const { replace } = useRouter();
  const pathname = usePathname();
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
          label="전시 상태"
          menu={DISPLAY_STATUS}
          queryValue={
            queryObj.display
              ? queryObj.display === "Y"
                ? "전시중"
                : "전시중지"
              : null
          }
          isOpen={openDropdown === 1}
          handleDropdown={() => handleDropdown(1)}
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
