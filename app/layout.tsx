import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import MouseMoveEffect from "@/components/ui/mouse-tracking";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <script src="https://www.google.com/recaptcha/api.js" async defer></script>
       <body className={`${inter.className} bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 h-full min-h-screen `}>
          <MouseMoveEffect />
        {children}
      </body>
    </html>
  );
}
