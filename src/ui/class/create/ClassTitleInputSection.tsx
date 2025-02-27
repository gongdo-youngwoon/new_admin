import TextInput from "@/components/input/TextInput";

export default function ClassTitleInputSection() {
  return (
    <div className="flex flex-col">
      <TextInput
        label="짧은 제목"
        placeholder="제목을 입력하세요."
        message="리스트 페이지에 표시될 짧은 제목을 입력하세요. (최대 30자)"
        limit={30}
      />
      <TextInput
        label="긴 제목"
        placeholder="제목을 입력하세요."
        message="상세 페이지에 표시될 긴 제목을 입력하세요. (최대 100자)"
        limit={100}
      />
    </div>
  );
}
