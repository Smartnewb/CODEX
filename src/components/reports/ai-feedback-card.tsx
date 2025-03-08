import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface AIFeedbackCardProps {
  candidateName: string;
  strengths: string[];
  improvements: string[];
}

export function AIFeedbackCard({
  candidateName,
  strengths,
  improvements,
}: AIFeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI 피드백</CardTitle>
        <CardDescription>
          {candidateName}님의 코딩 테스트에 대한 AI 분석 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-3">강점</h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check size={16} className="mt-1 text-green-500" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">개선점</h3>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X size={16} className="mt-1 text-amber-500" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
