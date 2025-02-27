"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClassList } from "@/api/classApi";
import ClassListLoading from "./ClassListLoading";
import ClassTableToolbar from "./ClassTableToolbar";
import ClassTableBody from "./ClassTableBody";
import ClassTableFooter from "./ClassTableFooter";

export default function ClassTable() {
  const [checkList, setCheckList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const queryObj = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isFetching, isFetched, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["classList", queryObj],
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        getClassList(pageParam, queryObj),
      getNextPageParam: (lastPage) =>
        lastPage.length === 0 ? null : lastPage[lastPage.length - 1].id,
      initialPageParam: null,
    });

  if (isLoading) {
    return <ClassListLoading checkList={checkList} />;
  }

  return (
    <div className="bg-white border border-gray-200">
      <ClassTableToolbar checkList={checkList} />
      <ClassTableBody
        data={data ? data.pages : []}
        checkList={checkList}
        setCheckList={setCheckList}
      />
      <ClassTableFooter
        isFetching={isFetching}
        isFetched={isFetched}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
