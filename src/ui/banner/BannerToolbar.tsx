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
import BannerFilterModal from "@/components/modal/BannerFilterModal";
import BannerSortModal from "@/components/modal/BannerSortModal";
import HoverIcon from "@/components/common/HoverIcon";
import BannerSetting from "./BannerSetting";

interface BannerToolbarProps {
  checkList: string[];
}

export default function BannerToolbar({ checkList }: BannerToolbarProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isApplied = Boolean(searchParams.get("display"));

  const handleSearchMode = () => {
    setSearchMode((prev) => !prev);
  };

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
    <div className="relative h-20 bg-white border-b border-b-gray-200 text-gray-500">
      <form
        className={clsx(
          "flex justify-between items-center gap-5 h-full px-7 transition-default",
          {
            "opacity-0 invisible": !searchMode,
            "opacity-100 visible": searchMode,
          }
        )}
        onSubmit={handleSubmit}
      >
        <FontAwesomeIcon
          className="hover:cursor-pointer"
          icon={faArrowLeft}
          onClick={handleSearchMode}
        />
        <input
          className="flex-1 outline-none placeholder:text-sm"
          type="text"
          placeholder="배너 제목을 입력하여 관련 배너를 찾아보세요."
          value={searchTerm}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          className="hover:cursor-pointer"
          icon={faMagnifyingGlass}
          onClick={() => handleSearch(searchTerm)}
        />
        <button className="hidden" />
      </form>
      <div
        className={clsx(
          "absolute inset-0 flex justify-between items-center h-full px-6 transition-default",
          {
            "opacity-0 invisible": searchMode,
            "opacity-100 visible": !searchMode,
          }
        )}
      >
        {checkList.length > 0 ? (
          <BannerSetting checkList={checkList} />
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
          <HoverIcon icon={faSliders} isApplied={isApplied}>
            {(handleModal) => <BannerFilterModal handleModal={handleModal} />}
          </HoverIcon>
          <HoverIcon icon={faSort}>
            {(handleModal) => <BannerSortModal handleModal={handleModal} />}
          </HoverIcon>
          <div
            className="flex-center size-10 hover:cursor-pointer"
            onClick={() => replace("/banner")}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </div>
        </div>
      </div>
    </div>
  );
}
