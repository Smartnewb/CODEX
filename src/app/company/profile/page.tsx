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
        <div className="container mx-auto py-2 px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/company/dashboard">
              <ArrowLeft size={16} className="mr-2" /> 뒤로 가기
            </Link>
          </Button>
        </div>
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <Image
              src="https://api.dicebear.com/7.x/shapes/svg?seed=codeassess&backgroundColor=0066FF&radius=10"
              alt="CodeAssess AI 로고"
              width={32}
              height={32}
              className="rounded-lg"
            /> */}
            <span className="font-bold text-lg">CODEX</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <Image
                src="https://api.dicebear.com/7.x/shapes/svg?seed=company&backgroundColor=f5f5f5"
                alt="회사 로고"
                width={36}
                height={36}
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

      <main className="container mx-auto py-8 px-4">
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
