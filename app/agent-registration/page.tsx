"use client";
import { AgentRegistration } from "@/components/AgentRegistration";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <AgentRegistration state="default" onNavigate={navigate} />;
}
