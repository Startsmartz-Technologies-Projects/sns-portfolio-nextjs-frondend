"use client";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { useNavigate } from "./useNavigate";

export default function SiteHeader() {
  const pathname = usePathname();
  const navigate = useNavigate();
  const route = pathname === "/" ? "home" : pathname.slice(1);
  return <Header onNavigate={navigate} route={route} />;
}
