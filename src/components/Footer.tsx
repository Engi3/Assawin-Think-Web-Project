import { Mail, Cpu, Globe } from "lucide-react";

interface FooterProps {
  locale: string;
  dict: any;
}

const Footer = ({ locale, dict }: FooterProps) => {
  return (
    <footer className="relative bg-background border-t border-border pt-16 pb-12 transition-colors overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Assawin Namsert</h3>
            <p className="text-secondary leading-relaxed">
              {dict.description}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
              {dict.useful_links}
            </h3>
            <ul className="space-y-3">
              <li><a href={`/${locale}`} className="text-secondary hover:text-primary transition-colors font-medium">{locale === 'en' ? 'Home' : 'หน้าแรก'}</a></li>
              <li><a href={`/${locale}/courses`} className="text-secondary hover:text-primary transition-colors font-medium">{locale === 'en' ? 'Courses' : 'รายวิชา'}</a></li>
              <li><a href={`/${locale}#about`} className="text-secondary hover:text-primary transition-colors font-medium">{locale === 'en' ? 'About' : 'เกี่ยวกับฉัน'}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
              {dict.contact}
            </h3>
            <div className="space-y-4">
              <a href="mailto:n.assawin@but.ac.th" className="flex items-center gap-3 text-secondary hover:text-primary transition-colors font-medium">
                <Mail size={18} /> n.assawin@but.ac.th
              </a>
              <a href="#" target="_blank" className="flex items-center gap-3 text-secondary hover:text-primary transition-colors font-medium">
                <Cpu size={18} /> GitHub
              </a>
              <a href="#" target="_blank" className="flex items-center gap-3 text-secondary hover:text-primary transition-colors font-medium">
                <Globe size={18} /> ResearchGate
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-secondary text-sm font-medium">
          © {new Date().getFullYear()} Assawin Namsert. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
