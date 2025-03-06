import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/index.css'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Real Estate App",
  description: "The Simplest Way to Find Property",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-full bg-white font-[300]`}>
        {children}
      </body>
    </html>
  );
}

