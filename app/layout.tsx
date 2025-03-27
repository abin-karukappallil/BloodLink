import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MouseMoveEffect from "@/components/ui/mouse-tracking";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false
});
export const metadata: Metadata = {
  metadataBase: new URL('https://bloodlink-manage.vercel.app'), 
  title: {
    default: "BloodLink",
    template: "%s | BloodLink"
  },
  description: "Blood donation management platform",
  themeColor: "#00000",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "BloodLink",
    description: "Blood donation management platform",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`
          ${inter.className} 
          bg-gradient-to-br 
          from-gray-950 
          via-gray-900 
          to-red-950 
          h-full 
          min-h-screen
        `}
      >
        <MouseMoveEffect />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}