import type { Metadata } from "next";
import "./globals.css";
import './dashboard.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Shiva Technologies AI | AI Innovation Hub",
  description: "Web, mobile and AI engineering. Java, React, React Native, AWS and DevOps from idea to ongoing maintenance.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Header /><main id="main">{children}</main><Footer /></body>
    </html>
  );
}
