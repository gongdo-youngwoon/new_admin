import ClassCreateForm from "@/ui/class/create/ClassCreateForm";

export default function ClassCreatePage() {
  return (
    <>
      <div className="flex flex-col gap-2 mb-7">
        <div className="flex items-center gap-5">
          <h1 className="text-gray-700 text-2xl font-bold">클래스 등록</h1>
          <div className="flex items-center gap-1 text-error">
            <div className="text-[8px]">●</div>
            <div>필수항목</div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {
            "필수 정보를 정확히 입력하신 후 '등록' 버튼을 클릭하여 새로운 클래스를 등록해 보세요."
          }
        </p>
      </div>
      <ClassCreateForm />
    </>
  );
}
