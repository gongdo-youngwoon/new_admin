import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ListPageHeaderProps {
  title: string;
  desc: string;
  action: string;
  href: string;
}

export default function ListPageHeader({
  title,
  desc,
  action,
  href,
}: ListPageHeaderProps) {
  return (
    <div className="flex justify-between items-center pb-7">
      <div>
        <h1 className="mb-2 text-gray-700 text-2xl font-bold">{title}</h1>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <Link
        href={href}
        className="flex-center gap-3 h-10 px-6 bg-primary-500 text-white text-sm rounded-md"
      >
        <FontAwesomeIcon icon={faPlus} />
        <div className="text-sm">{action}</div>
      </Link>
    </div>
  );
}
