"use client";
import { MedicalReport } from "@/components/MedicalReport";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <MedicalReport onNavigate={navigate} />;
}
