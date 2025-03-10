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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserType = "company" | "candidate";
type AuthMode = "login" | "register";

export function LoginForm() {
  const [userType, setUserType] = useState<UserType>("candidate");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    github: boolean;
    email: boolean;
  }>({
    google: false,
    github: false,
    email: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsLoading({ ...isLoading, [provider]: true });

    // Simulate OAuth login - would be replaced with actual OAuth implementation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Logging in with ${provider} as ${userType}`);
      // Redirect based on user type
      if (userType === "company") {
        window.location.href = "/company/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, email: true });

    // Validate form
    if (authMode === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        setIsLoading({ ...isLoading, email: false });
        return;
      }
    }

    // Simulate email auth - would be replaced with actual implementation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(
        `${authMode === "login" ? "Logging in" : "Registering"} with email as ${userType}`,
      );
      // Redirect based on user type
      if (userType === "company") {
        window.location.href = "/company/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(`Error with email auth:`, error);
    } finally {
      setIsLoading({ ...isLoading, email: false });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">CODEX</CardTitle>
        <CardDescription>
          {userType === "company"
            ? "AI 기반 개발자 역량 평가 시스템"
            : "AI 피드백으로 개발 역량을 향상시키세요"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={userType}
            onValueChange={(value) => value && setUserType(value as UserType)}
            className="border rounded-full p-1 w-full max-w-xs"
          >
            <ToggleGroupItem
              value="candidate"
              className="flex-1 rounded-full data-[state=on]:bg-[#0066FF] data-[state=on]:text-white transition-all duration-200"
            >
              신입 개발자
            </ToggleGroupItem>
            <ToggleGroupItem
              value="company"
              className="flex-1 rounded-full data-[state=on]:bg-[#0066FF] data-[state=on]:text-white transition-all duration-200"
            >
              기업 관리자
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Tabs
          value={authMode}
          onValueChange={(v) => setAuthMode(v as AuthMode)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="register">회원가입</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">비밀번호</Label>
                  <Link
                    href="#"
                    className="text-xs text-[#0066FF] hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10"
                disabled={isLoading.email}
              >
                {isLoading.email ? (
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "로그인"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  또는 소셜 계정으로 로그인
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="홍길동"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">이메일</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">비밀번호</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">비밀번호 확인</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10"
                disabled={isLoading.email}
              >
                {isLoading.email ? (
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "회원가입"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  또는 소셜 계정으로 회원가입
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 font-medium border-2 relative"
            onClick={() => handleOAuthLogin("google")}
            disabled={isLoading.google || isLoading.github || isLoading.email}
          >
            {isLoading.google ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              <>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
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
                    className="text-red-500"
                  >
                    <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8.5" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                Google로 계속하기
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 font-medium border-2 relative"
            onClick={() => handleOAuthLogin("github")}
            disabled={isLoading.google || isLoading.github || isLoading.email}
          >
            {isLoading.github ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              <>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Github size={20} />
                </div>
                GitHub로 계속하기
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        계속하면 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다
      </CardFooter>
    </Card>
  );
}
