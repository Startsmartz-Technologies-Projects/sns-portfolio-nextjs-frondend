"use client";
import { WorkerCategories } from "@/components/WorkerCategories";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <WorkerCategories onNavigate={navigate} />;
}
