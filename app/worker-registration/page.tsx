"use client";
import { WorkerRegistration } from "@/components/WorkerRegistration";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <WorkerRegistration state="default" onNavigate={navigate} />;
}
