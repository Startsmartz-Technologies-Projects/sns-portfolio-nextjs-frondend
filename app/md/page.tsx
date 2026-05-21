"use client";
import { MdMessage } from "@/components/MdMessage";
import { useNavigate } from "@/components/useNavigate";

export default function Page() {
  const navigate = useNavigate();
  return <MdMessage onNavigate={navigate} />;
}
