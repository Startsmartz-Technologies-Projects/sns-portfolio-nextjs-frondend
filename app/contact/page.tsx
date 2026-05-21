"use client";
import { Contact } from "@/components/Contact";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <Contact state="default" onNavigate={navigate} />;
}
