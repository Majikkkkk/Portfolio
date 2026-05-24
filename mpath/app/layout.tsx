import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MPath | Computer Science Career Aptitude Assessment",
  description: "Find Your Best-Fit Technology Career Path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
