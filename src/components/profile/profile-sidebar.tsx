"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";

interface ProfileSidebarProps {
  currentStep: string;
  steps: { id: string; title: string; progress: number }[];
  formData: {
    basicInfo: any;
    skills: any;
    experience: any[];
    projects: any[];
  };
}

export function ProfileSidebar({ currentStep, steps, formData }: ProfileSidebarProps) {
  const isStepComplete = (stepId: string) => {
    switch (stepId) {
      case "basic":
        return Object.keys(formData.basicInfo).length > 0;
      case "skills":
        return formData.skills.programmingLanguages?.length > 0;
      case "experience":
        return formData.experience.length > 0;
      case "projects":
        return formData.projects.length > 0;
      default:
        return false;
    }
  };

  const renderStepSummary = (stepId: string) => {
    if (!isStepComplete(stepId)) return null;

    switch (stepId) {
      case "basic":
        return (
          <div className="text-sm text-muted-foreground">
            <p>{formData.basicInfo.name}</p>
            <p>{formData.basicInfo.email}</p>
            {formData.basicInfo.workTypes?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.basicInfo.workTypes.map((type: string) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );
      case "skills":
        return (
          <div className="text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-1">
              {formData.skills.programmingLanguages?.slice(0, 3).map((lang: any) => (
                <Badge key={lang.name} variant="secondary" className="text-xs">
                  {lang.name}
                </Badge>
              ))}
              {formData.skills.programmingLanguages?.length > 3 && (
                <span className="text-xs">
                  +{formData.skills.programmingLanguages.length - 3}
                </span>
              )}
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="text-sm text-muted-foreground">
            {formData.experience.slice(0, 2).map((exp: any) => (
              <div key={exp.id} className="mb-1">
                <p className="font-medium">{exp.companyName}</p>
                <p className="text-xs">
                  {format(new Date(exp.startDate), "yyyy.MM")} -{" "}
                  {exp.endDate === "present"
                    ? "현재"
                    : format(new Date(exp.endDate), "yyyy.MM")}
                </p>
              </div>
            ))}
            {formData.experience.length > 2 && (
              <p className="text-xs">+{formData.experience.length - 2}개의 경력</p>
            )}
          </div>
        );
      case "projects":
        return (
          <div className="text-sm text-muted-foreground">
            {formData.projects.slice(0, 2).map((project: any) => (
              <div key={project.id} className="mb-1">
                <p className="font-medium">{project.name}</p>
                <p className="text-xs">
                  {format(new Date(project.startDate), "yyyy.MM")} -{" "}
                  {format(new Date(project.endDate), "yyyy.MM")}
                </p>
              </div>
            ))}
            {formData.projects.length > 2 && (
              <p className="text-xs">+{formData.projects.length - 2}개의 프로젝트</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="sticky top-8">
      <CardContent className="pt-6">
        <h3 className="font-medium mb-4">작성 진행 상황</h3>
        <div className="space-y-4">
          {steps.map((step) => {
            const isComplete = isStepComplete(step.id);
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border ${
                  isCurrent ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{step.title}</span>
                    {isComplete && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  {step.progress > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {step.progress}%
                    </span>
                  )}
                </div>
                {renderStepSummary(step.id)}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 