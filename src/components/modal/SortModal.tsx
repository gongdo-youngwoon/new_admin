import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface SortModalProps {
  handleModal: () => void;
}

export default function SortModal({ handleModal }: SortModalProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryParameterValue = searchParams.get("order");
  const parsedValue = queryParameterValue ? queryParameterValue.split("_") : [];
  const orderBy = parsedValue[0];
  const orderValue = parsedValue[1];

  const handleSort = (orderBy: string, orderValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", `${orderBy}_${orderValue}`);
    replace(`${pathname}?${params.toString()}`);
    handleModal();
  };

  return (
    <div
      className="absolute top-8 right-1/2 w-36 py-2 bg-white border border-gray-200
    text-gray-500 text-sm rounded-lg shadow-md z-10"
    >
      <div className="flex items-center h-9 px-4 font-bold">등록일 기준</div>
      <ul className="*:flex *:justify-between *:items-center *:px-4 *:h-9">
        <li
          className="hover:cursor-pointer hover:bg-gray-100 hover:text-primary-400 hover:font-semibold"
          onClick={() => handleSort("created", "desc")}
        >
          <div>내림차순</div>
          {(!queryParameterValue ||
            (orderBy === "created" && orderValue === "desc")) && (
            <FontAwesomeIcon className="" icon={faCheck} />
          )}
        </li>
        <li
          className="hover:cursor-pointer hover:bg-gray-100 hover:text-primary-400 hover:font-semibold"
          onClick={() => handleSort("created", "asc")}
        >
          <div>오름차순</div>
          {orderBy === "created" && orderValue === "asc" && (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </li>
      </ul>
    </div>
  );
}
