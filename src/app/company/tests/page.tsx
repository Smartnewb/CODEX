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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyHeader } from "@/components/company/header";

export default function CompanyTestsPage() {
  const router = useRouter();
  const [deleteTestId, setDeleteTestId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock data - would come from API in real app
  const company = {
    name: "테크스타트 주식회사",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=company",
  };

  const activeTests = [
    {
      id: "test-1",
      title: "프론트엔드 개발자 역량 평가",
      createdAt: "2023-05-01",
      applicants: 12,
      inProgress: 5,
      completed: 7,
      status: "진행중",
    },
    {
      id: "test-2",
      title: "백엔드 개발자 코딩 테스트",
      createdAt: "2023-04-28",
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
    },
    {
      id: "applicant-2",
      name: "이코딩",
      avatar: "👩‍💻",
      test: "프론트엔드 개발자 역량 평가",
      progress: 45,
      timeRemaining: "32분",
      alerts: 2,
    },
    {
      id: "applicant-3",
      name: "박엔지니어",
      avatar: "🧑‍💻",
      test: "백엔드 개발자 코딩 테스트",
      progress: 90,
      timeRemaining: "5분",
      alerts: 1,
    },
    {
      id: "applicant-4",
      name: "최프론트",
      avatar: "👨‍💻",
      test: "프론트엔드 개발자 역량 평가",
      progress: 60,
      timeRemaining: "25분",
      alerts: 0,
    },
    {
      id: "applicant-5",
      name: "정백엔드",
      avatar: "👩‍💻",
      test: "백엔드 개발자 코딩 테스트",
      progress: 30,
      timeRemaining: "42분",
      alerts: 0,
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
    },
    {
      id: "alert-2",
      applicant: "박엔지니어",
      avatar: "🧑‍��",
      test: "백엔드 개발자 코딩 테스트",
      type: "코드 복사",
      count: 1,
      time: "15분 전",
    },
  ];

  // 테스트 수정 함수
  const handleEdit = (testId: string) => {
    router.push(`/company/tests/edit/${testId}`);
  };

  // 테스트 삭제 함수
  const handleDelete = (testId: string) => {
    setDeleteTestId(testId);
    setIsDeleteDialogOpen(true);
  };

  // 테스트 삭제 확인 함수
  const confirmDelete = () => {
    if (deleteTestId) {
      // TODO: API 호출하여 실제 삭제 처리
      console.log(`테스트 ${deleteTestId} 삭제됨`);
      setIsDeleteDialogOpen(false);
      setDeleteTestId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">테스트 관리</h1>
          <p className="text-muted-foreground">
            진행 중인 테스트를 모니터링하고 결과를 분석하세요.
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="active">진행 중인 테스트</TabsTrigger>
              <TabsTrigger value="monitoring">실시간 모니터링</TabsTrigger>
              <TabsTrigger value="alerts">부정행위 알림</TabsTrigger>
              <TabsTrigger value="completed">완료된 테스트</TabsTrigger>
            </TabsList>
            <Button>
              <Plus size={16} className="mr-2" /> 새 테스트 생성
            </Button>
          </div>

          <TabsContent value="active" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="테스트 검색..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              {activeTests.map((test) => (
                <Card key={test.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <CardDescription>
                          생성일: {test.createdAt}
                        </CardDescription>
                      </div>
                      <div className="flex items-start gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(test.id)}
                        >
                          <FileText size={16} className="mr-2" /> 수정
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(test.id)}
                        >
                          <X size={16} className="mr-2" /> 삭제
                        </Button>
                        <Badge
                          className={`${test.status === "진행중" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                        >
                          {test.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          총 지원자
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={16} className="text-muted-foreground" />
                          <span className="font-medium">
                            {test.applicants}명
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          진행 중
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-amber-500" />
                          <span className="font-medium">
                            {test.inProgress}명
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          완료
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={16} className="text-green-500" />
                          <span className="font-medium">
                            {test.completed}명
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4">
                    <Link href="/company/tests/monitoring">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" /> 모니터링
                      </Button>
                    </Link>
                    <Link href={`/company/tests/results`}>
                      <Button size="sm">
                        결과 보기 <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">실시간 응시자 현황</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">정상 진행</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">부정행위 의심</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {applicants.map((applicant) => (
                <Card key={applicant.id}>
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
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                            {applicant.alerts}
                          </div>
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
                  </CardContent>
                </Card>
              ))}
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
                  <Card key={alert.id} className="border-red-200">
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
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.time}
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

          <TabsContent value="completed" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="테스트 검색..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        JavaScript 알고리즘 테스트
                      </CardTitle>
                      <CardDescription>완료일: 2023-04-20</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      완료됨
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        총 지원자
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-muted-foreground" />
                        <span className="font-medium">15명</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        평균 점수
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">78점</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        합격률
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" /> 결과 다운로드
                  </Button>
                  <Link href={`/company/tests/results`}>
                    <Button size="sm">
                      상세 분석 <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        React 컴포넌트 개발 테스트
                      </CardTitle>
                      <CardDescription>완료일: 2023-03-15</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      완료됨
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        총 지원자
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-muted-foreground" />
                        <span className="font-medium">10명</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        평균 점수
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">82점</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        합격률
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">70%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4">
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" /> 결과 다운로드
                  </Button>
                  <Link href={`/company/tests/results`}>
                    <Button size="sm">
                      상세 분석 <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>테스트 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 테스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
