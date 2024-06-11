import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils"
import Header from '@/components/Header'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "CaptureBook",
  description: "Effortlessly store, organize, and search your notes and screenshots with advanced vector search capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        {/* we have access to convex & clerk throughout our app */}
       <Providers>
        <Header />
          {children}
       </Providers>
        </body>
    </html>
  );
}

