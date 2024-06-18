import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toolbar from "@/components/Toolbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenses Manager",
  description: "Manage your expenses easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toolbar />

        <div style={{ }}>{children}</div>
      </body>
    </html>
  );
}
