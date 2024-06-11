import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {/* we have access to convex & clerk throughout our app */}
       <Providers>
          {children}
       </Providers>
        </body>
    </html>
  );
}

