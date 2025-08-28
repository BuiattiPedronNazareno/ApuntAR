import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/componentes/ThemeProvider";
import Navbar from "@/componentes/Navbar";
import ClientThemeProvider from "@/componentes/ClientThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApuntAR",
  description: "Sistema de gestión de notas para estudiantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      > 
        <ThemeProvider>
          <ClientThemeProvider>
            <Navbar />
            <main style={{ padding: '20px' }}>
              {children}
            </main>
          </ClientThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
