"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, GitPullRequest, ThumbsUp, ThumbsDown } from "lucide-react";

interface VirtualTeammateProps {
  onFeedbackSubmit?: (feedback: string) => void;
  onPRSubmit?: () => void;
}

export function VirtualTeammate({ onFeedbackSubmit, onPRSubmit }: VirtualTeammateProps) {
  const [message, setMessage] = useState("");
  const [prStatus, setPrStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [feedbackHistory, setFeedbackHistory] = useState<Array<{
    id: number;
    message: string;
    type: "teammate" | "user";
    timestamp: Date;
  }>>([
    {
      id: 1,
      message: "코드 리뷰를 시작하겠습니다. PR을 제출해주세요.",
      type: "teammate",
      timestamp: new Date(),
    },
  ]);

  const handleMessageSubmit = () => {
    if (!message.trim()) return;

    const newFeedback = {
      id: feedbackHistory.length + 1,
      message: message.trim(),
      type: "user" as const,
      timestamp: new Date(),
    };

    setFeedbackHistory([...feedbackHistory, newFeedback]);
    onFeedbackSubmit?.(message);
    setMessage("");

    // 가상 팀원의 응답 시뮬레이션
    setTimeout(() => {
      const responses = [
        "코드의 가독성이 좋네요. 변수 명명이 명확합니다.",
        "이 부분의 시간 복잡도를 개선할 수 있을 것 같습니다.",
        "테스트 케이스를 좀 더 추가하면 좋을 것 같습니다.",
        "에러 처리를 추가하면 더 좋을 것 같네요.",
      ];

      const teammateResponse = {
        id: feedbackHistory.length + 2,
        message: responses[Math.floor(Math.random() * responses.length)],
        type: "teammate" as const,
        timestamp: new Date(),
      };

      setFeedbackHistory((prev) => [...prev, teammateResponse]);
    }, 1000);
  };

  const handlePRSubmit = () => {
    onPRSubmit?.();
    setPrStatus(Math.random() > 0.3 ? "approved" : "rejected");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">가상 팀원 협업</CardTitle>
          <Badge
            variant={
              prStatus === "approved"
                ? "secondary"
                : prStatus === "rejected"
                ? "destructive"
                : "outline"
            }
          >
            {prStatus === "approved"
              ? "승인됨"
              : prStatus === "rejected"
              ? "반려됨"
              : "검토 중"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 mb-4 overflow-auto">
          {feedbackHistory.map((feedback) => (
            <div
              key={feedback.id}
              className={`flex gap-2 ${
                feedback.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  feedback.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{feedback.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {feedback.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePRSubmit}
            className="flex items-center gap-1"
          >
            <GitPullRequest size={14} />
            PR 제출
          </Button>
          {prStatus === "approved" ? (
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <ThumbsUp size={14} />
              승인됨
            </Button>
          ) : prStatus === "rejected" ? (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-red-500"
            >
              <ThumbsDown size={14} />
              반려됨
            </Button>
          ) : null}
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="메시지 입력..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMessageSubmit();
              }
            }}
          />
          <Button onClick={handleMessageSubmit} className="flex items-center gap-1">
            <MessageSquare size={14} />
            전송
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
