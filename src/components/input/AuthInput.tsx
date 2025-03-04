import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface AuthInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  error: string[] | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
  label,
  name,
  placeholder,
  value,
  error,
  handleChange,
}: AuthInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => setIsVisible((prev) => !prev);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-500 font-semibold">
        <span className="mr-1 text-sm">{label}</span>
        <span className="text-error">•</span>
      </label>
      <div
        className={clsx(
          "flex items-center h-12 px-4 border rounded-md transition-default has-[:focus]:ring",
          {
            "border-gray-200 has-[:focus]:border-primary-500 has-[:focus]:ring-primary-50":
              !error || value.length > 0,
            "border-error has-[:focus]:border-error has-[:focus]:ring-red-50":
              error && value.length === 0,
          }
        )}
      >
        <input
          className="flex-1 h-full outline-none text-sm text-gray-800 placeholder:text-xs"
          name={name}
          type={name === "email" ? name : isVisible ? "text" : name}
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          onChange={handleChange}
        />
        {name === "password" && (
          <FontAwesomeIcon
            className="text-gray-500 hover:cursor-pointer"
            icon={isVisible ? faEye : faEyeSlash}
            onClick={handleClick}
          />
        )}
      </div>
      {error && value.length === 0 && (
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
