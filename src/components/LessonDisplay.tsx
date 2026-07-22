"use client";

import { useState } from "react";
import { Maximize, Minimize, Download, ExternalLink, Columns, PanelRight, X } from "lucide-react";
import SimulationManager from "@/components/simulations/SimulationManager";
import type { Lesson, Resource } from "@/lib/content-api";
import { AnimatePresence, motion } from "framer-motion";

interface LessonDisplayProps {
  lesson: Lesson;
  locale: string;
}

export default function LessonDisplay({ lesson, locale }: LessonDisplayProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const content = locale === 'en' ? lesson.content_en : lesson.content_th;
  const title = locale === 'en' ? lesson.title_en : lesson.title_th;
  const hasResources = lesson.resources.length > 0;
  const iframeSrc = lesson.iframeUrl
    ? `${lesson.iframeUrl}${lesson.iframeUrl.includes('?') ? '&' : '?'}lang=${locale}`
    : undefined;

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className={`transition-all duration-300 ${!hasResources || isSidebarCollapsed ? 'col-span-12' : 'col-span-12 xl:col-span-8'}`}>
            <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-black text-foreground mb-8 uppercase tracking-tight flex items-center justify-between">
                <span className="flex items-center gap-4">
                  <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                  {locale === 'en' ? "Theoretical Overview" : "รายละเอียดเชิงทฤษฎี"}
                </span>
                {hasResources && (
                  <button
                      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                      className="p-2 rounded-lg hover:bg-secondary/10 text-secondary hover:text-primary transition-colors xl:hidden"
                      title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
                  >
                      {isSidebarCollapsed ? <Columns size={20} /> : <PanelRight size={20} />}
                  </button>
                )}
              </h2>
              <p className="text-xl text-secondary leading-relaxed whitespace-pre-wrap font-medium font-sans opacity-90">
                {content}
              </p>
            </div>

            {/* Iframe Section */}
            {lesson.iframeUrl && (
              <div className="mt-12 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">
                        {locale === 'en' ? "Interactive HTML Lab" : "ห้องปฏิบัติการจำลอง (HTML)"}
                    </h3>
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary font-bold hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                    >
                      <Maximize size={16} />
                      {locale === 'en' ? 'Full Screen' : 'เต็มจอ'}
                    </button>
                </div>
                <div className="w-full h-[700px] bg-background rounded-lg shadow-md border border-gray-200 dark:border-white/10 overflow-hidden">
                    <iframe
                        src={iframeSrc}
                        className="w-full h-full"
                        frameBorder="0"
                        title={`${title} Interactive Simulation`}
                        allowFullScreen
                    ></iframe>
                </div>
              </div>
            )}
        </div>

        {/* Sidebar Column — only takes space when there's something to show */}
        {hasResources && (
          <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0 p-0 scale-95 hidden' : 'col-span-12 xl:col-span-4 w-full opacity-100 block'}`}>
              <div className="eng-card p-8 sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                          <Download size={14} className="text-primary" />
                          {locale === 'en' ? "Lesson Content" : "เนื้อหาบทเรียน"}
                      </h3>
                      <button
                          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                          className="p-2 rounded-lg hover:bg-secondary/10 text-secondary hover:text-primary transition-colors hidden xl:block"
                          title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
                      >
                          {isSidebarCollapsed ? <Columns size={20} /> : <PanelRight size={20} />}
                      </button>
                  </div>
                  <div className="space-y-3">
                  {lesson.resources.map((resource: Resource, idx: number) => (
                      <a key={idx} href={resource.url} className="flex items-center justify-between p-4 bg-background/60 border border-border rounded-xl hover:border-primary/50 hover:bg-background transition-all group/res">
                      <span className="text-sm font-black text-secondary group-hover/res:text-primary transition-colors">{locale === 'en' ? resource.name_en : resource.name_th}</span>
                      <ExternalLink size={14} className="text-border group-hover/res:text-primary" />
                      </a>
                  ))}
                  </div>
              </div>
          </div>
        )}
      </div>
      
      {/* Simulation Integration */}
      <div className="relative mt-24">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
           <SimulationManager simulationId={lesson.simulationId} locale={locale} />
      </div>

      {/* Fullscreen Iframe Modal */}
      <AnimatePresence>
        {isFullscreen && lesson.iframeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-border bg-background">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {title} - {locale === 'en' ? 'Interactive Lab' : 'ห้องปฏิบัติการ'}
              </h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors text-sm"
              >
                <Minimize size={16} />
                {locale === 'en' ? 'Exit Full Screen' : 'ออกจากการเต็มจอ'}
              </button>
            </div>
            <div className="flex-grow w-full">
              <iframe
                  src={iframeSrc}
                  className="w-full h-full"
                  frameBorder="0"
                  title={`${title} Interactive Simulation (Fullscreen)`}
                  allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
