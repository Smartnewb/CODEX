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
import { ArrowRight, Award, Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AssessmentHistoryPage() {
  // Mock data - would come from API in real app
  const user = {
    name: "김개발",
    profileImage: "👨‍💻",
  };

  const assessmentHistory = [
    {
      id: "assessment-1",
      title: "프론트엔드 개발자 역량 평가",
      company: "테크스타트 주식회사",
      date: "2023-05-10",
      score: 82,
      status: "완료",
      growth: "+9%",
      type: "frontend-dev",
      testId: "FE-2023-001"
    },
    {
      id: "assessment-2",
      title: "JavaScript 알고리즘 테스트",
      company: "웹테크 주식회사",
      date: "2023-04-15",
      score: 85,
      status: "완료",
      growth: "+5%",
      type: "algorithm",
      testId: "ALG-2023-001"
    },
    {
      id: "assessment-3",
      title: "백엔드 API 설계 테스트",
      company: "클라우드 시스템즈",
      date: "2023-03-22",
      score: 92,
      status: "완료",
      growth: "+12%",
      type: "backend-dev",
      testId: "BE-2023-001"
    },
    {
      id: "assessment-4",
      title: "React 컴포넌트 개발 테스트",
      company: "AI 솔루션즈",
      date: "2023-02-18",
      score: 78,
      status: "완료",
      growth: "+3%",
      type: "react-dev",
      testId: "REACT-2023-001"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">CODEX</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{user.profileImage}</span>
              <span className="text-sm font-medium hidden sm:inline">
                {user.name}
              </span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 대시보드로 돌아가기
            </Button>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">평가 이력</h1>
          <p className="text-muted-foreground">
            지금까지 완료한 모든 평가 결과를 확인하고 성장 추이를 분석하세요.
          </p>
        </div>

        <div className="grid gap-6">
          {assessmentHistory.map((assessment) => (
            <Card key={assessment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/2">
                    <h2 className="text-xl font-semibold mb-1">
                      {assessment.title}
                    </h2>
                    <p className="text-muted-foreground mb-2">
                      {assessment.company}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{assessment.date}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {assessment.status}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        성장률: {assessment.growth}
                      </Badge>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-600 text-center">
                        <div>
                          <div className="text-2xl font-bold">
                            {assessment.score}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            점수
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block border-l h-16 mx-4"></div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Award size={16} className="text-blue-600" />
                          <span className="text-sm">상위 15% 성과</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-muted-foreground" />
                          <span className="text-sm">소요 시간: 58분</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/result_for_developer/test/${assessment.testId}`}>
                          상세 결과 보기
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            더 보기
          </Button>
        </div>
      </main>
    </div>
  );
}
