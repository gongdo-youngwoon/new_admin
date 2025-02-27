import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ChangeEvent } from "react";

const COLOR_PALETTE = [
  { id: 1, color: "#1E3A8A" },
  { id: 2, color: "#bb2648" },
  { id: 3, color: "#88af4b" },
  { id: 4, color: "#92a9d1" },
  { id: 5, color: "#939597" },
  { id: 6, color: "#ff6f61" },
  { id: 7, color: "#5f4b8b" },
  { id: 8, color: "#96504c" },
  { id: 9, color: "#efc05a" },
  { id: 10, color: "#009572" },
  { id: 11, color: "#222222" },
  { id: 12, color: "#ffffff" },
];

interface ColorPickerProps {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

export default function ColorPicker({
  name,
  value,
  handleChange,
  handleClick,
}: ColorPickerProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    handleClick();
  };
  return (
    <ul className="absolute top-20 w-full grid grid-cols-4 gap-6 p-6 bg-white border border-gray-200 shadow-md rounded-md z-10">
      {COLOR_PALETTE.map((color) => {
        return (
          <li className="flex-center" key={color.id}>
            <label
              htmlFor={color.color}
              className={clsx(
                "flex-center size-10 rounded-full transition-default hover:cursor-pointer",
                {
                  "border border-gray-200": color.color === "#ffffff",
                }
              )}
              style={{ backgroundColor: color.color }}
            >
              {color.color.slice(1) === value && (
                <FontAwesomeIcon
                  className={clsx("text-lg", {
                    "text-gray-800": color.color === "#ffffff",
                    "text-white": color.color !== "#ffffff",
                  })}
                  icon={faCheck}
                />
              )}
            </label>
            <input
              className="hidden"
              id={color.color}
              name={name}
              type="radio"
              value={color.color.slice(1)}
              onChange={handleInputChange}
            />
          </li>
        );
      })}
    </ul>
  );
}
