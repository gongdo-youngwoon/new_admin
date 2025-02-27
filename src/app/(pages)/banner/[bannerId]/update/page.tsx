import BannerUpdateForm from "@/ui/banner/update/BannerUpdateForm";

export default function BannerUpdatePage() {
  return (
    <>
      <div className="flex flex-col gap-2 mb-7">
        <div className="flex items-center gap-5">
          <h1 className="text-gray-700 text-2xl font-bold">배너 수정</h1>
          <div className="flex items-center gap-1 text-error">
            <div className="text-[8px]">●</div>
            <div>필수항목</div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {
            "수정할 항목을 정확히 입력하신 후 '저장' 버튼을 클릭하여 배너 정보를 업데이트하세요."
          }
        </p>
      </div>
      <BannerUpdateForm />
    </>
  );
}
