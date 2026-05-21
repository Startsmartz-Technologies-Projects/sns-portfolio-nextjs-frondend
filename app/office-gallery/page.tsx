"use client";
import { OfficeGallery } from "@/components/OfficeGallery";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <OfficeGallery state="default" onNavigate={navigate} />;
}
