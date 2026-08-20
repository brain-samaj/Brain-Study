import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Brain Study",
  description: "Smart learning platform for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
