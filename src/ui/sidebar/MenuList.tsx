import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutStore } from "@/store/layoutStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faImages } from "@fortawesome/free-regular-svg-icons";

const MENU_LIST = [
  {
    id: 1,
    icon: faQrcode,
    main: "대시보드",
    pathStart: "/",
    sub: [],
  },
  {
    id: 2,
    icon: faImages,
    main: "배너 관리",
    pathStart: "/banner",
    sub: [
      { id: 1, href: "", label: "배너 등록" },
      { id: 2, href: "", label: "배너 조회" },
    ],
  },
  {
    id: 3,
    icon: faPenToSquare,
    main: "클래스 관리",
    pathStart: "/class",
    sub: [
      { id: 1, href: "/class/create", label: "클래스 등록" },
      { id: 2, href: "/class", label: "클래스 조회" },
    ],
  },
];

export default function MenuList() {
  const layoutState = useLayoutStore((state) => state.state);
  const [curId, setCurId] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      setCurId(1);
    } else {
      const activeMenu = MENU_LIST.slice(1).find((el) =>
        pathname.startsWith(el.pathStart)
      );
      setCurId(activeMenu ? activeMenu.id : null);
    }
  }, [pathname]);

  const handleClick = (targetId: number) => {
    if (targetId === 1) {
      router.push("/");
    }

    if (curId === targetId) {
      setCurId(null);
    } else {
      setCurId(targetId);
    }
  };

  return (
    <ul className="flex flex-col gap-2 px-4 py-6 text-gray-500">
      {MENU_LIST.map((el) => {
        const isActive = curId === el.id;
        return (
          <li key={el.id}>
            <div
              className={clsx(
                "flex justify-between items-center h-11 px-3 rounded-md transition-default hover:cursor-pointer hover:bg-primary-50 hover:text-primary-500",
                {
                  "bg-primary-50 text-primary-500": isActive,
                  "rounded-b-none": layoutState && isActive && curId !== 1,
                }
              )}
              onClick={() => handleClick(el.id)}
            >
              <div className="shrink-0 flex gap-3">
                <div className=" flex-center w-6">
                  <FontAwesomeIcon className="text-xl" icon={el.icon} />
                </div>
                <div
                  className={clsx("font-semibold transition-default", {
                    "opacity-0": !layoutState,
                  })}
                >
                  {el.main}
                </div>
              </div>
              {layoutState && el.id > 1 && (
                <div className="flex-center w-5">
                  <FontAwesomeIcon
                    className={clsx("text-xs transition-default", {
                      "rotate-90": isActive,
                    })}
                    icon={faAngleRight}
                  />
                </div>
              )}
            </div>
            {el.id > 1 && (
              <ul
                className={clsx(
                  "relative flex flex-col justify-center bg-primary-50 bg-opacity-40 rounded-b-md overflow-hidden transition-default",
                  {
                    "h-24": layoutState && isActive,
                    "h-0": !layoutState || !isActive,
                  }
                )}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[29px] border-r border-r-primary-100 border-dashed opacity-50" />
                {el.sub.map((el) => {
                  const isActive = pathname === el.href;
                  return (
                    <li
                      className={clsx(
                        "flex items-center gap-3 h-9 px-3 hover:cursor-pointer",
                        {
                          hidden: !layoutState,
                        }
                      )}
                      key={el.id}
                      onClick={() => router.push(el.href)}
                    >
                      <div
                        className={clsx(
                          "relative flex-center w-8 text-[10px]",
                          {
                            "text-primary-500": isActive,
                            "text-primary-50": !isActive,
                          }
                        )}
                      >
                        ●
                      </div>
                      <div
                        className={clsx("text-sm font-medium", {
                          "text-primary-500": isActive,
                        })}
                      >
                        {el.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
