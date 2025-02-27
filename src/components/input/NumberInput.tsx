import { BannerFormType } from "@/types/formType";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface NumberInputProps {
  inputValue: BannerFormType;
  setInputValue: Dispatch<SetStateAction<BannerFormType>>;
  message: string;
}

export default function NumberInput({
  inputValue,
  setInputValue,
  message,
}: NumberInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = Number(value);

    if (value === "" || (numberValue >= 1 && numberValue <= 99)) {
      setInputValue({ ...inputValue, [name]: value });
    }
  };

  return (
    <div className="flex items-end gap-5">
      <input
        className="h-12 p-4 border border-gray-200 rounded-md outline-none placeholder:text-sm"
        name="order"
        type="number"
        placeholder="숫자를 입력하세요."
        value={inputValue.order}
        onChange={handleChange}
      />
      <ul>
        {message.split("\n").map((char, idx) => {
          return (
            <li key={idx} className="text-sm text-primary-500">
              {char}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
