import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadarChart } from "@/components/charts/radar-chart";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface ResultSummaryCardProps {
  scores: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
  previousScores?: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
}

export function ResultSummaryCard({
  scores,
  previousScores,
}: ResultSummaryCardProps) {
  // Prepare data for radar chart
  const chartData = {
    labels: ["코드 스타일", "문제 해결력", "협업 능력", "DevOps", "전체 점수"],
    datasets: [
      {
        label: "현재 점수",
        data: [
          scores.codeStyle,
          scores.problemSolving,
          scores.collaboration,
          scores.devOps,
          scores.overall,
        ],
        backgroundColor: "rgba(0, 102, 255, 0.2)",
        borderColor: "rgba(0, 102, 255, 0.8)",
        borderWidth: 2,
      },
      ...(previousScores
        ? [
            {
              label: "이전 점수",
              data: [
                previousScores.codeStyle,
                previousScores.problemSolving,
                previousScores.collaboration,
                previousScores.devOps,
                previousScores.overall,
              ],
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 0.8)",
              borderWidth: 2,
            },
          ]
        : []),
    ],
  };

  // Calculate score changes
  const getScoreChange = (current: number, previous?: number) => {
    if (!previous) return { value: 0, direction: "none" };
    const change = current - previous;
    return {
      value: Math.abs(change),
      direction: change > 0 ? "up" : change < 0 ? "down" : "none",
    };
  };

  const overallChange = getScoreChange(scores.overall, previousScores?.overall);
  const codeStyleChange = getScoreChange(
    scores.codeStyle,
    previousScores?.codeStyle,
  );
  const problemSolvingChange = getScoreChange(
    scores.problemSolving,
    previousScores?.problemSolving,
  );
  const collaborationChange = getScoreChange(
    scores.collaboration,
    previousScores?.collaboration,
  );
  const devOpsChange = getScoreChange(scores.devOps, previousScores?.devOps);

  // Helper function to render change indicator
  const renderChangeIndicator = (change: {
    value: number;
    direction: string;
  }) => {
    if (change.direction === "up") {
      return (
        <span className="flex items-center text-green-500 text-xs ml-2">
          <ArrowUp size={12} className="mr-1" /> +{change.value}
        </span>
      );
    } else if (change.direction === "down") {
      return (
        <span className="flex items-center text-red-500 text-xs ml-2">
          <ArrowDown size={12} className="mr-1" /> -{change.value}
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-gray-500 text-xs ml-2">
          <Minus size={12} className="mr-1" /> 0
        </span>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>종합 평가 결과</CardTitle>
        <CardDescription>
          평가 항목별 점수와 이전 평가와의 비교 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 w-full">
          <div className="sm:w-1/2 w-full">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-full">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold">
                      {scores.overall}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center">
                      종합 점수
                      {previousScores && renderChangeIndicator(overallChange)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">코드 스타일</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {scores.codeStyle}/100
                    </span>
                    {previousScores && renderChangeIndicator(codeStyleChange)}
                  </div>
                </div>
                <Progress value={scores.codeStyle} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">문제 해결력</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {scores.problemSolving}/100
                    </span>
                    {previousScores &&
                      renderChangeIndicator(problemSolvingChange)}
                  </div>
                </div>
                <Progress value={scores.problemSolving} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">협업 능력</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {scores.collaboration}/100
                    </span>
                    {previousScores &&
                      renderChangeIndicator(collaborationChange)}
                  </div>
                </div>
                <Progress value={scores.collaboration} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">DevOps</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {scores.devOps}/100
                    </span>
                    {previousScores && renderChangeIndicator(devOpsChange)}
                  </div>
                </div>
                <Progress value={scores.devOps} className="h-2" />
              </div>
            </div>
          </div>

          <div className="sm:w-1/2 w-full flex justify-center items-center mt-4 sm:mt-0">
            <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] aspect-square">
              <RadarChart data={chartData} width={240} height={240} />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 분석 요약</h3>
          <p className="text-sm">
            전반적으로 우수한 성과를 보여주고 있으며, 특히 협업 능력과 코드
            스타일 점수가 높습니다. 이전 평가 대비 전체적인 성장이 있었으며,
            특히 코드 스타일 부분에서 큰 향상을 보였습니다. 문제 해결력과 DevOps
            영역에서 추가적인 개선 기회가 있습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
