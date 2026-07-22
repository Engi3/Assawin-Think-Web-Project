import { Inter, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import CodeNestHero from "@/components/CodeNestHero";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-plus-jakarta",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
});

export default function CodeNestPage() {
  return (
    <div className={`${inter.variable} ${plusJakartaSans.variable} ${instrumentSerif.variable}`}>
      <CodeNestHero />
    </div>
  );
}
