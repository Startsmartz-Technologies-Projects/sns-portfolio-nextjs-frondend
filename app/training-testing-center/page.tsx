"use client";
import { TrainingTestingCenter } from "@/components/TrainingTestingCenter";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <TrainingTestingCenter onNavigate={navigate} />;
}
