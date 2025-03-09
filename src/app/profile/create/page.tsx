"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BasicInfoForm } from "@/components/profile/basic-info-form";
import { SkillsForm } from "@/components/profile/skills-form";
import { ExperienceForm } from "@/components/profile/experience-form";
import { ProjectsForm } from "@/components/profile/projects-form";
import { ReviewForm } from "@/components/profile/review-form";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";

type Step = "basic" | "skills" | "experience" | "projects" | "review";

interface FormData {
  basicInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    workTypes?: string[];
  };
  skills: {
    programmingLanguages?: { name: string; level: number }[];
    frameworks?: string[];
    tools?: string[];
    certificates?: string[];
  };
  experience: {
    id: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date | "present";
    description: string;
    teamSize: number;
    techStack: string[];
  }[];
  projects: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    role: string;
    techStack: string[];
    description: string;
    links: { url: string; type: "github" | "live" | "other" }[];
    outcome?: string;
  }[];
}

export default function CreateProfilePage() {
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {},
    skills: {},
    experience: [],
    projects: [],
  });

  const steps: { id: Step; title: string; progress: number }[] = [
    { id: "basic", title: "기본 정보", progress: 20 },
    { id: "skills", title: "기술 스택", progress: 40 },
    { id: "experience", title: "경력", progress: 70 },
    { id: "projects", title: "프로젝트", progress: 90 },
    { id: "review", title: "검토", progress: 100 },
  ];

  const handleStepComplete = (step: Step, data: FormData[keyof FormData]) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [step]: data
    }));
    
    const nextStep = steps[steps.findIndex(s => s.id === step) + 1];
    if (nextStep) {
      setCurrentStep(nextStep.id);
      setProgress(nextStep.progress);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('profileDraft', JSON.stringify(formData));
    alert('임시 저장되었습니다.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case "basic":
        return <BasicInfoForm onComplete={(data: FormData["basicInfo"]) => handleStepComplete("basic", data)} />;
      case "skills":
        return <SkillsForm onComplete={(data: FormData["skills"]) => handleStepComplete("skills", data)} />;
      case "experience":
        return <ExperienceForm onComplete={(data: FormData["experience"]) => handleStepComplete("experience", data)} />;
      case "projects":
        return <ProjectsForm onComplete={(data: FormData["projects"]) => handleStepComplete("projects", data)} />;
      case "review":
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">개발자 프로필 작성</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                임시 저장
              </Button>
              <Button>제출하기</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">
              {steps.find(step => step.id === currentStep)?.title} ({progress}%)
            </div>
            <div className="text-sm text-muted-foreground">
              {steps.findIndex(step => step.id === currentStep) + 1} / {steps.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {renderStep()}
          </div>
          <div className="md:col-span-1">
            <ProfileSidebar 
              currentStep={currentStep}
              steps={steps}
              formData={formData}
            />
          </div>
        </div>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>© 2024 CODEX. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy">개인정보 처리방침</Link>
              <Link href="/contact">문의하기</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 