import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LearningResource {
  title: string;
  url: string;
  type: "article" | "book" | "course" | "video";
}

interface LearningResourcesCardProps {
  candidateName: string;
  resources: LearningResource[];
}

export function LearningResourcesCard({
  candidateName,
  resources,
}: LearningResourcesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>학습 로드맵</CardTitle>
        <CardDescription>
          {candidateName}님의 역량 향상을 위한 추천 자료입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource, index) => (
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {resource.type === "article"
                        ? "아티클"
                        : resource.type === "book"
                          ? "도서"
                          : resource.type === "course"
                            ? "강의"
                            : "비디오"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={resource.url}>
                    <ExternalLink size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <Download size={16} className="mr-2" /> 리포트 다운로드
        </Button>
      </CardFooter>
    </Card>
  );
}
