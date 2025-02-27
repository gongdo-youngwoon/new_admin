import Sidebar from "@/ui/sidebar/Sidebar";
import Header from "@/ui/header/Header";
import NextThemeProvider from "@/components/provider/NextThemeProvider";
import PageLayoutProvider from "@/components/provider/PageLayoutProvider";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextThemeProvider>
      <Header />
      <Sidebar />
      <PageLayoutProvider>{children}</PageLayoutProvider>
    </NextThemeProvider>
  );
}
