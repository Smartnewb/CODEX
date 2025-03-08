import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChatFeedback() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "안녕하세요! 평가 결과에 대해 궁금한 점이 있으시면 질문해주세요.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";

      // Simple pattern matching for demo purposes
      const lowerInput = input.toLowerCase();
      if (
        lowerInput.includes("코드 스타일") ||
        lowerInput.includes("코딩 스타일")
      ) {
        aiResponse =
          "코드 스타일 점수는 85점으로, 이전 평가의 72점보다 크게 향상되었습니다. 특히 변수 명명 규칙과 함수 구조화에서 개선이 있었습니다. 더 나은 점수를 위해서는 일관된 들여쓰기와 주석 작성을 권장합니다.";
      } else if (
        lowerInput.includes("문제 해결") ||
        lowerInput.includes("알고리즘")
      ) {
        aiResponse =
          "문제 해결력 점수는 78점으로, 이전 평가의 74점보다 향상되었습니다. 알고리즘 선택과 구현 능력이 좋습니다. 다만, 시간 복잡도와 공간 복잡도를 더 고려한 최적화가 필요합니다. '고급 자료구조와 알고리즘' 강의를 추천드립니다.";
      } else if (lowerInput.includes("협업") || lowerInput.includes("팀워크")) {
        aiResponse =
          "협업 능력 점수는 88점으로 매우 우수합니다. PR 작성과 코드 리뷰 참여도가 높고, 피드백을 적극적으로 수용하는 모습이 인상적입니다. 다른 개발자들과의 협업 시 명확한 커뮤니케이션 능력이 돋보입니다.";
      } else if (
        lowerInput.includes("개선") ||
        lowerInput.includes("향상") ||
        lowerInput.includes("발전")
      ) {
        aiResponse =
          "역량 향상을 위해 다음을 추천합니다: 1) 알고리즘 최적화 학습, 2) 테스트 주도 개발 방법론 적용, 3) 백엔드 기술에 대한 이해도 향상. 특히 '실용적인 테스트 주도 개발' 책을 읽고 실제 프로젝트에 적용해보는 것이 효과적일 것입니다.";
      } else if (
        lowerInput.includes("조직") ||
        lowerInput.includes("적합") ||
        lowerInput.includes("회사")
      ) {
        aiResponse =
          "조직 적합도는 85%로 매우 높습니다. 특히 협업 방식(90%)과 코딩 스타일(88%)이 현재 팀과 매우 유사합니다. 기술 스택 일치도는 82%로, React와 TypeScript에 대한 이해도가 높습니다. 백엔드 기술에 대한 이해도를 높이면 더욱 완벽한 적합성을 가질 것입니다.";
      } else {
        aiResponse =
          "평가 결과에 따르면 전반적으로 우수한 성과를 보이고 있습니다. 특히 협업 능력(88점)과 코드 스타일(85점)이 뛰어납니다. 개선이 필요한 영역은 DevOps(76점)와 문제 해결력(78점)입니다. 더 구체적인 정보가 필요하시면 특정 영역에 대해 질문해주세요.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI 피드백 채팅</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[90%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="질문을 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send size={16} />
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground">추천 질문:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInput("코드 스타일 점수를 어떻게 향상시킬 수 있나요?");
              }}
            >
              코드 스타일 향상 방법
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInput("알고리즘 최적화를 위한 추천 자료가 있나요?");
              }}
            >
              알고리즘 최적화 자료
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setInput("조직 적합도는 어떻게 계산되나요?");
              }}
            >
              조직 적합도 계산 방식
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
