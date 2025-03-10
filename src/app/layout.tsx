import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CompanyProvider } from "@/contexts/CompanyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CODEX - AI 기반 개발자 평가 시스템",
  description: "기업과 신입 개발자를 위한 AI 기반 개발자 역량 평가 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      </head>
      <body className={inter.className}>
        <CompanyProvider>
          <Providers>
            {children}
            <Toaster />
            <TempoInit />
          </Providers>
        </CompanyProvider>
      </body>
    </html>
  );
}
