import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assawin Namsert | Developer Portfolio & E-Learning",
  description: "Personal developer portfolio and E-learning website for Teacher Assawin Namsert",
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "th");

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar locale={locale} dict={dict.navigation} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer locale={locale} dict={dict.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
