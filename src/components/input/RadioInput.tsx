import clsx from "clsx";
import { ChangeEvent } from "react";

interface RadioInputProps {
  name: string;
  value: string;
  option: {
    id: number;
    label: string;
    value: string;
  }[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput({
  name,
  value,
  option,
  handleChange,
}: RadioInputProps) {
  return (
    <ul className="flex gap-10">
      {option.map((el) => {
        const isChecked = value === el.value;
        return (
          <li className="flex items-center gap-2" key={el.id}>
            <input
              className="hidden"
              id={el.label}
              type="radio"
              name={name}
              value={el.value}
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
              htmlFor={el.label}
            >
              {isChecked && <div className="size-2 bg-white rounded-full" />}
            </label>
            <div className="text-gray-800 text-sm">{el.label}</div>
          </li>
        );
      })}
    </ul>
  );
}
