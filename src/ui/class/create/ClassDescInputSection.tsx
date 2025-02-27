import TextInput from "@/components/input/TextInput";

export default function ClassDescInputSection() {
  return (
    <div className="flex flex-col gap-8">
      <TextInput
        label="짧은 설명"
        placeholder="설명을 입력하세요."
        message="리스트 페이지에 표시될 짧은 설명을 입력하세요. (최대 30자)"
        limit={30}
      />
      <TextInput
        label="긴 설명"
        placeholder="설명을 입력하세요."
        message="상세 페이지에 표시될 긴 설명을 입력하세요. (최대 100자)"
        limit={100}
      />
    </div>
  );
}
