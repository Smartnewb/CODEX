import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "@/components/charts/bar-chart";

interface OrganizationFitSectionProps {
  candidateName: string;
  matchRate: number;
}

export function OrganizationFitSection({
  candidateName,
  matchRate,
}: OrganizationFitSectionProps) {
  // 기술 스택 매칭 데이터
  const techStackMatch = Math.round(matchRate * 0.9 + Math.random() * 10);
  const codingStyleMatch = Math.round(matchRate * 0.85 + Math.random() * 15);
  const teamCultureMatch = Math.round(matchRate * 0.95 + Math.random() * 5);
  const collaborationMatch = Math.round(matchRate * 0.8 + Math.random() * 20);

  // 채용 성공률 비교 차트 데이터
  const comparisonChartData = {
    labels: [candidateName, "팀 평균", "최근 채용 평균", "최고 점수 개발자"],
    datasets: [
      {
        label: "조직 적합도 점수",
        data: [matchRate, 75, 70, 92],
        backgroundColor: [
          "rgba(0, 102, 255, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>조직 적합도 분석</CardTitle>
          <CardDescription>
            {candidateName}님의 기술 스택, 코드 스타일, 협업 방식이 기업 환경과
            얼마나 적합한지 분석한 결과입니다.
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

          <div className="space-y-4 mb-8">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">기술 스택 매칭률</span>
                <span className="text-sm font-medium">{techStackMatch}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-[#0066FF] h-2.5 rounded-full"
                  style={{ width: `${techStackMatch}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                React, TypeScript, Next.js 등 핵심 기술 스택 일치
              </p>
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
              <p className="text-xs text-muted-foreground mt-1">
                변수 명명 규칙, 코드 포맷팅, 함수 구조화 방식 분석
              </p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">팀 문화 적합성</span>
                <span className="text-sm font-medium">{teamCultureMatch}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-[#0066FF] h-2.5 rounded-full"
                  style={{ width: `${teamCultureMatch}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                코드 리뷰 스타일, 문서화 방식, 협업 패턴 분석
              </p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">협업 방식 일치도</span>
                <span className="text-sm font-medium">
                  {collaborationMatch}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-[#0066FF] h-2.5 rounded-full"
                  style={{ width: `${collaborationMatch}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                PR 작성 방식, 이슈 관리, 커뮤니케이션 스타일 분석
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">기존 팀원과의 비교</h3>
            <div className="h-64">
              <BarChart data={comparisonChartData} width={500} height={250} />
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">AI 분석 인사이트</h3>
            <p className="text-sm">
              {candidateName}님은 기업의 기술 스택과 높은 일치도를 보이며, 특히
              React와 TypeScript 활용 능력이 우수합니다. 코드 스타일과 팀 문화
              적합성도 높은 편으로, 기존 팀원들과 원활한 협업이 가능할 것으로
              예상됩니다. 다만, PR 작성 방식과 코드 리뷰 참여 방식에서 약간의
              차이가 있으나, 적응 기간을 통해 빠르게 개선될 수 있을 것입니다.
              전반적으로 {matchRate}%의 높은 조직 적합도를 보여 채용을
              권장합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
