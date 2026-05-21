"use client";
import { useRouter } from "next/navigation";

/* Maps the UI-kit route names (used throughout the converted components)
   to real Next.js paths, and performs a client-side navigation. */
export function useNavigate() {
  const router = useRouter();
  return (route) => {
    const path = !route || route === "home" ? "/" : "/" + route;
    router.push(path);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}
