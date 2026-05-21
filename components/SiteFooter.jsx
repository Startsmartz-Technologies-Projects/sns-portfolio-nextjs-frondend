"use client";
import { Footer } from "./Footer";
import { useNavigate } from "./useNavigate";

export default function SiteFooter() {
  const navigate = useNavigate();
  return <Footer onNavigate={navigate} />;
}
