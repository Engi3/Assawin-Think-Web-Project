"use client";
import { useState } from "react";
import { Database, Binary, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MemoryVisualizer({ locale }: { locale: string }) {
  const [activeUnit, setActiveUnit] = useState<string>("Byte");

  const units = [
    { name: "Bit", size: 1, color: "bg-red-500", desc_en: "Smallest unit (0 or 1)", desc_th: "หน่วยเล็กที่สุด (0 หรือ 1)" },
    { name: "Nibble", size: 4, color: "bg-orange-500", desc_en: "Group of 4 bits", desc_th: "กลุ่มข้อมูล 4 บิต" },
    { name: "Byte", size: 8, color: "bg-primary", desc_en: "8 bits (1 Character)", desc_th: "8 บิต (ตัวอักษร 1 ตัว)" },
    { name: "Word", size: 16, color: "bg-emerald-500", desc_en: "16 bits (2 Bytes)", desc_th: "16 บิต (2 ไบต์)" },
    { name: "Doubleword", size: 32, color: "bg-purple-500", desc_en: "32 bits (4 Bytes)", desc_th: "32 บิต (4 ไบต์)" },
  ];

  const current = units.find(u => u.name === activeUnit) || units[2];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="eng-card p-8 lg:p-12"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Database className="text-primary w-6 h-6" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-foreground tracking-tight">
            {locale === 'en' ? 'Memory Allocation Lab' : 'ห้องปฏิบัติการจัดสรรหน่วยความจำ'}
          </h4>
          <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-60">Visualizing bit-level storage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Unit Selection */}
        <div className="lg:col-span-4 space-y-3">
          {units.map((unit) => (
            <button
              key={unit.name}
              onClick={() => setActiveUnit(unit.name)}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 font-black ${
                activeUnit === unit.name 
                  ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.05] z-10' 
                  : 'bg-background/40 border-border text-secondary hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${activeUnit === unit.name ? 'bg-white animate-pulse' : unit.color}`}></div>
                <span className="tracking-tight">{unit.name}</span>
              </div>
              <span className={`font-mono text-xs ${activeUnit === unit.name ? 'text-white/60' : 'opacity-40'}`}>{unit.size} bits</span>
            </button>
          ))}
        </div>

        {/* Space Visualization */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative min-h-[350px] bg-slate-950 rounded-[2.5rem] border border-white/5 p-12 overflow-hidden flex flex-col justify-center items-center shadow-2xl">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 eng-grid-bg"></div>
            
            <div className="absolute top-6 left-8 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              <Binary size={14} className="animate-pulse" /> {locale === 'en' ? 'Live Bitstream' : 'สถานะบิตเรียลไทม์'}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center relative z-10">
              <AnimatePresence mode="popLayout">
                {[...Array(current.size)].map((_, i) => (
                  <motion.div 
                    key={`${current.name}-${i}`}
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: i * 0.02 
                    }}
                    className={`w-10 h-14 md:w-12 md:h-16 rounded-xl border-2 border-white/10 shadow-2xl flex items-center justify-center font-mono font-black text-white text-2xl ${current.color} ring-4 ring-white/5`}
                  >
                    0
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div 
              key={current.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center relative z-10"
            >
               <p className="text-4xl font-black text-white tracking-tighter mb-3 glow-text">{current.name}</p>
               <p className="text-slate-400 font-bold max-w-md mx-auto leading-relaxed">
                 {locale === 'en' ? current.desc_en : current.desc_th}
               </p>
            </motion.div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex items-start gap-5 backdrop-blur-sm">
             <div className="p-2 bg-primary/20 rounded-lg">
                <Info className="text-primary w-5 h-5" />
             </div>
             <p className="text-sm text-secondary font-bold leading-relaxed italic opacity-80">
               {locale === 'en' 
                 ? `Architectural Note: A ${current.name} represents a fundamental block in the system's bus architecture. Every box above is a physical flip-flop in hardware.` 
                 : `หมายเหตุเชิงวิศวกรรม: ${current.name} คือบล็อกพื้นฐานในสถาปัตยกรรมระบบ บล็อกแต่ละอันที่เห็นคือวงจร Flip-flop จริงในทางฮาร์ดแวร์`}
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
