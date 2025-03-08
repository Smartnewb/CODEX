"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ArrowRight, Clock, Edit, Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompanyDashboardPage() {
  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  // 기본 테스트 데이터
  const defaultTests = [
    {
      id: "test-1",
      title: "프론트엔드 개발자 역량 평가",
      createdAt: "2023-05-01",
      applicants: 12,
      status: "진행중",
    },
    {
      id: "test-2",
      title: "백엔드 개발자 코딩 테스트",
      createdAt: "2023-04-28",
      applicants: 8,
      status: "진행중",
    },
  ];

  // 클라이언트 사이드에서만 실행되도록 useEffect 사용
  const [activeTests, setActiveTests] = useState(defaultTests);

  useEffect(() => {
    // 로컬 스토리지에서 테스트 목록 가져오기
    const savedTests = localStorage.getItem("activeTests");
    if (savedTests) {
      setActiveTests(JSON.parse(savedTests));
    }
  }, []);

  const topCandidates = [
    {
      id: "candidate-1",
      name: "김개발",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
      score: 92,
      test: "프론트엔드 개발자 역량 평가",
      date: "2023-05-05",
    },
    {
      id: "candidate-2",
      name: "이코딩",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer2",
      score: 88,
      test: "프론트엔드 개발자 역량 평가",
      date: "2023-05-04",
    },
    {
      id: "candidate-3",
      name: "박엔지니어",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer3",
      score: 85,
      test: "백엔드 개발자 코딩 테스트",
      date: "2023-05-03",
    },
  ];

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
            <span className="font-bold text-lg">CodeAssess AI</span>
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
            className="text-sm font-medium text-primary"
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
            href="/company/tests/manage"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            안녕하세요, {company.name}님!
          </h1>
          <p className="text-muted-foreground">
            AI 기반 개발자 평가 시스템에 오신 것을 환영합니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">진행 중인 테스트</h2>
              <Button asChild>
                <Link href="/company/tests/create">
                  <Plus size={16} className="mr-2" /> 새 테스트 생성
                </Link>
              </Button>
            </div>

            {activeTests.length > 0 ? (
              <div className="grid gap-4">
                {activeTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <CardDescription>
                        생성일: {test.createdAt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User size={16} className="text-muted-foreground" />
                          <span>{test.applicants}명 지원</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-muted-foreground" />
                          <span>
                            {test.status === "진행중" ? "진행 중" : "마감됨"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          test.status === "진행중"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {test.status}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/company/tests/manage">
                            <Edit size={16} className="mr-2" /> 관리
                          </Link>
                        </Button>
                        <Button>
                          결과 보기 <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    현재 진행 중인 테스트가 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">우수 지원자</h2>
            {topCandidates.length > 0 ? (
              <div className="grid gap-4">
                {topCandidates.map((candidate) => (
                  <Card key={candidate.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.id}&backgroundColor=f5f5f5`}
                          alt={candidate.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        /> */}
                        <div className="flex-1">
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {candidate.test}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#0066FF]">
                            {candidate.score}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            점수
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 border-t">
                      <Button variant="ghost" size="sm" className="w-full">
                        상세 결과 보기
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    아직 지원자가 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                모든 지원자 보기
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
