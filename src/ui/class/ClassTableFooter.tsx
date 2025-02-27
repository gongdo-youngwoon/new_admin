import { ClassSchema } from "@/api/classApi";
import SeeMoreButton from "@/components/button/SeeMoreButton";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

interface ClassTableFooterProps {
  isFetching: boolean;
  isFetched: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<ClassSchema[], unknown>, Error>
  >;
}

export default function ClassTableFooter({
  isFetching,
  isFetched,
  hasNextPage,
  fetchNextPage,
}: ClassTableFooterProps) {
  return (
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
          더 이상 불러올 클래스 리스트가 없습니다.
        </p>
      )}
    </div>
  );
}
