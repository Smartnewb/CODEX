"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      workTypes: [],
    },
    skills: {
      programmingLanguages: [],
      frameworks: [],
      tools: [],
      certificates: [],
    },
    experience: [],
    projects: [],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('developerProfile');
      const draftProfile = localStorage.getItem('profileDraft');
      
      const loadProfile = (storedData: string | null) => {
        if (!storedData) return;
        
        try {
          const parsedData = JSON.parse(storedData);
          const processedData = {
            ...parsedData,
            basicInfo: {
              ...formData.basicInfo,  // 기본 구조 유지
              ...parsedData.basicInfo // 저장된 데이터로 덮어쓰기
            },
            skills: {
              ...formData.skills,
              ...parsedData.skills
            },
            experience: parsedData.experience?.map((exp: any) => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
              endDate: exp.endDate === 'present' ? 'present' : new Date(exp.endDate)
            })) || [],
            projects: parsedData.projects?.map((proj: any) => ({
              ...proj,
              startDate: proj.startDate ? new Date(proj.startDate) : new Date(),
              endDate: proj.endDate ? new Date(proj.endDate) : new Date()
            })) || []
          };
          
          setFormData(processedData);
        } catch (error) {
          console.error('데이터 파싱 오류:', error);
        }
      };

      // 저장된 프로필이 있으면 먼저 로드
      if (savedProfile) {
        loadProfile(savedProfile);
      } else if (draftProfile) {
        // 저장된 프로필이 없을 경우 임시 저장 데이터 로드
        loadProfile(draftProfile);
      }
    }
  }, []);

  const steps: { id: Step; title: string; progress: number }[] = [
    { id: "basic", title: "기본 정보", progress: 20 },
    { id: "skills", title: "기술 스택", progress: 40 },
    { id: "experience", title: "경력", progress: 70 },
    { id: "projects", title: "프로젝트", progress: 90 },
    { id: "review", title: "검토", progress: 100 },
  ];

  const handleStepComplete = (step: Step, data: FormData[keyof FormData]) => {
    setFormData((prev: FormData) => {
      let updatedData;
      
      // 각 단계별로 적절한 타입 처리
      if (step === "basic") {
        updatedData = {
          ...prev,
          basicInfo: {
            ...prev.basicInfo,
            ...(data as FormData["basicInfo"])
          }
        };
      } else if (step === "skills") {
        updatedData = {
          ...prev,
          skills: {
            ...prev.skills,
            ...(data as FormData["skills"])
          }
        };
      } else {
        updatedData = {
          ...prev,
          [step]: data
        };
      }
      
      // 상태 변경 직후 로컬 스토리지에 저장
      localStorage.setItem('profileDraft', JSON.stringify(updatedData));
      console.log('저장된 데이터:', updatedData); // 디버깅용
      
      return updatedData;
    });
    
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

  const handleSubmit = async () => {
    try {
      // 프로필 데이터를 로컬 스토리지에 저장
      localStorage.setItem('developerProfile', JSON.stringify(formData));
      
      // 임시 저장 데이터 삭제
      localStorage.removeItem('profileDraft');
      
      // 저장이 완료된 후 토스트 메시지 표시
      toast.success("프로필이 성공적으로 저장되었습니다!");
      
      // 약간의 지연 후 라우팅 (데이터가 완전히 저장되도록)
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error('프로필 저장 중 오류:', error);
      toast.error("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "basic":
        return <BasicInfoForm 
          initialData={formData.basicInfo}
          onComplete={(data: FormData["basicInfo"]) => handleStepComplete("basic", data)} 
        />;
      case "skills":
        return <SkillsForm 
          initialData={formData.skills}
          onComplete={(data: FormData["skills"]) => handleStepComplete("skills", data)} 
        />;
      case "experience":
        return <ExperienceForm 
          initialData={formData.experience}
          onComplete={(data: FormData["experience"]) => handleStepComplete("experience", data)} 
        />;
      case "projects":
        return <ProjectsForm 
          initialData={formData.projects}
          onComplete={(data: FormData["projects"]) => handleStepComplete("projects", data)} 
        />;
      case "review":
        return <ReviewForm formData={formData} onSubmit={handleSubmit} />;
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