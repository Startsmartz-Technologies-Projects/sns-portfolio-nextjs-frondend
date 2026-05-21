"use client";
import { Credentials } from "@/components/Credentials";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <Credentials onNavigate={navigate} />;
}
