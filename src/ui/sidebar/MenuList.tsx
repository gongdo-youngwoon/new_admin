import { faHouse, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MENU_LIST = [
  {
    id: 1,
    icon: faHouse,
    menu: "대시보드",
  },
  {
    id: 2,
    icon: faImages,
    menu: "배너 관리",
  },
  {
    id: 3,
    icon: faHouse,
    menu: "클래스 관리",
  },
];

export default function MenuList() {
  return (
    <ul>
      {MENU_LIST.map((el) => {
        return (
          <li className="flex items-center text-gray-500" key={el.id}>
            <div className="flex-center w-[28px]">
              <FontAwesomeIcon className="text-[24px]" icon={el.icon} />
            </div>
            <div className="text-[18px] font-semibold">{el.menu}</div>
          </li>
        );
      })}
    </ul>
  );
}
