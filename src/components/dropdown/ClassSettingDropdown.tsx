import clsx from "clsx";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../provider/TanstackQueryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { batchUpdateClass } from "@/api/classApi";
import CheckModal from "../modal/CheckModal";

interface SettingDropdownProps {
  checkList: string[];
  menuList: {
    id: number;
    title: string;
    displayText: string;
    key: string;
    value: boolean;
  }[];
  label: string;
  dropdown: boolean;
  handleDropdownOpen: () => void;
  handleDropdownClose: () => void;
}

export default function ClassSettingDropdown({
  checkList,
  menuList,
  label,
  dropdown,
  handleDropdownOpen,
  handleDropdownClose,
}: SettingDropdownProps) {
  const [checkModal, setCheckModal] = useState(false);
  const [updateData, setUpdateData] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const queryObj = Object.fromEntries(searchParams.entries());
  const showSuccessAlert = useAlertStore((state) => state.showSuccessAlert);

  const handleModal = () => setCheckModal((prev) => !prev);

  const handleClick = (
    title: string,
    displayText: string,
    key: string,
    value: boolean
  ) => {
    setUpdateData({ [key]: value });
    setMessage(
      `선택하신 ${checkList.length}개 클래스에 대해 ${title} [${displayText}]으로 일괄 변경합니다.\n변경하시겠습니까?`
    );
    handleModal();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: batchUpdateClass,
    onSuccess: () => {
      handleModal();
      handleDropdownClose();
      showSuccessAlert(
        `총 ${checkList.length}개 클래스의 ${label}가 정상적으로 변경되었습니다.`
      );
      return queryClient.invalidateQueries({
        queryKey: ["classList", queryObj],
      });
    },
  });

  const handleUpdate = () => {
    mutate({
      checkList,
      updateData,
    });
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          "flex justify-between items-center gap-4 h-10 px-4 border rounded-md text-sm transition-default hover:cursor-pointer",
          {
            "border-primary-400 ring ring-primary-50": dropdown,
            "border-gray-200": !dropdown,
          }
        )}
        onClick={handleDropdownOpen}
      >
        <div>{label} 변경</div>
        <FontAwesomeIcon
          className={clsx("text-primary-400 transition-default", {
            "rotate-180": dropdown,
          })}
          icon={faAngleDown}
        />
      </div>
      {dropdown && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleDropdownClose} />
          <ul className="absolute top-[42px] left-0 right-0 py-2 bg-white border border-gray-200 rounded-[4px] shadow-md z-30">
            {menuList.map((el) => (
              <li
                className="flex justify-between items-center h-9 px-4 text-sm
                hover:cursor-pointer hover:bg-gray-100 hover:text-primary-400"
                key={el.id}
                onClick={() =>
                  handleClick(el.title, el.displayText, el.key, el.value)
                }
              >
                {el.displayText}
              </li>
            ))}
          </ul>
        </>
      )}
      <CheckModal
        isOpened={checkModal}
        message={message}
        isPending={isPending}
        handleUpdate={handleUpdate}
        handleClose={handleModal}
      />
    </div>
  );
}
