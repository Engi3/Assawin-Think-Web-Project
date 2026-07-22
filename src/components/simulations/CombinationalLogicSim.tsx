"use client";
import { useState } from "react";
import { Settings2, Table } from "lucide-react";

export default function CombinationalLogicSim({ locale }: { locale: string }) {
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);
  
  const sum = inA ^ inB;
  const carry = inA & inB;

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
       <div className="flex flex-col lg:flex-row gap-12">
         {/* Circuit Mockup */}
         <div className="flex-grow">
           <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
             <Settings2 className="text-primary h-5 w-5" /> {locale === 'en' ? 'Half Adder Circuit' : 'วงจร Half Adder'}
           </h4>
           
           <div className="relative h-72 bg-background rounded-2xl border border-border flex items-center justify-center p-8 overflow-hidden shadow-inner">
             <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="flex items-center gap-12 relative z-10">
               {/* Inputs */}
               <div className="flex flex-col gap-12">
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-secondary">A</span>
                   <button onClick={() => setInA(inA ? 0 : 1)} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${inA ? 'bg-primary text-on-primary scale-110' : 'bg-secondary/20 text-secondary'}`}>{inA}</button>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-secondary">B</span>
                   <button onClick={() => setInB(inB ? 0 : 1)} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${inB ? 'bg-primary text-on-primary scale-110' : 'bg-secondary/20 text-secondary'}`}>{inB}</button>
                 </div>
               </div>

               {/* Logic Gates */}
               <div className="flex flex-col gap-6 relative">
                 {/* Wires */}
                 <svg className="absolute -left-12 top-0 w-12 h-full -z-10" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M 0,24 L 20,24 L 20,24 L 48,24" className="text-secondary/30" />
                    <path d="M 0,96 L 20,96 L 20,96 L 48,96" className="text-secondary/30" />
                    {/* Cross wires */}
                    <path d="M 10,24 L 10,80 L 48,80" className="text-secondary/30" />
                    <path d="M 20,96 L 20,40 L 48,40" className="text-secondary/30" />
                 </svg>

                 <div className="bg-foreground text-background px-6 py-4 rounded-2xl font-black text-lg shadow-xl border border-primary/20 flex items-center gap-2">
                   XOR <span className="text-xs font-normal opacity-50">→ Sum</span>
                 </div>
                 <div className="bg-foreground text-background px-6 py-4 rounded-2xl font-black text-lg shadow-xl border border-primary/20 flex items-center gap-2">
                   AND <span className="text-xs font-normal opacity-50">→ Carry</span>
                 </div>
               </div>

               {/* Outputs */}
               <div className="flex flex-col gap-10">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${sum ? 'bg-primary text-on-primary scale-110 shadow-[0_0_15px_rgba(94,210,156,0.5)]' : 'bg-secondary/10 text-secondary'}`}>{sum}</div>
                   <span className="font-bold text-foreground">Sum (S)</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${carry ? 'bg-primary text-on-primary scale-110 shadow-[0_0_15px_rgba(94,210,156,0.5)]' : 'bg-secondary/10 text-secondary'}`}>{carry}</div>
                   <span className="font-bold text-foreground">Carry (C)</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         {/* Truth Table */}
         <div className="lg:w-80 bg-background border border-border rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Table className="h-4 w-4 text-primary" /> {locale === 'en' ? 'Truth Table' : 'ตารางความจริง'}
            </h4>
            <table className="w-full text-center font-mono">
              <thead>
                <tr className="text-secondary text-xs border-b border-border">
                  <th className="pb-3 px-1">A</th>
                  <th className="pb-3 px-1 border-r border-border">B</th>
                  <th className="pb-3 px-1 text-primary">Sum</th>
                  <th className="pb-3 px-1 text-primary">Carry</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[[0,0], [0,1], [1,0], [1,1]].map((row, idx) => {
                  const rSum = row[0] ^ row[1];
                  const rCarry = row[0] & row[1];
                  const isActive = row[0] === inA && row[1] === inB;
                  return (
                    <tr key={idx} className={`transition-colors ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-secondary opacity-50'}`}>
                      <td className="py-4 px-1">{row[0]}</td>
                      <td className="py-4 px-1 border-r border-border">{row[1]}</td>
                      <td className="py-4 px-1">{rSum}</td>
                      <td className="py-4 px-1">{rCarry}</td>
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
