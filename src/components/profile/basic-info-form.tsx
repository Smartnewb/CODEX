"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

interface BasicInfoFormProps {
  onComplete: (data: BasicInfoData) => void;
}

interface BasicInfoData {
  name: string;
  email: string;
  phone: string;
  location: string;
  preferredLocations: string[];
  workTypes: string[];
}

const WORK_TYPES = [
  { id: "fulltime", label: "풀타임" },
  { id: "parttime", label: "파트타임" },
  { id: "freelance", label: "프리랜서" },
  { id: "intern", label: "인턴" },
];

const LOCATIONS = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "리모트",
];

export function BasicInfoForm({ onComplete }: BasicInfoFormProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredLocations: [],
    workTypes: [],
  });

  const [errors, setErrors] = useState<Partial<BasicInfoData>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/.test(phone);
  };

  const handleSubmit = () => {
    const newErrors: Partial<BasicInfoData> = {};

    if (!formData.name) newErrors.name = "이름을 입력해주세요";
    if (!formData.email) newErrors.email = "이메일을 입력해주세요";
    else if (!validateEmail(formData.email)) newErrors.email = "올바른 이메일 형식이 아닙니다";
    if (!formData.phone) newErrors.phone = "전화번호를 입력해주세요";
    else if (!validatePhone(formData.phone)) newErrors.phone = "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onComplete(formData);
    }
  };

  const handleWorkTypeChange = (checked: boolean, type: string) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        workTypes: [...prev.workTypes, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        workTypes: prev.workTypes.filter(t => t !== type)
      }));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              이메일 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              <InfoIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
            <p className="text-sm text-muted-foreground">
              이메일은 채용 연락용으로 사용됩니다
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              전화번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="010-1234-5678"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">거주지</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="거주지를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>희망 근무 형태</Label>
            <div className="grid grid-cols-2 gap-4">
              {WORK_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={formData.workTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleWorkTypeChange(checked as boolean, type.id)}
                  />
                  <Label htmlFor={type.id} className="text-sm font-normal">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

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