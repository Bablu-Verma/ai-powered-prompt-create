import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeAI - Landing Your Dream Job With AI Precision",
  description:
    "Upload your resume, paste a job description, and let ChatGPT generate cover letters, ATS analysis, interview prep, and more.",
  keywords: [
    "resume",
    "AI",
    "ChatGPT",
    "job application",
    "cover letter",
    "ATS",
    "career",
  ],
  openGraph: {
    title: "ResumeAI - AI-Powered Job Application Assistant",
    description:
      "Get perfectly crafted cover letters, ATS-optimized resumes, and interview prep with ChatGPT.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
