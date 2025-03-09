"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ExperienceFormProps {
  initialData?: {
    id: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date | "present";
    description: string;
    teamSize: number;
    techStack: string[];
  }[];
  onComplete: (data: {
    id: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date | "present";
    description: string;
    teamSize: number;
    techStack: string[];
  }[]) => void;
}

interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date | "present";
  description: string;
  teamSize: number;
  techStack: string[];
}

const POSITIONS = [
  "백엔드 개발자",
  "프론트엔드 개발자",
  "풀스택 개발자",
  "모바일 앱 개발자",
  "데브옵스 엔지니어",
  "시스템 엔지니어",
  "데이터 엔지니어",
  "ML/AI 엔지니어",
  "기타",
];

export function ExperienceForm({ initialData, onComplete }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState(initialData || []);
  const [hasNoExperience, setHasNoExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: "",
    companyName: "",
    position: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    teamSize: 1,
    techStack: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newTech, setNewTech] = useState("");

  const validateExperience = (exp: Experience) => {
    const newErrors: { [key: string]: string } = {};

    if (!exp.companyName) newErrors.companyName = "회사명을 입력해주세요";
    if (!exp.position) newErrors.position = "직책을 선택해주세요";
    if (!exp.description) newErrors.description = "주요 업무를 입력해주세요";
    if (exp.teamSize < 1) newErrors.teamSize = "팀 규모는 1명 이상이어야 합니다";
    if (exp.endDate !== "present" && exp.startDate > exp.endDate) {
      newErrors.endDate = "종료일은 시작일보다 늦어야 합니다";
    }

    return newErrors;
  };

  const handleAddExperience = () => {
    const validationErrors = validateExperience(currentExperience);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setExperiences(prev => [...prev, { ...currentExperience, id: Date.now().toString() }]);
    setCurrentExperience({
      id: "",
      companyName: "",
      position: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      teamSize: 1,
      techStack: [],
    });
    setErrors({});
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleSubmit = () => {
    if (hasNoExperience) {
      onComplete([]);
      return;
    }

    if (experiences.length === 0 && Object.keys(validateExperience(currentExperience)).length === 0) {
      handleAddExperience();
    }
    if (experiences.length === 0) {
      setErrors({ form: "최소 1개 이상의 경력을 입력하거나 '해당 사항 없음'을 선택해주세요" });
      return;
    }
    onComplete(experiences);
  };

  const handleAddTech = () => {
    if (!newTech) return;
    if (currentExperience.techStack.includes(newTech)) {
      setErrors(prev => ({ ...prev, techStack: "이미 추가된 기술입니다" }));
      return;
    }
    setCurrentExperience(prev => ({
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
    setCurrentExperience(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="no-experience"
          checked={hasNoExperience}
          onCheckedChange={(checked) => {
            setHasNoExperience(checked as boolean);
            if (checked) {
              setExperiences([]);
              setErrors({});
            }
          }}
        />
        <label
          htmlFor="no-experience"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          해당 사항 없음
        </label>
      </div>

      {!hasNoExperience && (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        회사명 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        value={currentExperience.companyName}
                        onChange={(e) =>
                          setCurrentExperience({ ...currentExperience, companyName: e.target.value })
                        }
                        placeholder="회사명 입력"
                        className={errors.companyName ? "border-red-500" : ""}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-red-500">{errors.companyName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">
                        직책 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={currentExperience.position}
                        onValueChange={(value) =>
                          setCurrentExperience({ ...currentExperience, position: value })
                        }
                      >
                        <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                          <SelectValue placeholder="직책 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {POSITIONS.map((position) => (
                            <SelectItem key={position} value={position}>
                              {position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.position && (
                        <p className="text-sm text-red-500">{errors.position}</p>
                      )}
                    </div>
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
                              !currentExperience.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {currentExperience.startDate ? (
                              format(currentExperience.startDate, "PPP")
                            ) : (
                              <span>시작일 선택</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={currentExperience.startDate}
                            onSelect={(date) =>
                              setCurrentExperience({ ...currentExperience, startDate: date || new Date() })
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
                              !currentExperience.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {currentExperience.endDate === "present" ? (
                              "재직중"
                            ) : currentExperience.endDate ? (
                              format(currentExperience.endDate, "PPP")
                            ) : (
                              <span>종료일 선택</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="p-2 border-b">
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() =>
                                setCurrentExperience({ ...currentExperience, endDate: "present" })
                              }
                            >
                              재직중
                            </Button>
                          </div>
                          <Calendar
                            mode="single"
                            selected={
                              currentExperience.endDate === "present"
                                ? new Date()
                                : currentExperience.endDate
                            }
                            onSelect={(date) =>
                              setCurrentExperience({ ...currentExperience, endDate: date || new Date() })
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
                    <Label htmlFor="description">
                      주요 업무 <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={currentExperience.description}
                      onChange={(e) =>
                        setCurrentExperience({ ...currentExperience, description: e.target.value })
                      }
                      placeholder="주요 업무를 입력하세요"
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">팀 규모</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        min={1}
                        value={currentExperience.teamSize}
                        onChange={(e) =>
                          setCurrentExperience({
                            ...currentExperience,
                            teamSize: parseInt(e.target.value) || 1,
                          })
                        }
                        className={errors.teamSize ? "border-red-500" : ""}
                      />
                      {errors.teamSize && (
                        <p className="text-sm text-red-500">{errors.teamSize}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>사용 기술</Label>
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
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentExperience.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="bg-muted text-sm px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTech(tech)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full"
                  >
                    경력 추가
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {experiences.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">추가된 경력</h3>
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{exp.companyName}</h4>
                        <p className="text-sm text-muted-foreground">{exp.position}</p>
                        <p className="text-sm">
                          {format(exp.startDate, "yyyy.MM")} -{" "}
                          {exp.endDate === "present"
                            ? "현재"
                            : format(exp.endDate, "yyyy.MM")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExperience(exp.id)}
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
        </>
      )}

      <Button onClick={handleSubmit} className="w-full">
        다음 단계
      </Button>
    </div>
  );
} 