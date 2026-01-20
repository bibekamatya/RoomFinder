import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import PWAInstaller from "@/components/PWAInstaller";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RoomFinder - Find Your Perfect Room in Nepal",
  description:
    "Discover comfortable, affordable rooms across Nepal. Connect with verified owners instantly.",
  keywords: [
    "room finder",
    "room rental",
    "Nepal",
    "accommodation",
    "rent room",
    "property rental",
  ],
  authors: [{ name: "RoomFinder" }],
  creator: "RoomFinder",
  publisher: "RoomFinder",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RoomFinder",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roomfinder.vercel.app",
    title: "RoomFinder - Find Your Perfect Room in Nepal",
    description:
      "Discover comfortable, affordable rooms across Nepal. Connect with verified owners instantly.",
    siteName: "RoomFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoomFinder - Find Your Perfect Room in Nepal",
    description:
      "Discover comfortable, affordable rooms across Nepal. Connect with verified owners instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RoomFinder" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <AuthProvider session={session}>
          <Toaster position="bottom-right" />
          {children}
          <PWAInstaller />
        </AuthProvider>
      </body>
    </html>
  );
}
