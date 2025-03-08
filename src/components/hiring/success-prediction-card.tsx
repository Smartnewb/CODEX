import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "@/components/charts/bar-chart";

interface SuccessPredictionCardProps {
  candidateName: string;
  successRate: number;
  adaptabilityScore: number;
  teamFitScore: number;
  growthPotentialScore: number;
  retentionProbabilityScore: number;
  comparisonData: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

export function SuccessPredictionCard({
  candidateName,
  successRate,
  adaptabilityScore,
  teamFitScore,
  growthPotentialScore,
  retentionProbabilityScore,
  comparisonData,
}: SuccessPredictionCardProps) {
  // Prepare data for bar chart
  const chartData = {
    labels: comparisonData.labels,
    datasets: [
      {
        label: "채용 성공률",
        data: comparisonData.values,
        backgroundColor: comparisonData.colors,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>채용 성공률 예측</CardTitle>
        <CardDescription>
          {candidateName}님의 채용 성공 가능성을 AI가 분석했습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-[#0066FF] text-center">
            <div>
              <div className="text-3xl font-bold">{successRate}%</div>
              <div className="text-xs text-muted-foreground">성공 확률</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">적응력</span>
              <span className="text-sm font-medium">{adaptabilityScore}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${adaptabilityScore}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">팀 적합도</span>
              <span className="text-sm font-medium">{teamFitScore}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${teamFitScore}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">성장 가능성</span>
              <span className="text-sm font-medium">
                {growthPotentialScore}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${growthPotentialScore}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">유지 가능성</span>
              <span className="text-sm font-medium">
                {retentionProbabilityScore}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-[#0066FF] h-2.5 rounded-full"
                style={{ width: `${retentionProbabilityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">기존 채용 사례 비교</h3>
          <div className="h-64">
            <BarChart data={chartData} width={500} height={250} />
          </div>
          <div className="text-sm text-muted-foreground mt-2 text-center">
            최근 2년간 채용된 개발자들과의 성공률 비교
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 분석 인사이트</h3>
          <p className="text-sm">
            {candidateName}님은 기술적 역량과 팀 적합도 측면에서 높은 점수를
            보이고 있습니다. 특히 문제 해결 능력과 코드 품질이 우수하며, 기존
            개발팀의 협업 방식과 잘 맞을 것으로 예상됩니다. 다만, 일부 최적화
            관련 역량을 향상시킬 필요가 있으며, 이는 적절한 멘토링을 통해 빠르게
            개선될 수 있을 것입니다. 전반적으로 {successRate}%의 높은 채용 성공
            확률을 보이고 있어 채용을 권장합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
