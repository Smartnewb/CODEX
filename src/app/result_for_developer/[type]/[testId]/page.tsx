"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";
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
import { useParams } from "next/navigation";

type TestType = "frontend-dev" | "algorithm" | "backend-dev" | "react-dev";

interface TestData {
  title: string;
  date: string;
  user: {
    name: string;
    avatar?: string;
  };
  scores: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
  previousScores: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
  codeAnalysis: Array<{
    title: string;
    code: string;
    feedback: string;
    score: number;
  }>;
}

const testData: Record<TestType, TestData> = {
  "frontend-dev": {
    title: "프론트엔드 개발자 역량 평가",
    date: "2023-05-10",
    user: {
      name: "김개발",
      // avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
    },
    scores: {
      overall: 82,
      codeStyle: 85,
      problemSolving: 80,
      collaboration: 83,
      devOps: 80,
    },
    previousScores: {
      overall: 75,
      codeStyle: 78,
      problemSolving: 73,
      collaboration: 76,
      devOps: 73,
    },
    codeAnalysis: [
      {
        title: "반응형 레이아웃 구현",
        code: `function ResponsiveLayout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}`,
        feedback: "반응형 디자인이 적절히 구현되었으며, CSS Grid를 효과적으로 활용했습니다.",
        score: 90
      }
    ]
  },
  "algorithm": {
    title: "JavaScript 알고리즘 테스트",
    date: "2023-04-15",
    user: {
      name: "김개발",
      // avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
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
    codeAnalysis: [
      {
        title: "Two Sum 문제 해결",
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return null;
}`,
        feedback: "해시맵을 활용한 효율적인 솔루션을 구현했습니다. 시간복잡도 O(n)으로 최적화되었습니다.",
        score: 95
      }
    ]
  },
  "backend-dev": {
    title: "백엔드 API 설계 테스트",
    date: "2023-03-22",
    user: {
      name: "김개발",
      // avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
    },
    scores: {
      overall: 92,
      codeStyle: 90,
      problemSolving: 93,
      collaboration: 89,
      devOps: 88,
    },
    previousScores: {
      overall: 82,
      codeStyle: 80,
      problemSolving: 83,
      collaboration: 79,
      devOps: 78,
    },
    codeAnalysis: [
      {
        title: "RESTful API 엔드포인트 구현",
        code: `@RestController
@RequestMapping("/api/v1")
public class UserController {
  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);
  }
}`,
        feedback: "RESTful 원칙을 잘 준수했으며, 적절한 에러 처리와 응답 형식을 사용했습니다.",
        score: 92
      }
    ]
  },
  "react-dev": {
    title: "React 컴포넌트 개발 테스트",
    date: "2023-02-18",
    user: {
      name: "김개발",
      // avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
    },
    scores: {
      overall: 78,
      codeStyle: 80,
      problemSolving: 75,
      collaboration: 82,
      devOps: 75,
    },
    previousScores: {
      overall: 75,
      codeStyle: 77,
      problemSolving: 72,
      collaboration: 79,
      devOps: 72,
    },
    codeAnalysis: [
      {
        title: "React 커스텀 훅 구현",
        code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
        feedback: "커스텀 훅의 재사용성이 뛰어나며, 에러 처리가 잘 구현되어 있습니다.",
        score: 85
      }
    ]
  }
};

export default function AssessmentResultPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const [showAIChat, setShowAIChat] = useState(false);

  // 현재 테스트 타입에 해당하는 데이터 가져오기
  const currentTest = testData[params.type as TestType] || testData["algorithm"];

  // 테스트 결과 데이터 준비
  const assessmentData = {
    title: currentTest.title,
    date: currentTest.date,
    user: currentTest.user,
    scores: currentTest.scores,
    previousScores: currentTest.previousScores,
    testResults: [
      {
        id: params.testId as string,
        title: currentTest.title,
        date: currentTest.date,
        scores: currentTest.scores,
        previousScores: currentTest.previousScores,
      }
    ],
    codeAnalysis: currentTest.codeAnalysis,
    aiFeedback: {
      strengths: [
        "알고리즘 문제 해결 능력이 뛰어납니다.",
        "코드 문서화가 상세하고 명확합니다.",
        "함수형 프로그래밍 패턴을 적절히 활용합니다.",
      ],
      improvements: [
        "일부 코드에서 성능 최적화가 필요합니다.",
        "변수 명명 규칙을 더 일관되게 적용하세요.",
      ],
      suggestions: [
        {
          title: "성능 최적화",
          description: "이중 for문 대신 해시 테이블을 사용하여 성능을 개선할 수 있습니다.",
        },
        {
          title: "코드 리팩토링",
          description: "중복된 로직을 별도의 함수로 분리하여 재사용성을 높이세요.",
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
              description: "해시 테이블, 트리, 그래프 등 고급 자료구조를 활용한 알고리즘 최적화 기법",
            }
          ],
        }
      ],
    },
    organizationFit: {
      overallFit: 84,
      techStackMatch: 88,
      codingStyleMatch: 85,
      collaborationMatch: 80,
      problemSolvingMatch: 90,
      analysis: "김개발님은 당사의 기술 스택과 개발 문화에 높은 적합성을 보입니다.",
    },
    comparisonData: {
      labels: ["코드 스타일", "문제 해결력", "협업 능력", "DevOps", "전체 점수"],
      currentScores: [
        currentTest.scores.codeStyle,
        currentTest.scores.problemSolving,
        currentTest.scores.collaboration,
        currentTest.scores.devOps,
        currentTest.scores.overall,
      ],
      previousScores: [
        currentTest.previousScores.codeStyle,
        currentTest.previousScores.problemSolving,
        currentTest.previousScores.collaboration,
        currentTest.previousScores.devOps,
        currentTest.previousScores.overall,
      ],
      industryAverage: [72, 78, 70, 68, 75],
    },
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
          <Link href="/dashboard/assessment-history">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 평가 이력으로 돌아가기
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