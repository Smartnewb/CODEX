"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CandidateComparisonCard } from "@/components/hiring/candidate-comparison-card";
import { SuccessPredictionCard } from "@/components/hiring/success-prediction-card";
import { GrowthRoadmapCard } from "@/components/hiring/growth-roadmap-card";
import { LinkedInOfferCard } from "@/components/hiring/linkedin-offer-card";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function HiringDecisionPage() {
  const [activeTab, setActiveTab] = useState("comparison");
  const [selectedCandidate, setSelectedCandidate] = useState("candidate-1");

  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const testInfo = {
    title: "JavaScript 알고리즘 테스트",
    position: "프론트엔드 개발자",
  };

  const candidates = [
    {
      id: "candidate-1",
      name: "김개발",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
      email: "kim.developer@example.com",
      github: "kimdev",
      linkedin: "kim-developer",
      score: 92,
      problemSolving: 95,
      codeQuality: 88,
      optimization: 85,
      bestPractices: 90,
      documentation: 92,
      status: "합격",
      matchRate: 85,
    },
    {
      id: "candidate-2",
      name: "이코딩",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer2",
      email: "lee.coding@example.com",
      github: "leecoding",
      linkedin: "lee-coding",
      score: 88,
      problemSolving: 90,
      codeQuality: 85,
      optimization: 80,
      bestPractices: 85,
      documentation: 90,
      status: "합격",
      matchRate: 80,
    },
    {
      id: "candidate-3",
      name: "박엔지니어",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer3",
      email: "park.engineer@example.com",
      github: "parkengineer",
      linkedin: "park-engineer",
      score: 75,
      problemSolving: 80,
      codeQuality: 70,
      optimization: 65,
      bestPractices: 75,
      documentation: 80,
      status: "보류",
      matchRate: 65,
    },
  ];

  // Success prediction data
  const successPredictionData = {
    successRate: 87,
    adaptabilityScore: 85,
    teamFitScore: 90,
    growthPotentialScore: 92,
    retentionProbabilityScore: 80,
    comparisonData: {
      labels: [
        "김개발",
        "이코딩",
        "박엔지니어",
        "최근 채용 평균",
        "전체 채용 평균",
      ],
      values: [87, 82, 68, 75, 70],
      colors: [
        "rgba(0, 102, 255, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(201, 203, 207, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
    },
  };

  // Skill gaps and learning resources
  const skillGaps = [
    {
      skill: "데이터베이스 쿼리 최적화",
      currentLevel: 6,
      targetLevel: 8,
      resources: [
        {
          title: "SQL Performance Tuning",
          description: "데이터베이스 쿼리 성능 최적화 기법에 대한 종합 가이드",
          url: "#",
          type: "book" as const,
          priority: "high" as const,
        },
        {
          title: "인덱스 설계와 쿼리 최적화 실전",
          description: "실제 사례를 통한 데이터베이스 인덱스 설계 방법론",
          url: "#",
          type: "course" as const,
          priority: "medium" as const,
        },
      ],
    },
    {
      skill: "비동기 프로그래밍 패턴",
      currentLevel: 7,
      targetLevel: 9,
      resources: [
        {
          title: "JavaScript 비동기 프로그래밍 마스터하기",
          description: "Promise, async/await, 이벤트 루프에 대한 심층 이해",
          url: "#",
          type: "course" as const,
          priority: "high" as const,
        },
        {
          title: "실전 비동기 에러 핸들링 전략",
          description: "견고한 비동기 코드를 위한 에러 처리 패턴",
          url: "#",
          type: "article" as const,
          priority: "medium" as const,
        },
      ],
    },
  ];

  // Handle hire decision
  const handleHireDecision = (
    candidateId: string,
    decision: "hire" | "reject" | "hold",
  ) => {
    // In a real app, this would update the candidate status in the database
    console.log(`Candidate ${candidateId} decision: ${decision}`);

    toast({
      title: "채용 결정이 업데이트되었습니다",
      description: `${candidates.find((c) => c.id === candidateId)?.name}님의 상태가 ${decision === "hire" ? "합격" : decision === "reject" ? "불합격" : "보류"}(으)로 변경되었습니다.`,
      action: <ToastAction altText="확인">확인</ToastAction>,
    });

    // Set the selected candidate for the next tabs
    setSelectedCandidate(candidateId);
    setActiveTab("prediction");
  };

  // Handle sending roadmap
  const handleSendRoadmap = () => {
    toast({
      title: "학습 로드맵이 전송되었습니다",
      description: `${candidates.find((c) => c.id === selectedCandidate)?.name}님에게 맞춤형 학습 로드맵이 이메일로 전송되었습니다.`,
      action: <ToastAction altText="확인">확인</ToastAction>,
    });
  };

  // Handle sending offer
  const handleSendOffer = (message: string) => {
    toast({
      title: "채용 제안이 발송되었습니다",
      description: `${candidates.find((c) => c.id === selectedCandidate)?.name}님에게 LinkedIn과 이메일로 채용 제안이 발송되었습니다.`,
      action: <ToastAction altText="확인">확인</ToastAction>,
    });
  };

  // Get the selected candidate data
  const selectedCandidateData =
    candidates.find((c) => c.id === selectedCandidate) || candidates[0];

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
            href="/company/applicants"
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
              <ArrowLeft size={16} className="mr-2" /> 뒤로 가기
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">채용 의사결정 지원</h1>
          <p className="text-muted-foreground">
            {testInfo.title} - {testInfo.position} 포지션 지원자들의 평가 결과를
            분석하고 최적의 채용 결정을 내리세요.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full">
            <TabsTrigger value="comparison" className="flex-1">
              지원자 비교
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex-1">
              채용 성공률 예측
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex-1">
              역량 개선 로드맵
            </TabsTrigger>
            <TabsTrigger value="offer" className="flex-1">
              채용 제안 발송
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <CandidateComparisonCard
              candidates={candidates}
              onHireDecision={handleHireDecision}
            />
          </TabsContent>

          <TabsContent value="prediction" className="space-y-6">
            <SuccessPredictionCard
              candidateName={selectedCandidateData.name}
              successRate={successPredictionData.successRate}
              adaptabilityScore={successPredictionData.adaptabilityScore}
              teamFitScore={successPredictionData.teamFitScore}
              growthPotentialScore={successPredictionData.growthPotentialScore}
              retentionProbabilityScore={
                successPredictionData.retentionProbabilityScore
              }
              comparisonData={successPredictionData.comparisonData}
            />
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <GrowthRoadmapCard
              candidateName={selectedCandidateData.name}
              skillGaps={skillGaps}
              onSendRoadmap={handleSendRoadmap}
            />
          </TabsContent>

          <TabsContent value="offer" className="space-y-6">
            <LinkedInOfferCard
              candidate={selectedCandidateData}
              position={testInfo.position}
              onSendOffer={handleSendOffer}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
