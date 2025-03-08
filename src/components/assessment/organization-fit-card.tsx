import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OrganizationFitProps {
  organizationFit: {
    overallFit: number;
    techStackMatch: number;
    codingStyleMatch: number;
    collaborationMatch: number;
    problemSolvingMatch: number;
    analysis: string;
  };
}

export function OrganizationFitCard({ organizationFit }: OrganizationFitProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>조직 적합도 분석</CardTitle>
        <CardDescription>
          기업 문화 및 기술 스택 적합도 분석 결과입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border-6 sm:border-8 border-blue-600 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                {organizationFit.overallFit}%
              </div>
              <div className="text-xs text-muted-foreground">조직 적합도</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">기술 스택 일치도</span>
              <span className="text-sm font-medium">
                {organizationFit.techStackMatch}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${organizationFit.techStackMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">코딩 스타일 일치도</span>
              <span className="text-sm font-medium">
                {organizationFit.codingStyleMatch}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${organizationFit.codingStyleMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">협업 방식 적합도</span>
              <span className="text-sm font-medium">
                {organizationFit.collaborationMatch}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${organizationFit.collaborationMatch}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">문제 해결 접근법</span>
              <span className="text-sm font-medium">
                {organizationFit.problemSolvingMatch}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${organizationFit.problemSolvingMatch}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">AI 분석 결과</h3>
          <p className="text-sm">{organizationFit.analysis}</p>
        </div>

        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">채용 가능성 분석</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">
                기술 스택 매칭률이 82%로 높은 수준입니다.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">
                기존 팀원의 코딩 스타일과 88% 유사합니다.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">
                협업 방식이 현재 팀 문화와 90% 일치합니다.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-sm">
                일부 백엔드 기술에 대한 이해도 향상이 필요합니다.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
