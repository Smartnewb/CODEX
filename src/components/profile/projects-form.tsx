"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Trash2, X, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectsFormProps {
  onComplete: (data: Project[]) => void;
}

interface Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  role: string;
  techStack: string[];
  description: string;
  links: { url: string; type: "github" | "live" | "other" }[];
  outcome: string;
}

export function ProjectsForm({ onComplete }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: "",
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    role: "",
    techStack: [],
    description: "",
    links: [],
    outcome: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newTech, setNewTech] = useState("");
  const [newLink, setNewLink] = useState({ url: "", type: "github" as const });

  const validateProject = (project: Project) => {
    const newErrors: { [key: string]: string } = {};

    if (!project.name) newErrors.name = "프로젝트 이름을 입력해주세요";
    if (!project.role) newErrors.role = "역할을 입력해주세요";
    if (!project.description) newErrors.description = "설명을 입력해주세요";
    if (project.techStack.length === 0) newErrors.techStack = "기술 스택을 1개 이상 입력해주세요";
    if (project.startDate > project.endDate) {
      newErrors.endDate = "종료일은 시작일보다 늦어야 합니다";
    }

    return newErrors;
  };

  const handleAddProject = () => {
    const validationErrors = validateProject(currentProject);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setProjects(prev => [...prev, { ...currentProject, id: Date.now().toString() }]);
    setCurrentProject({
      id: "",
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      role: "",
      techStack: [],
      description: "",
      links: [],
      outcome: "",
    });
    setErrors({});
  };

  const handleRemoveProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const handleSubmit = () => {
    if (projects.length === 0 && Object.keys(validateProject(currentProject)).length === 0) {
      handleAddProject();
    }
    if (projects.length === 0) {
      setErrors({ form: "최소 1개 이상의 프로젝트를 입력해주세요" });
      return;
    }
    onComplete(projects);
  };

  const handleAddTech = () => {
    if (!newTech) return;
    if (currentProject.techStack.includes(newTech)) {
      setErrors(prev => ({ ...prev, techStack: "이미 추가된 기술입니다" }));
      return;
    }
    setCurrentProject(prev => ({
      ...prev,
      techStack: [...prev.techStack, newTech]
    }));
    setNewTech("");
    setErrors(prev => {
      const { techStack, ...rest } = prev;
      return rest;
    });
  };

  const handleRemoveTech = (tech: string) => {
    setCurrentProject(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleAddLink = () => {
    if (!newLink.url) return;
    if (!newLink.url.startsWith("http://") && !newLink.url.startsWith("https://")) {
      setErrors(prev => ({ ...prev, link: "올바른 URL 형식이 아닙니다" }));
      return;
    }
    setCurrentProject(prev => ({
      ...prev,
      links: [...prev.links, { ...newLink }]
    }));
    setNewLink({ url: "", type: "github" });
    setErrors(prev => {
      const { link, ...rest } = prev;
      return rest;
    });
  };

  const handleRemoveLink = (url: string) => {
    setCurrentProject(prev => ({
      ...prev,
      links: prev.links.filter(link => link.url !== url)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  프로젝트 이름 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={currentProject.name}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, name: e.target.value })
                  }
                  placeholder="프로젝트 이름 입력"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    시작일 <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !currentProject.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentProject.startDate ? (
                          format(currentProject.startDate, "PPP")
                        ) : (
                          <span>시작일 선택</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={currentProject.startDate}
                        onSelect={(date) =>
                          setCurrentProject({ ...currentProject, startDate: date || new Date() })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>
                    종료일 <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !currentProject.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentProject.endDate ? (
                          format(currentProject.endDate, "PPP")
                        ) : (
                          <span>종료일 선택</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={currentProject.endDate}
                        onSelect={(date) =>
                          setCurrentProject({ ...currentProject, endDate: date || new Date() })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-sm text-red-500">{errors.endDate}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">
                  역할 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  value={currentProject.role}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, role: e.target.value })
                  }
                  placeholder="예: 백엔드 개발 70%, 프론트엔드 개발 30%"
                  className={errors.role ? "border-red-500" : ""}
                />
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  기술 스택 <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="기술 스택 입력"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTech}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {errors.techStack && (
                  <p className="text-sm text-red-500">{errors.techStack}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  설명 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={currentProject.description}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, description: e.target.value })
                  }
                  placeholder="프로젝트에 대한 설명을 입력하세요"
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>링크</Label>
                <div className="flex gap-2">
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="URL 입력 (예: https://github.com/...)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLink();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddLink}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
                {errors.link && (
                  <p className="text-sm text-red-500">{errors.link}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {currentProject.links.map((link) => (
                    <Badge
                      key={link.url}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {link.url}
                      </a>
                      <button
                        onClick={() => handleRemoveLink(link.url)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome">성과</Label>
                <Textarea
                  id="outcome"
                  value={currentProject.outcome}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, outcome: e.target.value })
                  }
                  placeholder="프로젝트를 통해 달성한 성과를 입력하세요"
                />
              </div>

              <Button
                type="button"
                onClick={handleAddProject}
                className="w-full"
              >
                프로젝트 추가
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">추가된 프로젝트</h3>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.role}</p>
                    <p className="text-sm">
                      {format(project.startDate, "yyyy.MM")} -{" "}
                      {format(project.endDate, "yyyy.MM")}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {errors.form && (
        <p className="text-sm text-red-500">{errors.form}</p>
      )}

      <Button onClick={handleSubmit} className="w-full">
        다음 단계
      </Button>
    </div>
  );
} 