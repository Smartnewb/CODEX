import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OrganizationFitCardProps {
  candidateName: string;
  matchRate: number;
  techStackMatch: number;
  codingStyleMatch: number;
  collaborationMatch: number;
  problemSolvingMatch: number;
  aiAnalysis: string;
}

export function OrganizationFitCard({
  candidateName,
  matchRate,
  techStackMatch,
  codingStyleMatch,
  collaborationMatch,
  problemSolvingMatch,
  aiAnalysis,
}: OrganizationFitCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>조직 적합도 분석</CardTitle>
        <CardDescription>
          {candidateName}님의 기업 문화 및 기술 스택 적합도 분석 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-[#0066FF] text-center">
            <div>
              <div className="text-3xl font-bold">{matchRate}%</div>
              <div className="text-xs text-muted-foreground">조직 적합도</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">기술 스택 일치도</span>
              <span className="text-sm font-medium">{techStackMatch}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${techStackMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">코딩 스타일 일치도</span>
              <span className="text-sm font-medium">{codingStyleMatch}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${codingStyleMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">협업 방식 적합도</span>
              <span className="text-sm font-medium">{collaborationMatch}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${collaborationMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">문제 해결 접근법</span>
              <span className="text-sm font-medium">
                {problemSolvingMatch}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${problemSolvingMatch}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 분석 결과</h3>
          <p className="text-sm">{aiAnalysis}</p>
        </div>
      </CardContent>
    </Card>
  );
}
