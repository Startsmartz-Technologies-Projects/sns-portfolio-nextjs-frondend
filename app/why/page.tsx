"use client";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <WhyChooseUs onNavigate={navigate} />;
}
