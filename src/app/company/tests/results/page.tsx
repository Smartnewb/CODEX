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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Search,
  ThumbsDown,
  ThumbsUp,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function TestResultsPage() {
  return <TestResultsPageContent />;
}

function TestResultsPageContent() {
  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const testInfo = {
    title: "JavaScript 알고리즘 테스트",
    date: "2023-04-20",
    totalApplicants: 15,
    averageScore: 78,
    passRate: 60,
    duration: "60분",
  };

  const candidates = [
    {
      id: "candidate-1",
      name: "김개발",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer1",
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
      score: 75,
      problemSolving: 80,
      codeQuality: 70,
      optimization: 65,
      bestPractices: 75,
      documentation: 80,
      status: "보류",
      matchRate: 65,
    },
    {
      id: "candidate-4",
      name: "최프로그래머",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer4",
      score: 65,
      problemSolving: 70,
      codeQuality: 60,
      optimization: 55,
      bestPractices: 65,
      documentation: 70,
      status: "불합격",
      matchRate: 55,
    },
    {
      id: "candidate-5",
      name: "정데브",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer5",
      score: 82,
      problemSolving: 85,
      codeQuality: 80,
      optimization: 75,
      bestPractices: 80,
      documentation: 85,
      status: "합격",
      matchRate: 75,
    },
  ];

  const selectedCandidate = candidates[0];

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
          <Link href="/company/tests">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 테스트 관리로 돌아가기
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{testInfo.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-muted-foreground">완료일: {testInfo.date}</p>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              완료됨
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">총 지원자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={24} className="text-[#0066FF]" />
                </div>
                <div className="text-3xl font-bold">
                  {testInfo.totalApplicants}명
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">평균 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={24} className="text-[#0066FF]" />
                </div>
                <div className="text-3xl font-bold">
                  {testInfo.averageScore}점
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">합격률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={24} className="text-[#0066FF]" />
                </div>
                <div className="text-3xl font-bold">{testInfo.passRate}%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="candidates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="candidates">지원자 목록</TabsTrigger>
            <TabsTrigger value="analysis">종합 분석</TabsTrigger>
            <TabsTrigger value="comparison">지원자 비교</TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="지원자 검색..."
                  className="pl-8"
                />
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
              {candidates.map((candidate) => (
                <Card key={candidate.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                          👨‍💻
                        </div>
                        <div>
                          <h3 className="font-medium">{candidate.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge
                              className={`${candidate.status === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidate.status === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                            >
                              {candidate.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            종합 점수
                          </div>
                          <div className="font-bold text-lg">
                            {candidate.score}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            문제 해결
                          </div>
                          <div className="font-medium">
                            {candidate.problemSolving}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            코드 품질
                          </div>
                          <div className="font-medium">
                            {candidate.codeQuality}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            최적화
                          </div>
                          <div className="font-medium">
                            {candidate.optimization}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            조직 적합도
                          </div>
                          <div className="font-medium">
                            {candidate.matchRate}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <Link
                            href={`/company/tests/result_for_company/report/${candidate.id}`}
                          >
                            <Button size="sm" variant="outline">
                              상세 분석{" "}
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </Link>
                          <Link href="/company/tests/result_for_company/decision">
                            <Button size="sm">
                              채용 결정{" "}
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>역량별 평균 점수</CardTitle>
                  <CardDescription>
                    지원자들의 역량별 평균 점수를 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          문제 해결 능력
                        </span>
                        <span className="text-sm font-medium">84/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "84%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">코드 품질</span>
                        <span className="text-sm font-medium">76/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "76%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">최적화</span>
                        <span className="text-sm font-medium">72/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          모범 사례 준수
                        </span>
                        <span className="text-sm font-medium">79/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "79%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">문서화</span>
                        <span className="text-sm font-medium">83/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "83%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>합격/불합격 분포</CardTitle>
                  <CardDescription>
                    지원자들의 합격/불합격 현황을 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="w-48 h-48 rounded-full border-8 border-muted relative mb-6">
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{ clipPath: "inset(0 0 0 50%)" }}
                    >
                      <div className="w-full h-full bg-green-500"></div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                    >
                      <div className="w-full h-full bg-red-500"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">60%</div>
                        <div className="text-sm text-muted-foreground">
                          합격률
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>합격 (9명)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>불합격 (6명)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>점수 분포</CardTitle>
                  <CardDescription>
                    지원자들의 점수 분포를 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">90점 이상</span>
                        <span className="text-sm font-medium">2명</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-green-500 h-4 rounded-full"
                          style={{ width: "13%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">80-89점</span>
                        <span className="text-sm font-medium">4명</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-green-400 h-4 rounded-full"
                          style={{ width: "27%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">70-79점</span>
                        <span className="text-sm font-medium">5명</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-amber-400 h-4 rounded-full"
                          style={{ width: "33%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">60-69점</span>
                        <span className="text-sm font-medium">3명</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-amber-500 h-4 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">60점 미만</span>
                        <span className="text-sm font-medium">1명</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full"
                          style={{ width: "7%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>조직 적합도 분석</CardTitle>
                  <CardDescription>
                    지원자들의 기업 문화 및 기술 스택 적합도를 확인하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          기술 스택 일치도
                        </span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          코딩 스타일 일치도
                        </span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          협업 방식 적합도
                        </span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          문제 해결 접근법
                        </span>
                        <span className="text-sm font-medium">79%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "79%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">종합 적합도</span>
                        <span className="text-sm font-medium">76%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-[#0066FF] h-2.5 rounded-full"
                          style={{ width: "76%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">지원자 비교</h2>
              <Button variant="outline">
                <Download size={16} className="mr-2" /> 비교 결과 다운로드
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>지원자 성과 비교</CardTitle>
                <CardDescription>
                  선택한 지원자들의 성과를 비교하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">지원자</th>
                        <th className="text-center py-3 px-4">종합 점수</th>
                        <th className="text-center py-3 px-4">문제 해결</th>
                        <th className="text-center py-3 px-4">코드 품질</th>
                        <th className="text-center py-3 px-4">최적화</th>
                        <th className="text-center py-3 px-4">모범 사례</th>
                        <th className="text-center py-3 px-4">문서화</th>
                        <th className="text-center py-3 px-4">조직 적합도</th>
                        <th className="text-center py-3 px-4">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.slice(0, 3).map((candidate) => (
                        <tr key={candidate.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Image
                                src={candidate.avatar}
                                alt={candidate.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              <span className="font-medium">
                                {candidate.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 font-bold">
                            {candidate.score}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.problemSolving}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.codeQuality}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.optimization}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.bestPractices}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.documentation}
                          </td>
                          <td className="text-center py-3 px-4">
                            {candidate.matchRate}%
                          </td>
                          <td className="text-center py-3 px-4">
                            <Badge
                              className={`${candidate.status === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidate.status === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                            >
                              {candidate.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>역량 비교</CardTitle>
                  <CardDescription>
                    선택한 지원자들의 역량을 비교하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      레이더 차트가 이 위치에 표시됩니다.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>조직 적합도 비교</CardTitle>
                  <CardDescription>
                    선택한 지원자들의 조직 적합도를 비교하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={candidate.avatar}
                            alt={candidate.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="font-medium">{candidate.name}</span>
                          <span className="ml-auto font-bold">
                            {candidate.matchRate}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.matchRate}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>채용 의사결정 지원</CardTitle>
                <CardDescription>
                  AI 기반 분석을 통해 최적의 채용 결정을 내리세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold mb-2">AI 추천</h3>
                    <p className="text-sm">
                      분석 결과, <strong>김개발</strong>님과{" "}
                      <strong>이코딩</strong>님이 귀사의 기술 스택 및 개발
                      문화에 가장 적합한 것으로 판단됩니다. 특히 김개발님은 문제
                      해결 능력과 코드 품질 측면에서 우수한 성과를 보였습니다.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {candidates.slice(0, 3).map((candidate) => (
                      <Card key={candidate.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <Image
                              src={candidate.avatar}
                              alt={candidate.name}
                              width={64}
                              height={64}
                              className="rounded-full mb-3"
                            />
                            <h3 className="font-medium">{candidate.name}</h3>
                            <div className="flex items-center gap-1 mt-1 mb-3">
                              <Badge
                                className={`${candidate.status === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidate.status === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                              >
                                {candidate.status}
                              </Badge>
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                <ThumbsDown
                                  size={14}
                                  className="mr-1 text-red-500"
                                />{" "}
                                불합격
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                보류
                              </Button>
                              <Button size="sm" className="w-full">
                                <ThumbsUp
                                  size={14}
                                  className="mr-1 text-green-500"
                                />{" "}
                                합격
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
