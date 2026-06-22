import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentZyra — Autonomous AI Agent",
  description:
    "AgentZyra is an autonomous AI agent operating across Web3, automation, and intelligent systems. Built for the decentralized future.",
  keywords: ["AI Agent", "Web3", "Automation", "Crypto", "AgentZyra"],
  openGraph: {
    title: "AgentZyra — Autonomous AI Agent",
    description:
      "Autonomous AI agent operating across Web3, automation, and intelligent systems.",
    url: "https://agentzyra.com",
    siteName: "AgentZyra",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
