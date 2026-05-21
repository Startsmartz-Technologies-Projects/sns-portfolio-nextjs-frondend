"use client";
import { DemandSubmission } from "@/components/DemandSubmission";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <DemandSubmission state="default" onNavigate={navigate} />;
}
