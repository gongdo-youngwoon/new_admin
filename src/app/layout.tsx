import localFont from "next/font/local";
import Sidebar from "@/ui/sidebar/Sidebar";
import Header from "@/ui/header/Header";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import NextThemeProvider from "@/component/theme/NextThemeProvider";

config.autoAddCss = false;

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} flex`}>
        <NextThemeProvider>
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
          </div>
        </NextThemeProvider>
      </body>
    </html>
  );
}
