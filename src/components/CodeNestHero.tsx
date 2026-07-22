"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { ArrowRight, Menu, X } from "lucide-react";

const STREAM_URL =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

const NAV_LINKS = ["PROJECTS", "BLOG", "ABOUT", "RESUME"];

export default function CodeNestHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070b0a] text-white">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Overlays: left-to-right dark gradient + bottom-up gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b0a] via-transparent to-transparent" />

      {/* Grid system: 3 vertical hairlines at 25/50/75%, desktop only */}
      <div className="codenest-grid-lines" />

      {/* Central glow ellipse */}
      <div className="codenest-glow-ellipse absolute left-1/2 top-0 h-[420px] w-[900px] max-w-[140vw] -translate-x-1/2" />

      {/* Global Navigation */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <a href="#" className="font-[family-name:var(--font-inter)] text-xl font-bold tracking-tight text-white">
            CodeNest
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                className="font-[family-name:var(--font-inter)] text-base text-white transition-colors hover:text-[#5ed29c]"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="text-white md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu: full-screen dark overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#070b0a]">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 text-white"
          >
            <X className="h-7 w-7" />
          </button>
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="font-[family-name:var(--font-inter)] text-2xl font-bold text-white transition-colors hover:text-[#5ed29c]"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24 pt-40 text-center">
        {/* Liquid Glass card */}
        <div className="codenest-glass flex h-[200px] w-[200px] -translate-y-[50px] flex-col items-center justify-center gap-2 p-5">
          <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">
            [ 2025 ]
          </span>
          <p className="font-[family-name:var(--font-inter)] text-[18px] leading-snug text-white">
            Taught by{" "}
            <em className="font-[family-name:var(--font-instrument-serif)] italic">

              Industry
            </em>{" "}
            Professionals
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/60">
            Learn from engineers shipping production code daily.
          </p>
        </div>

        <span className="codenest-eyebrow font-[family-name:var(--font-plus-jakarta)] -mt-2 mb-4">
          Career-Ready Curriculum
        </span>

        <h1 className="max-w-4xl font-[family-name:var(--font-inter)] text-[40px] font-extrabold uppercase leading-[1.05] tracking-tight lg:text-[72px]">
          LAUNCH YOUR CODING CAREER<span className="text-[#5ed29c]">.</span>
        </h1>

        <p className="mt-6 max-w-[512px] font-[family-name:var(--font-inter)] text-[14px] text-white/70">
          Master in-demand coding skills through hands-on projects, live mentorship,
          and a curriculum built with hiring partners.
        </p>

        <button type="button" className="codenest-cta mt-10">
          Get Started <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
