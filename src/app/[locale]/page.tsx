import { getProfile, getPortfolio } from "@/lib/content-api";
import { Mail, Cpu, Globe, GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const profile = await getProfile();
  const portfolio = await getPortfolio();
  const dict = await getDictionary(locale as "en" | "th");

  const title = locale === 'en' ? profile.title_en : profile.title_th;
  const department = locale === 'en' ? profile.department_en : profile.department_th;
  const bio = locale === 'en' ? profile.bio_en : profile.bio_th;
  const philosophy = locale === 'en' ? profile.philosophy_en : profile.philosophy_th;

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for Collaboration
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
                {locale === 'en' ? profile.name : profile.name} 
              </h1>
              <p className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                {title}
              </p>
              <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {bio}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href={`/${locale}/courses`}
                  className="bg-foreground text-background px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <BookOpen className="h-5 w-5" /> {dict.home.cta_courses}
                </Link>
                <Link
                  href="#contact"
                  className="border border-border text-foreground px-8 py-3 rounded-full font-bold hover:bg-secondary/10 transition-all flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" /> {dict.home.cta_contact}
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="relative z-10 w-full h-full object-cover rounded-full border border-border shadow-2xl transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-y border-border bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-background p-10 rounded-3xl border border-border shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Cpu size={120} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">{dict.home.research_title}</h3>
                <div className="space-y-8">
                  {portfolio.map((item: any, index: number) => (
                    <div key={item.id} className="flex gap-4 relative">
                      <div className="text-primary font-mono font-bold text-sm pt-1">0{index + 1}</div>
                      <div>
                        <h4 className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer leading-snug">
                          {locale === 'en' ? item.title_en : item.title_th}
                        </h4>
                        <p className="text-secondary text-sm mt-2 font-medium">
                          {item.publication}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-10 text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  {dict.home.view_all} <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <span className="w-10 h-1 px-1 bg-primary rounded-full"></span> {dict.home.about_title}
              </h2>
              <p className="text-xl text-secondary mb-8 leading-relaxed">
                {bio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground font-bold">
                    <GraduationCap className="h-5 w-5 text-primary" /> {dict.home.education_title}
                  </div>
                  <p className="text-secondary">
                    {locale === 'en' ? "B.Eng. in Mechatronics Engineering" : "วศ.บ. เมคคาทรอนิกส์"}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground font-bold">
                    <Award className="h-5 w-5 text-primary" /> {dict.home.expertise_title}
                  </div>
                  <p className="text-secondary">Industrial Robotics, PLC, AI Control</p>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{dict.home.philosophy_title}</h4>
                <p className="text-lg italic text-foreground/80 font-medium">
                  "{philosophy}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 italic">{dict.navigation.contact}</h2>
          <p className="text-secondary mb-12 text-lg">
            {locale === 'en' 
              ? "Interested in robotics or research collaboration? Let's connect and build something innovative together."
              : "หากคุณมีความสนใจในด้านหุ่นยนต์ หรือต้องการปรึกษาเกี่ยวกับงานวิจัย สามารถติดต่อเพื่อสร้างสรรค์นวัตกรรมร่วมกัน"}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-foreground text-background font-bold hover:scale-105 transition-transform">
              <Mail className="h-5 w-5" /> Email
            </a>
            <a href={profile.github} target="_blank" className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border text-foreground font-bold hover:bg-secondary/10 transition-colors">
              <Cpu className="h-5 w-5" /> GitHub
            </a>
            <a href={profile.researchGate} target="_blank" className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-border text-foreground font-bold hover:bg-secondary/10 transition-colors">
              <Globe className="h-5 w-5" /> ResearchGate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
