import { getProfile, getPortfolio } from "@/lib/content-api";
import { Mail, Cpu, Globe, GraduationCap, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import HomeHero from "@/components/HomeHero";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const profile = await getProfile();
  const portfolio = await getPortfolio();
  const dict = await getDictionary(locale as "en" | "th");

  const bio = locale === 'en' ? profile.bio_en : profile.bio_th;
  const philosophy = locale === 'en' ? profile.philosophy_en : profile.philosophy_th;

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <HomeHero locale={locale} profile={profile} dict={dict} />

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
                {/* Education Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground font-bold">
                    <GraduationCap className="h-5 w-5 text-primary" /> {dict.home.education_title}
                  </div>
                  
                  <div className="space-y-3">
                    {/* Master's Degree */}
                    <div>
                      <p className="font-semibold text-foreground">
                        {locale === 'en' ? "Khon Kaen University" : "มหาวิทยาลัยขอนแก่น"}
                      </p>
                      <p className="text-secondary text-sm">
                        {locale === 'en' 
                          ? "M.Eng. in Mechanical Engineering (Master's)" 
                          : "ป.โท วศ.ม. วิศวกรรมเครื่องกล"}
                      </p>
                    </div>

                    {/* Bachelor's Degree */}
                    <div>
                      <p className="font-semibold text-foreground">
                        {locale === 'en' ? "Mahasarakham University" : "มหาวิทยาลัยมหาสารคาม"}
                      </p>
                      <p className="text-secondary text-sm">
                        {locale === 'en' 
                          ? "B.Eng. in Mechatronics Engineering (Bachelor's)" 
                          : "ป.ตรี วศ.บ. เมคคาทรอนิกส์"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expertise Section */}
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
