import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { MyProvider } from "@/context/mycontext";

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

const instruction = localFont({
  src: "./fonts/instruction/Instruction.otf",
  variable: "--font-instruction",
  weight: "100 900",
});

const mono_type = localFont({
  src: "./fonts/monospace_typewrite/MonospaceTypewriter.woff",
  variable: "--font-mono_type",
  weight: "100 900",
});

const everson_mono = localFont({
  src: "./fonts/everson_mono_latin/EMLATIN6.ttf",
  variable: "--font-everson_mono",
  weight: "100 900",
});

const built_titling = localFont({
  src: "./fonts/built_titling/built_titling_rg.otf",
  variable: "--font-built_titling",
  weight: "100 900",
});

const creato_display = localFont({
  src: "./fonts/creato_display/CreatoDisplay-Regular.otf",
  variable: "--font-creato_display",
  weight: "100 900",
});

const creato_display_italic = localFont({
  src: "./fonts/creato_display/CreatoDisplay-RegularItalic.otf",
  variable: "--font-creato_display_italic",
  weight: "100 900",
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-roboto"
});

const roboto_medium = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-Regular.ttf",
      weight: "400",
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
        className={`${roboto.variable} ${roboto_medium.variable} ${geistSans.variable} ${geistMono.variable} ${instruction.variable} ${mono_type.variable} ${everson_mono.variable} ${built_titling.variable} ${creato_display.variable} ${creato_display_italic.variable} font-creato_display antialiased scrollbar-hide`}
      >
        <MyProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
          </MyProvider>
      </body>
    </html>
  );
}