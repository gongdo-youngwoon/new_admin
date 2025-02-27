"use client";

import { ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isValidHexColor } from "@/lib/validator";
import { BannerFormType } from "@/types/formType";
import { getBanner, updateBanner } from "@/api/bannerApi";
import { bannerFormError } from "@/types/errorType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAlertStore } from "@/store/alertStore";
import FormAccordion from "@/components/common/FormAccordion";
import ColorInput from "@/components/input/ColorInput";
import TextInput from "@/components/input/TextInput";
import BgImageInput from "@/components/input/BgImageInput";
import NumberInput from "@/components/input/NumberInput";
import RadioInput from "@/components/input/RadioInput";

const initialValue: BannerFormType = {
  title: "",
  desc: "",
  cta: "",
  bgColor: "",
  textColor: "",
  previewImage: "",
  imageFile: null,
  link: "",
  order: "",
  display: "Y",
};

export default function BannerUpdateForm() {
  const [inputValue, setInputValue] = useState(initialValue);
  const showSuccessAlert = useAlertStore((state) => state.showSuccessAlert);
  const router = useRouter();
  const orderGuideMessage =
    "설정한 숫자가 낮을수록 전시 우선순위가 높습니다.\n미입력 시 기본값인 99가 자동으로 등록됩니다.";
  const params = useParams();
  const bannerId = params.bannerId;

  const { isLoading } = useQuery({
    queryKey: ["bannerDetail", bannerId],
    queryFn: async () => {
      const result = await getBanner(bannerId);
      setInputValue({
        ...initialValue,
        title: result.title,
        desc: result.content,
        cta: result.action.label,
        bgColor: result.bgColor.slice(1),
        textColor: result.textColor.slice(1),
        previewImage: result.image,
        link: result.action.url,
        order: result.order.toString(),
        display: result.display ? "Y" : "N",
      });
      return result;
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      router.push("/banner");
      showSuccessAlert("배너 정보가 정상적으로 수정되었습니다.");
    },
  });
  const handleMutate = () => {
    mutate({ bannerId, formData: inputValue });
  };

  const errors: bannerFormError | null = error
    ? JSON.parse(error.message)
    : null;

  const isTitleValid =
    inputValue.title.length > 0 && inputValue.title.length < 51;
  const isDescValid =
    inputValue.desc.length > 0 && inputValue.desc.length < 101;
  const isCtaValid = inputValue.cta.length > 0 && inputValue.cta.length < 11;
  const isColorValid =
    isValidHexColor(inputValue.bgColor) &&
    isValidHexColor(inputValue.textColor);
  const isLinkValid =
    inputValue.link.length > 0 && inputValue.link.length < 500;
  const isOrderValid =
    Number(inputValue.order) > 0 && Number(inputValue.order) <= 99;

  if (isLoading) {
    return (
      <div className="flex-center h-96">
        <FontAwesomeIcon
          className="text-4xl text-gray-500"
          icon={faSpinner}
          spinPulse
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={isTitleValid}
        label="제목"
      >
        <TextInput
          name="title"
          placeholder="배너 제목을 입력하세요."
          value={inputValue.title}
          limit={41}
          handleChange={handleChange}
          error={errors?.title}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={isDescValid}
        label="설명"
      >
        <TextInput
          name="desc"
          placeholder="배너 설명을 입력하세요."
          value={inputValue.desc}
          limit={168}
          handleChange={handleChange}
          error={errors?.desc}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={isCtaValid}
        label="행동 유도 문구"
      >
        <TextInput
          name="cta"
          placeholder="특정 행동을 유도하는 문구를 입력하세요. (ex. 자세히 보기)"
          value={inputValue.cta}
          limit={10}
          handleChange={handleChange}
          error={errors?.cta}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={isColorValid}
        label="색상"
      >
        <div className="flex gap-8">
          <ColorInput
            label="배경 색상"
            name="bgColor"
            value={inputValue.bgColor}
            handleChange={handleChange}
            error={errors?.bgColor}
          />
          <ColorInput
            label="문구 색상"
            name="textColor"
            value={inputValue.textColor}
            handleChange={handleChange}
            error={errors?.textColor}
          />
        </div>
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={Boolean(inputValue.imageFile)}
        label="배경 이미지"
      >
        <BgImageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          error={errors?.imageFile}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={isLinkValid}
        label="링크 주소"
      >
        <TextInput
          name="link"
          placeholder="배너 클릭 시 이동할 주소를 입력하세요. (ex. https://gongdo.kr)"
          value={inputValue.link}
          limit={500}
          handleChange={handleChange}
          error={errors?.link}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={false}
        isChecked={isOrderValid}
        label="전시 순서"
      >
        <NumberInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          message={orderGuideMessage}
        />
      </FormAccordion>
      <FormAccordion
        isOpened={true}
        isRequired={true}
        isChecked={true}
        label="전시 상태"
      >
        <RadioInput
          name="display"
          value={inputValue.display}
          option={[
            { id: 1, label: "전시중", value: "Y" },
            { id: 2, label: "전시중지", value: "N" },
          ]}
          handleChange={handleChange}
        />
      </FormAccordion>
      <div
        className="fixed left-0 right-0 bottom-0 flex justify-end items-center gap-2 h-20 px-8 bg-white border-t border-t-gray-200 text-sm
        *:flex-center *:w-24 *:h-12"
      >
        <div className="bg-white border border-gray-200 text-gray-600 rounded-md hover:cursor-pointer">
          미리보기
        </div>
        <div
          className="bg-primary-500 text-white rounded-md hover:cursor-pointer"
          onClick={handleMutate}
        >
          {isPending ? (
            <FontAwesomeIcon className="text-xl" icon={faSpinner} spinPulse />
          ) : (
            "저장"
          )}
        </div>
        <div
          className="bg-gray-200 text-gray-600 rounded-md hover:cursor-pointer"
          onClick={() => router.push("/banner")}
        >
          취소
        </div>
      </div>
    </div>
  );
}
