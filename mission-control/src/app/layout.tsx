"use client";

import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">{children}</main>
      </body>
    </html>
  );
}
