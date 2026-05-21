"use client";
import { LeadershipTeam } from "@/components/LeadershipTeam";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <LeadershipTeam onNavigate={navigate} />;
}
