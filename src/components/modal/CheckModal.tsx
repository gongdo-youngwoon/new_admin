import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface CheckModalProps {
  isOpened: boolean;
  message: string;
  isPending: boolean;
  handleUpdate: () => void;
  handleClose: () => void;
}

export default function CheckModal({
  isOpened,
  message,
  isPending,
  handleUpdate,
  handleClose,
}: CheckModalProps) {
  return (
    <div
      className={clsx(
        "fixed inset-0 flex justify-center bg-gray-800 bg-opacity-25 transition-default z-30",
        {
          "visible opacity-100": isOpened,
          "invisible opacity-0": !isOpened,
        }
      )}
    >
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={clsx(
          "absolute top-20 bg-white rounded-md shadow-md overflow-hidden transition-default",
          {
            "visible opacity-100 translate-y-0": isOpened,
            "invisible opacity-0 -translate-y-20": !isOpened,
          }
        )}
      >
        <div className="p-8 text-center">
          <FontAwesomeIcon
            className="mb-8 text-primary-500 text-5xl"
            icon={faTriangleExclamation}
          />
          <p className="mb-2 text-sm">{message.split("\n")[0]}</p>
          <p className="text-lg text-gray-800 font-semibold">
            {message.split("\n")[1]}
          </p>
        </div>
        <div className="flex items-center justify-end gap-4 h-16 px-6 bg-[#f5f6fa] border-t border-t-gray-200">
          <div
            className="flex-center w-20 h-10 bg-gray-300 rounded-md text-white text-sm hover:cursor-pointer"
            onClick={handleClose}
          >
            취소
          </div>
          <div
            className="flex-center w-20 h-10 bg-primary-500 rounded-md text-white text-sm hover:cursor-pointer"
            onClick={handleUpdate}
          >
            {isPending ? (
              <FontAwesomeIcon className="text-lg" icon={faSpinner} spinPulse />
            ) : (
              "변경"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
