"use client";

import { useState } from "react";
import { ClassFormType } from "@/types/formType";
import FormAccordion from "@/components/common/FormAccordion";
import TagInput from "@/components/input/TagInput";
import ImageInput from "@/components/input/ImageInput";
import LevelInput from "@/components/input/LevelInput";
import ClassTitleInputSection from "./ClassTitleInputSection";
import ClassDescInputSection from "./ClassDescInputSection";

const initialValue: ClassFormType = {
  previewImage: "",
  imageFile: null,
  tags: [],
  level: 1,
};

export default function ClassCreateForm() {
  const [inputValue, setInputValue] = useState(initialValue);

  console.log(inputValue);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <FormAccordion isChecked={inputValue.tags.length > 0} label="제목">
        <ClassTitleInputSection />
      </FormAccordion>
      <FormAccordion isChecked={inputValue.tags.length > 0} label="설명">
        <ClassDescInputSection />
      </FormAccordion>
      <FormAccordion isChecked={inputValue.tags.length > 0} label="주요 정보">
        <ClassTitleInputSection />
      </FormAccordion>
      <FormAccordion isChecked={inputValue.tags.length > 0} label="태그">
        <TagInput inputValue={inputValue} setInputValue={setInputValue} />
      </FormAccordion>
      <FormAccordion isChecked={true} label="난이도">
        <LevelInput inputValue={inputValue} setInputValue={setInputValue} />
      </FormAccordion>
      <FormAccordion
        isChecked={Boolean(inputValue.previewImage)}
        label="이미지"
      >
        <ImageInput inputValue={inputValue} setInputValue={setInputValue} />
      </FormAccordion>
      <FormAccordion isChecked={inputValue.tags.length > 0} label="커리큘럼">
        <ClassTitleInputSection />
      </FormAccordion>
      <FormAccordion isChecked={inputValue.tags.length > 0} label="전시 설정">
        <ClassTitleInputSection />
      </FormAccordion>
      <div className="fixed left-0 right-0 bottom-0 h-16 bg-white border-t border-t-gray-200"></div>
    </div>
  );
}
