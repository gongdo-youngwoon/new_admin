"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBannerList } from "@/api/bannerApi";
import BannerToolbar from "./BannerToolbar";
import BannerListHeader from "./BannerListHeader";
import BannerList from "./BannerList";
import SeeMoreButton from "@/components/button/SeeMoreButton";
import BannerListLoading from "./BannerListLoading";

export default function BannerTable() {
  const [checkList, setCheckList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const queryObj = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isFetching, isFetched, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["bannerList", queryObj],
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        getBannerList(pageParam, queryObj),
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
    return <BannerListLoading checkList={checkList} />;
  }

  return (
    <div className="bg-white border border-gray-200">
      <BannerToolbar checkList={checkList} />
      <BannerListHeader
        data={data ? data.pages : []}
        handleAllCheck={handleAllCheck}
      />
      <BannerList
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
            더 이상 불러올 배너 리스트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
