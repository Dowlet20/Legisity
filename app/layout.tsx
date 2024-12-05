import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {ThemeProvider} from "@/components/theme-provider"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const merriweather = localFont({
  src: [
    {
      path: "../public/fonts/Barlow/Barlow-SemiBold.ttf",
      weight:"400",
    },
  ],
  variable: "--font-merriweather"
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Regular.ttf",
      weight:"400",
    },
  ],
  variable: "--font-roboto"
});

const roboto_medium = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Medium.ttf",
      weight:"400",
    },
  ],
  variable: "--font-roboto-medium"
});

export const metadata: Metadata = {
  title: "Kanunçylyk",
  description: "Kanunçylyk",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${roboto_medium.variable} ${geistSans.variable} ${geistMono.variable} font-roboto antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
            {children}
            </main>
          </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
