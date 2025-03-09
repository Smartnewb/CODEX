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
import { ArrowRight, Clock, Edit, Plus, User, AlertCircle, Eye, Filter, Search, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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

  const [searchQuery, setSearchQuery] = useState("");

  // 모니터링 관련 데이터 추가
  const applicants = [
    {
      id: "applicant-1",
      name: "김개발",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
      test: "프론트엔드 개발자 역량 평가",
      progress: 75,
      timeRemaining: "15분",
      alerts: 0,
      startTime: "14:30",
      estimatedEndTime: "15:30",
    },
    {
      id: "applicant-2",
      name: "이코딩",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer2",
      test: "프론트엔드 개발자 역량 평가",
      progress: 45,
      timeRemaining: "32분",
      alerts: 2,
      startTime: "14:45",
      estimatedEndTime: "15:45",
      alertDetails: [
        { type: "탭 전환", time: "14:52", count: 1 },
        { type: "탭 전환", time: "15:03", count: 1 },
      ],
    },
    {
      id: "applicant-3",
      name: "박엔지니어",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer3",
      test: "백엔드 개발자 코딩 테스트",
      progress: 90,
      timeRemaining: "5분",
      alerts: 1,
      startTime: "14:15",
      estimatedEndTime: "15:15",
      alertDetails: [{ type: "코드 복사", time: "14:48", count: 1 }],
    },
  ];

  // Filter applicants based on search query
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.test.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update progress randomly for demo purposes
      const updatedApplicants = applicants.map((applicant) => {
        if (applicant.progress < 100) {
          const newProgress = Math.min(
            applicant.progress + Math.floor(Math.random() * 3),
            100,
          );
          const newTimeRemaining =
            newProgress === 100 ? "0분" : applicant.timeRemaining;
          return {
            ...applicant,
            progress: newProgress,
            timeRemaining: newTimeRemaining,
          };
        }
        return applicant;
      });

      // In a real app, we would update the state with new data from the API
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <Image
              src="/logo.png"
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
                src={company.logo}
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
                        <Button asChild>
                          <Link href="/company/tests/results">
                            결과 보기 <ArrowRight size={16} className="ml-2" />
                          </Link>
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
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                          👨‍💻
                        </div>
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">실시간 테스트 모니터링</h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      진행 중인 테스트
                    </span>
                    <span className="text-3xl font-bold mt-1">
                      {activeTests.length}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      현재 응시자
                    </span>
                    <span className="text-3xl font-bold mt-1">
                      {applicants.length}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900">
                    <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      부정행위 알림
                    </span>
                    <span className="text-3xl font-bold mt-1">
                      {applicants.filter(a => a.alerts > 0).length}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="응시자 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download size={16} className="mr-2" /> 현재 상태 내보내기
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredApplicants.map((applicant) => (
              <Card
                key={applicant.id}
                className={
                  applicant.alerts > 0
                    ? "border-amber-300 dark:border-amber-700"
                    : ""
                }
              >
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="relative">
                        {applicant.alerts > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                            {applicant.alerts}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{applicant.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {applicant.test}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>진행률</span>
                        <span>{applicant.progress}%</span>
                      </div>
                      <Progress value={applicant.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 min-w-[200px]">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          시작 시간
                        </div>
                        <div className="text-sm">{applicant.startTime}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          예상 종료
                        </div>
                        <div className="text-sm">
                          {applicant.estimatedEndTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm">
                          남은 시간: {applicant.timeRemaining}
                        </span>
                      </div>

                      <Button variant="outline" size="sm">
                        <Eye size={14} className="mr-1" /> 모니터링
                      </Button>
                    </div>
                  </div>

                  {applicant.alerts > 0 && applicant.alertDetails && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                      <h4 className="text-sm font-medium mb-2">
                        부정행위 의심 알림
                      </h4>
                      <div className="space-y-2">
                        {applicant.alertDetails.map((alert, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <AlertCircle
                              size={16}
                              className="mt-0.5 text-amber-500"
                            />
                            <div>
                              <span className="font-medium">
                                {alert.type}
                              </span>{" "}
                              감지 - {alert.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredApplicants.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
