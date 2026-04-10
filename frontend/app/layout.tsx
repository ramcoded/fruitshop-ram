import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FruitShop Admin",
  description: "Admin panel for managing the fruit shop inventory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
