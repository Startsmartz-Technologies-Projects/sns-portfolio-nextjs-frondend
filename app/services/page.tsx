"use client";
import { Services } from "@/components/Services";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <Services onNavigate={navigate} />;
}
