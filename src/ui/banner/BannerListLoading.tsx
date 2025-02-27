import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BannerToolbar from "./BannerToolbar";

interface BannerListLoadingProp {
  checkList: string[];
}

export default function BannerListLoading({
  checkList,
}: BannerListLoadingProp) {
  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <BannerToolbar checkList={checkList} />
      <div className="flex justify-between items-center gap-10 h-10 px-6 border-b border-b-gray-200 text-gray-500 text-sm">
        <div className="shrink-0 flex-center w-6">
          <div className="size-[18px] border-2 border-gray-200 rounded-[4px]"></div>
        </div>
        <div className="w-10 text-center">순서</div>
        <div className="w-[120px] text-center">배경 이미지</div>
        <div className="flex-1">배너 제목</div>
        <div className="w-24 text-center">전시 상태</div>
        <div className="w-20 text-center">등록일</div>
        <div className="shrink-0 w-10"></div>
      </div>
      <div className="flex-center h-[624px]">
        <FontAwesomeIcon
          className="text-4xl text-gray-500"
          icon={faSpinner}
          spinPulse
        />
      </div>
      <div className="h-20" />
    </div>
  );
}
