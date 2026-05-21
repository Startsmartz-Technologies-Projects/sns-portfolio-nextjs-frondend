"use client";
import { Clients } from "@/components/Clients";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <Clients onNavigate={navigate} />;
}
