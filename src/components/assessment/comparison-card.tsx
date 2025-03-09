import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonCardProps {
  comparisonData: {
    labels: string[];
    currentScores: number[];
    previousScores: number[];
    industryAverage: number[];
  };
}

export function ComparisonCard({ comparisonData }: ComparisonCardProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  const data = {
    labels: comparisonData.labels,
    datasets: [
      {
        label: "현재 점수",
        data: comparisonData.currentScores,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: "이전 점수",
        data: comparisonData.previousScores,
        backgroundColor: "rgba(147, 51, 234, 0.8)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: "업계 평균",
        data: comparisonData.industryAverage,
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgb(156, 163, 175)",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  // Calculate growth percentages
  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const overallGrowth = calculateGrowth(
    comparisonData.currentScores[4],
    comparisonData.previousScores[4],
  );

  const codeStyleGrowth = calculateGrowth(
    comparisonData.currentScores[0],
    comparisonData.previousScores[0],
  );

  const problemSolvingGrowth = calculateGrowth(
    comparisonData.currentScores[1],
    comparisonData.previousScores[1],
  );

  const collaborationGrowth = calculateGrowth(
    comparisonData.currentScores[2],
    comparisonData.previousScores[2],
  );

  const devOpsGrowth = calculateGrowth(
    comparisonData.currentScores[3],
    comparisonData.previousScores[3],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>성장 분석</CardTitle>
        <CardDescription>
          이전 평가와 비교한 역량 성장 분석 및 업계 평균과의 비교입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <Bar
            options={{
              ...options,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                },
              },
              scales: {
                ...options.scales,
                x: {
                  ...options.scales.x,
                  stacked: false,
                  ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                  },
                },
                y: {
                  ...options.scales.y,
                  stacked: false,
                },
              },
            }}
            data={{
              ...data,
              datasets: data.datasets.map((dataset, index) => ({
                ...dataset,
                categoryPercentage: 0.8,
                barPercentage: 0.9,
                barThickness: undefined,
                maxBarThickness: 30,
              })),
            }}
          />
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 w-full">
          <div>
            <h3 className="text-lg font-semibold mb-3">성장률 분석</h3>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">전체 성장률</span>
                  <span className="text-green-600 font-bold">
                    {overallGrowth}%
                  </span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span>코드 스타일</span>
                  <span className="text-green-600">{codeStyleGrowth}%</span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span>문제 해결력</span>
                  <span className="text-green-600">
                    {problemSolvingGrowth}%
                  </span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span>협업 능력</span>
                  <span className="text-green-600">{collaborationGrowth}%</span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span>DevOps</span>
                  <span className="text-green-600">{devOpsGrowth}%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">업계 평균 대비 분석</h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm mb-4">
                모든 평가 영역에서 업계 평균을 상회하는 우수한 성과를 보이고
                있습니다. 특히 협업 능력과 코드 스타일 영역에서 업계 평균 대비
                높은 점수를 기록했습니다. 지속적인 성장세를 보이고 있으며, 이전
                평가 대비 모든 영역에서 향상되었습니다.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">
                    코드 스타일: 업계 평균 대비 21% 높음
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">
                    문제 해결력: 업계 평균 대비 15% 높음
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">
                    협업 능력: 업계 평균 대비 22% 높음
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">
                    DevOps: 업계 평균 대비 17% 높음
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 border rounded-lg">
              <h4 className="font-medium mb-2">성장 추세</h4>
              <p className="text-sm">
                지난 6개월간 꾸준한 성장세를 보이고 있으며, 특히 코드 스타일
                영역에서 가장 큰 향상을 보였습니다. 이는 코드 리뷰 피드백을
                적극적으로 수용하고 개선한 결과로 분석됩니다. 현재 성장 속도를
                유지한다면 6개월 내에 상위 10% 개발자 수준에 도달할 것으로
                예상됩니다.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
