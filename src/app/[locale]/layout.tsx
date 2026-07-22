import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "th");

  return (
    <>
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
