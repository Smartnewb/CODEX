import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#0066FF] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CA</span>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-2">
          CODEX에 오신 것을 환영합니다
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          AI 기반 신입 개발자 평가 시스템
        </p>
      </div>

      <LoginForm />

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>도움이 필요하신가요? support@codeassess.ai로 문의하세요</p>
      </div>
    </div>
  );
}
