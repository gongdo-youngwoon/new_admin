import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ClassToolbar from "./ClassTableToolbar";

interface BannerListLoadingProp {
  checkList: string[];
}

export default function ClassListLoading({ checkList }: BannerListLoadingProp) {
  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <ClassToolbar checkList={checkList} />
      <div className="flex-center h-[664px]">
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
