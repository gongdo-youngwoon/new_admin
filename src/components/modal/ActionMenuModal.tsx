import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface ActionMenuModalProps {
  href: string;
}

export default function ActionMenuModal({ href }: ActionMenuModalProps) {
  const router = useRouter();
  return (
    <div
      className="absolute top-7 right-1/2 w-40 py-2 border border-gray-200 bg-white text-sm text-gray-500
      shadow-md rounded-lg z-10 *:flex *:items-center *:gap-4 *:h-10 *:p-5"
    >
      <div
        className="hover:bg-gray-100 hover:text-primary-400 hover:font-semibold hover:cursor-pointer transition-default"
        onClick={() => router.push(href)}
      >
        <div className="w-4 text-base">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div>수정</div>
      </div>
      <div className="hover:bg-gray-100 hover:text-primary-400 hover:font-semibold hover:cursor-pointer transition-default">
        <div className="w-4 text-base">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
        <div>삭제</div>
      </div>
    </div>
  );
}
