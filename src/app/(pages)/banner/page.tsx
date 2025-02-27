import ListPageHeader from "@/components/common/ListPageHeader";
import BannerTable from "@/ui/banner/BannerTable";
import SuccessAlert from "@/components/alert/SuccessAlert";

export default function BannerListPage() {
  return (
    <>
      <ListPageHeader
        title="배너 조회"
        desc="모든 배너를 한눈에 확인하고, 쉽게 탐색하고 관리할 수 있습니다."
        action="배너 등록"
        href="/banner/create"
      />
      <BannerTable />
      <SuccessAlert />
    </>
  );
}
