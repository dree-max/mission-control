import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "MoonlightAI Mission Control Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto md:p-6 p-4 pt-16 md:pt-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
