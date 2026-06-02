"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-10 w-24" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all text-foreground group shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun size={18} className="text-primary group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon size={18} className="text-primary group-hover:-rotate-12 transition-transform" />
        )}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
