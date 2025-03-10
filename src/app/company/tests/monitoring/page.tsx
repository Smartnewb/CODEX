"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Download,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function TestMonitoringPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const activeTests = [
    {
      id: "test-1",
      title: "프론트엔드 개발자 역량 평가",
      applicants: 12,
      inProgress: 5,
      completed: 7,
      status: "진행중",
    },
    {
      id: "test-2",
      title: "백엔드 개발자 코딩 테스트",
      applicants: 8,
      inProgress: 2,
      completed: 6,
      status: "진행중",
    },
  ];

  const applicants = [
    {
      id: "applicant-1",
      name: "김개발",
      avatar: "👨‍💻",
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
      avatar: "👩‍💻",
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
      avatar: "🧑‍💻",
      test: "백엔드 개발자 코딩 테스트",
      progress: 90,
      timeRemaining: "5분",
      alerts: 1,
      startTime: "14:15",
      estimatedEndTime: "15:15",
      alertDetails: [{ type: "코드 복사", time: "14:48", count: 1 }],
    },
    {
      id: "applicant-4",
      name: "최프로그래머",
      avatar: "��‍💻",
      test: "프론트엔드 개발자 역량 평가",
      progress: 60,
      timeRemaining: "25분",
      alerts: 0,
      startTime: "14:40",
      estimatedEndTime: "15:40",
    },
    {
      id: "applicant-5",
      name: "정데브",
      avatar: "👩‍💻",
      test: "백엔드 개발자 코딩 테스트",
      progress: 30,
      timeRemaining: "42분",
      alerts: 0,
      startTime: "14:50",
      estimatedEndTime: "15:50",
    },
  ];

  const alerts = [
    {
      id: "alert-1",
      applicant: "이코딩",
      avatar: "👩‍💻",
      test: "프론트엔드 개발자 역량 평가",
      type: "탭 전환",
      count: 2,
      time: "10분 전",
      details: "지원자가 테스트 중 2회 다른 웹페이지로 이동했습니다.",
      severity: "중간",
    },
    {
      id: "alert-2",
      applicant: "박엔지니어",
      avatar: "🧑‍💻",
      test: "백엔드 개발자 코딩 테스트",
      type: "코드 복사",
      count: 1,
      time: "15분 전",
      details: "지원자가 외부 소스에서 코드를 복사하여 붙여넣었습니다.",
      severity: "높음",
    },
    {
      id: "alert-3",
      applicant: "한알고리즘",
      avatar: "��‍💻",
      test: "백엔드 개발자 코딩 테스트",
      type: "비정상 패턴",
      count: 1,
      time: "25분 전",
      details:
        "AI가 비정상적인 응답 패턴을 감지했습니다. 응답 시간이 일관되지 않습니다.",
      severity: "낮음",
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
          <Link href="/company/tests">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 테스트 관리로 돌아가기
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">실시간 테스트 모니터링</h1>
          <p className="text-muted-foreground">
            진행 중인 테스트와 응시자들의 상태를 실시간으로 모니터링하세요.
          </p>
        </div>

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
                    {alerts.length}
                  </span>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="active"
          className="space-y-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="active">응시자 모니터링</TabsTrigger>
            <TabsTrigger value="alerts">부정행위 알림</TabsTrigger>
            <TabsTrigger value="reports">모니터링 보고서</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="flex justify-between items-center">
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

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">정상 진행</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">부정행위 의심</span>
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
                          {/* <Image
                            src={applicant.avatar}
                            alt={applicant.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          /> */}
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
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">부정행위 알림</h2>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" /> 보고서 다운로드
              </Button>
            </div>

            {alerts.length > 0 ? (
              <div className="grid gap-4">
                {alerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className="border-red-200 dark:border-red-800"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="relative">
                            {/* <Image
                              src={alert.avatar}
                              alt={alert.applicant}
                              width={40}
                              height={40}
                              className="rounded-full"
                            /> */}
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                              !
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">{alert.applicant}</h3>
                            <p className="text-xs text-muted-foreground">
                              {alert.test}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <AlertCircle size={16} className="text-red-500" />
                            <span className="font-medium">
                              {alert.type} 감지
                            </span>
                            <Badge variant="outline" className="ml-2">
                              {alert.count}회
                            </Badge>
                            <Badge
                              className={`ml-2 ${
                                alert.severity === "높음"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : alert.severity === "중간"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              위험도: {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.time} - {alert.details}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            세부 정보
                          </Button>
                          <Button size="sm">
                            <Eye size={14} className="mr-1" /> 모니터링
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    현재 감지된 부정행위가 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">모니터링 보고서</h2>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" /> 전체 보고서 다운로드
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">부정행위 통계</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      탭 전환 감지
                    </div>
                    <div className="text-2xl font-bold">5회</div>
                    <div className="text-sm text-muted-foreground">
                      지난 주 대비 <span className="text-red-500">+2</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      코드 복사 감지
                    </div>
                    <div className="text-2xl font-bold">3회</div>
                    <div className="text-sm text-muted-foreground">
                      지난 주 대비 <span className="text-green-500">-1</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      비정상 패턴 감지
                    </div>
                    <div className="text-2xl font-bold">2회</div>
                    <div className="text-sm text-muted-foreground">
                      지난 주 대비 <span className="text-red-500">+2</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">
                    테스트별 부정행위 발생률
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          프론트엔드 개발자 역량 평가
                        </span>
                        <span className="text-sm font-medium">16.7%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full"
                          style={{ width: "16.7%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        2/12 응시자
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          백엔드 개발자 코딩 테스트
                        </span>
                        <span className="text-sm font-medium">12.5%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full"
                          style={{ width: "12.5%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        1/8 응시자
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">AI 분석 인사이트</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      현재 진행 중인 테스트에서 <strong>탭 전환</strong> 유형의
                      부정행위가 가장 많이 발생하고 있습니다. 테스트 시작 전
                      응시자들에게 브라우저 탭 전환 시 자동 감지된다는 안내를
                      강화하는 것이 좋겠습니다. 또한, 프론트엔드 개발자 역량
                      평가에서 부정행위 발생률이 상대적으로 높으니 해당 테스트의
                      난이도와 시간 제한을 검토해보시기 바랍니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
