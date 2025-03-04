import clsx from "clsx";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const initialValue = {
  id: "",
  email: "",
  displayName: "",
  photoURL: "",
};

export default function HeaderProfile() {
  const [user, setUser] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
      setIsLoading(false);
    }
  }, [setUser]);

  return (
    <div className="relative flex items-center gap-2">
      {user.photoURL ? (
        <div className="relative size-[32px] hover:cursor-pointer">
          <Image src={user.photoURL} alt="프로필 이미지" fill sizes="32px" />
        </div>
      ) : (
        <FontAwesomeIcon
          className="size-[32px] text-primary hover:cursor-pointer"
          icon={faCircleUser}
        />
      )}
      <div>
        <div className="text-primary-500 text-xs font-bold">관리자</div>
        <div className="text-sm">{user.displayName}</div>
      </div>
      <FontAwesomeIcon
        className={clsx(
          "text-disabled hover:cursor-pointer transition-transform duration-300 ease-out"
        )}
        icon={faAngleDown}
      />
    </div>
  );
}
