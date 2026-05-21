"use client";
import { AboutBangladesh } from "@/components/AboutBangladesh";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <AboutBangladesh onNavigate={navigate} />;
}
