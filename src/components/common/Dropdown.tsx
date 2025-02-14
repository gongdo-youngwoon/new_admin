import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
  label: string;
  menu: { id: number; label: string; value: string }[];
  queryKey: string;
  queryValue: string | null;
  isOpen: boolean;
  handleDropdown: () => void;
  handleSelect: (key: string, value: string) => void;
}

export default function Dropdown({
  label,
  menu,
  queryKey,
  queryValue,
  isOpen,
  handleDropdown,
  handleSelect,
}: DropdownProps) {
  return (
    <div className="relative flex flex-col gap-[6px]">
      <div>{label}</div>
      <div
        className={clsx(
          "flex justify-between items-center h-10 px-4 border rounded-[4px] transition-default hover:cursor-pointer z-20",
          {
            "border-primary-400 ring ring-primary-50": isOpen || queryValue,
            "border-gray-300": !isOpen,
          }
        )}
        onClick={handleDropdown}
      >
        <div
          className={clsx({
            "text-gray-500 font-semibold": queryValue,
            "text-gray-400": !queryValue,
          })}
        >
          {queryValue ? queryValue : "선택"}
        </div>
        <FontAwesomeIcon
          className={clsx("text-primary-400 transition-default", {
            "rotate-180": isOpen,
          })}
          icon={faAngleDown}
        />
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleDropdown} />
          <ul className="absolute top-[68px] left-0 right-0 py-2 bg-white border border-gray-200 rounded-[4px] shadow-md z-30">
            {menu.map((el) => (
              <li
                className="flex justify-between items-center h-9 px-4
                hover:cursor-pointer hover:bg-gray-100 hover:text-primary-400"
                key={el.id}
                onClick={() => {
                  handleSelect(queryKey, el.label);
                  handleDropdown();
                }}
              >
                <div>{el.label}</div>
                {queryValue === el.label && <FontAwesomeIcon icon={faCheck} />}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
