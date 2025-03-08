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
import { ArrowRight, Award, Clock, History } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data - would come from API in real app
  const user = {
    name: "김개발",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  };

  const activeTests = [
    {
      id: "test-1",
      title: "프론트엔드 개발자 역량 평가",
      company: "테크스타트 주식회사",
      duration: "60분",
      status: "대기중",
    },
    {
      id: "test-2",
      title: "React 실무 코딩 테스트",
      company: "AI 솔루션즈",
      duration: "45분",
      status: "대기중",
    },
  ];

  const recentResults = [
    {
      id: "result-1",
      title: "JavaScript 알고리즘 테스트",
      company: "웹테크 주식회사",
      score: 85,
      feedback: "알고리즘 이해도가 높으나 코드 최적화 필요",
      date: "2023-04-15",
    },
    {
      id: "result-2",
      title: "백엔드 API 설계 테스트",
      company: "클라우드 시스템즈",
      score: 92,
      feedback: "API 설계 능력이 우수함. 보안 관련 지식 향상 권장",
      date: "2023-03-22",
    },
  ];

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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=developer&backgroundColor=f5f5f5"
                alt="프로필 이미지"
                width={36}
                height={36}
                className="rounded-full"
              /> */}
              <span className="text-sm font-medium hidden sm:inline">
                {user.name}
              </span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            안녕하세요, {user.name}님!
          </h1>
          <p className="text-muted-foreground">
            오늘도 코딩 테스트를 통해 개발 역량을 향상시켜 보세요.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">진행 가능한 테스트</h2>
              <Button variant="outline" asChild>
                <Link href="/dashboard/assessment-history">
                  <History size={16} className="mr-2" /> 평가 이력
                </Link>
              </Button>
            </div>
            {activeTests.length > 0 ? (
              <div className="grid gap-4">
                {activeTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <CardDescription>{test.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        <span>{test.duration}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          test.status === "대기중"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {test.status}
                      </span>
                      <Button asChild>
                        <Link href="/coding-test">
                          시작하기 <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    현재 진행 가능한 테스트가 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">최근 결과</h2>
            {recentResults.length > 0 ? (
              <div className="grid gap-4">
                {recentResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{result.title}</CardTitle>
                      <CardDescription>{result.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                          {result.date}
                        </span>
                        <div className="flex items-center gap-1">
                          <Award size={16} className="text-[#0066FF]" />
                          <span className="font-medium">{result.score}점</span>
                        </div>
                      </div>
                      <p className="text-sm">{result.feedback}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/result_for_developer">상세 결과 보기</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    이전 테스트 결과가 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>역량 성장 분석</CardTitle>
                <CardDescription>
                  지난 3개월간의 역량 성장 추이입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">코드 스타일</span>
                      <span className="text-sm font-medium text-green-600">
                        +18%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">문제 해결력</span>
                      <span className="text-sm font-medium text-green-600">
                        +5%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">협업 능력</span>
                      <span className="text-sm font-medium text-green-600">
                        +10%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/result_for_developer">전체 성장 분석 보기</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
