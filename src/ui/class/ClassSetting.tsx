import { useState } from "react";
import ClassSettingDropdown from "@/components/dropdown/ClassSettingDropdown";

const TYPE_UPDATE = [
  {
    id: 1,
    title: "유형을",
    displayText: "오픈형",
    key: "publish",
    value: true,
  },
  {
    id: 2,
    title: "유형을",
    displayText: "폐쇄형",
    key: "publish",
    value: false,
  },
];

const RECOMMEND_UPDATE = [
  {
    id: 1,
    title: "추천 여부를",
    displayText: "추천",
    key: "recommend",
    value: true,
  },
  {
    id: 2,
    title: "추천 여부를",
    displayText: "일반",
    key: "recommend",
    value: false,
  },
];

const DISPLAY_UPDATE = [
  {
    id: 1,
    title: "전시 상태를",
    displayText: "전시중",
    key: "display",
    value: true,
  },
  {
    id: 2,
    title: "전시 상태를",
    displayText: "전시중지",
    key: "display",
    value: false,
  },
];

interface BannerSettingProps {
  checkList: string[];
}

export default function ClassSetting({ checkList }: BannerSettingProps) {
  const [modal, setModal] = useState("");
  const handleModal = (target: string) => setModal(target);

  return (
    <div className="flex items-center gap-4 transition-100">
      <ClassSettingDropdown
        checkList={checkList}
        menuList={TYPE_UPDATE}
        label="유형"
        dropdown={modal === "publish"}
        handleDropdownOpen={() => handleModal("publish")}
        handleDropdownClose={() => handleModal("")}
      />
      <ClassSettingDropdown
        checkList={checkList}
        menuList={RECOMMEND_UPDATE}
        label="추천여부"
        dropdown={modal === "recommend"}
        handleDropdownOpen={() => handleModal("recommend")}
        handleDropdownClose={() => handleModal("")}
      />
      <ClassSettingDropdown
        checkList={checkList}
        menuList={DISPLAY_UPDATE}
        label="전시상태"
        dropdown={modal === "display"}
        handleDropdownOpen={() => handleModal("display")}
        handleDropdownClose={() => handleModal("")}
      />
      <div className="text-sm text-error hover:cursor-pointer">선택 삭제</div>
    </div>
  );
}
