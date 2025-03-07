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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Github,
  GitBranch,
  GitPullRequest,
  Plus,
  Save,
  Server,
  Trello,
  X,
} from "lucide-react";
import { useState } from "react";

export function CompanyProfileForm() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [progress, setProgress] = useState(25);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [connectedServices, setConnectedServices] = useState({
    github: false,
    gitlab: false,
    jira: false,
    trello: false,
  });

  // Mock data for tech stack suggestions
  const techSuggestions: Record<string, string[]> = {
    react: ["TypeScript", "Next.js", "Redux"],
    java: ["Spring Boot", "JPA", "Maven"],
    python: ["Django", "Flask", "FastAPI"],
    node: ["Express", "NestJS", "MongoDB"],
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update progress based on tab
    switch (value) {
      case "basic-info":
        setProgress(25);
        break;
      case "tech-stack":
        setProgress(50);
        break;
      case "integrations":
        setProgress(75);
        break;
      case "positions":
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

  const getSuggestions = (tech: string) => {
    const lowerTech = tech.toLowerCase();
    for (const [key, suggestions] of Object.entries(techSuggestions)) {
      if (lowerTech.includes(key)) {
        return suggestions.filter((s) => !techStack.includes(s));
      }
    }
    return [];
  };

  const toggleService = (service: keyof typeof connectedServices) => {
    setConnectedServices({
      ...connectedServices,
      [service]: !connectedServices[service],
    });
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">프로필 설정 진행률</span>
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
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="basic-info">기본 정보</TabsTrigger>
          <TabsTrigger value="tech-stack">기술 스택</TabsTrigger>
          <TabsTrigger value="integrations">서비스 연동</TabsTrigger>
          <TabsTrigger value="positions">채용 포지션</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기업 기본 정보</CardTitle>
              <CardDescription>
                기업에 대한 기본 정보를 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">회사명</Label>
                  <Input
                    id="company-name"
                    placeholder="테크스타트 주식회사"
                    defaultValue="테크스타트 주식회사"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-number">사업자등록번호</Label>
                  <Input
                    id="business-number"
                    placeholder="000-00-00000"
                    defaultValue="123-45-67890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-website">회사 웹사이트</Label>
                <Input
                  id="company-website"
                  placeholder="https://example.com"
                  defaultValue="https://techstart.co.kr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-size">회사 규모</Label>
                <select
                  id="company-size"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="10-50"
                >
                  <option value="1-9">1-9명</option>
                  <option value="10-50">10-50명</option>
                  <option value="51-200">51-200명</option>
                  <option value="201-500">201-500명</option>
                  <option value="501+">501명 이상</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">회사 소개</Label>
                <textarea
                  id="company-description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="회사에 대한 간략한 소개를 입력해주세요."
                  defaultValue="테크스타트는 혁신적인 기술 솔루션을 제공하는 IT 기업으로, 웹 및 모바일 애플리케이션 개발에 특화되어 있습니다."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">취소</Button>
              <Button onClick={() => handleTabChange("tech-stack")}>
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tech-stack" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기술 스택 설정</CardTitle>
              <CardDescription>
                귀사에서 사용하는 기술 스택을 설정하세요. 이 정보는 맞춤형
                개발자 평가 문제를 생성하는 데 사용됩니다.
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

                {techInput && getSuggestions(techInput).length > 0 && (
                  <div className="space-y-2">
                    <Label>추천 기술 스택</Label>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestions(techInput).map((suggestion) => (
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
                <h3 className="text-lg font-medium">개발 프로세스</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>개발 방법론</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="agile" defaultChecked />
                        <label
                          htmlFor="agile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Agile / Scrum
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="kanban" />
                        <label
                          htmlFor="kanban"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Kanban
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="waterfall" />
                        <label
                          htmlFor="waterfall"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Waterfall
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>코드 리뷰 방식</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pr-review" defaultChecked />
                        <label
                          htmlFor="pr-review"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          PR 기반 코드 리뷰
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pair-programming" />
                        <label
                          htmlFor="pair-programming"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          페어 프로그래밍
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ci-cd" defaultChecked />
                        <label
                          htmlFor="ci-cd"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          CI/CD 필수
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("basic-info")}
              >
                이전 단계
              </Button>
              <Button onClick={() => handleTabChange("integrations")}>
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>서비스 연동</CardTitle>
              <CardDescription>
                내부 프로젝트 데이터를 연동하여 실무 환경과 유사한 평가 문제를
                생성할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className={connectedServices.github ? "border-[#0066FF]" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        <CardTitle className="text-lg">GitHub 연동</CardTitle>
                      </div>
                      {connectedServices.github && (
                        <Badge className="bg-[#0066FF]">연동됨</Badge>
                      )}
                    </div>
                    <CardDescription>
                      GitHub 레포지토리 데이터를 분석하여 코드 스타일, 커밋
                      패턴, 브랜치 관리 방식을 파악합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {connectedServices.github ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>연결된 계정</span>
                          <span className="font-medium">techstart-org</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>연결된 레포지토리</span>
                          <span className="font-medium">3개</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span>주요 브랜치: main, develop</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                            <span>PR 평균 리뷰 시간: 12시간</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        GitHub 계정을 연동하여 실제 개발 환경을 반영한 평가
                        문제를 생성하세요.
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={connectedServices.github ? "outline" : "default"}
                      className="w-full"
                      onClick={() => toggleService("github")}
                    >
                      {connectedServices.github
                        ? "연동 해제"
                        : "GitHub 연동하기"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className={connectedServices.jira ? "border-[#0066FF]" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m12 10-3 3 3 3 3-3-3-3Z" />
                          <path d="M5.17 17.67 2 12l3.17-5.67C6.1 4.01 8.65 2.5 11.4 2.5h1.2c2.75 0 5.3 1.51 6.23 3.83L22 12l-3.17 5.67C17.9 19.99 15.35 21.5 12.6 21.5h-1.2c-2.75 0-5.3-1.51-6.23-3.83Z" />
                        </svg>
                        <CardTitle className="text-lg">Jira 연동</CardTitle>
                      </div>
                      {connectedServices.jira && (
                        <Badge className="bg-[#0066FF]">연동됨</Badge>
                      )}
                    </div>
                    <CardDescription>
                      Jira의 이슈 트래킹 데이터를 분석하여 실제 프로젝트 이슈를
                      반영한 문제를 생성합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {connectedServices.jira ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>연결된 계정</span>
                          <span className="font-medium">
                            techstart.atlassian.net
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>연결된 프로젝트</span>
                          <span className="font-medium">2개</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span>활성 이슈: 24개</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>평균 이슈 해결 시간: 3.5일</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Jira 계정을 연동하여 실제 프로젝트 이슈를 반영한 평가
                        문제를 생성하세요.
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={connectedServices.jira ? "outline" : "default"}
                      className="w-full"
                      onClick={() => toggleService("jira")}
                    >
                      {connectedServices.jira ? "연동 해제" : "Jira 연동하기"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className={connectedServices.gitlab ? "border-[#0066FF]" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
                        </svg>
                        <CardTitle className="text-lg">GitLab 연동</CardTitle>
                      </div>
                      {connectedServices.gitlab && (
                        <Badge className="bg-[#0066FF]">연동됨</Badge>
                      )}
                    </div>
                    <CardDescription>
                      GitLab 레포지토리 데이터를 분석하여 코드 스타일, 커밋
                      패턴, CI/CD 파이프라인을 파악합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      GitLab 계정을 연동하여 실제 개발 환경을 반영한 평가 문제를
                      생성하세요.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={connectedServices.gitlab ? "outline" : "default"}
                      className="w-full"
                      onClick={() => toggleService("gitlab")}
                    >
                      {connectedServices.gitlab
                        ? "연동 해제"
                        : "GitLab 연동하기"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className={connectedServices.trello ? "border-[#0066FF]" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trello className="h-5 w-5" />
                        <CardTitle className="text-lg">Trello 연동</CardTitle>
                      </div>
                      {connectedServices.trello && (
                        <Badge className="bg-[#0066FF]">연동됨</Badge>
                      )}
                    </div>
                    <CardDescription>
                      Trello 보드 데이터를 분석하여 프로젝트 관리 방식과 작업
                      흐름을 파악합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Trello 계정을 연동하여 실제 프로젝트 관리 방식을 반영한
                      평가 문제를 생성하세요.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={connectedServices.trello ? "outline" : "default"}
                      className="w-full"
                      onClick={() => toggleService("trello")}
                    >
                      {connectedServices.trello
                        ? "연동 해제"
                        : "Trello 연동하기"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("tech-stack")}
              >
                이전 단계
              </Button>
              <Button onClick={() => handleTabChange("positions")}>
                다음 단계
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>채용 포지션 관리</CardTitle>
              <CardDescription>
                현재 채용 중인 포지션과 각 포지션별 요구 역량을 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">채용 중인 포지션</h3>
                  <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-2" /> 포지션 추가
                  </Button>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>프론트엔드 개발자</CardTitle>
                        <CardDescription>신입/주니어 (1-3년)</CardDescription>
                      </div>
                      <Badge>활성화됨</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          필수 기술
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">JavaScript</Badge>
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">HTML/CSS</Badge>
                          <Badge variant="secondary">TypeScript</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          우대 기술
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Next.js</Badge>
                          <Badge variant="outline">Redux</Badge>
                          <Badge variant="outline">Tailwind CSS</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          평가 기준
                        </h4>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>컴포넌트 설계 능력</li>
                          <li>상태 관리 이해도</li>
                          <li>UI/UX 구현 능력</li>
                          <li>비동기 처리 능력</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                    <Button variant="destructive" size="sm">
                      비활성화
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>백엔드 개발자</CardTitle>
                        <CardDescription>신입/주니어 (1-3년)</CardDescription>
                      </div>
                      <Badge>활성화됨</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          필수 기술
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Java</Badge>
                          <Badge variant="secondary">Spring Boot</Badge>
                          <Badge variant="secondary">JPA</Badge>
                          <Badge variant="secondary">MySQL</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          우대 기술
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Kafka</Badge>
                          <Badge variant="outline">Redis</Badge>
                          <Badge variant="outline">AWS</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          평가 기준
                        </h4>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          <li>API 설계 능력</li>
                          <li>데이터베이스 모델링</li>
                          <li>성능 최적화 능력</li>
                          <li>보안 이해도</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                    <Button variant="destructive" size="sm">
                      비활성화
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-dashed border-2 border-muted">
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <Server className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">
                      DevOps 엔지니어
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      이 포지션은 현재 비활성화되어 있습니다.
                    </p>
                    <Button variant="outline">
                      <Plus size={16} className="mr-2" /> 활성화
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleTabChange("integrations")}
              >
                이전 단계
              </Button>
              <Button>
                <Save size={16} className="mr-2" /> 저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
