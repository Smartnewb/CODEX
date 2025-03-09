"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Search,
  Filter,
  Download,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const applicants = [
    {
      id: "candidate-1",
      name: "김개발",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
      test: "프론트엔드 개발자 역량 평가",
      score: 92,
      problemSolving: 95,
      codeQuality: 88,
      optimization: 85,
      bestPractices: 90,
      documentation: 92,
      status: "합격",
      matchRate: 85,
      date: "2024-03-15",
    },
    {
      id: "candidate-2",
      name: "이코딩",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer2",
      test: "프론트엔드 개발자 역량 평가",
      score: 88,
      problemSolving: 90,
      codeQuality: 85,
      optimization: 80,
      bestPractices: 85,
      documentation: 90,
      status: "보류",
      matchRate: 80,
      date: "2024-03-14",
    },
    {
      id: "candidate-3",
      name: "박엔지니어",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer3",
      test: "백엔드 개발자 코딩 테스트",
      score: 75,
      problemSolving: 80,
      codeQuality: 70,
      optimization: 65,
      bestPractices: 75,
      documentation: 80,
      status: "불합격",
      matchRate: 65,
      date: "2024-03-13",
    },
  ];

  // Filter applicants based on search query and status
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.test.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    // In a real app, this would update the status in the database
    toast({
      title: "지원자 상태가 변경되었습니다",
      description: `${applicants.find((a) => a.id === applicantId)?.name}님의 상태가 ${newStatus}(으)로 변경되었습니다.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
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
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            테스트 관리
          </Link>
          <Link
            href="/company/applicants"
            className="text-sm font-medium text-primary"
          >
            지원자 관리
          </Link>
        </nav>
      </div>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">지원자 관리</h1>
          <p className="text-muted-foreground">
            모든 테스트의 지원자들을 한눈에 확인하고 관리하세요.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="지원자 또는 테스트명으로 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="합격">합격</SelectItem>
                <SelectItem value="보류">보류</SelectItem>
                <SelectItem value="불합격">불합격</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" /> 결과 다운로드
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredApplicants.map((applicant) => (
            <Card key={applicant.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      👨‍💻
                    </div>
                    <div>
                      <h3 className="font-medium">{applicant.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {applicant.test}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        응시일: {applicant.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        종합 점수
                      </div>
                      <div className="font-bold text-lg">{applicant.score}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        문제 해결
                      </div>
                      <div className="font-medium">
                        {applicant.problemSolving}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        코드 품질
                      </div>
                      <div className="font-medium">{applicant.codeQuality}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        최적화
                      </div>
                      <div className="font-medium">{applicant.optimization}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        조직 적합도
                      </div>
                      <div className="font-medium">{applicant.matchRate}%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge
                      className={`${
                        applicant.status === "합격"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : applicant.status === "보류"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {applicant.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(applicant.id, "불합격")}
                      >
                        <ThumbsDown
                          size={14}
                          className="mr-1 text-red-500"
                        />
                        불합격
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(applicant.id, "보류")}
                      >
                        보류
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(applicant.id, "합격")}
                      >
                        <ThumbsUp
                          size={14}
                          className="mr-1 text-green-500"
                        />
                        합격
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/company/tests/results/report/${applicant.id}`}
                        >
                          상세 분석 <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredApplicants.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 