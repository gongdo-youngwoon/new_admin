import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

export const loginZod = z.object({
  email: z
    .string()
    .min(1, "이메일이 입력되지 않았습니다.")
    .email("유효한 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(passwordRegex, "비밀번호는 영문과 숫자의 조합이어야 합니다."),
});
