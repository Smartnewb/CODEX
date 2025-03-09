import { CompanyProfileForm } from "@/components/company/profile-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <Image
              src="/logo.png"
              alt="CodeAssess AI 로고"
              width={180}
              height={40}
              className="mb-8"
            /> */}
            <span className="font-bold text-lg">CODEX</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <Image
                src={company.logo}
                alt="회사 로고"
                width={120}
                height={120}
                className="rounded-full"
              /> */}
              <span className="text-sm font-medium hidden sm:inline">
                테크스타트 주식회사
              </span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-2 px-4 border-b">
        <nav className="flex space-x-4">
          <Link
            href="/company/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            대시보드
          </Link>
          <Link
            href="/company/profile"
            className="text-sm font-medium text-primary"
          >
            기업 프로필
          </Link>
          <Link
            href="/company/tests"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            테스트 관리
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            지원자 관리
          </Link>
        </nav>
      </div>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/company/dashboard">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 뒤로 가기
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">기업 프로필 설정</h1>
          <p className="text-muted-foreground">
            기업 정보와 기술 스택을 설정하여 맞춤형 개발자 평가를 생성하세요.
          </p>
        </div>

        <CompanyProfileForm />
      </main>
    </div>
  );
}
