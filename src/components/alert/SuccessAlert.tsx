"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useAlertStore } from "@/store/alertStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export default function SuccessAlert() {
  const isSuccess = useAlertStore((state) => state.isSuccess);
  const message = useAlertStore((state) => state.message);
  const hideSuccessAlert = useAlertStore((state) => state.hideSuccessAlert);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      timer = setTimeout(hideSuccessAlert, 2000);
    }

    return () => clearTimeout(timer);
  }, [isSuccess, hideSuccessAlert]);

  return (
    <div
      className={clsx(
        "fixed top-20 left-1/2 -translate-x-1/2 flex justify-between items-center w-1/2 h-14 px-6 bg-green-50 border border-safe text-safe rounded-md z-10 transition-default",
        {
          "invisible opacity-0 -translate-y-20": !isSuccess,
          "visible opacity-100 translate-y-0": isSuccess,
        }
      )}
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon className="text-lg" icon={faCircleCheck} />
        <p className="text-sm">{message}</p>
      </div>
      <div
        className="text-gray-400 hover:cursor-pointer"
        onClick={hideSuccessAlert}
      >
        ✕
      </div>
    </div>
  );
}
