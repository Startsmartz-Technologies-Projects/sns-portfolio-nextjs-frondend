"use client";
import { CompanyOverview } from "@/components/CompanyOverview";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <CompanyOverview onNavigate={navigate} />;
}
