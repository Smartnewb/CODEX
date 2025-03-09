"use client";

import { CompanyProfileForm } from "@/components/company/profile-form";
import { CompanyHeader } from "@/components/company/header";

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />
      <main className="container mx-auto py-8 px-4">
        <CompanyProfileForm />
      </main>
    </div>
  );
}
