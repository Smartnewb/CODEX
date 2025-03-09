"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReportDashboard } from "@/components/reports/report-dashboard";

export default function DetailedReportPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  // 지원자 데이터 - 실제로는 API에서 가져옴
  const candidate = {
    id: params.id,
    name: "김개발",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
    score: 92,
    previousScore: 85,
    problemSolving: 95,
    codeQuality: 88,
    optimization: 85,
    bestPractices: 90,
    documentation: 92,
    collaboration: 88,
    status: "합격",
    matchRate: 85,
    testDate: "2023-05-10",
    testTitle: "프론트엔드 개발자 역량 평가",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
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
              <Image
                src="https://api.dicebear.com/7.x/shapes/svg?seed=company&backgroundColor=f5f5f5"
                alt="회사 로고"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-sm font-medium hidden sm:inline">
                {company.name}
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
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            기업 프로필
          </Link>
          <Link
            href="/company/tests"
            className="text-sm font-medium text-primary"
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
          <Link href="/company/tests/results">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 테스트 결과로 돌아가기
            </Button>
          </Link>
        </div>

        <ReportDashboard candidate={candidate} />
      </main>
    </div>
  );
}
