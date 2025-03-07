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
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResultsPage() {
  // Mock data - would come from API in real app
  const testResult = {
    title: "프론트엔드 개발자 역량 평가",
    company: "테크스타트 주식회사",
    date: "2023-05-10",
    score: 78,
    skills: {
      problemSolving: 82,
      codeQuality: 75,
      optimization: 68,
      bestPractices: 80,
      documentation: 85,
    },
    feedback: {
      strengths: [
        "문제 해결 능력이 우수합니다.",
        "코드 문서화가 잘 되어 있습니다.",
        "함수형 프로그래밍 패턴을 적절히 활용합니다.",
      ],
      improvements: [
        "코드 최적화에 더 신경 쓰면 좋겠습니다.",
        "에러 처리가 일부 누락되어 있습니다.",
        "변수 명명 규칙을 더 일관되게 적용하세요.",
      ],
    },
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
        title: "프론트엔드 에러 처리 마스터하기",
        url: "#",
        type: "course",
      },
    ],
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
          <ThemeSwitcher />
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

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{testResult.title}</CardTitle>
                <CardDescription>
                  {testResult.company} • {testResult.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    {/* 이 부분은 실제로는 레이더 차트가 들어갈 자리입니다 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
                      <div className="text-center">
                        <div className="text-4xl font-bold">
                          {testResult.score}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          종합 점수
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">강점</h3>
                    <ul className="space-y-2">
                      {testResult.feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">개선점</h3>
                    <ul className="space-y-2">
                      {testResult.feedback.improvements.map(
                        (improvement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">!</span>
                            <span>{improvement}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>상세 역량 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(testResult.skills).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {skill === "problemSolving"
                            ? "문제 해결 능력"
                            : skill === "codeQuality"
                              ? "코드 품질"
                              : skill === "optimization"
                                ? "최적화"
                                : skill === "bestPractices"
                                  ? "모범 사례 준수"
                                  : "문서화"}
                        </span>
                        <span className="text-sm font-medium">{score}/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>학습 로드맵</CardTitle>
                <CardDescription>역량 향상을 위한 추천 자료</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResult.learningResources.map((resource, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <BookOpen size={18} className="text-[#0066FF]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {resource.type === "article"
                                ? "아티클"
                                : resource.type === "book"
                                  ? "도서"
                                  : "강의"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={resource.url}>
                            <ExternalLink size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  모든 추천 자료 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
