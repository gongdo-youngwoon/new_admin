import clsx from "clsx";
import { ChangeEvent } from "react";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder: string;
  value: string;
  limit: number;
  message?: string;
  error: string[] | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  label,
  name,
  placeholder,
  value,
  limit,
  message,
  error,
  handleChange,
}: TextInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= limit + 1) {
      handleChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-sm">
      {label && <label>{label}</label>}
      <div
        className={clsx(
          "flex items-center gap-2 h-12 px-4 border rounded-md transition-default",
          {
            "border-gray-200 has-[:focus]:ring has-[:focus]:ring-primary-50 has-[:focus]:border-primary-500":
              !(value.length > limit || (error && value.length === 0)),
            "border-error ring ring-red-50":
              value.length > limit || (error && value.length === 0),
          }
        )}
      >
        <input
          className="w-full h-full text-sm outline-none placeholder:text-sm"
          name={name}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
        />
        <div className="text-gray-400">
          {value ? value.length : 0}/{limit}
        </div>
      </div>
      {value.length > limit && (
        <p className="text-error">{limit}자 이내로 입력해 주세요.</p>
      )}
      {error && value.length === 0 && (
        <ul className="flex flex-col gap-1">
          {error.map((el, idx) => {
            return (
              <p key={idx} className="text-error">
                {el}
              </p>
            );
          })}
        </ul>
      )}
      {message && <p className="text-primary-500">{message}</p>}
    </div>
  );
}
