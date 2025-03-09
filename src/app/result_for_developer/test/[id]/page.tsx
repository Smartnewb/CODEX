"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Award, Clock, Target, Trophy, Zap, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TestResult {
  id: string;
  title: string;
  company: string;
  score: number;
  feedback: string;
  date: string;
  type: string;
  testId: string;
  details?: {
    codeQuality: number;
    problemSolving: number;
    efficiency: number;
    documentation: number;
  };
  recommendations?: string[];
}

export default function TestResultDetailPage() {
  const params = useParams();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    // 실제 환경에서는 API를 통해 데이터를 가져올 것입니다.
    // 현재는 예시 데이터를 사용합니다.
    const mockResults: Record<string, TestResult> = {
      "FE-2023-001": {
        id: "FE-2023-001",
        title: "프론트엔드 개발자 역량 평가",
        company: "테크스타트 주식회사",
        date: "2023-05-10",
        score: 82,
        type: "frontend-dev",
        testId: "FE-2023-001",
        feedback: "프론트엔드 기초가 탄탄하며, React 활용 능력이 우수합니다.",
        details: {
          codeQuality: 85,
          problemSolving: 82,
          efficiency: 78,
          documentation: 83
        },
        recommendations: [
          "컴포넌트 재사용성 개선",
          "상태 관리 최적화",
          "접근성 고려사항 추가"
        ]
      },
      "ALG-2023-001": {
        id: "ALG-2023-001",
        title: "JavaScript 알고리즘 테스트",
        company: "웹테크 주식회사",
        date: "2023-04-15",
        score: 85,
        type: "algorithm",
        testId: "ALG-2023-001",
        feedback: "알고리즘 이해도가 높으나 코드 최적화 필요",
        details: {
          codeQuality: 88,
          problemSolving: 85,
          efficiency: 78,
          documentation: 89
        },
        recommendations: [
          "시간 복잡도를 고려한 알고리즘 최적화",
          "코드 재사용성 향상을 위한 모듈화",
          "에러 처리 로직 보강"
        ]
      },
      "BE-2023-001": {
        id: "BE-2023-001",
        title: "백엔드 API 설계 테스트",
        company: "클라우드 시스템즈",
        date: "2023-03-22",
        score: 92,
        type: "backend-dev",
        testId: "BE-2023-001",
        feedback: "API 설계 능력이 우수함. 보안 관련 지식 향상 권장",
        details: {
          codeQuality: 94,
          problemSolving: 92,
          efficiency: 90,
          documentation: 92
        },
        recommendations: [
          "API 보안 베스트 프랙티스 적용",
          "성능 모니터링 구현",
          "API 버전 관리 전략 수립"
        ]
      },
      "REACT-2023-001": {
        id: "REACT-2023-001",
        title: "React 컴포넌트 개발 테스트",
        company: "AI 솔루션즈",
        date: "2023-02-18",
        score: 78,
        type: "react-dev",
        testId: "REACT-2023-001",
        feedback: "React 기본기는 좋으나 성능 최적화 필요",
        details: {
          codeQuality: 80,
          problemSolving: 75,
          efficiency: 73,
          documentation: 84
        },
        recommendations: [
          "React 성능 최적화 기법 학습",
          "컴포넌트 설계 패턴 개선",
          "상태 관리 라이브러리 활용"
        ]
      }
    };

    const testResult = mockResults[params.id as string];
    if (testResult) {
      setResult(testResult);
    }
  }, [params.id]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">결과를 불러오는 중...</h1>
          <p className="text-muted-foreground">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  // 점수에 따른 상태 결정
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { icon: CheckCircle2, color: "text-green-500", text: "우수" };
    if (score >= 70) return { icon: AlertCircle, color: "text-yellow-500", text: "보통" };
    return { icon: XCircle, color: "text-red-500", text: "개선 필요" };
  };

  const scoreStatus = getScoreStatus(result.score);
  const ScoreIcon = scoreStatus.icon;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/assessment-history">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">테스트 결과 상세</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          {/* 상단 요약 정보 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{result.title}</CardTitle>
                  <CardDescription className="mt-2">{result.company} • {result.date}</CardDescription>
                </div>
                <Badge variant="outline" className="px-4 py-1">
                  {result.type === 'frontend-dev' ? '프론트엔드' :
                   result.type === 'backend-dev' ? '백엔드' :
                   result.type === 'algorithm' ? '알고리즘' :
                   result.type === 'react-dev' ? 'React' : '개발'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 종합 점수 카드 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">종합 점수</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ScoreIcon className={`h-5 w-5 ${scoreStatus.color}`} />
                        <span className={`text-2xl font-bold ${scoreStatus.color}`}>
                          {result.score}점
                        </span>
                      </div>
                      <Badge variant="outline">{scoreStatus.text}</Badge>
                    </div>
                    <Progress value={result.score} className="mt-4" />
                  </CardContent>
                </Card>

                {/* 기술 역량 카드 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">기술 역량</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>코드 품질</span>
                        <span className="font-medium">{result.details?.codeQuality}%</span>
                      </div>
                      <Progress value={result.details?.codeQuality} />
                      <div className="flex justify-between text-sm">
                        <span>문제 해결력</span>
                        <span className="font-medium">{result.details?.problemSolving}%</span>
                      </div>
                      <Progress value={result.details?.problemSolving} />
                    </div>
                  </CardContent>
                </Card>

                {/* 개발 프로세스 카드 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">개발 프로세스</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>효율성</span>
                        <span className="font-medium">{result.details?.efficiency}%</span>
                      </div>
                      <Progress value={result.details?.efficiency} />
                      <div className="flex justify-between text-sm">
                        <span>문서화</span>
                        <span className="font-medium">{result.details?.documentation}%</span>
                      </div>
                      <Progress value={result.details?.documentation} />
                    </div>
                  </CardContent>
                </Card>

                {/* 성과 지표 카드 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">성과 지표</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">상위 15% 성과</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">소요 시간: 58분</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm">목표 달성도: 85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* 피드백 및 개선점 */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* 핵심 피드백 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">핵심 피드백</CardTitle>
                <CardDescription>테스트 결과에 대한 종합적인 평가입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{result.feedback}</p>
              </CardContent>
            </Card>

            {/* 개선 제안 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">개선 제안</CardTitle>
                <CardDescription>더 나은 결과를 위한 구체적인 제안사항입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.recommendations?.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 세부 평가 결과 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">세부 평가 결과</CardTitle>
              <CardDescription>각 영역별 상세 평가 내용입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-base font-semibold mb-4">기술적 역량</h4>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">코드 품질</span>
                        <span className="text-sm font-medium">{result.details?.codeQuality}점</span>
                      </div>
                      <Progress value={result.details?.codeQuality} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">문제 해결력</span>
                        <span className="text-sm font-medium">{result.details?.problemSolving}점</span>
                      </div>
                      <Progress value={result.details?.problemSolving} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-4">개발 프로세스</h4>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">효율성</span>
                        <span className="text-sm font-medium">{result.details?.efficiency}점</span>
                      </div>
                      <Progress value={result.details?.efficiency} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">문서화</span>
                        <span className="text-sm font-medium">{result.details?.documentation}점</span>
                      </div>
                      <Progress value={result.details?.documentation} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 