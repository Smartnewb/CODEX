import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ExternalLink, FileText, Video } from "lucide-react";
import Link from "next/link";

interface Resource {
  title: string;
  type: "course" | "article" | "book" | "video";
  url: string;
  description: string;
}

interface Weakness {
  area: string;
  currentLevel: number;
  targetLevel: number;
  resources: Resource[];
}

interface ImprovementRoadmapCardProps {
  weaknesses: Weakness[];
}

export function ImprovementRoadmapCard({
  weaknesses,
}: ImprovementRoadmapCardProps) {
  // Helper function to get resource icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen size={18} className="text-blue-500" />;
      case "article":
        return <FileText size={18} className="text-green-500" />;
      case "book":
        return <BookOpen size={18} className="text-purple-500" />;
      case "video":
        return <Video size={18} className="text-red-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  // Helper function to get resource type text
  const getResourceTypeText = (type: string) => {
    switch (type) {
      case "course":
        return "강의";
      case "article":
        return "아티클";
      case "book":
        return "도서";
      case "video":
        return "비디오";
      default:
        return "자료";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>개선 로드맵</CardTitle>
        <CardDescription>
          역량 향상을 위한 맞춤형 학습 계획과 추천 자료입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {weaknesses.map((weakness, index) => (
            <div key={index} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="text-lg font-medium">{weakness.area}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    현재: {weakness.currentLevel}/10
                  </span>
                  <span className="text-sm text-muted-foreground">→</span>
                  <span className="text-sm font-medium">
                    목표: {weakness.targetLevel}/10
                  </span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(weakness.currentLevel / 10) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                {weakness.resources.map((resource, resourceIndex) => (
                  <div
                    key={resourceIndex}
                    className="p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-muted rounded-full">
                              {getResourceTypeText(resource.type)}
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
          <h3 className="font-semibold mb-2">AI 학습 추천</h3>
          <p className="text-sm">
            현재 역량 분석 결과, 알고리즘 최적화와 테스트 주도 개발 영역에
            집중하는 것이 가장 효과적일 것으로 판단됩니다. 특히 해시 테이블과
            같은 고급 자료구조를 활용한 알고리즘 최적화 기법을 학습하고, 테스트
            주도 개발 방법론을 실제 프로젝트에 적용해보는 것을 권장합니다. 위
            추천 자료를 순서대로 학습하면 3개월 내에 목표 역량에 도달할 수 있을
            것으로 예상됩니다.
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <Button>전체 학습 계획 다운로드</Button>
        </div>
      </CardContent>
    </Card>
  );
}
