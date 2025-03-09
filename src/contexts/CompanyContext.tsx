"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CompanyProfile {
  companyName: string;
  businessNumber: string;
  website: string;
  size: string;
  description: string;
  techStack?: string[];
  connectedServices?: {
    github: boolean;
    gitlab: boolean;
    jira: boolean;
    trello: boolean;
  };
}

interface CompanyContextType {
  companyProfile: CompanyProfile;
  updateCompanyProfile: (profile: CompanyProfile) => void;
}

const defaultProfile: CompanyProfile = {
  companyName: "테크스타트 주식회사",
  businessNumber: "123-45-67890",
  website: "https://techstart.co.kr",
  size: "10-50",
  description: "테크스타트는 혁신적인 기술 솔루션을 제공하는 IT 기업으로, 웹 및 모바일 애플리케이션 개발에 특화되어 있습니다."
};

const CompanyContext = createContext<CompanyContextType>({
  companyProfile: defaultProfile,
  updateCompanyProfile: () => {},
});

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(defaultProfile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("companyProfile");
    if (savedProfile) {
      setCompanyProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateCompanyProfile = (profile: CompanyProfile) => {
    setCompanyProfile(profile);
    localStorage.setItem("companyProfile", JSON.stringify(profile));
  };

  return (
    <CompanyContext.Provider value={{ companyProfile, updateCompanyProfile }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext); 