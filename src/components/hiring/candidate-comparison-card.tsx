import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadarChart } from "@/components/charts/radar-chart";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  score: number;
  problemSolving: number;
  codeQuality: number;
  optimization: number;
  bestPractices: number;
  documentation: number;
  status: string;
  matchRate: number;
}

interface CandidateComparisonCardProps {
  candidates: Candidate[];
  onHireDecision: (
    candidateId: string,
    decision: "hire" | "reject" | "hold",
  ) => void;
}

export function CandidateComparisonCard({
  candidates,
  onHireDecision,
}: CandidateComparisonCardProps) {
  const [candidateStatuses, setCandidateStatuses] = useState(
    candidates.reduce((acc, candidate) => {
      acc[candidate.id] = candidate.status;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleDecision = (candidateId: string, decision: "hire" | "reject" | "hold") => {
    const newStatus = decision === "hire" ? "합격" : decision === "reject" ? "불합격" : "보류";
    setCandidateStatuses((prevStatuses) => ({
      ...prevStatuses,
      [candidateId]: newStatus
    }));
    onHireDecision(candidateId, decision);
  };

  // Prepare data for radar chart
  const chartData = {
    labels: [
      "문제 해결 능력",
      "코드 품질",
      "최적화",
      "모범 사례 준수",
      "문서화",
    ],
    datasets: candidates.map((candidate, index) => ({
      label: candidate.name,
      data: [
        candidate.problemSolving,
        candidate.codeQuality,
        candidate.optimization,
        candidate.bestPractices,
        candidate.documentation,
      ],
      backgroundColor: `rgba(${index === 0 ? "0, 102, 255" : index === 1 ? "255, 99, 132" : "75, 192, 192"}, 0.2)`,
      borderColor: `rgba(${index === 0 ? "0, 102, 255" : index === 1 ? "255, 99, 132" : "75, 192, 192"}, 0.8)`,
      borderWidth: 2,
    })),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>지원자 비교 분석</CardTitle>
        <CardDescription>
          선택한 지원자들의 역량을 비교하여 최적의 채용 결정을 내리세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">지원자</th>
                <th className="text-center py-3 px-4">종합 점수</th>
                <th className="text-center py-3 px-4">문제 해결</th>
                <th className="text-center py-3 px-4">코드 품질</th>
                <th className="text-center py-3 px-4">최적화</th>
                <th className="text-center py-3 px-4">모범 사례</th>
                <th className="text-center py-3 px-4">문서화</th>
                <th className="text-center py-3 px-4">조직 적합도</th>
                <th className="text-center py-3 px-4">상태</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          점수: {candidate.score}/100
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4 font-bold">
                    {candidate.score}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.problemSolving}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.codeQuality}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.optimization}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.bestPractices}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.documentation}
                  </td>
                  <td className="text-center py-3 px-4">
                    {candidate.matchRate}%
                  </td>
                  <td className="text-center py-3 px-4">
                    <Badge
                      className={`${candidateStatuses[candidate.id] === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidateStatuses[candidate.id] === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                    >
                      {candidateStatuses[candidate.id]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">역량 비교 차트</h3>
            <div className="flex justify-center">
              <RadarChart data={chartData} width={400} height={300} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">조직 적합도 비교</h3>
            <div className="space-y-6">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl">
                      {candidate.avatar}
                    </div>
                    <span className="font-medium">{candidate.name}</span>
                    <span className="ml-auto font-bold">
                      {candidate.matchRate}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-[#0066FF] h-2.5 rounded-full"
                      style={{ width: `${candidate.matchRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl">
                    {candidate.avatar}
                  </div>
                  <h3 className="font-medium">{candidate.name}</h3>
                  <div className="flex items-center gap-1 mt-1 mb-3">
                    <Badge
                      className={`${candidateStatuses[candidate.id] === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidateStatuses[candidate.id] === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                    >
                      {candidateStatuses[candidate.id]}
                    </Badge>
                  </div>

                  <div className="flex gap-2 w-full justify-center">
                    <Button 
                      variant={candidateStatuses[candidate.id] === "불합격" ? "default" : "outline"} 
                      className="flex-1" 
                      size="sm" 
                      onClick={() => handleDecision(candidate.id, "reject")}
                    > 
                      <ThumbsDown size={14} className="mr-1 text-red-500" /> 불합격
                    </Button>
                    <Button 
                      variant={candidateStatuses[candidate.id] === "보류" ? "default" : "outline"} 
                      className="flex-1" 
                      size="sm" 
                      onClick={() => handleDecision(candidate.id, "hold")}
                    > 
                      보류
                    </Button>
                    <Button 
                      variant={candidateStatuses[candidate.id] === "합격" ? "default" : "outline"} 
                      className="flex-1" 
                      size="sm" 
                      onClick={() => handleDecision(candidate.id, "hire")}
                    > 
                      <ThumbsUp size={14} className="mr-1 text-green-500" /> 합격
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" className="mr-2">
          취소
        </Button>
        <Button>채용 결정 확정</Button>
      </CardFooter>
    </Card>
  );
}
