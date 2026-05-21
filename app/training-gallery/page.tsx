"use client";
import { TrainingGallery } from "@/components/TrainingGallery";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <TrainingGallery state="default" onNavigate={navigate} />;
}
