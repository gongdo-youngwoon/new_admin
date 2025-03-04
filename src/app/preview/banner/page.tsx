"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BannerFormType } from "@/types/formType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

const initialValue: BannerFormType = {
  title: "",
  desc: "",
  cta: "",
  bgColor: "",
  textColor: "",
  previewImage: "",
  imageFile: null,
  link: "",
  order: "",
  display: "Y",
};

export default function PreviewBannerPage() {
  const [previewBanner, setPreviewBanner] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedBanner = localStorage.getItem("bannerData");
    if (storedBanner) {
      setPreviewBanner(JSON.parse(storedBanner));
      setIsLoading(false);
    }
  }, [setPreviewBanner]);

  if (isLoading) {
    return (
      <div className="flex-center min-h-screen">
        <FontAwesomeIcon
          className="text-gray-700 text-4xl"
          icon={faSpinner}
          spinPulse
        />
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative h-[530px] pt-5 px-5 pb-20 md:h-[328px] md:pb-5 lg:h-[766px]"
        style={{
          backgroundColor: `#${
            previewBanner.bgColor ? previewBanner.bgColor : "ffffff"
          }`,
          color: `#${
            previewBanner.textColor ? previewBanner.textColor : "222222"
          }`,
        }}
      >
        {previewBanner.previewImage && (
          <Image
            className="object-cover"
            src={previewBanner.previewImage}
            alt="배경 이미지"
            fill
            sizes="1920px"
          />
        )}
        <div className="relative h-full flex justify-center items-end md:justify-end md:items-center lg:w-[1280px] lg:mx-auto">
          <div className="flex flex-col md:w-[398px] lg:w-[570px]">
            <div
              className="mb-3 text-[28px] leading-[38px] font-semibold -tracking-[2.5%]
              md:mb-[10px] md:text-[24px] md:leading-[34px] lg:mb-[30px] lg:text-[48px] lg:leading-[52px]"
            >
              {previewBanner.title}
            </div>
            <p
              className="mb-10 text-sm -tracking-[2.5%]
              md:mb-5 md:text-[13px] lg:mb-10 lg:text-[16px] lg:leading-[26px]"
            >
              {previewBanner.desc}
            </p>
            <Link
              href={previewBanner.link}
              className="self-start flex items-center gap-1 px-4 py-3 text-sm -tracking-[2.5%] rounded-md"
              style={{
                border: `1px solid #${
                  previewBanner.textColor ? previewBanner.textColor : "222222"
                }`,
              }}
            >
              <div>{previewBanner.cta}</div>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
