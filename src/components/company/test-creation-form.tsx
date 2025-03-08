"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Bot,
  Code,
  Copy,
  Eye,
  GitBranch,
  GitPullRequest,
  Github,
  Loader2,
  Plus,
  Save,
  Server,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

type JobRole = "frontend" | "backend" | "devops" | "data";
type TestType = "coding" | "git" | "review" | "cicd";
type Difficulty = "easy" | "medium" | "hard";

interface TestQuestion {
  id: string;
  type: TestType;
  title: string;
  description: string;
  difficulty: Difficulty;
  timeLimit?: number; // in minutes
  code?: string;
}

interface TestCreationFormProps {
  isEditing?: boolean;
  testId?: string;
}

export function TestCreationForm({
  isEditing = false,
  testId,
}: TestCreationFormProps) {
  const [activeTab, setActiveTab] = useState("job-role");
  const [progress, setProgress] = useState(20);
  const [jobRole, setJobRole] = useState<JobRole | null>(null);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [testTypes, setTestTypes] = useState<TestType[]>([]);
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<
    { text: string; isUser: boolean }[]
  >([
    {
      text: "안녕하세요! 테스트 생성을 도와드릴 AI 어시스턴트입니다. 어떤 테스트를 만들고 싶으신가요?",
      isUser: false,
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  // Mock data for tech stack suggestions
  const techSuggestions: Record<string, string[]> = {
    frontend: [
      "React",
      "Vue.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Next.js",
      "Tailwind CSS",
    ],
    backend: [
      "Spring Boot",
      "Node.js",
      "Django",
      "Express",
      "Java",
      "Python",
      "C#",
      "Go",
      "PHP",
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Azure",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
    ],
    data: [
      "Python",
      "SQL",
      "Pandas",
      "Spark",
      "Hadoop",
      "TensorFlow",
      "PyTorch",
      "R",
    ],
  };

  useEffect(() => {
    // 로컬 스토리지에서 테스트 목록 가져오기
    const savedTests = localStorage.getItem("activeTests");
    if (savedTests) {
      // 수정 모드인 경우 해당 테스트 정보 불러오기
      if (isEditing && testId) {
        const tests = JSON.parse(savedTests);
        const test = tests.find((t: any) => t.id === testId);
        if (test) {
          setTestTitle(test.title);
          setTestDescription(test.description || "");
          // 여기에 더 많은 필드를 불러올 수 있습니다
          // 예: 직군, 기술 스택, 테스트 유형 등

          // 마지막 탭으로 이동
          setActiveTab("preview");
          setProgress(100);
        }
      }
    }
  }, [isEditing, testId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update progress based on tab
    switch (value) {
      case "job-role":
        setProgress(20);
        break;
      case "tech-stack":
        setProgress(40);
        break;
      case "test-type":
        setProgress(60);
        break;
      case "customize":
        setProgress(80);
        break;
      case "preview":
        setProgress(100);
        break;
    }
  };

  const addTechStack = () => {
    if (techInput && !techStack.includes(techInput)) {
      setTechStack([...techStack, techInput]);
      setTechInput("");
    }
  };

  const removeTechStack = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const toggleTestType = (type: TestType) => {
    if (testTypes.includes(type)) {
      setTestTypes(testTypes.filter((t) => t !== type));
    } else {
      setTestTypes([...testTypes, type]);
    }
  };

  const getSuggestions = () => {
    if (!jobRole) return [];
    return techSuggestions[jobRole].filter((s) => !techStack.includes(s));
  };

  const generateTestQuestions = () => {
    setIsGenerating(true);

    // Simulate API call to generate questions
    setTimeout(() => {
      const generatedQuestions: TestQuestion[] = [
        {
          id: "q1",
          type: "coding",
          title: "React 컴포넌트 구현",
          description:
            "주어진 명세에 따라 재사용 가능한 React 컴포넌트를 구현하세요. 이 컴포넌트는 데이터를 불러오는 동안 로딩 상태를 표시하고, 에러가 발생했을 때 적절한 에러 메시지를 표시해야 합니다.",
          difficulty: "medium",
          timeLimit: 30,
          code: "import React, { useState, useEffect } from 'react';\n\n// 데이터를 불러오는 컴포넌트를 구현하세요\n// Props:\n// - url: 데이터를 불러올 API 엔드포인트\n// - renderItem: 각 아이템을 렌더링하는 함수\n// - loadingComponent: 로딩 중 표시할 컴포넌트 (선택적)\n// - errorComponent: 에러 발생 시 표시할 컴포넌트 (선택적)\n\nconst DataFetcher = ({ url, renderItem, loadingComponent, errorComponent }) => {\n  // 여기에 코드를 작성하세요\n  \n}\n\nexport default DataFetcher;",
        },
        {
          id: "q2",
          type: "review",
          title: "코드 리뷰: 성능 최적화",
          description:
            "아래 코드는 대용량 데이터를 처리하는 함수입니다. 성능 문제가 있는 부분을 찾아 개선 방안을 제시하세요.",
          difficulty: "hard",
          timeLimit: 20,
          code: "function processLargeData(data) {\n  let results = [];\n  \n  for (let i = 0; i < data.length; i++) {\n    for (let j = 0; j < data.length; j++) {\n      if (data[i].id === data[j].relatedId) {\n        let temp = { ...data[i], related: data[j] };\n        results.push(temp);\n      }\n    }\n  }\n  \n  return results;\n}",
        },
        {
          id: "q3",
          type: "git",
          title: "Git 충돌 해결",
          description:
            "두 개발자가 동일한 파일의 동일한 부분을 수정하여 충돌이 발생했습니다. 충돌을 해결하고 적절한 Git 명령어를 사용하여 변경 사항을 커밋하세요.",
          difficulty: "medium",
          timeLimit: 15,
        },
      ];

      setTestQuestions(generatedQuestions);
      setIsGenerating(false);
    }, 3000);
  };

  const addQuestion = () => {
    const newQuestion: TestQuestion = {
      id: `q${testQuestions.length + 1}`,
      type: "coding",
      title: "새 문제",
      description: "문제 설명을 입력하세요.",
      difficulty: "medium",
      timeLimit: 30,
    };

    setTestQuestions([...testQuestions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setTestQuestions(testQuestions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<TestQuestion>) => {
    setTestQuestions(
      testQuestions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    );
  };

  const sendAiMessage = () => {
    if (!aiInput.trim()) return;

    // Add user message
    setAiMessages([...aiMessages, { text: aiInput, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      let response = "";

      if (
        aiInput.toLowerCase().includes("프론트엔드") ||
        aiInput.toLowerCase().includes("frontend")
      ) {
        response =
          "프론트엔드 개발자 테스트를 만드시는군요! React, Vue, Angular 중 어떤 프레임워크에 중점을 두고 싶으신가요? 또한 주니어 개발자용인지 시니어 개발자용인지 알려주시면 더 맞춤형 문제를 추천해드릴 수 있습니다.";
      } else if (
        aiInput.toLowerCase().includes("백엔드") ||
        aiInput.toLowerCase().includes("backend")
      ) {
        response =
          "백엔드 개발자 테스트를 준비하시는군요! Java/Spring, Node.js, Python/Django 등 어떤 기술 스택에 중점을 두고 싶으신가요? 데이터베이스나 API 설계 관련 문제도 포함하면 좋을 것 같습니다.";
      } else if (aiInput.toLowerCase().includes("난이도")) {
        response =
          "난이도 조정은 '쉬움', '보통', '어려움' 세 단계로 나눌 수 있습니다. 각 문제마다 난이도를 개별적으로 설정할 수 있으며, 전체 테스트의 평균 난이도도 조절 가능합니다. 어떤 수준으로 설정하고 싶으신가요?";
      } else {
        response =
          "말씀해주신 내용을 바탕으로 테스트를 구성해보겠습니다. 기술 스택, 난이도, 테스트 유형(코딩, Git, 코드 리뷰 등) 등 더 구체적인 요구사항이 있으시면 알려주세요.";
      }

      setAiMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);

    setAiInput("");
  };

  const getTestTypeLabel = (type: TestType) => {
    switch (type) {
      case "coding":
        return "코딩 테스트";
      case "git":
        return "Git 협업";
      case "review":
        return "코드 리뷰";
      case "cicd":
        return "CI/CD 구성";
    }
  };

  const getTestTypeIcon = (type: TestType) => {
    switch (type) {
      case "coding":
        return <Code className="h-5 w-5" />;
      case "git":
        return <GitBranch className="h-5 w-5" />;
      case "review":
        return <GitPullRequest className="h-5 w-5" />;
      case "cicd":
        return <Server className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  const getDifficultyLabel = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return "쉬움";
      case "medium":
        return "보통";
      case "hard":
        return "어려움";
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* AI 챗봇 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsAiChatOpen(!isAiChatOpen)}
          className="h-14 w-14 rounded-full bg-[#0066FF] hover:bg-[#0055DD] shadow-lg"
        >
          <Bot size={24} />
        </Button>
      </div>

      {/* AI 챗봇 패널 */}
      {isAiChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border rounded-lg shadow-xl z-50 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-[#0066FF]" />
              <h3 className="font-medium">AI 테스트 어시스턴트</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAiChatOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {aiMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${msg.isUser ? "bg-[#0066FF] text-white" : "bg-muted"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="AI에게 질문하기..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendAiMessage()}
              />
              <Button onClick={sendAiMessage}>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">테스트 생성 진행률</span>
              <span className="text-sm text-muted-foreground">
                {progress}% 완료
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="job-role">직군 선택</TabsTrigger>
          <TabsTrigger value="tech-stack">기술 스택</TabsTrigger>
          <TabsTrigger value="test-type">평가 방식</TabsTrigger>
          <TabsTrigger value="customize">문제 설정</TabsTrigger>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
        </TabsList>

        {/* 직군 선택 탭 */}
        <TabsContent value="job-role" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>직군 선택</CardTitle>
              <CardDescription>
                평가할 개발자 직군을 선택하세요. 선택한 직군에 맞는 테스트가
                생성됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer hover:border-[#0066FF] transition-all ${jobRole === "frontend" ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                onClick={() => setJobRole("frontend")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0066FF]"
                    >
                      <path d="m18 16 4-4-4-4" />
                      <path d="m6 8-4 4 4 4" />
                      <path d="m14.5 4-5 16" />
                    </svg>
                    프론트엔드 개발자
                  </CardTitle>
                  <CardDescription>
                    웹/모바일 UI 개발, 사용자 경험 최적화, 프론트엔드 프레임워크
                    활용 능력 평가
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Vue.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">HTML/CSS</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:border-[#0066FF] transition-all ${jobRole === "backend" ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                onClick={() => setJobRole("backend")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0066FF]"
                    >
                      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                      <line x1="6" x2="6.01" y1="6" y2="6" />
                      <line x1="6" x2="6.01" y1="18" y2="18" />
                    </svg>
                    백엔드 개발자
                  </CardTitle>
                  <CardDescription>
                    서버 개발, API 설계, 데이터베이스 관리, 성능 최적화 능력
                    평가
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Spring Boot</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">SQL</Badge>
                    <Badge variant="secondary">RESTful API</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:border-[#0066FF] transition-all ${jobRole === "devops" ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                onClick={() => setJobRole("devops")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0066FF]"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h.01" />
                      <path d="M17 7h.01" />
                      <path d="M7 17h.01" />
                      <path d="M17 17h.01" />
                    </svg>
                    DevOps 엔지니어
                  </CardTitle>
                  <CardDescription>
                    인프라 관리, CI/CD 파이프라인 구축, 클라우드 서비스 활용
                    능력 평가
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">Kubernetes</Badge>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">CI/CD</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:border-[#0066FF] transition-all ${jobRole === "data" ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                onClick={() => setJobRole("data")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0066FF]"
                    >
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                    데이터 엔지니어
                  </CardTitle>
                  <CardDescription>
                    데이터 파이프라인 구축, 대용량 데이터 처리, 데이터 분석 능력
                    평가
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">SQL</Badge>
                    <Badge variant="secondary">Spark</Badge>
                    <Badge variant="secondary">ETL</Badge>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled>
                이전 단계
              </Button>
              <Button
                onClick={() => handleTabChange("tech-stack")}
                disabled={!jobRole}
              >
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 기술 스택 탭 */}
        <TabsContent value="tech-stack" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기술 스택 설정</CardTitle>
              <CardDescription>
                테스트에 포함할 기술 스택을 선택하세요. 이 정보는 맞춤형 문제를
                생성하는 데 사용됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="기술 스택 입력 (예: React, Spring Boot)"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechStack();
                      }
                    }}
                  />
                  <Button onClick={addTechStack}>
                    <Plus size={16} className="mr-2" /> 추가
                  </Button>
                </div>

                {getSuggestions().length > 0 && (
                  <div className="space-y-2">
                    <Label>추천 기술 스택</Label>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestions().map((suggestion) => (
                        <Badge
                          key={suggestion}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => {
                            setTechStack([...techStack, suggestion]);
                          }}
                        >
                          + {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>선택된 기술 스택</Label>
                  <div className="flex flex-wrap gap-2">
                    {techStack.length > 0 ? (
                      techStack.map((tech) => (
                        <Badge
                          key={tech}
                          className="flex items-center gap-1 bg-primary"
                        >
                          {tech}
                          <X
                            size={14}
                            className="cursor-pointer"
                            onClick={() => removeTechStack(tech)}
                          />
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        아직 선택된 기술 스택이 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>GitHub 레포지토리 연동 (선택사항)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="GitHub 레포지토리 URL (예: https://github.com/username/repo)" />
                    <Button variant="outline" className="whitespace-nowrap">
                      <Github size={16} className="mr-2" /> 연동하기
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    GitHub 레포지토리를 연동하면 실제 코드베이스를 기반으로 한
                    맞춤형 문제가 생성됩니다.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("job-role")}
              >
                이전 단계
              </Button>
              <Button
                onClick={() => handleTabChange("test-type")}
                disabled={techStack.length === 0}
              >
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 평가 방식 탭 */}
        <TabsContent value="test-type" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>평가 방식 선택</CardTitle>
              <CardDescription>
                테스트에 포함할 평가 방식을 선택하세요. 여러 유형을 조합하여
                종합적인 평가가 가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer hover:border-[#0066FF] transition-all ${testTypes.includes("coding") ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                  onClick={() => toggleTestType("coding")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-[#0066FF]" />
                      코딩 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      알고리즘 문제 해결, 함수 구현, 컴포넌트 개발 등 실제 코드
                      작성 능력을 평가합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer hover:border-[#0066FF] transition-all ${testTypes.includes("git") ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                  onClick={() => toggleTestType("git")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-[#0066FF]" />
                      Git 협업
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      브랜치 관리, 충돌 해결, PR 생성 등 Git을 활용한 협업
                      능력을 평가합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer hover:border-[#0066FF] transition-all ${testTypes.includes("review") ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                  onClick={() => toggleTestType("review")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GitPullRequest className="h-5 w-5 text-[#0066FF]" />
                      코드 리뷰
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      주어진 코드의 문제점 파악, 개선 방안 제시, 코드 품질 평가
                      능력을 측정합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer hover:border-[#0066FF] transition-all ${testTypes.includes("cicd") ? "border-[#0066FF] bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                  onClick={() => toggleTestType("cicd")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Server className="h-5 w-5 text-[#0066FF]" />
                      CI/CD 구성
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      배포 파이프라인 설계, 자동화 스크립트 작성, 인프라 구성
                      능력을 평가합니다.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>테스트 기본 정보</Label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-title">테스트 제목</Label>
                      <Input
                        id="test-title"
                        placeholder="예: 프론트엔드 개발자 역량 평가"
                        value={testTitle}
                        onChange={(e) => setTestTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="test-description">테스트 설명</Label>
                      <Textarea
                        id="test-description"
                        placeholder="테스트의 목적과 평가 방식에 대한 설명을 입력하세요."
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("tech-stack")}
              >
                이전 단계
              </Button>
              <Button
                onClick={() => {
                  handleTabChange("customize");
                  if (
                    testTypes.length > 0 &&
                    testTitle &&
                    testQuestions.length === 0
                  ) {
                    generateTestQuestions();
                  }
                }}
                disabled={testTypes.length === 0 || !testTitle}
              >
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 문제 설정 탭 */}
        <TabsContent value="customize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>문제 설정</CardTitle>
              <CardDescription>
                AI가 생성한 문제를 검토하고 필요에 따라 수정하세요. 문제를
                추가하거나 삭제할 수도 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 text-[#0066FF] animate-spin mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    AI가 문제를 생성하고 있습니다
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    선택하신 직군, 기술 스택, 평가 방식을 바탕으로 맞춤형 문제를
                    생성 중입니다. 잠시만 기다려주세요.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">문제 목록</h3>
                    <Button onClick={addQuestion} variant="outline" size="sm">
                      <Plus size={16} className="mr-2" /> 문제 추가
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {testQuestions.length > 0 ? (
                      testQuestions.map((question) => (
                        <Card
                          key={question.id}
                          className="border-l-4"
                          style={{
                            borderLeftColor:
                              question.difficulty === "easy"
                                ? "#22c55e"
                                : question.difficulty === "medium"
                                  ? "#3b82f6"
                                  : "#ef4444",
                          }}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {getTestTypeIcon(question.type)}
                                  <Input
                                    value={question.title}
                                    onChange={(e) =>
                                      updateQuestion(question.id, {
                                        title: e.target.value,
                                      })
                                    }
                                    className="font-semibold border-0 p-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}
                                  >
                                    {getDifficultyLabel(question.difficulty)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {getTestTypeLabel(question.type)}
                                  </span>
                                  {question.timeLimit && (
                                    <span className="text-xs text-muted-foreground">
                                      {question.timeLimit}분
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Settings size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() =>
                                        updateQuestion(question.id, {
                                          difficulty: "easy",
                                        })
                                      }
                                    >
                                      난이도: 쉬움
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        updateQuestion(question.id, {
                                          difficulty: "medium",
                                        })
                                      }
                                    >
                                      난이도: 보통
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        updateQuestion(question.id, {
                                          difficulty: "hard",
                                        })
                                      }
                                    >
                                      난이도: 어려움
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQuestion(question.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>문제 설명</Label>
                                <Textarea
                                  value={question.description}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  className="min-h-[100px]"
                                />
                              </div>

                              {question.code && (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label>초기 코드</Label>
                                    <Button variant="ghost" size="sm">
                                      <Copy size={14} className="mr-2" /> 복사
                                    </Button>
                                  </div>
                                  <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-auto max-h-[300px]">
                                    <pre>{question.code}</pre>
                                  </div>
                                </div>
                              )}

                              <div className="space-y-2">
                                <Label>제한 시간 (분)</Label>
                                <div className="flex items-center gap-4">
                                  <Slider
                                    value={[question.timeLimit || 30]}
                                    min={5}
                                    max={120}
                                    step={5}
                                    onValueChange={(value) =>
                                      updateQuestion(question.id, {
                                        timeLimit: value[0],
                                      })
                                    }
                                    className="flex-1"
                                  />
                                  <span className="w-12 text-center">
                                    {question.timeLimit || 30}분
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          문제가 없습니다. 문제를 추가하거나 AI에게 생성을
                          요청하세요.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("test-type")}
              >
                이전 단계
              </Button>
              <Button
                onClick={() => handleTabChange("preview")}
                disabled={testQuestions.length === 0}
              >
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 미리보기 탭 */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>테스트 미리보기</CardTitle>
              <CardDescription>
                생성된 테스트를 미리 확인하고 배포하세요. 지원자들에게 이메일로
                초대 링크를 보낼 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {testTitle || "테스트 제목"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        테크스타트 주식회사
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-2" /> 지원자 화면 보기
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-background">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">테스트 개요</h4>
                      <p className="text-sm">
                        {testDescription || "테스트 설명이 여기에 표시됩니다."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">문제 목록</h4>
                      <div className="space-y-3">
                        {testQuestions.map((question, index) => (
                          <div
                            key={question.id}
                            className="border rounded-md p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">
                                  {index + 1}. {question.title}
                                </h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}
                                  >
                                    {getDifficultyLabel(question.difficulty)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {getTestTypeLabel(question.type)}
                                  </span>
                                  {question.timeLimit && (
                                    <span className="text-xs text-muted-foreground">
                                      {question.timeLimit}분
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>테스트 배포 설정</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-start-date">시작 일시</Label>
                      <Input id="test-start-date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="test-end-date">종료 일시</Label>
                      <Input id="test-end-date" type="datetime-local" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>지원자 초대</Label>
                  <Textarea
                    placeholder="이메일 주소를 입력하세요 (여러 명인 경우 쉼표로 구분)"
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const shareLink = `https://codeassess.ai/test/${Date.now()}`;
                        navigator.clipboard.writeText(shareLink);
                        alert(
                          `테스트 공유 링크가 클립보드에 복사되었습니다: ${shareLink}`,
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      공유 링크 생성
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("customize")}
              >
                이전 단계
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => alert("테스트가 임시 저장되었습니다.")}
                >
                  <Save size={16} className="mr-2" /> 임시 저장
                </Button>
                <Button
                  onClick={() => {
                    // 기존 테스트 목록 가져오기
                    const existingTests = localStorage.getItem("activeTests")
                      ? JSON.parse(localStorage.getItem("activeTests") || "[]")
                      : [];

                    if (isEditing && testId) {
                      // 수정 모드: 기존 테스트 업데이트
                      const updatedTests = existingTests.map((test: any) => {
                        if (test.id === testId) {
                          return {
                            ...test,
                            title: testTitle,
                            description: testDescription,
                            // 여기에 더 많은 필드를 업데이트할 수 있습니다
                          };
                        }
                        return test;
                      });

                      localStorage.setItem(
                        "activeTests",
                        JSON.stringify(updatedTests),
                      );
                      alert("테스트가 성공적으로 수정되었습니다.");
                    } else {
                      // 새 테스트 생성 모드
                      const newTest = {
                        id: `test-${Date.now()}`,
                        title: testTitle,
                        description: testDescription,
                        createdAt: new Date().toISOString().split("T")[0],
                        applicants: 0,
                        status: "진행중",
                      };

                      // 새 테스트 추가
                      localStorage.setItem(
                        "activeTests",
                        JSON.stringify([...existingTests, newTest]),
                      );

                      alert(
                        "테스트가 성공적으로 배포되었습니다. 초대 링크가 생성되었습니다.",
                      );
                    }

                    window.location.href = "/company/tests/manage";
                  }}
                >
                  {isEditing ? "테스트 수정 완료" : "테스트 배포하기"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
