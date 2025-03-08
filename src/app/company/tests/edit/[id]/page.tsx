"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TestCreationForm } from "@/components/company/test-creation-form";

export default function EditTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const [testTitle, setTestTitle] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 테스트 정보 가져오기
    const savedTests = localStorage.getItem("activeTests");
    if (savedTests) {
      const tests = JSON.parse(savedTests);
      const test = tests.find((t: any) => t.id === testId);
      if (test) {
        setTestTitle(test.title);
      } else {
        // 테스트를 찾을 수 없으면 관리 페이지로 리다이렉트
        router.push("/company/tests/manage");
      }
    }
  }, [testId, router]);

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
            <span className="font-bold text-lg">CodeAssess AI</span>
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
            <Link href="/company/tests/manage">
              <ArrowLeft size={16} className="mr-2" /> 테스트 관리로 돌아가기
            </Link>
          </Button>
        </nav>
      </div>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">테스트 수정: {testTitle}</h1>
          <p className="text-muted-foreground">
            테스트 내용을 수정하고 저장하세요.
          </p>
        </div>

        <TestCreationForm isEditing={true} testId={testId} />
      </main>
    </div>
  );
}
