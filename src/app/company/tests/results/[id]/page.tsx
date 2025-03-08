import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { AIFeedbackCard } from "@/components/reports/ai-feedback-card";
import { CandidateProfileCard } from "@/components/reports/candidate-profile-card";
import { CodeAnalysisCard } from "@/components/reports/code-analysis-card";
import { LearningResourcesCard } from "@/components/reports/learning-resources-card";
import { OrganizationFitCard } from "@/components/reports/organization-fit-card";
import { SkillsSummaryCard } from "@/components/reports/skills-summary-card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CandidateResultPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const testInfo = {
    title: "JavaScript 알고리즘 테스트",
    date: "2023-04-20",
  };

  const candidate = {
    id: params.id,
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
    testDuration: "58분 32초",
    completedAt: "2023-04-20 14:23",
    strengths: [
      "알고리즘 문제 해결 능력이 뛰어납니다.",
      "코드 문서화가 상세하고 명확합니다.",
      "함수형 프로그래밍 패턴을 적절히 활용합니다.",
      "에러 처리가 체계적으로 구현되어 있습니다.",
    ],
    improvements: [
      "일부 코드에서 성능 최적화가 필요합니다.",
      "변수 명명 규칙을 더 일관되게 적용하세요.",
      "테스트 케이스 작성이 부족합니다.",
    ],
    codeSnippets: [
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
}`,
        feedback:
          "퀵소트 알고리즘을 효율적으로 구현했습니다. 피벗 선택 방식이 적절하며, 재귀 호출 구조가 명확합니다. 다만, 대용량 데이터에 대한 최적화가 더 필요할 수 있습니다.",
        score: 90,
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
}`,
        feedback:
          "비동기 처리와 에러 핸들링이 잘 구현되어 있습니다. try-catch 블록을 적절히 사용했고, 응답 상태 확인도 포함되어 있습니다. 다만, 재시도 로직이나 타임아웃 처리가 없는 점은 개선할 수 있습니다.",
        score: 85,
      },
    ],
    learningResources: [
      {
        title: "자바스크립트 성능 최적화 가이드",
        url: "#",
        type: "article",
      },
      {
        title: "클린 코드: 애자일 소프트웨어 장인 정신",
        url: "#",
        type: "book",
      },
      {
        title: "테스트 주도 개발 방법론",
        url: "#",
        type: "course",
      },
    ],
  };

  // 조직 적합도 분석 데이터
  const organizationFitData = {
    techStackMatch: 82,
    codingStyleMatch: 78,
    collaborationMatch: 90,
    problemSolvingMatch: 85,
    aiAnalysis: `${candidate.name}님은 귀사의 기술 스택과 개발 문화에 높은 적합성을 보입니다. 특히 문제 해결 접근 방식과 협업 방식이 현재 팀과 매우 유사합니다. 코드 품질과 문서화 능력이 뛰어나며, 기존 개발자들과 원활한 협업이 가능할 것으로 예상됩니다.`,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="https://api.dicebear.com/7.x/shapes/svg?seed=codeassess&backgroundColor=0066FF&radius=10"
              alt="CodeAssess AI 로고"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-lg">CodeAssess AI</span>
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

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <CandidateProfileCard candidate={candidate} testInfo={testInfo} />
          </div>

          <div className="md:w-2/3 space-y-6">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="summary">요약</TabsTrigger>
                <TabsTrigger value="code-analysis">코드 분석</TabsTrigger>
                <TabsTrigger value="organization-fit">조직 적합도</TabsTrigger>
                <TabsTrigger value="learning-path">학습 로드맵</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-6 mt-6">
                <SkillsSummaryCard
                  candidateName={candidate.name}
                  problemSolving={candidate.problemSolving}
                  codeQuality={candidate.codeQuality}
                  optimization={candidate.optimization}
                  bestPractices={candidate.bestPractices}
                  documentation={candidate.documentation}
                  overallScore={candidate.score}
                />

                <AIFeedbackCard
                  candidateName={candidate.name}
                  strengths={candidate.strengths}
                  improvements={candidate.improvements}
                />
              </TabsContent>

              <TabsContent value="code-analysis" className="space-y-6 mt-6">
                <CodeAnalysisCard
                  candidateName={candidate.name}
                  codeSnippets={candidate.codeSnippets}
                />
              </TabsContent>

              <TabsContent value="organization-fit" className="space-y-6 mt-6">
                <OrganizationFitCard
                  candidateName={candidate.name}
                  matchRate={candidate.matchRate}
                  techStackMatch={organizationFitData.techStackMatch}
                  codingStyleMatch={organizationFitData.codingStyleMatch}
                  collaborationMatch={organizationFitData.collaborationMatch}
                  problemSolvingMatch={organizationFitData.problemSolvingMatch}
                  aiAnalysis={organizationFitData.aiAnalysis}
                />
              </TabsContent>

              <TabsContent value="learning-path" className="space-y-6 mt-6">
                <LearningResourcesCard
                  candidateName={candidate.name}
                  resources={candidate.learningResources}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
