import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Send, Mail } from "lucide-react";
import Image from "next/image";

interface LinkedInOfferCardProps {
  candidate: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    linkedin: string;
  };
  position: string;
  onSendOffer: (message: string) => void;
}

export function LinkedInOfferCard({
  candidate,
  position,
  onSendOffer,
}: LinkedInOfferCardProps) {
  // Default offer message template
  const defaultMessage = `안녕하세요 ${candidate.name}님,

테크스타트 주식회사의 ${position} 포지션에 지원해 주셔서 감사합니다. 귀하의 코딩 테스트 결과와 기술적 역량을 검토한 결과, 저희 팀에 적합한 인재라고 판단하여 채용 제안을 드리고자 합니다.

면접 일정 조율을 위해 편하신 시간을 알려주시면 감사하겠습니다.

감사합니다.
테크스타트 주식회사 채용팀 드림`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>채용 제안 발송</CardTitle>
        <CardDescription>
          LinkedIn을 통해 {candidate.name}님에게 채용 제안을 발송합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-3xl">
            {candidate.avatar}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} />
              <span>{candidate.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">제안 메시지</label>
          <Textarea
            className="min-h-[200px]"
            defaultValue={defaultMessage}
            placeholder="채용 제안 메시지를 작성하세요."
          />
          <p className="text-xs text-muted-foreground">
            메시지는 LinkedIn 메시지와 이메일({candidate.email})로 동시에
            발송됩니다.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button onClick={() => onSendOffer(defaultMessage)}>
          <Send size={16} className="mr-2" /> LinkedIn으로 제안 발송
        </Button>
      </CardFooter>
    </Card>
  );
}
