"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ResultSummaryCard } from "@/components/assessment/result-summary-card";
import { CodeAnalysisCard } from "@/components/assessment/code-analysis-card";
import { AIFeedbackCard } from "@/components/assessment/ai-feedback-card";
import { ImprovementRoadmapCard } from "@/components/assessment/improvement-roadmap-card";
import { OrganizationFitCard } from "@/components/assessment/organization-fit-card";
import { ComparisonCard } from "@/components/assessment/comparison-card";
import { AIChatFeedback } from "@/components/assessment/ai-chat-feedback";
import { TestResultsList } from "@/components/assessment/test-results-list";

export default function AssessmentResultsPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const [showAIChat, setShowAIChat] = useState(false);

  // Mock assessment data
  const assessmentData = {
    title: "JavaScript 알고리즘 테스트",
    date: "2023-04-15",
    user: {
      name: "김개발",
      avatar: "👨‍💻",
    },
    scores: {
      overall: 85,
      codeStyle: 82,
      problemSolving: 90,
      collaboration: 78,
      devOps: 75,
    },
    previousScores: {
      overall: 78,
      codeStyle: 75,
      problemSolving: 82,
      collaboration: 72,
      devOps: 70,
    },
    testResults: [
      {
        id: "test-1",
        title: "배열 조작 알고리즘 테스트",
        date: "2023-04-15",
        scores: {
          overall: 88,
          codeStyle: 85,
          problemSolving: 92,
          collaboration: 80,
          devOps: 78,
        },
        previousScores: {
          overall: 80,
          codeStyle: 78,
          problemSolving: 85,
          collaboration: 75,
          devOps: 72,
        },
      },
      {
        id: "test-2",
        title: "비동기 프로그래밍 테스트",
        date: "2023-04-13",
        scores: {
          overall: 82,
          codeStyle: 80,
          problemSolving: 85,
          collaboration: 76,
          devOps: 72,
        },
        previousScores: {
          overall: 75,
          codeStyle: 72,
          problemSolving: 78,
          collaboration: 70,
          devOps: 68,
        },
      },
      {
        id: "test-3",
        title: "DOM 조작 및 이벤트 처리 테스트",
        date: "2023-04-10",
        scores: {
          overall: 84,
          codeStyle: 82,
          problemSolving: 88,
          collaboration: 78,
          devOps: 74,
        },
        previousScores: {
          overall: 76,
          codeStyle: 74,
          problemSolving: 80,
          collaboration: 72,
          devOps: 70,
        },
      },
    ],
    codeAnalysis: [
      {
        title: "배열 정렬 알고리즘 구현",
        code: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// 테스트
const unsortedArray = [5, 3, 7, 1, 9, 2, 8, 4, 6];
console.log(quickSort(unsortedArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
        feedback:
          "퀵소트 알고리즘을 효율적으로 구현했습니다. 피벗 선택 방식이 적절하며, 재귀 호출 구조가 명확합니다. 함수형 프로그래밍 스타일을 잘 활용했고, 코드 가독성이 좋습니다. 다만, 대용량 데이터에 대한 최적화가 더 필요할 수 있으며, 인플레이스(in-place) 정렬 방식을 고려해볼 수 있습니다.",
        score: 88,
      },
      {
        title: "비동기 데이터 처리",
        code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching user data failed:', error);
    throw error;
  }
}

// 사용 예시
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error('Error in main:', error));`,
        feedback:
          "비동기 처리와 에러 핸들링이 잘 구현되어 있습니다. try-catch 블록을 적절히 사용했고, 응답 상태 확인도 포함되어 있습니다. Promise 체이닝을 통한 에러 전파도 올바르게 처리했습니다. 다만, 재시도 로직이나 타임아웃 처리가 없는 점은 개선할 수 있으며, 로딩 상태 관리를 추가하면 더 좋을 것 같습니다.",
        score: 85,
      },
    ],
    aiFeedback: {
      strengths: [
        "알고리즘 문제 해결 능력이 뛰어납니다.",
        "코드 문서화가 상세하고 명확합니다.",
        "함수형 프로그래밍 패턴을 적절히 활용합니다.",
        "에러 처리가 체계적으로 구현되어 있습니다.",
        "코드 가독성이 높고 변수명이 직관적입니다.",
      ],
      improvements: [
        "일부 코드에서 성능 최적화가 필요합니다.",
        "변수 명명 규칙을 더 일관되게 적용하세요.",
        "테스트 케이스 작성이 부족합니다.",
      ],
      suggestions: [
        {
          title: "성능 최적화",
          description:
            "이중 for문 대신 해시 테이블을 사용하여 성능을 개선할 수 있습니다.",
        },
        {
          title: "테스트 주도 개발 적용",
          description:
            "Jest와 같은 테스트 프레임워크를 활용하여 단위 테스트를 작성하고 코드 품질을 향상시키세요.",
        },
        {
          title: "코드 리팩토링",
          description:
            "중복된 로직을 별도의 함수로 분리하여 재사용성을 높이세요.",
        },
      ],
    },
    improvementRoadmap: {
      weaknesses: [
        {
          area: "알고리즘 최적화",
          currentLevel: 7,
          targetLevel: 9,
          resources: [
            {
              title: "고급 자료구조와 알고리즘",
              type: "course" as const,
              url: "#",
              description:
                "해시 테이블, 트리, 그래프 등 고급 자료구조를 활용한 알고리즘 최적화 기법",
            },
            {
              title: "시간 복잡도와 공간 복잡도 분석",
              type: "article" as const,
              url: "#",
              description: "알고리즘의 효율성을 분석하고 개선하는 방법",
            },
          ],
        },
        {
          area: "테스트 주도 개발",
          currentLevel: 5,
          targetLevel: 8,
          resources: [
            {
              title: "실용적인 테스트 주도 개발",
              type: "book" as const,
              url: "#",
              description: "TDD 방법론을 실제 프로젝트에 적용하는 방법",
            },
            {
              title: "Jest와 React Testing Library를 활용한 프론트엔드 테스팅",
              type: "video" as const,
              url: "#",
              description: "프론트엔드 애플리케이션의 효과적인 테스트 작성법",
            },
          ],
        },
        {
          area: "비동기 프로그래밍",
          currentLevel: 6,
          targetLevel: 9,
          resources: [
            {
              title: "JavaScript 비동기 프로그래밍 마스터하기",
              type: "course" as const,
              url: "#",
              description: "Promise, async/await, 이벤트 루프에 대한 심층 이해",
            },
            {
              title: "실전 비동기 에러 핸들링 전략",
              type: "article" as const,
              url: "#",
              description: "견고한 비동기 코드를 위한 에러 처리 패턴",
            },
          ],
        },
      ],
    },
    organizationFit: {
      overallFit: 84,
      techStackMatch: 88,
      codingStyleMatch: 85,
      collaborationMatch: 80,
      problemSolvingMatch: 90,
      analysis:
        "김개발님은 당사의 프론트엔드 기술 스택과 개발 문화에 높은 적합성을 보입니다. 특히 JavaScript, React, TypeScript 등 주요 프론트엔드 기술에 대한 이해도가 높으며, 함수형 프로그래밍과 모던 JavaScript 문법을 능숙하게 활용합니다. 코드 품질과 문서화 능력이 뛰어나며, 알고리즘 문제 해결 능력도 우수합니다. 테스트 주도 개발 경험을 더 쌓고 비동기 프로그래밍 패턴에 대한 이해도를 높이면 더욱 완벽한 적합성을 가질 것으로 예상됩니다.",
    },
    comparisonData: {
      labels: [
        "코드 스타일",
        "문제 해결력",
        "협업 능력",
        "DevOps",
        "전체 점수",
      ],
      currentScores: [82, 90, 78, 75, 85],
      previousScores: [75, 82, 72, 70, 78],
      industryAverage: [72, 78, 70, 68, 75],
    },
  };

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
                src={assessmentData.user.avatar}
                alt="프로필 이미지"
                width={36}
                height={36}
                className="rounded-full"
              /> */}
              <span className="text-sm font-medium hidden sm:inline">
                {assessmentData.user.name}
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {assessmentData.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <p className="text-muted-foreground">
                  완료일: {assessmentData.date}
                </p>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  완료됨
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAIChat(!showAIChat)}
                className="text-xs sm:text-sm h-8 sm:h-9"
                size="sm"
              >
                <MessageSquare size={14} className="mr-1 sm:mr-2" /> AI 피드백
                채팅
              </Button>
              <Button
                variant="outline"
                className="text-xs sm:text-sm h-8 sm:h-9"
                size="sm"
                onClick={() => {
                  import("@/lib/pdf-generator")
                    .then(({ generatePDF }) => {
                      generatePDF(assessmentData);
                    })
                    .catch((error) => {
                      console.error("PDF 생성 중 오류가 발생했습니다:", error);
                      alert(
                        "PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
                      );
                    });
                }}
              >
                <Download size={14} className="mr-1 sm:mr-2" /> PDF 다운로드
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:gap-6 xl:gap-8 lg:grid-cols-1 w-full">
          <div
            className={`lg:col-span-${showAIChat ? "3" : "4"} space-y-4 sm:space-y-6 lg:space-y-8 w-full`}
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full min-w-[600px] flex">
                  <TabsTrigger
                    value="summary"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    요약
                  </TabsTrigger>
                  <TabsTrigger
                    value="code-analysis"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    코드 분석
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-feedback"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    AI 피드백
                  </TabsTrigger>
                  <TabsTrigger
                    value="improvement"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    개선 로드맵
                  </TabsTrigger>
                  <TabsTrigger
                    value="organization-fit"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    조직 적합도
                  </TabsTrigger>
                  <TabsTrigger
                    value="comparison"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    성장 분석
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="summary" className="mt-6 space-y-8">
                <ResultSummaryCard
                  scores={assessmentData.scores}
                  previousScores={assessmentData.previousScores}
                />

                <TestResultsList testResults={assessmentData.testResults} />
              </TabsContent>

              <TabsContent value="code-analysis" className="mt-6">
                <CodeAnalysisCard codeSnippets={assessmentData.codeAnalysis} />
              </TabsContent>

              <TabsContent value="ai-feedback" className="mt-6">
                <AIFeedbackCard
                  strengths={assessmentData.aiFeedback.strengths}
                  improvements={assessmentData.aiFeedback.improvements}
                  suggestions={assessmentData.aiFeedback.suggestions}
                />
              </TabsContent>

              <TabsContent value="improvement" className="mt-6">
                <ImprovementRoadmapCard
                  weaknesses={assessmentData.improvementRoadmap.weaknesses}
                />
              </TabsContent>

              <TabsContent value="organization-fit" className="mt-6">
                <OrganizationFitCard
                  organizationFit={assessmentData.organizationFit}
                />
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <ComparisonCard
                  comparisonData={assessmentData.comparisonData}
                />
              </TabsContent>
            </Tabs>
          </div>

          {showAIChat && (
            <div className="lg:col-span-1 h-[500px] lg:h-auto">
              <AIChatFeedback />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
