"use client";

import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faRotateLeft,
  faSliders,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import HoverIcon from "@/components/common/HoverIcon";
import ClassFilterModal from "@/components/modal/ClassFilterModal";
import ClassSortModal from "@/components/modal/ClassSortModal";
import ClassSetting from "./ClassSetting";

interface ClassToolbarProps {
  checkList: string[];
}

export default function ClassTableToolbar({ checkList }: ClassToolbarProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchMode = () => setSearchMode((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchTerm("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchTerm("");
  };

  return (
    <div className="sticky top-16 h-20 bg-white border-b border-b-gray-200 text-gray-500 z-10">
      {searchMode && (
        <div className="fixed inset-0 z-10" onClick={handleSearchMode} />
      )}
      <form
        className={clsx(
          "absolute inset-0 flex justify-between items-center gap-5 px-7 z-10 transition-default",
          {
            "opacity-0 invisible": !searchMode,
            "opacity-100 visible": searchMode,
          }
        )}
        onSubmit={handleSubmit}
      >
        <div className="grow flex items-center gap-5">
          <FontAwesomeIcon
            className="hover:cursor-pointer"
            icon={faArrowLeft}
            onClick={handleSearchMode}
          />
          <input
            className="grow outline-none placeholder:text-sm"
            type="text"
            placeholder="태그를 입력하여 관련 클래스를 찾아보세요."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <button />
        <FontAwesomeIcon
          className="hover:cursor-pointer"
          icon={faMagnifyingGlass}
          onClick={() => handleSearch(searchTerm)}
        />
      </form>
      <div
        className={clsx(
          "flex justify-between items-center h-full px-4 transition-default",
          {
            "opacity-0 invisible": searchMode,
            "opacity-100 visible": !searchMode,
          }
        )}
      >
        {checkList.length > 0 ? (
          <ClassSetting checkList={checkList} />
        ) : (
          <div />
        )}
        <div className="flex items-center h-[36px]">
          <FontAwesomeIcon
            className="hover:cursor-pointer"
            icon={faMagnifyingGlass}
            onClick={handleSearchMode}
          />
          <div className="w-[1px] h-full ml-6 mr-4 bg-gray-200" />
          <HoverIcon icon={faSliders}>
            {(handleModal) => <ClassFilterModal handleModal={handleModal} />}
          </HoverIcon>
          <HoverIcon icon={faSort}>
            {(handleModal) => <ClassSortModal handleModal={handleModal} />}
          </HoverIcon>
          <div
            className="flex-center size-10 hover:cursor-pointer"
            onClick={() => replace("/class")}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </div>
        </div>
      </div>
    </div>
  );
}
