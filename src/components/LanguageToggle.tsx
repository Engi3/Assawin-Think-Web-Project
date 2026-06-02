"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";

export default function LanguageToggle({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "th" : "en";
    
    // Improved routing logic: Replace the locale segment at the start of the path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-all group shadow-sm"
      aria-label="Toggle language"
    >
      <Languages size={18} className="text-secondary group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold uppercase tracking-widest text-secondary">
        {currentLocale === "en" ? "Thai" : "English"}
      </span>
    </button>
  );
}
