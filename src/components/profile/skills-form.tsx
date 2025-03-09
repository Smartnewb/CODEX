"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface SkillsFormProps {
  onComplete: (data: SkillsData) => void;
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

export function SkillsForm({ onComplete }: SkillsFormProps) {
  const [formData, setFormData] = useState<SkillsData>({
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    certificates: [],
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newFramework, setNewFramework] = useState("");
  const [newTool, setNewTool] = useState("");
  const [newCertificate, setNewCertificate] = useState("");
  const [error, setError] = useState("");

  const handleAddLanguage = (language: string, level: number = 3) => {
    if (!language) return;
    if (formData.programmingLanguages.some(l => l.name === language)) {
      setError("이미 추가된 프로그래밍 언어입니다.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      programmingLanguages: [...prev.programmingLanguages, { name: language, level }]
    }));
    setNewLanguage("");
    setError("");
  };

  const handleRemoveLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.filter(l => l.name !== language)
    }));
  };

  const handleAddFramework = (framework: string) => {
    if (!framework) return;
    if (formData.frameworks.includes(framework)) {
      setError("이미 추가된 프레임워크입니다.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      frameworks: [...prev.frameworks, framework]
    }));
    setNewFramework("");
    setError("");
  };

  const handleRemoveFramework = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      frameworks: prev.frameworks.filter(f => f !== framework)
    }));
  };

  const handleAddTool = (tool: string) => {
    if (!tool) return;
    if (formData.tools.includes(tool)) {
      setError("이미 추가된 도구입니다.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      tools: [...prev.tools, tool]
    }));
    setNewTool("");
    setError("");
  };

  const handleRemoveTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter(t => t !== tool)
    }));
  };

  const handleAddCertificate = (certificate: string) => {
    if (!certificate) return;
    if (formData.certificates.includes(certificate)) {
      setError("이미 추가된 자격증입니다.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, certificate]
    }));
    setNewCertificate("");
    setError("");
  };

  const handleRemoveCertificate = (certificate: string) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c !== certificate)
    }));
  };

  const handleSubmit = () => {
    if (formData.programmingLanguages.length === 0) {
      setError("최소 1개 이상의 프로그래밍 언어를 추가해주세요.");
      return;
    }
    onComplete(formData);
  };

  const handleSkillLevelChange = (language: string, level: number) => {
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.map(l =>
        l.name === language ? { ...l, level } : l
      )
    }));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>
              프로그래밍 언어 <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="프로그래밍 언어 입력"
                list="programming-languages"
              />
              <Button
                type="button"
                onClick={() => handleAddLanguage(newLanguage)}
              >
                추가
              </Button>
            </div>
            <datalist id="programming-languages">
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <option key={lang} value={lang} />
              ))}
            </datalist>
            <div className="space-y-3">
              {formData.programmingLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {lang.name}
                    <button
                      onClick={() => handleRemoveLanguage(lang.name)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                  <div className="flex-1">
                    <Slider
                      value={[lang.level]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={([value]) => handleSkillLevelChange(lang.name, value)}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-20">
                    레벨 {lang.level}/5
                  </span>
                </div>
              ))}
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
              />
              <Button
                type="button"
                onClick={() => handleAddFramework(newFramework)}
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
              {formData.frameworks.map((framework) => (
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
              />
              <Button
                type="button"
                onClick={() => handleAddTool(newTool)}
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
              {formData.tools.map((tool) => (
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
              />
              <Button
                type="button"
                onClick={() => handleAddCertificate(newCertificate)}
              >
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certificates.map((certificate) => (
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