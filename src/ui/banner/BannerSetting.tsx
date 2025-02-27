import { useState } from "react";
import OrderSettingModal from "@/components/modal/OrderSettingModal";
import BannerSettingDropdown from "@/components/dropdown/BannerSettingDropdown";

interface BannerSettingProps {
  checkList: string[];
}

export default function BannerSetting({ checkList }: BannerSettingProps) {
  const [modal, setModal] = useState("");
  const handleModal = (target: string) => setModal(target);

  return (
    <div className="flex items-center gap-4 transition-100">
      <div
        className="flex-center h-10 px-4 border border-gray-200 text-sm rounded-md hover:cursor-pointer"
        onClick={() => handleModal("order")}
      >
        순서 설정
      </div>
      <BannerSettingDropdown
        checkList={checkList}
        dropdown={modal === "display"}
        handleDropdownOpen={() => handleModal("display")}
        handleDropdownClose={() => handleModal("")}
      />
      <div className="text-sm text-error hover:cursor-pointer">선택 삭제</div>
      <OrderSettingModal
        checkList={checkList}
        isOpened={modal === "order"}
        handleModal={handleModal}
      />
    </div>
  );
}
