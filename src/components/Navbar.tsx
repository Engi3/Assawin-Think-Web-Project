"use client";

import Link from "next/link";
import { Menu, X, Terminal, BookOpen, User, Home } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  locale: string;
  dict: any;
}

const Navbar = ({ locale, dict }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
                <Terminal className="h-6 w-6 text-on-primary" />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Assawin Namsert
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href={`/${locale}`} className="text-secondary hover:text-foreground font-medium flex items-center gap-2 transition-colors">
              {dict.home}
            </Link>
            <Link href={`/${locale}/courses`} className="text-secondary hover:text-foreground font-medium flex items-center gap-2 transition-colors">
              {dict.courses}
            </Link>
            <Link href={`/${locale}#about`} className="text-secondary hover:text-foreground font-medium flex items-center gap-2 transition-colors">
              {dict.about}
            </Link>
            
            <div className="h-6 w-[1px] bg-border mx-2"></div>
            
            <LanguageToggle currentLocale={locale} />
            <ThemeToggle />
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-secondary hover:text-foreground hover:bg-secondary/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-4 space-y-4">
          <Link
            href={`/${locale}`}
            className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {dict.home}
          </Link>
          <Link
            href={`/${locale}/courses`}
            className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {dict.courses}
          </Link>
          <Link
            href={`/${locale}#about`}
            className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {dict.about}
          </Link>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-secondary font-medium">Switch Language:</span>
            <LanguageToggle currentLocale={locale} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
