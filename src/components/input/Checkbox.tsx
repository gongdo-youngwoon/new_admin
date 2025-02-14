import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CheckboxProps {
  status: boolean;
  handleCheck: () => void;
}

export default function Checkbox({ status, handleCheck }: CheckboxProps) {
  return (
    <div
      className={clsx(
        "flex-center size-[18px] border-2 border-gray-200 rounded-[4px] hover:cursor-pointer",
        {
          "bg-primary-500 border-primary-500 ring ring-primary-50": status,
          "bg-white": !status,
        }
      )}
      onClick={handleCheck}
    >
      {status && (
        <FontAwesomeIcon className="text-xs text-white" icon={faCheck} />
      )}
    </div>
  );
}
