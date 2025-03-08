import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface CodeSnippet {
  title: string;
  code: string;
  feedback: string;
  score: number;
}

interface CodeAnalysisCardProps {
  codeSnippets: CodeSnippet[];
}

export function CodeAnalysisCard({ codeSnippets }: CodeAnalysisCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>코드 분석</CardTitle>
        <CardDescription>
          제출한 코드에 대한 상세 분석 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {codeSnippets.map((snippet, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{snippet.title}</h3>
              <Badge
                className={`${snippet.score >= 90 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : snippet.score >= 70 ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"}`}
              >
                {snippet.score}점
              </Badge>
            </div>
            <div className="bg-black text-white p-4 rounded-md overflow-x-auto">
              <pre className="text-sm">
                <code>{snippet.code}</code>
              </pre>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <div className="flex items-start gap-2">
                <MessageSquare
                  size={16}
                  className="mt-1 text-muted-foreground"
                />
                <div className="text-sm">{snippet.feedback}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">종합 코드 분석</h3>
          <p className="text-sm">
            전반적으로 코드 품질이 우수하며, 특히 함수형 프로그래밍 패턴과 에러
            처리 방식이 뛰어납니다. 코드 가독성과 문서화도 잘 되어 있습니다.
            다만, 일부 성능 최적화와 테스트 코드 작성 부분에서 개선의 여지가
            있습니다. 변수 명명 규칙을 더 일관되게 적용하고, 대용량 데이터 처리
            시 최적화 기법을 적용하면 더 좋은 코드가 될 것입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
