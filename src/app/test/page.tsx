"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Save, Send } from "lucide-react";
import { useState } from "react";

export default function TestPage() {
  const [code, setCode] = useState(
    `// 문제: 두 숫자의 합을 반환하는 함수를 작성하세요

function sum(a, b) {
  // 여기에 코드를 작성하세요
  
}

// 테스트 케이스
console.log(sum(1, 2)); // 3이 출력되어야 합니다
console.log(sum(-1, 5)); // 4가 출력되어야 합니다`,
  );

  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    setFeedback(null);

    // 실행 시뮬레이션
    setTimeout(() => {
      setOutput("실행 결과:\nundefined\nundefined");
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setOutput("");

    // 제출 및 AI 피드백 시뮬레이션
    setTimeout(() => {
      setOutput("실행 결과:\nundefined\nundefined");
      setFeedback(
        "함수가 값을 반환하지 않고 있습니다. 'return' 키워드를 사용하여 두 인자의 합을 반환해야 합니다. 또한 입력값의 유효성 검사를 추가하는 것이 좋습니다.",
      );
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              프론트엔드 개발자 역량 평가
            </span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              남은 시간: 58:24
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 border-r overflow-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h2>문제 1: 두 숫자의 합</h2>
            <p>
              두 숫자를 입력받아 그 합을 반환하는 함수 <code>sum</code>을
              작성하세요.
            </p>

            <h3>요구사항:</h3>
            <ul>
              <li>함수는 두 개의 숫자 매개변수를 받습니다.</li>
              <li>함수는 두 숫자의 합을 반환해야 합니다.</li>
              <li>입력값이 숫자가 아닌 경우 오류 처리를 해야 합니다.</li>
            </ul>

            <h3>예시:</h3>
            <pre>
              <code>
                sum(1, 2) // 3 반환 sum(-1, 5) // 4 반환 sum("a", 2) // 오류
                처리
              </code>
            </pre>

            <h3>평가 기준:</h3>
            <ul>
              <li>정확성: 모든 테스트 케이스를 통과하는가?</li>
              <li>코드 품질: 코드가 간결하고 가독성이 좋은가?</li>
              <li>예외 처리: 잘못된 입력에 대한 처리가 되어 있는가?</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-1/2 border-b p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">코드 편집기</h3>
              <Button variant="outline" size="sm">
                <Save size={16} className="mr-2" /> 저장
              </Button>
            </div>
            <div className="h-[calc(100%-40px)] rounded-md border bg-black text-white font-mono text-sm p-4 overflow-auto">
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          </div>

          <div className="h-1/2 p-4">
            <Tabs defaultValue="output">
              <div className="flex justify-between items-center mb-2">
                <TabsList>
                  <TabsTrigger value="output">실행 결과</TabsTrigger>
                  <TabsTrigger value="feedback">AI 피드백</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button
                    onClick={handleRun}
                    disabled={isRunning || isSubmitting}
                    size="sm"
                  >
                    {isRunning ? (
                      <>
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        실행 중...
                      </>
                    ) : (
                      <>
                        <Play size={16} className="mr-2" /> 실행
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    variant="brand"
                    size="sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        제출 중...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" /> 제출
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <TabsContent value="output" className="mt-0">
                <Card className="h-[calc(100%-40px)] bg-black text-white font-mono text-sm p-4 overflow-auto">
                  {output ? (
                    <pre>{output}</pre>
                  ) : (
                    <div className="text-gray-500">
                      코드를 실행하면 결과가 여기에 표시됩니다.
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-0">
                <Card className="h-[calc(100%-40px)] p-4 overflow-auto">
                  {feedback ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <h4>AI 피드백</h4>
                      <p>{feedback}</p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      코드를 제출하면 AI 피드백이 여기에 표시됩니다.
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
