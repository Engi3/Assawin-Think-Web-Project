"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Link from "next/link";
import { ArrowRight, Mail, BookOpen } from "lucide-react";

const STREAM_URL =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

interface HomeHeroProps {
  locale: string;
  profile: any;
  dict: any;
}

export default function HomeHero({ locale, profile, dict }: HomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false });
      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = STREAM_URL;
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  const title = locale === "en" ? profile.title_en : profile.title_th;
  const bio = locale === "en" ? profile.bio_en : profile.bio_th;

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Full-bleed video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="codenest-grid-lines opacity-40" />
      <div className="codenest-glow-ellipse left-1/2 top-0 h-[420px] w-[900px] max-w-[140vw] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            {/* Liquid Glass card, floating above the headline */}
            <div className="codenest-glass hidden sm:flex h-[200px] w-[200px] -translate-y-[50px] flex-col items-center justify-center gap-2 p-5 mx-auto lg:mx-0 text-center">
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-foreground/70">
                [ 2025 ]
              </span>
              <p className="font-[family-name:var(--font-inter)] text-[18px] leading-snug text-foreground">
                Backed by <em className="italic">Industry</em> Experience
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[11px] text-foreground/60">
                {locale === "en" ? "10+ years teaching & building" : "สอนและลงมือสร้างมากว่า 10 ปี"}
              </p>
            </div>

            <span className="codenest-eyebrow block mb-4 -mt-2 sm:mt-0">
              {locale === "en" ? "Mechatronics & Robotics Educator" : "ผู้สอนด้านเมคคาทรอนิกส์และหุ่นยนต์"}
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold uppercase tracking-tight mb-6">
              {profile.name}
              <span className="text-primary">.</span>
            </h1>

            <p className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              {title}
            </p>
            <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {bio}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href={`/${locale}/courses`} className="codenest-cta">
                <BookOpen className="h-5 w-5" /> {dict.home.cta_courses}
                <ArrowRight className="h-4 w-4" />
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
    </section>
  );
}
