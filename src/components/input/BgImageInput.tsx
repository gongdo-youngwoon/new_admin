import Image from "next/image";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { BannerFormType } from "@/types/formType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

interface BgImageInputProps {
  label?: string;
  inputValue: BannerFormType;
  setInputValue: Dispatch<SetStateAction<BannerFormType>>;
  error: string[] | undefined;
}

export default function BgImageInput({
  label,
  inputValue,
  setInputValue,
  error,
}: BgImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setInputValue({ ...inputValue, previewImage: fileUrl, imageFile: file });
    }
  };

  const handleDelete = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setInputValue({ ...inputValue, previewImage: "", imageFile: null });
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <div className="text-gray-800 text-sm">{label}</div>}
      <div className="flex items-end gap-6">
        <input
          className="hidden"
          ref={fileRef}
          id="bg"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        />
        {inputValue.previewImage ? (
          <div className="relative w-[480px] h-[192px]">
            <Image
              className="object-cover"
              src={inputValue.previewImage}
              alt="배경 이미지"
              fill
              sizes="480px"
            />
            <div className="absolute left-0 right-0 bottom-0 grid grid-cols-3 h-12 bg-black bg-opacity-55 text-gray-300">
              <div className="flex-center hover:cursor-pointer hover:bg-black">
                <FontAwesomeIcon className="text-lg" icon={faMagnifyingGlass} />
              </div>
              <label
                className="flex-center hover:cursor-pointer hover:bg-black"
                htmlFor="bg"
              >
                <FontAwesomeIcon className="text-lg" icon={faPenToSquare} />
              </label>
              <div
                className="flex-center hover:cursor-pointer hover:bg-black"
                onClick={handleDelete}
              >
                <FontAwesomeIcon className="text-xl" icon={faXmark} />
              </div>
            </div>
          </div>
        ) : (
          <label
            className={clsx(
              "flex-center block w-[480px] h-[192px] border border-dashed hover:cursor-pointer",
              {
                "border-gray-300": !error,
                "border-error": error,
              }
            )}
            htmlFor="bg"
          >
            <FontAwesomeIcon className="text-gray-400 text-2xl" icon={faPlus} />
          </label>
        )}
        <div className="flex flex-col gap-1 text-sm text-primary-500">
          <p>권장 크기: 1280 ✕ 520 (단위 px)</p>
          <p>jpg, jpeg, png 형식의 이미지만 등록됩니다.</p>
        </div>
      </div>
      {error && !inputValue.imageFile && (
        <ul className="flex flex-col gap-1">
          {error.map((el, idx) => {
            return (
              <p key={idx} className="text-sm text-error">
                {el}
              </p>
            );
          })}
        </ul>
      )}
    </div>
  );
}
