import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { isValidHexColor } from "@/lib/validator";
import ColorPicker from "../modal/ColorPicker";

interface ColorInputProps {
  label: string;
  name: string;
  value: string;
  error: string[] | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorInput({
  label,
  name,
  value,
  error,
  handleChange,
}: ColorInputProps) {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => setIsOpened((prev) => !prev);

  const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
  const isHexColor = hexColorRegex.test(value);

  return (
    <div className="relative flex flex-col gap-2 w-72">
      <div className="text-sm text-gray-800">{label}</div>
      <div
        className={clsx(
          "flex items-center gap-2 h-12 px-4 border rounded-md transition-default",
          {
            "border-gray-200 has-[:focus]:ring has-[:focus]:ring-primary-50 has-[:focus]:border-primary-500":
              !error || isValidHexColor(value),
            "border-error ring ring-red-50": !(
              !error || isValidHexColor(value)
            ),
          }
        )}
      >
        <div
          style={{ backgroundColor: isHexColor ? `#${value}` : "#ffffff" }}
          className="size-7 border border-gray-200 rounded-full hover:cursor-pointer"
          onClick={handleClick}
        />
        <div className="text-gray-800 text-lg font-semibold">#</div>
        <input
          className="flex-1 text-gray-800 outline-none placeholder:text-sm"
          type="text"
          name={name}
          value={value}
          placeholder="16진수 색상 코드의 형식 (ex. ffffff)"
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      {error && !isValidHexColor(value) && (
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
      {isOpened && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleClick} />
          <ColorPicker
            name={name}
            value={value}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
}
