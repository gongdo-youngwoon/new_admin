"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClassList } from "@/api/classApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ClassTableHeader from "./ClassTableHeader";
import ClassTableBody from "./ClassTableBody";
import SeeMoreButton from "@/components/button/SeeMoreButton";

export default function ClassTable() {
  const [checkList, setCheckList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const queryObj = {
    search: searchParams.get("search"),
    order: searchParams.get("order"),
    type: searchParams.get("type"),
    level: searchParams.get("level"),
    recommend: searchParams.get("recommend"),
    display: searchParams.get("display"),
  };

  const { data, isLoading, isFetching, isFetched, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["classList", queryObj],
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        getClassList(pageParam, queryObj),
      getNextPageParam: (lastPage) =>
        lastPage.length === 0 ? null : lastPage[lastPage.length - 1].id,
      initialPageParam: null,
    });

  const handleCheck = (targetId: string) => {
    if (checkList.includes(targetId)) {
      setCheckList(checkList.filter((id) => id !== targetId));
    } else {
      setCheckList([...checkList, targetId]);
    }
  };

  const handleAllCheck = (ids: string[]) => {
    setCheckList(ids);
  };

  if (isLoading) {
    return (
      <>
        <ClassTableHeader data={[]} handleAllCheck={handleAllCheck} />
        <div className="flex-center h-[624px]">
          <FontAwesomeIcon
            className="text-4xl text-gray-500"
            icon={faSpinner}
            spinPulse
          />
        </div>
        <div className="h-20" />
      </>
    );
  }

  return (
    <>
      <ClassTableHeader
        data={data ? data.pages : []}
        handleAllCheck={handleAllCheck}
      />
      <ClassTableBody
        data={data ? data.pages : []}
        checkList={checkList}
        handleCheck={handleCheck}
      />
      <div className="flex items-center h-20 px-7">
        {isFetched && hasNextPage ? (
          <SeeMoreButton
            isFetching={isFetching}
            handleClick={() => {
              fetchNextPage();
            }}
          />
        ) : (
          <p className="text-gray-500 text-sm">
            더 이상 불러올 클래스가 없습니다.
          </p>
        )}
      </div>
    </>
  );
}
