"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import Sidebar from "@/ui/sidebar/Sidebar";
import Header from "@/ui/header/Header";
import NextThemeProvider from "@/components/provider/NextThemeProvider";
import PageLayoutProvider from "@/components/provider/PageLayoutProvider";
import { useRouter } from "next/navigation";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { replace } = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        replace("/login");
      } else {
        const authData = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        localStorage.setItem("authData", JSON.stringify(authData));
      }
    });
    return () => unsubscribe();
  }, [replace]);

  return (
    <NextThemeProvider>
      <Header />
      <Sidebar />
      <PageLayoutProvider>{children}</PageLayoutProvider>
    </NextThemeProvider>
  );
}
