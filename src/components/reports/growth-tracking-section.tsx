import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

interface GrowthTrackingSectionProps {
  candidateName: string;
  growthChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export function GrowthTrackingSection({
  candidateName,
  growthChartData,
}: GrowthTrackingSectionProps) {
  // 역량별 성장 추적 데이터
  const skillGrowthData = {
    labels: ["문제 해결력", "코드 품질", "최적화", "협업 능력", "문서화"],
    datasets: [
      {
        label: "현재 평가",
        data: [85, 78, 65, 90, 82],
        backgroundColor: "rgba(0, 102, 255, 0.8)",
      },
      {
        label: "이전 평가",
        data: [75, 70, 50, 85, 80],
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  // 학습 리소스 추천
  const learningResources = [
    {
      title: "자바스크립트 성능 최적화 가이드",
      type: "article",
      url: "#",
      priority: "high",
    },
    {
      title: "클린 코드: 애자일 소프트웨어 장인 정신",
      type: "book",
      url: "#",
      priority: "medium",
    },
    {
      title: "효과적인 코드 리뷰 방법론",
      type: "course",
      url: "#",
      priority: "high",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>성장 추적 및 역량 발전</CardTitle>
          <CardDescription>
            {candidateName}님의 평가 결과를 과거 성과와 비교하여 성장 가능성을
            평가합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">종합 점수 변화 추이</h3>
              <div className="h-64">
                <BarChart data={growthChartData} width={400} height={250} />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                평가 회차별 종합 점수 변화
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">역량별 성장 분석</h3>
              <div className="h-64">
                <BarChart data={skillGrowthData} width={400} height={250} />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                이전 평가 대비 역량 변화
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
              맞춤형 학습 리소스 추천
            </h3>
            <div className="space-y-4">
              {learningResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <BookOpen size={18} className="text-[#0066FF]" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${resource.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"}`}
                          >
                            {resource.priority === "high"
                              ? "우선순위: 높음"
                              : "우선순위: 중간"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {resource.type === "article"
                              ? "아티클"
                              : resource.type === "book"
                                ? "도서"
                                : "강의"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link href={resource.url}>
                        <ExternalLink size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">AI 성장 분석 인사이트</h3>
            <p className="text-sm">
              {candidateName}님은 지속적인 성장 곡선을 보여주고 있으며, 특히
              문제 해결력과 협업 능력에서 큰 향상을 보였습니다. 코드 최적화
              부분에서 가장 큰 성장(+15점)이 있었으며, 이는 알고리즘 이해도가
              크게 향상되었음을 의미합니다. 다만, 코드 품질 측면에서는
              상대적으로 적은 성장을 보이고 있어, 클린 코드 작성과 관련된 학습을
              권장합니다. 전반적으로 꾸준한 성장세를 보이는 개발자로, 향후 더
              높은 성과를 기대할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
