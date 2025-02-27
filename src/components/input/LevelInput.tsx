import { ClassFormType } from "@/types/formType";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const LEVEL = [
  { id: 1, label: "입문", value: 1 },
  { id: 2, label: "초급", value: 2 },
  { id: 3, label: "중급", value: 3 },
  { id: 4, label: "심화", value: 4 },
];

interface LevelInputProps {
  inputValue: ClassFormType;
  setInputValue: Dispatch<SetStateAction<ClassFormType>>;
}

export default function LevelInput({
  inputValue,
  setInputValue,
}: LevelInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue({ ...inputValue, level: Number(value) });
  };
  return (
    <ul className="flex gap-10">
      {LEVEL.map((level) => {
        const isChecked = inputValue.level === level.value;
        return (
          <li className="flex items-center gap-2" key={level.id}>
            <input
              className="hidden"
              id={`level-${level.id}`}
              type="radio"
              name="level"
              value={level.value}
              onChange={handleChange}
            />
            <label
              className={clsx(
                "flex-center size-6 border-2 border-gray-300 rounded-full hover:cursor-pointer",
                {
                  "bg-primary-500 border-primary-500 ring ring-primary-50":
                    isChecked,
                  "": isChecked,
                }
              )}
              htmlFor={`level-${level.id}`}
            >
              {isChecked && <div className="size-2 bg-white rounded-full" />}
            </label>
            <div className="text-gray-800 text-sm">{level.label}</div>
          </li>
        );
      })}
    </ul>
  );
}
