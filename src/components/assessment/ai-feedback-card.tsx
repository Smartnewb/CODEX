import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Lightbulb, X } from "lucide-react";

interface AIFeedbackCardProps {
  strengths: string[];
  improvements: string[];
  suggestions: {
    title: string;
    description: string;
  }[];
}

export function AIFeedbackCard({
  strengths,
  improvements,
  suggestions,
}: AIFeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI 피드백</CardTitle>
        <CardDescription>
          AI가 분석한 코드의 강점과 개선점, 그리고 구체적인 개선 제안입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 w-full">
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

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">개선 제안</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb size={18} className="mt-1 text-amber-500" />
                  <div>
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 종합 의견</h3>
          <p className="text-sm">
            전반적으로 코드 품질이 우수하며, 특히 함수형 프로그래밍 패턴과 에러
            처리 방식이 뛰어납니다. 다만, 성능 최적화와 테스트 코드 작성
            부분에서 개선이 필요합니다. 제안된 개선 사항을 적용하면 코드 품질과
            유지보수성이 더욱 향상될 것입니다. 특히 변수 명명 규칙을 일관되게
            적용하고 중복 로직을 함수로 분리하는 것이 중요합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
