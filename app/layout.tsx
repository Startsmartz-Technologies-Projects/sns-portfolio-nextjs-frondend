import type { Metadata } from "next";
import "./styles/colors_and_type.css";
import "./styles/kit.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  title: "SNS Overseas — Licensed Overseas Manpower Recruitment",
  description:
    "SNS Overseas is a BMET-licensed (RL-2567) recruiting agency in Dhaka — recruiting, training, testing and deploying Bangladeshi workers to the Gulf and Malaysia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </div>
      </body>
    </html>
  );
}
