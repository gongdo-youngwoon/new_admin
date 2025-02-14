import ListPageHeader from "@/components/common/ListPageHeader";
import QueryModifier from "@/components/query/QueryModifier";
import ClassTable from "@/ui/class/ClassTable";

export default function ClassListPage() {
  return (
    <div>
      <ListPageHeader
        title="클래스 조회"
        desc="모든 클래스를 한눈에 확인하고, 쉽게 탐색하고 관리할 수 있습니다."
        action="클래스 등록"
        href="/class/create"
      />
      <div className="bg-white border border-gray-200 rounded-md">
        <QueryModifier placeholder="태그를 입력하여 관련 클래스를 찾아보세요" />
        <ClassTable />
      </div>
    </div>
  );
}
