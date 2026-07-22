"use client";

import { useState } from "react";
import { Cpu, Search, Activity } from "lucide-react";

const IC_DATABASE = [
  { id: "7408", name: "74LS08", type: "Quad 2-Input AND Gate", pins: 14, vcc: 14, gnd: 7, desc_en: "Contains four independent 2-input AND gates.", desc_th: "ประกอบด้วย AND gate แบบ 2 อินพุต จำนวน 4 ตัวแยกอิสระ" },
  { id: "7432", name: "74LS32", type: "Quad 2-Input OR Gate", pins: 14, vcc: 14, gnd: 7, desc_en: "Contains four independent 2-input OR gates.", desc_th: "ประกอบด้วย OR gate แบบ 2 อินพุต จำนวน 4 ตัวแยกอิสระ" },
  { id: "7404", name: "74LS04", type: "Hex Inverter (NOT Gate)", pins: 14, vcc: 14, gnd: 7, desc_en: "Contains six independent inverters.", desc_th: "ประกอบด้วย Inverter (NOT gate) จำนวน 6 ตัวแยกอิสระ" },
];

export default function VirtualBreadboard({ locale }: { locale: string }) {
  const [selectedIC, setSelectedIC] = useState(IC_DATABASE[0]);
  
  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Breadboard Visual */}
        <div className="flex-grow bg-background rounded-2xl border border-border p-10 flex items-center justify-center relative shadow-inner overflow-hidden">
           {/* Breadboard grid dots */}
           <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
           
           <div className="relative z-10 w-64 h-32 bg-[#2d3748] rounded shadow-2xl border border-gray-700 flex flex-col justify-between p-2">
             {/* IC Top notch */}
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-background rounded-r-full border-y border-r border-gray-700"></div>
             
             {/* Pin Labels (Top) */}
             <div className="flex justify-between px-4">
                {[...Array(7)].map((_, i) => (
                  <div key={`t-${i}`} className={`text-[10px] font-mono font-bold ${14 - i === selectedIC.vcc ? 'text-red-500' : 'text-gray-400'}`}>
                    {14 - i}
                  </div>
                ))}
             </div>

             <div className="text-center font-mono font-bold text-gray-400 opacity-50 tracking-widest mt-2">
               {selectedIC.name}
             </div>

             {/* Pin Labels (Bottom) */}
             <div className="flex justify-between px-4">
                {[...Array(7)].map((_, i) => (
                  <div key={`b-${i}`} className={`text-[10px] font-mono font-bold ${i + 1 === selectedIC.gnd ? 'text-blue-500' : 'text-gray-400'}`}>
                    {i + 1}
                  </div>
                ))}
             </div>

             {/* Physical Pins */}
             <div className="absolute -top-3 left-0 w-full flex justify-between px-4">
                {[...Array(7)].map((_, i) => <div key={`pt-${i}`} className="w-2 h-3 bg-gray-400 rounded-t-sm"></div>)}
             </div>
             <div className="absolute -bottom-3 left-0 w-full flex justify-between px-4">
                {[...Array(7)].map((_, i) => <div key={`pb-${i}`} className="w-2 h-3 bg-gray-400 rounded-b-sm"></div>)}
             </div>
           </div>
        </div>

        {/* Info Panel */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-background rounded-2xl border border-border p-2">
            {IC_DATABASE.map(ic => (
              <button 
                key={ic.id}
                onClick={() => setSelectedIC(ic)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm flex items-center gap-3 ${selectedIC.id === ic.id ? 'bg-primary text-on-primary shadow-md' : 'text-secondary hover:bg-secondary/10'}`}
              >
                <Cpu size={16} /> {ic.name}
              </button>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
              <Search size={14} /> Datasheet Info
            </h4>
            <h3 className="text-xl font-bold text-foreground mb-4">{selectedIC.type}</h3>
            <p className="text-secondary text-sm leading-relaxed mb-6 font-medium">
              {locale === 'en' ? selectedIC.desc_en : selectedIC.desc_th}
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-background px-4 py-2 rounded-xl border border-border">
                <span className="text-xs font-bold text-secondary uppercase">Pins</span>
                <span className="font-mono font-bold text-foreground">{selectedIC.pins}</span>
              </div>
              <div className="flex justify-between items-center bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20">
                <span className="text-xs font-bold text-red-500 uppercase">VCC (Power)</span>
                <span className="font-mono font-bold text-red-600">Pin {selectedIC.vcc}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                <span className="text-xs font-bold text-blue-500 uppercase">GND (Ground)</span>
                <span className="font-mono font-bold text-blue-600">Pin {selectedIC.gnd}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
