import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadarChart } from "@/components/charts/radar-chart";

interface SkillsSummaryCardProps {
  candidateName: string;
  problemSolving: number;
  codeQuality: number;
  optimization: number;
  bestPractices: number;
  documentation: number;
  overallScore: number;
}

export function SkillsSummaryCard({
  candidateName,
  problemSolving,
  codeQuality,
  optimization,
  bestPractices,
  documentation,
  overallScore,
}: SkillsSummaryCardProps) {
  const chartData = {
    labels: [
      "문제 해결 능력",
      "코드 품질",
      "최적화",
      "모범 사례 준수",
      "문서화",
    ],
    datasets: [
      {
        label: "역량 점수",
        data: [
          problemSolving,
          codeQuality,
          optimization,
          bestPractices,
          documentation,
        ],
        backgroundColor: "rgba(0, 102, 255, 0.2)",
        borderColor: "rgba(0, 102, 255, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>종합 평가 결과</CardTitle>
        <CardDescription>
          {candidateName}님의 테스트 결과 요약입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
              <div className="text-center">
                <div className="text-4xl font-bold">{overallScore}</div>
                <div className="text-sm text-muted-foreground">종합 점수</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <RadarChart data={chartData} width={300} height={300} />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">문제 해결 능력</span>
              <span className="text-sm font-medium">{problemSolving}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${problemSolving}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">코드 품질</span>
              <span className="text-sm font-medium">{codeQuality}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${codeQuality}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">최적화</span>
              <span className="text-sm font-medium">{optimization}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${optimization}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">모범 사례 준수</span>
              <span className="text-sm font-medium">{bestPractices}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${bestPractices}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">문서화</span>
              <span className="text-sm font-medium">{documentation}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${documentation}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
