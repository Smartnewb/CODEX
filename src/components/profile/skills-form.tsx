"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface SkillsFormProps {
  initialData?: {
    programmingLanguages?: { name: string; level: number }[];
    frameworks?: string[];
    tools?: string[];
    certificates?: string[];
  };
  onComplete: (data: {
    programmingLanguages: { name: string; level: number }[];
    frameworks: string[];
    tools: string[];
    certificates: string[];
  }) => void;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillsData {
  programmingLanguages: Skill[];
  frameworks: string[];
  tools: string[];
  certificates: string[];
}

const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Ruby",
  "Swift",
  "Kotlin",
  "PHP",
];

const POPULAR_FRAMEWORKS = [
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Django",
  "Spring",
  "Express",
  "Laravel",
  "Flutter",
  "TensorFlow",
];

const POPULAR_TOOLS = [
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "Jenkins",
  "Jira",
  "Figma",
  "Postman",
];

const SKILL_LEVELS = [
  { value: "1", label: "초급" },
  { value: "2", label: "중급" },
  { value: "3", label: "고급" },
  { value: "4", label: "전문가" },
  { value: "5", label: "마스터" },
];

export function SkillsForm({ initialData, onComplete }: SkillsFormProps) {
  const [programmingLanguages, setProgrammingLanguages] = useState<{ name: string; level: number }[]>(
    initialData?.programmingLanguages || []
  );
  const [frameworks, setFrameworks] = useState<string[]>(initialData?.frameworks || []);
  const [tools, setTools] = useState<string[]>(initialData?.tools || []);
  const [certificates, setCertificates] = useState<string[]>(initialData?.certificates || []);

  const [newLanguage, setNewLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("3");
  const [newFramework, setNewFramework] = useState("");
  const [newTool, setNewTool] = useState("");
  const [newCertificate, setNewCertificate] = useState("");
  const [error, setError] = useState("");

  const handleAddLanguage = () => {
    if (!newLanguage) return;
    if (programmingLanguages.some(l => l.name === newLanguage)) {
      setError("이미 추가된 프로그래밍 언어입니다.");
      return;
    }
    setProgrammingLanguages(prev => [...prev, { name: newLanguage, level: parseInt(selectedLevel) }]);
    setNewLanguage("");
    setSelectedLevel("3");
    setError("");
  };

  const handleRemoveLanguage = (language: string) => {
    setProgrammingLanguages(prev => prev.filter(l => l.name !== language));
  };

  const handleAddFramework = (framework: string) => {
    if (!framework) return;
    if (frameworks.includes(framework)) {
      setError("이미 추가된 프레임워크입니다.");
      return;
    }
    setFrameworks(prev => [...prev, framework]);
    setNewFramework("");
    setError("");
  };

  const handleRemoveFramework = (framework: string) => {
    setFrameworks(prev => prev.filter(f => f !== framework));
  };

  const handleAddTool = (tool: string) => {
    if (!tool) return;
    if (tools.includes(tool)) {
      setError("이미 추가된 도구입니다.");
      return;
    }
    setTools(prev => [...prev, tool]);
    setNewTool("");
    setError("");
  };

  const handleRemoveTool = (tool: string) => {
    setTools(prev => prev.filter(t => t !== tool));
  };

  const handleAddCertificate = (certificate: string) => {
    if (!certificate) return;
    if (certificates.includes(certificate)) {
      setError("이미 추가된 자격증입니다.");
      return;
    }
    setCertificates(prev => [...prev, certificate]);
    setNewCertificate("");
    setError("");
  };

  const handleRemoveCertificate = (certificate: string) => {
    setCertificates(prev => prev.filter(c => c !== certificate));
  };

  const handleSubmit = () => {
    if (programmingLanguages.length === 0) {
      setError("최소 1개 이상의 프로그래밍 언어를 추가해주세요.");
      return;
    }
    onComplete({
      programmingLanguages,
      frameworks,
      tools,
      certificates,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>
              프로그래밍 언어 <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="프로그래밍 언어 입력"
                    list="programming-languages"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLanguage();
                      }
                    }}
                  />
                  <datalist id="programming-languages">
                    {PROGRAMMING_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang} />
                    ))}
                  </datalist>
                </div>
                <ToggleGroup
                  type="single"
                  value={selectedLevel}
                  onValueChange={(value) => {
                    if (value) setSelectedLevel(value);
                  }}
                  className="flex-none"
                >
                  {SKILL_LEVELS.map((level) => (
                    <ToggleGroupItem
                      key={level.value}
                      value={level.value}
                      size="sm"
                      className="px-3"
                    >
                      {level.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <Button
                  type="button"
                  onClick={handleAddLanguage}
                  className="flex-none"
                >
                  추가
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {programmingLanguages.map((lang) => (
                  <Badge
                    key={lang.name}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {lang.name} ({SKILL_LEVELS[lang.level - 1].label})
                    <button
                      onClick={() => handleRemoveLanguage(lang.name)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>프레임워크 / 라이브러리</Label>
            <div className="flex gap-2">
              <Input
                value={newFramework}
                onChange={(e) => setNewFramework(e.target.value)}
                placeholder="프레임워크 입력"
                list="frameworks"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFramework(newFramework);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddFramework(newFramework)}
                className="flex-none"
              >
                추가
              </Button>
            </div>
            <datalist id="frameworks">
              {POPULAR_FRAMEWORKS.map((framework) => (
                <option key={framework} value={framework} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((framework) => (
                <Badge
                  key={framework}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {framework}
                  <button
                    onClick={() => handleRemoveFramework(framework)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>도구 및 플랫폼</Label>
            <div className="flex gap-2">
              <Input
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                placeholder="도구 입력"
                list="tools"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTool(newTool);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddTool(newTool)}
                className="flex-none"
              >
                추가
              </Button>
            </div>
            <datalist id="tools">
              {POPULAR_TOOLS.map((tool) => (
                <option key={tool} value={tool} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tool}
                  <button
                    onClick={() => handleRemoveTool(tool)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>자격증</Label>
            <div className="flex gap-2">
              <Input
                value={newCertificate}
                onChange={(e) => setNewCertificate(e.target.value)}
                placeholder="자격증 입력"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCertificate(newCertificate);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => handleAddCertificate(newCertificate)}
                className="flex-none"
              >
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificates.map((certificate) => (
                <Badge
                  key={certificate}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {certificate}
                  <button
                    onClick={() => handleRemoveCertificate(certificate)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="pt-4">
            <Button onClick={handleSubmit} className="w-full">
              다음 단계
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 