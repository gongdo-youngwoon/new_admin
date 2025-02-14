import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface SeeMoreButtonProps {
  isFetching: boolean;
  handleClick: () => void;
}

export default function SeeMoreButton({
  isFetching,
  handleClick,
}: SeeMoreButtonProps) {
  return (
    <div
      className="flex-center gap-3 w-24 h-10 border border-gray-200 text-gray-500 text-sm rounded-md hover:cursor-pointer"
      onClick={handleClick}
    >
      {isFetching ? (
        <FontAwesomeIcon
          className="text-lg text-gray-500"
          icon={faSpinner}
          spinPulse
        />
      ) : (
        <>
          <div>더보기</div>
          <FontAwesomeIcon icon={faAngleDown} />
        </>
      )}
    </div>
  );
}
