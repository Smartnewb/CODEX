import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResultSummaryCard } from "./result-summary-card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestResult {
  id: string;
  title: string;
  date: string;
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

interface TestResultsListProps {
  testResults: TestResult[];
}

export function TestResultsList({ testResults }: TestResultsListProps) {
  const [selectedTestId, setSelectedTestId] = useState<string | null>(
    testResults[0]?.id || null,
  );

  const selectedTest =
    testResults.find((test) => test.id === selectedTestId) || testResults[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>개별 테스트 결과</CardTitle>
        <CardDescription>각 테스트별 상세 결과를 확인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 w-full">
          <div className="sm:col-span-1 sm:border-r sm:pr-4">
            <h3 className="text-sm font-medium mb-3">테스트 목록</h3>
            <div className="space-y-2">
              {testResults.map((test) => (
                <div
                  key={test.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${selectedTestId === test.id ? "bg-muted" : "hover:bg-muted/50"}`}
                  onClick={() => setSelectedTestId(test.id)}
                >
                  <div className="font-medium">{test.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar size={12} className="mr-1" />
                      {test.date}
                    </div>
                    <Badge>{test.scores.overall}점</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 mt-4 sm:mt-0">
            {selectedTest && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedTest.title}</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    상세 보기 <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>

                <ResultSummaryCard
                  scores={selectedTest.scores}
                  previousScores={selectedTest.previousScores}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
