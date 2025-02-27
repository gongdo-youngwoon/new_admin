import { z } from "zod";

const hexColorRegex = /^[0-9A-F]{6}$/i;
const linkRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/;

export const updateBannerFileZod = z.object({
  title: z.string().min(1, "제목이 입력되지 않았습니다."),
  desc: z.string().min(1, "설명이 입력되지 않았습니다."),
  cta: z.string().min(1, "행동 유도 문구가 입력되지 않았습니다."),
  bgColor: z
    .string()
    .min(1, "배경 색상이 입력되지 않았습니다.")
    .regex(
      hexColorRegex,
      "6개의 문자이며, 0-9 사이의 숫자, a-f 사이의 영문자여야 합니다."
    )
    .toUpperCase()
    .transform((bgColor) => `#${bgColor}`),
  textColor: z
    .string()
    .min(1, "문구 색상이 입력되지 않았습니다.")
    .regex(
      hexColorRegex,
      "6개의 문자이며, 0-9 사이의 숫자, a-f 사이의 영문자여야 합니다."
    )
    .toUpperCase()
    .transform((textColor) => `#${textColor}`),
  imageFile: z.custom<File>((file) => {
    if (!file || file.size === 0 || file.name === "undefined") {
      return false;
    } else {
      return true;
    }
  }, "배경 이미지가 등록되지 않았습니다."),
  link: z
    .string()
    .min(1, "링크 주소가 입력되지 않았습니다.")
    .regex(
      linkRegex,
      "입력한 URL이 올바른 형식이 아닙니다. (ex. https://gongdo.kr)"
    ),
});

export const updateBannerZod = z.object({
  title: z.string().min(1, "제목이 입력되지 않았습니다."),
  desc: z.string().min(1, "설명이 입력되지 않았습니다."),
  cta: z.string().min(1, "행동 유도 문구가 입력되지 않았습니다."),
  bgColor: z
    .string()
    .min(1, "배경 색상이 입력되지 않았습니다.")
    .regex(
      hexColorRegex,
      "6개의 문자이며, 0-9 사이의 숫자, a-f 사이의 영문자여야 합니다."
    )
    .toUpperCase()
    .transform((bgColor) => `#${bgColor}`),
  textColor: z
    .string()
    .min(1, "문구 색상이 입력되지 않았습니다.")
    .regex(
      hexColorRegex,
      "6개의 문자이며, 0-9 사이의 숫자, a-f 사이의 영문자여야 합니다."
    )
    .toUpperCase()
    .transform((textColor) => `#${textColor}`),
  link: z
    .string()
    .min(1, "링크 주소가 입력되지 않았습니다.")
    .regex(
      linkRegex,
      "입력한 URL이 올바른 형식이 아닙니다. (ex. https://gongdo.kr)"
    ),
});
