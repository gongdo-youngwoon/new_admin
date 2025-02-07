import localFont from "next/font/local";
import Sidebar from "@/ui/sidebar/Sidebar";
import Header from "@/ui/header/Header";
import NextThemeProviders from "@/component/NextThemeProviders";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

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
        <NextThemeProviders>
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
          </div>
        </NextThemeProviders>
      </body>
    </html>
  );
}
