import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authApi";
import { LoginFormError } from "@/types/errorType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import blackLogo from "@/assets/images/logo_black.png";
import AuthInput from "../../components/input/AuthInput";

const initialValue = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [inputValue, setInputValue] = useState(initialValue);
  const { replace } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => replace("/"),
  });

  const errors: LoginFormError | null = error
    ? JSON.parse(error.message)
    : null;

  const handleMutate = () => {
    mutate(inputValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(inputValue);
  };
  return (
    <div className="flex justify-end items-center w-5/12 px-28 bg-white">
      <div className="w-96">
        <div className="relative w-32 h-8 mb-10">
          <Image
            className="object-contain dark:hidden"
            src={blackLogo}
            alt="로고 이미지"
            fill
            sizes="128px"
          />
        </div>
        <div className="mb-2 text-gray-700 text-2xl font-bold">로그인</div>
        <p className="mb-6 text-gray-500 text-sm">
          공학도서관 어드민에 접근하려면 이메일과 비밀번호를 입력하세요.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-6">
            <AuthInput
              label="이메일"
              name="email"
              placeholder="이메일 주소를 입력하세요."
              value={inputValue.email}
              handleChange={handleChange}
              error={errors?.email}
            />
            <AuthInput
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력하세요."
              value={inputValue.password}
              handleChange={handleChange}
              error={errors?.password}
            />
          </div>
          <button className="hidden" />
          <div
            className="flex-center h-12 bg-primary-500 text-white text-sm rounded-md hover:cursor-pointer"
            onClick={handleMutate}
          >
            {isPending ? (
              <FontAwesomeIcon className="text-xl" icon={faSpinner} spinPulse />
            ) : (
              "로그인"
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
