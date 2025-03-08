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
import { ArrowLeft, Clock, Edit, Plus, Trash2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Test {
  id: string;
  title: string;
  createdAt: string;
  applicants: number;
  status: string;
}

export default function ManageTestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 테스트 목록 가져오기
    const savedTests = localStorage.getItem("activeTests");
    if (savedTests) {
      setTests(JSON.parse(savedTests));
    }
  }, []);

  const deleteTest = (id: string) => {
    const updatedTests = tests.filter((test) => test.id !== id);
    setTests(updatedTests);
    localStorage.setItem("activeTests", JSON.stringify(updatedTests));
    setTestToDelete(null);
  };

  const toggleTestStatus = (id: string) => {
    const updatedTests = tests.map((test) => {
      if (test.id === id) {
        return {
          ...test,
          status: test.status === "진행중" ? "마감됨" : "진행중",
        };
      }
      return test;
    });
    setTests(updatedTests);
    localStorage.setItem("activeTests", JSON.stringify(updatedTests));
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
                테크스타트 주식회사
              </span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-2 px-4 border-b">
        <nav className="flex space-x-4">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/company/dashboard">
              <ArrowLeft size={16} className="mr-2" /> 뒤로 가기
            </Link>
          </Button>
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
            href="/company/tests/manage"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">테스트 관리</h1>
          <p className="text-muted-foreground">
            생성한 테스트를 관리하고 수정하세요.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-sm text-muted-foreground">
              총 {tests.length}개의 테스트
            </span>
          </div>
          <Button asChild>
            <Link href="/company/tests/create">
              <Plus size={16} className="mr-2" /> 새 테스트 생성
            </Link>
          </Button>
        </div>

        {tests.length > 0 ? (
          <div className="grid gap-4">
            {tests.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <CardDescription>
                        생성일: {test.createdAt}
                      </CardDescription>
                    </div>
                    <div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          test.status === "진행중"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User size={16} className="text-muted-foreground" />
                      <span>{test.applicants}명 지원</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>
                        {test.status === "진행중" ? "진행 중" : "마감됨"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/company/tests/edit/${test.id}`}>
                        <Edit size={16} className="mr-2" /> 수정
                      </Link>
                    </Button>
                    <AlertDialog
                      open={testToDelete === test.id}
                      onOpenChange={(open) => !open && setTestToDelete(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => setTestToDelete(test.id)}
                        >
                          <Trash2 size={16} className="mr-2" /> 삭제
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>테스트 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            정말로 이 테스트를 삭제하시겠습니까? 이 작업은
                            되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTest(test.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const shareLink = `https://codeassess.ai/test/${test.id}`;
                        navigator.clipboard.writeText(shareLink);
                        alert(
                          `테스트 공유 링크가 클립보드에 복사되었습니다: ${shareLink}`,
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      공유
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => toggleTestStatus(test.id)}
                    >
                      {test.status === "진행중" ? "마감하기" : "재개하기"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/50">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                아직 생성된 테스트가 없습니다. 새 테스트를 생성해보세요.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
