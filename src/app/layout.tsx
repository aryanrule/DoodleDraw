import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/_components/ThemeProvider";
import Script from 'next/script';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { doodle_draw } from "../../public";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doodle_Draw",
  description: "Design diagrams with ease using our Diagram Designer app.",
  icons: {
    icon: "/doodle_draw.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster/> 
          </ThemeProvider>

          <Script id="razorpay-checkout-js"  src="https://checkout.razorpay.com/v1/checkout.js"/>
        </body>
      </html>
  );
}
