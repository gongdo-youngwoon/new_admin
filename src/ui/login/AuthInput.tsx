interface AuthInputProps {
  label: string;
  placeholder: string;
}

export default function AuthInput({ label, placeholder }: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-500 font-semibold">
        <span className="mr-1 text-sm">{label}</span>
        <span className="text-error">•</span>
      </label>
      <div
        className="flex-center h-11 px-4 border border-gray-200 rounded-md transition-default
      has-[:focus]:border-primary-500 has-[:focus]:ring has-[:focus]:ring-primary-50"
      >
        <input
          className="w-full outline-none placeholder:text-xs"
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
