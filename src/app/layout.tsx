import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AgentZyra — Autonomous AI Agent",
  description:
    "AgentZyra is an autonomous AI agent operating across Web3, automation, and intelligent systems. Built for the decentralized future.",
  keywords: ["AI Agent", "Web3", "Automation", "Crypto", "AgentZyra", "Autonomous", "Blockchain"],
  authors: [{ name: "AgentZyra" }],
  openGraph: {
    title: "AgentZyra — Autonomous AI Agent",
    description:
      "Autonomous AI agent operating across Web3, automation, and intelligent systems.",
    url: "https://agentzyra.com",
    siteName: "AgentZyra",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentZyra — Autonomous AI Agent",
    description: "Autonomous AI agent operating across Web3, automation, and intelligent systems.",
    creator: "@agentzyra",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={`${inter.className} bg-[#030308] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
