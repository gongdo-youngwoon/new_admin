import Image from "next/image";
import blackLogo from "@/assets/images/logo_black.png";
import AuthInput from "./AuthInput";

export default function LoginForm() {
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
            priority
          />
        </div>
        <div className="mb-2 text-gray-700 text-2xl font-bold">로그인</div>
        <p className="mb-6 text-gray-500 text-sm">
          공학도서관 어드민에 접근하려면 이메일과 비밀번호를 입력하세요.
        </p>
        <form action="">
          <div className="flex flex-col gap-6 mb-6">
            <AuthInput label="이메일" placeholder="이메일 주소를 입력하세요" />
            <AuthInput label="비밀번호" placeholder="비밀번호를 입력하세요" />
          </div>
          <button className="hidden" />
          <div className="flex-center h-11 bg-primary-500 text-white text-sm rounded-md hover:cursor-pointer">
            로그인
          </div>
        </form>
      </div>
    </div>
  );
}
