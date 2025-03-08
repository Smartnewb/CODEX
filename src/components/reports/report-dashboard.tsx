"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText } from "lucide-react";
import { RadarChart } from "@/components/charts/radar-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { CodeFeedbackSection } from "@/components/reports/code-feedback-section";
import { OrganizationFitSection } from "@/components/reports/organization-fit-section";
import { GrowthTrackingSection } from "@/components/reports/growth-tracking-section";

interface ReportDashboardProps {
  candidate: {
    id: string;
    name: string;
    avatar: string;
    score: number;
    previousScore?: number;
    problemSolving: number;
    codeQuality: number;
    optimization: number;
    bestPractices: number;
    documentation: number;
    collaboration: number;
    status: string;
    matchRate: number;
    testDate: string;
    testTitle: string;
  };
}

export function ReportDashboard({ candidate }: ReportDashboardProps) {
  // 레이더 차트 데이터
  const radarChartData = {
    labels: [
      "문제 해결력",
      "코드 품질",
      "최적화",
      "모범 사례",
      "문서화",
      "협업 능력",
    ],
    datasets: [
      {
        label: "현재 평가",
        data: [
          candidate.problemSolving,
          candidate.codeQuality,
          candidate.optimization,
          candidate.bestPractices,
          candidate.documentation,
          candidate.collaboration,
        ],
        backgroundColor: "rgba(0, 102, 255, 0.2)",
        borderColor: "rgba(0, 102, 255, 0.8)",
        borderWidth: 2,
      },
      ...(candidate.previousScore
        ? [
            {
              label: "이전 평가",
              data: [
                candidate.problemSolving - 10,
                candidate.codeQuality - 5,
                candidate.optimization - 15,
                candidate.bestPractices - 8,
                candidate.documentation - 3,
                candidate.collaboration - 7,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 2,
            },
          ]
        : []),
    ],
  };

  // 성장 추적 차트 데이터
  const growthChartData = {
    labels: ["1차 평가", "2차 평가", "3차 평가", "현재 평가"],
    datasets: [
      {
        label: "종합 점수 추이",
        data: [65, 72, 78, candidate.score],
        backgroundColor: ["rgba(75, 192, 192, 0.8)"],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{candidate.name} 평가 리포트</h1>
          <p className="text-muted-foreground">
            {candidate.testTitle} • {candidate.testDate}
          </p>
        </div>
        <Button>
          <FileText size={16} className="mr-2" /> PDF 리포트 다운로드
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>종합 평가 점수</CardTitle>
          <CardDescription>
            {candidate.name}님의 종합 평가 결과입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold">{candidate.score}</div>
                    <div className="text-sm text-muted-foreground">
                      종합 점수
                    </div>
                    {candidate.previousScore && (
                      <div className="mt-2 text-sm">
                        <span
                          className={`${candidate.score > candidate.previousScore ? "text-green-500" : "text-red-500"}`}
                        >
                          {candidate.score > candidate.previousScore ? "+" : ""}
                          {candidate.score - candidate.previousScore} 점
                        </span>{" "}
                        변화
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="flex justify-center h-64">
                <RadarChart data={radarChartData} width={400} height={250} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="code-analysis" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="code-analysis">코드 분석</TabsTrigger>
          <TabsTrigger value="ai-feedback">AI 피드백</TabsTrigger>
          <TabsTrigger value="organization-fit">조직 적합도</TabsTrigger>
          <TabsTrigger value="growth-tracking">성장 추적</TabsTrigger>
        </TabsList>

        <TabsContent value="code-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>코드 스타일 및 품질 분석</CardTitle>
              <CardDescription>
                {candidate.name}님의 코드 스타일과 품질에 대한 상세 분석
                결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">코드 품질 점수</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            가독성 및 명확성
                          </span>
                          <span className="text-sm font-medium">
                            {candidate.codeQuality}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.codeQuality}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            변수 및 함수 네이밍
                          </span>
                          <span className="text-sm font-medium">
                            {candidate.bestPractices}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.bestPractices}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            모듈화 및 구조화
                          </span>
                          <span className="text-sm font-medium">
                            {candidate.documentation}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.documentation}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">문제 해결력 분석</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            알고리즘 최적화
                          </span>
                          <span className="text-sm font-medium">
                            {candidate.optimization}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.optimization}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            문제 접근 방식
                          </span>
                          <span className="text-sm font-medium">
                            {candidate.problemSolving}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{ width: `${candidate.problemSolving}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            에러 처리 및 예외 상황 대응
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (candidate.problemSolving +
                                candidate.bestPractices) /
                                2,
                            )}
                            /100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-[#0066FF] h-2.5 rounded-full"
                            style={{
                              width: `${Math.round(
                                (candidate.problemSolving +
                                  candidate.bestPractices) /
                                  2,
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">코드 샘플 분석</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black text-white rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        <code>
                          {`function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }
  
  return [...quickSort(left), ...equal, ...quickSort(right)];
}`}
                        </code>
                      </pre>
                    </div>
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="font-medium mb-2">코드 분석 결과</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>
                            퀵소트 알고리즘을 효율적으로 구현했습니다. 피벗 선택
                            방식이 적절하며, 재귀 호출 구조가 명확합니다.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">!</span>
                          <span>
                            대용량 데이터에 대한 최적화가 더 필요합니다.
                            인플레이스 정렬 방식을 고려해 볼 수 있습니다.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">!</span>
                          <span>
                            배열 크기에 따른 기본 정렬 알고리즘 전환을 고려하면
                            더 효율적일 수 있습니다.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-feedback" className="space-y-6">
          <CodeFeedbackSection candidateName={candidate.name} />
        </TabsContent>

        <TabsContent value="organization-fit" className="space-y-6">
          <OrganizationFitSection
            candidateName={candidate.name}
            matchRate={candidate.matchRate}
          />
        </TabsContent>

        <TabsContent value="growth-tracking" className="space-y-6">
          <GrowthTrackingSection
            candidateName={candidate.name}
            growthChartData={growthChartData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
