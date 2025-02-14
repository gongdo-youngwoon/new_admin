"use client";

import LoginForm from "@/ui/login/LoginForm";
import ImageGallery from "@/ui/login/ImageGallery";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <LoginForm />
      <ImageGallery />
    </div>
  );
}
