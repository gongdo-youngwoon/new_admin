import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { batchUpdateBanner } from "@/api/bannerApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { queryClient } from "../provider/TanstackQueryProvider";
import { useAlertStore } from "@/store/alertStore";

interface OrderSettingModalProps {
  checkList: string[];
  isOpened: boolean;
  handleModal: (target: string) => void;
}

export default function OrderSettingModal({
  checkList,
  isOpened,
  handleModal,
}: OrderSettingModalProps) {
  const [orderValue, setOrderValue] = useState("");
  const searchParams = useSearchParams();
  const queryObj = Object.fromEntries(searchParams.entries());
  const showSuccessAlert = useAlertStore((state) => state.showSuccessAlert);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = Number(value);

    if (value === "" || (numberValue >= 1 && numberValue <= 99)) {
      setOrderValue(value);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: batchUpdateBanner,
    onSuccess: () => {
      setOrderValue("");
      handleModal("");
      showSuccessAlert(
        `총 ${checkList.length}개 배너의 전시 순서가 정상적으로 변경되었습니다.`
      );
      return queryClient.invalidateQueries({
        queryKey: ["bannerList", queryObj],
      });
    },
  });

  const handleUpdate = () => {
    mutate({ checkList, updateData: { order: Number(orderValue) } });
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 flex justify-center bg-gray-800 bg-opacity-25 transition-default z-10",
        {
          "visible opacity-100": isOpened,
          "invisible opacity-0": !isOpened,
        }
      )}
    >
      <div className="absolute inset-0" onClick={() => handleModal("")} />
      <div
        className={clsx(
          "absolute top-20 w-96 bg-white rounded-md shadow-md overflow-hidden transition-default",
          {
            "translate-y-0 opacity-100": isOpened,
            "-translate-y-20 opacity-0": !isOpened,
          }
        )}
      >
        <div className="flex justify-between items-center h-16 px-6 border-b border-b-gray-200">
          <div className="text-base text-gray-800 font-semibold">순서 설정</div>
          <div
            className="text-xl text-gray-400 hover:cursor-pointer"
            onClick={() => handleModal("")}
          >
            ✕
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-[1px] mb-6 text-gray-400 text-sm">
            <p>
              선택하신 <span className="text-error">{checkList.length}</span>개
              배너에 대해 [전시 순서]를 일괄 변경합니다.
            </p>
            <p>설정한 숫자가 낮을수록 전시 우선순위가 높습니다.</p>
          </div>
          <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-[4px]">
            <label className="text-sm text-gray-800" htmlFor="order">
              전시 순서
            </label>
            <input
              className="flex-1 h-10 px-4 border border-gray-200 rounded-[4px] text-sm outline-none transition-default
              focus:border-primary-500 focus:ring focus:ring-primary-50 placeholder:text-xs"
              id="order"
              type="number"
              placeholder="숫자 입력 (최소 1 ~ 최대 99까지)"
              value={orderValue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-end h-16 px-6 bg-[#f5f6fa] border-t border-t-gray-200">
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
