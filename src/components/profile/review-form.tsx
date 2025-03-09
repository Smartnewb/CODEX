"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ReviewFormProps {
  formData: {
    basicInfo: any;
    skills: any;
    experience: any[];
    projects: any[];
  };
}

export function ReviewForm({ formData }: ReviewFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!agreed) {
      setError("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    // 제출 로직
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // 제목
    doc.setFontSize(20);
    doc.text("개발자 프로필", 20, 20);

    // 기본 정보
    doc.setFontSize(16);
    doc.text("기본 정보", 20, 40);
    autoTable(doc, {
      startY: 45,
      head: [["항목", "내용"]],
      body: [
        ["이름", formData.basicInfo.name || ""],
        ["이메일", formData.basicInfo.email || ""],
        ["전화번호", formData.basicInfo.phone || ""],
        ["거주지", formData.basicInfo.location || ""],
        ["희망 근무 형태", (formData.basicInfo.workTypes || []).join(", ")],
      ],
    });

    // 기술 스택
    const currentY = (doc as any).lastAutoTable?.finalY || 45;
    doc.text("기술 스택", 20, currentY + 20);
    autoTable(doc, {
      startY: currentY + 25,
      head: [["구분", "기술"]],
      body: [
        ["프로그래밍 언어", formData.skills.programmingLanguages?.map((lang: any) => `${lang.name} (Lv.${lang.level})`).join(", ") || ""],
        ["프레임워크", (formData.skills.frameworks || []).join(", ")],
        ["도구", (formData.skills.tools || []).join(", ")],
        ["자격증", (formData.skills.certificates || []).join(", ")],
      ],
    });

    // 경력
    const currentY2 = (doc as any).lastAutoTable?.finalY || (currentY + 25);
    doc.text("경력", 20, currentY2 + 20);
    if (formData.experience?.length > 0) {
      const experienceData = formData.experience.map((exp: any) => [
        exp.companyName,
        exp.position,
        `${format(new Date(exp.startDate), "yyyy.MM")} - ${exp.endDate === "present" ? "현재" : format(new Date(exp.endDate), "yyyy.MM")}`,
        exp.description,
      ]);
      autoTable(doc, {
        startY: currentY2 + 25,
        head: [["회사명", "직책", "기간", "주요 업무"]],
        body: experienceData,
      });
    }

    // 프로젝트
    const currentY3 = (doc as any).lastAutoTable?.finalY || (currentY2 + 25);
    doc.text("프로젝트", 20, currentY3 + 20);
    if (formData.projects?.length > 0) {
      const projectsData = formData.projects.map((project: any) => [
        project.name,
        project.role,
        `${format(new Date(project.startDate), "yyyy.MM")} - ${format(new Date(project.endDate), "yyyy.MM")}`,
        project.description,
        project.techStack.join(", "),
      ]);
      autoTable(doc, {
        startY: currentY3 + 25,
        head: [["프로젝트명", "역할", "기간", "설명", "기술 스택"]],
        body: projectsData,
      });
    }

    doc.save("developer-profile.pdf");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-8">
            {/* 기본 정보 */}
            <div>
              <h3 className="text-lg font-medium mb-4">기본 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">이름</Label>
                  <p>{formData.basicInfo.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">이메일</Label>
                  <p>{formData.basicInfo.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">전화번호</Label>
                  <p>{formData.basicInfo.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">거주지</Label>
                  <p>{formData.basicInfo.location}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">희망 근무 형태</Label>
                  <div className="flex gap-2 mt-1">
                    {formData.basicInfo.workTypes?.map((type: string) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 기술 스택 */}
            <div>
              <h3 className="text-lg font-medium mb-4">기술 스택</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">프로그래밍 언어</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.skills.programmingLanguages?.map((lang: any) => (
                      <Badge key={lang.name} variant="secondary">
                        {lang.name} (Lv.{lang.level})
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">프레임워크</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.skills.frameworks?.map((framework: string) => (
                      <Badge key={framework} variant="secondary">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">도구</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.skills.tools?.map((tool: string) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                {formData.skills.certificates?.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">자격증</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.skills.certificates.map((cert: string) => (
                        <Badge key={cert} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 경력 */}
            {formData.experience?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">경력</h3>
                <div className="space-y-4">
                  {formData.experience.map((exp: any) => (
                    <Card key={exp.id}>
                      <CardContent className="pt-6">
                        <div>
                          <h4 className="font-medium">{exp.companyName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.position}
                          </p>
                          <p className="text-sm">
                            {format(new Date(exp.startDate), "yyyy.MM")} -{" "}
                            {exp.endDate === "present"
                              ? "현재"
                              : format(new Date(exp.endDate), "yyyy.MM")}
                          </p>
                          <p className="mt-2">{exp.description}</p>
                          {exp.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {exp.techStack.map((tech: string) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 프로젝트 */}
            {formData.projects?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">프로젝트</h3>
                <div className="space-y-4">
                  {formData.projects.map((project: any) => (
                    <Card key={project.id}>
                      <CardContent className="pt-6">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {project.role}
                          </p>
                          <p className="text-sm">
                            {format(new Date(project.startDate), "yyyy.MM")} -{" "}
                            {format(new Date(project.endDate), "yyyy.MM")}
                          </p>
                          <p className="mt-2">{project.description}</p>
                          {project.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.techStack.map((tech: string) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {project.links.length > 0 && (
                            <div className="mt-2">
                              <Label className="text-muted-foreground">링크</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {project.links.map((link: any) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:underline"
                                  >
                                    {link.url}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          {project.outcome && (
                            <div className="mt-2">
                              <Label className="text-muted-foreground">성과</Label>
                              <p className="mt-1">{project.outcome}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Checkbox
          id="agreement"
          checked={agreed}
          onCheckedChange={(checked) => {
            setAgreed(checked as boolean);
            if (checked) setError("");
          }}
        />
        <Label htmlFor="agreement" className="text-sm">
          개인정보 수집 및 이용에 동의합니다
        </Label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-4">
        <Button variant="outline" onClick={handleDownloadPDF} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          PDF 다운로드
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          제출하기
        </Button>
      </div>
    </div>
  );
} 