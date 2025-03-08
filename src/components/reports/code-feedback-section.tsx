import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Code, Lightbulb } from "lucide-react";
import { useState } from "react";

interface CodeFeedbackSectionProps {
  candidateName: string;
}

export function CodeFeedbackSection({
  candidateName,
}: CodeFeedbackSectionProps) {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      content: `${candidateName}님의 코드에 대한 AI 피드백입니다.`,
    },
    {
      role: "assistant",
      content: `${candidateName}님의 코드를 분석한 결과, 몇 가지 개선 포인트를 발견했습니다. 코드 품질과 성능 최적화에 관한 피드백을 제공해 드리겠습니다.`,
    },
  ]);

  const handleSendQuestion = () => {
    if (!question.trim()) return;

    // 사용자 질문 추가
    setChatHistory([...chatHistory, { role: "user", content: question }]);

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const aiResponses = [
        `${candidateName}님의 코드에서 이중 for문을 사용한 부분은 시간 복잡도가 O(n²)입니다. 해시 테이블을 활용하면 O(n)으로 개선할 수 있습니다.`,
        `변수명이 a, b, c와 같이 의미를 알기 어렵게 작성되어 있습니다. 더 직관적인 이름(예: totalCount, userIndex 등)을 사용하면 가독성이 향상됩니다.`,
        `에러 처리가 충분하지 않습니다. 특히 외부 API 호출 부분에서 try-catch 블록을 추가하여 예외 상황에 대응하는 것이 좋습니다.`,
        `코드 중복이 여러 곳에서 발견됩니다. 반복되는 로직은 별도의 함수로 분리하여 재사용성을 높이는 것이 좋습니다.`,
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setChatHistory([
        ...chatHistory,
        { role: "user", content: question },
        { role: "assistant", content: randomResponse },
      ]);
      setQuestion("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI 코드 리뷰 피드백</CardTitle>
          <CardDescription>
            {candidateName}님의 코드에 대한 AI 분석 및 개선 제안입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Code
                      size={18}
                      className="text-blue-600 dark:text-blue-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">코드 최적화 제안</h3>
                    <p className="text-sm mt-1">
                      이중 for문 대신 해시 테이블을 사용하여 성능을 개선할 수
                      있습니다. 시간 복잡도를 O(n²)에서 O(n)으로 줄일 수
                      있습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                    <Lightbulb
                      size={18}
                      className="text-amber-600 dark:text-amber-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">가독성 개선 제안</h3>
                    <p className="text-sm mt-1">
                      변수명이 직관적이지 않습니다. 의미를 명확하게 표현하는
                      변수명을 사용하세요. (예: a → totalCount)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-800 p-2 rounded-full">
                    <MessageSquare
                      size={18}
                      className="text-green-600 dark:text-green-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">협업 방식 개선</h3>
                    <p className="text-sm mt-1">
                      PR 작성 시 더 구체적인 설명을 포함하면 리뷰어가 쉽게
                      이해할 수 있습니다. 변경 사항의 목적과 영향을 명확히
                      기술하세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 border rounded-md">
            <h3 className="font-medium mb-4">AI 코드 리뷰 챗봇</h3>
            <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto p-2">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="코드에 대해 질문하세요..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendQuestion();
                  }
                }}
              />
              <Button onClick={handleSendQuestion}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
