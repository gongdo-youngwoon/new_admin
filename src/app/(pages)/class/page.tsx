import ListPageHeader from "@/components/common/ListPageHeader";
import ClassTable from "@/ui/class/ClassTable";
import SuccessAlert from "@/components/alert/SuccessAlert";

export default function ClassListPage() {
  return (
    <>
      <ListPageHeader
        title="클래스 조회"
        desc="모든 클래스를 한눈에 확인하고, 쉽게 탐색하고 관리할 수 있습니다."
        action="클래스 등록"
        href="/class/create"
      />
      <ClassTable />
      <SuccessAlert />
    </>
  );
}
