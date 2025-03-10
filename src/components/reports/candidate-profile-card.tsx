import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface CandidateProfileCardProps {
  candidate: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    github: string;
    linkedin: string;
    status: string;
    testDuration: string;
    completedAt: string;
    position?: string;
  };
  testInfo: {
    title: string;
    date: string;
  };
}

export function CandidateProfileCard({
  candidate,
  testInfo,
}: CandidateProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">
              {candidate.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">
                {candidate.position || "지원자"}
              </p>
            </div>
          </div>
          <Badge
            className={`${candidate.status === "합격" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : candidate.status === "보류" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"} mb-4`}
          >
            {candidate.status}
          </Badge>

          <div className="w-full space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-sm">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Github size={16} className="text-muted-foreground" />
              <span className="text-sm">github.com/{candidate.github}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-muted-foreground" />
              <span className="text-sm">
                linkedin.com/in/{candidate.linkedin}
              </span>
            </div>
          </div>

          <div className="w-full space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">테스트</span>
              <span>{testInfo.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">완료 일시</span>
              <span>{candidate.completedAt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">소요 시간</span>
              <span>{candidate.testDuration}</span>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" size="sm">
              <ThumbsDown size={14} className="mr-1 text-red-500" /> 불합격
            </Button>
            <Button className="flex-1" size="sm">
              <ThumbsUp size={14} className="mr-1 text-green-500" /> 합격
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
