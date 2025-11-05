import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pretendard = localFont({
  src: [
    {
      path: "../public/resources/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/resources/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/resources/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/resources/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap", // 폰트 로딩 최적화
});

export const metadata: Metadata = {
  title: "김기현 - Web Frontend Developer",
  description: "기술과 협업으로 가치를 창출하는 개발자 김기현의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="bg-white scheme-light dark:bg-gray-950 dark:scheme-dark"
    >
      <body className={`${inter.variable} ${pretendard.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
