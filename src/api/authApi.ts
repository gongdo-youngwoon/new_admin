import { loginZod } from "@/zod/loginZod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface LoginFormType {
  email: string;
  password: string;
}

export async function login(formData: LoginFormType) {
  console.log(formData);
  const result = loginZod.safeParse(formData);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.flatten().fieldErrors));
  }

  const { email, password } = result.data;
  const response = await signInWithEmailAndPassword(auth, email, password);

  console.log(response);
}
