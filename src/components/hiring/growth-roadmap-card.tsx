import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ExternalLink, FileText, Send } from "lucide-react";
import Link from "next/link";

interface LearningResource {
  title: string;
  description: string;
  url: string;
  type: "article" | "book" | "course" | "video";
  priority: "high" | "medium" | "low";
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  resources: LearningResource[];
}

interface GrowthRoadmapCardProps {
  candidateName: string;
  skillGaps: SkillGap[];
  onSendRoadmap: () => void;
}

export function GrowthRoadmapCard({
  candidateName,
  skillGaps,
  onSendRoadmap,
}: GrowthRoadmapCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>개발 역량 개선 로드맵</CardTitle>
        <CardDescription>
          {candidateName}님의 역량 향상을 위한 맞춤형 학습 계획입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {skillGaps.map((gap, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{gap.skill}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">현재: {gap.currentLevel}/10</span>
                  <span className="text-sm text-muted-foreground">→</span>
                  <span className="text-sm font-medium">
                    목표: {gap.targetLevel}/10
                  </span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                <div
                  className="bg-[#0066FF] h-2.5 rounded-full"
                  style={{ width: `${(gap.currentLevel / 10) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                {gap.resources.map((resource, resourceIndex) => (
                  <div
                    key={resourceIndex}
                    className="p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {resource.type === "article" ? (
                            <FileText size={18} className="text-[#0066FF]" />
                          ) : resource.type === "book" ? (
                            <BookOpen size={18} className="text-[#0066FF]" />
                          ) : (
                            <BookOpen size={18} className="text-[#0066FF]" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              className={`${resource.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : resource.priority === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}
                            >
                              {resource.priority === "high"
                                ? "우선순위: 높음"
                                : resource.priority === "medium"
                                  ? "우선순위: 중간"
                                  : "우선순위: 낮음"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {resource.type === "article"
                                ? "아티클"
                                : resource.type === "book"
                                  ? "도서"
                                  : resource.type === "course"
                                    ? "강의"
                                    : "비디오"}
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
                        <Link href={resource.url} target="_blank">
                          <ExternalLink size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 멘토링 제안</h3>
          <p className="text-sm">
            {candidateName}님의 역량 분석 결과, 주로 데이터베이스 쿼리 최적화와
            비동기 프로그래밍 패턴에 대한 이해를 높이는 것이 가장 효과적일
            것으로 판단됩니다. 위 학습 자료를 우선순위에 따라 학습하고, 실제
            프로젝트에 적용해보는 것을 권장합니다. 3개월 내에 목표 역량에 도달할
            수 있을 것으로 예상됩니다.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">PDF로 다운로드</Button>
        <Button onClick={onSendRoadmap}>
          <Send size={16} className="mr-2" /> 지원자에게 로드맵 전송
        </Button>
      </CardFooter>
    </Card>
  );
}

interface Badge {
  className: string;
  children: React.ReactNode;
}

function Badge({ className, children }: Badge) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
