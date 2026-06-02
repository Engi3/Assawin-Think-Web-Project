"use client";

import { useState, useEffect } from "react";
import { Zap, Power, Table } from "lucide-react";

type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

export default function LogicGateBuilder({ locale }: { locale: string }) {
  const [gate, setGate] = useState<GateType>("AND");
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    let result = 0;
    switch (gate) {
      case "AND": result = inA && inB; break;
      case "OR": result = inA || inB; break;
      case "NOT": result = inA ? 0 : 1; break;
      case "NAND": result = !(inA && inB) ? 1 : 0; break;
      case "NOR": result = !(inA || inB) ? 1 : 0; break;
      case "XOR": result = inA !== inB ? 1 : 0; break;
    }
    setOutput(result);
  }, [gate, inA, inB]);

  const truthTable = {
    AND: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]],
    OR: [[0,0,0], [0,1,1], [1,0,1], [1,1,1]],
    NOT: [[0,0,1], [1,0,0]],
    NAND: [[0,0,1], [0,1,1], [1,0,1], [1,1,0]],
    NOR: [[0,0,1], [0,1,0], [1,0,0], [1,1,0]],
    XOR: [[0,0,0], [0,1,1], [1,0,1], [1,1,0]],
  };

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Visual Builder */}
        <div className="flex-grow">
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 block">
              {locale === 'en' ? 'Select Logic Gate' : 'เลือกชนิดลอจิกเกต'}
            </label>
            <div className="flex flex-wrap gap-2">
              {(["AND", "OR", "NOT", "NAND", "NOR", "XOR"] as GateType[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGate(g)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    gate === g ? "bg-primary text-white" : "bg-background border border-border text-secondary hover:border-primary"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 bg-background rounded-2xl border border-border flex items-center justify-center p-8 overflow-hidden shadow-inner">
             {/* Circuit connections visual mockup */}
             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="flex items-center gap-12 relative z-10">
               <div className="flex flex-col gap-8">
                 <button 
                  onClick={() => setInA(inA ? 0 : 1)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${inA ? 'bg-primary text-white scale-110' : 'bg-secondary/20 text-secondary'}`}
                 >
                   {inA}
                 </button>
                 {gate !== "NOT" && (
                   <button 
                    onClick={() => setInB(inB ? 0 : 1)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${inB ? 'bg-primary text-white scale-110' : 'bg-secondary/20 text-secondary'}`}
                   >
                     {inB}
                   </button>
                 )}
               </div>

               <div className="bg-foreground text-background px-8 py-6 rounded-2xl font-black text-2xl shadow-2xl border-2 border-primary/20">
                 {gate}
               </div>

               <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${output ? 'bg-primary text-white scale-125 glow-primary' : 'bg-secondary/10 text-secondary/40'}`}>
                 <Zap fill={output ? "currentColor" : "none"} size={32} />
               </div>
             </div>
          </div>
          
          <p className="mt-4 text-center text-sm font-bold text-secondary flex items-center justify-center gap-2">
            <Power className="h-4 w-4" /> {locale === 'en' ? 'Toggle switches (0/1) to see the output' : 'คลิกที่สวิตช์ (0/1) เพื่อดูผลลัพธ์'}
          </p>
        </div>

        {/* Truth Table */}
        <div className="lg:w-72 bg-background border border-border rounded-2xl p-6 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Table className="h-4 w-4 text-primary" /> {locale === 'en' ? 'Truth Table' : 'ตารางความจริง'}
          </h4>
          <table className="w-full text-center font-mono">
            <thead>
              <tr className="text-secondary text-xs border-b border-border">
                <th className="pb-3 px-1">A</th>
                {gate !== "NOT" && <th className="pb-3 px-1">B</th>}
                <th className="pb-3 px-1 text-primary">Y</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {truthTable[gate].map((row, idx) => {
                const isActive = gate === "NOT" ? (row[0] === inA) : (row[0] === inA && row[1] === inB);
                return (
                  <tr key={idx} className={`transition-colors ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-secondary opacity-50'}`}>
                    <td className="py-3 px-1">{row[0]}</td>
                    {gate !== "NOT" && <td className="py-3 px-1">{row[1]}</td>}
                    <td className="py-3 px-1">{row[gate === "NOT" ? 2 : 2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
