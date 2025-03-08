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
  candidateName: string;
}

export function CodeAnalysisCard({
  codeSnippets,
  candidateName,
}: CodeAnalysisCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>코드 분석</CardTitle>
        <CardDescription>
          {candidateName}님이 제출한 코드에 대한 상세 분석 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {codeSnippets.map((snippet, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{snippet.title}</h3>
              <Badge
                className={`${snippet.score >= 90 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : snippet.score >= 70 ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
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
      </CardContent>
    </Card>
  );
}
