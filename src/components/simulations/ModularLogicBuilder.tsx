"use client";
import { useState, useMemo } from "react";
import { Layers, PlusCircle, MinusCircle, Zap, Activity, Cpu, Table, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GateType = "AND" | "OR" | "XOR" | "NAND" | "NOR" | "NOT";

interface Gate {
  id: string;
  type: GateType;
}

const GateIcon = ({ type }: { type: GateType }) => {
  switch (type) {
    case "AND":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M10,5 L30,5 C45,5 45,35 30,35 L10,35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="10" r="2" fill="currentColor" />
          <circle cx="5" cy="30" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "OR":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M10,5 Q25,5 45,20 Q25,35 10,35 Q20,20 10,5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="10" r="2" fill="currentColor" />
          <circle cx="5" cy="30" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "NOT":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M15,5 L40,20 L15,35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="45" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="20" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "NAND":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M10,5 L30,5 C45,5 45,35 30,35 L10,35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="45" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="10" r="2" fill="currentColor" />
          <circle cx="5" cy="30" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "NOR":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M10,5 Q25,5 45,20 Q25,35 10,35 Q20,20 10,5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="45" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="10" r="2" fill="currentColor" />
          <circle cx="5" cy="30" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    case "XOR":
      return (
        <svg width="60" height="40" viewBox="0 0 60 40" className="fill-current">
          <path d="M5,5 Q15,20 5,35" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12,5 Q27,5 47,20 Q27,35 12,35 Q22,20 12,5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="2" cy="10" r="2" fill="currentColor" />
          <circle cx="2" cy="30" r="2" fill="currentColor" />
          <circle cx="55" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return <Cpu size={24} />;
  }
};

export default function ModularLogicBuilder({ locale }: { locale: string }) {
  const [gates, setGates] = useState<Gate[]>([
    { id: "1", type: "AND" },
    { id: "2", type: "OR" }
  ]);
  const [inA, setInA] = useState(0);
  const [inB, setInB] = useState(0);

  const addGate = () => {
    if (gates.length < 5) {
      setGates([...gates, { id: Math.random().toString(), type: "AND" }]);
    }
  };

  const removeGate = (id: string) => {
    if (gates.length > 1) {
      setGates(gates.filter(g => g.id !== id));
    }
  };

  const updateGateType = (id: string, type: GateType) => {
    setGates(gates.map(g => g.id === id ? { ...g, type } : g));
  };

  const processGate = (type: GateType, a: number, b: number) => {
    switch(type) {
      case "AND": return a && b ? 1 : 0;
      case "OR": return a || b ? 1 : 0;
      case "XOR": return a !== b ? 1 : 0;
      case "NAND": return !(a && b) ? 1 : 0;
      case "NOR": return !(a || b) ? 1 : 0;
      case "NOT": return !a ? 1 : 0;
      default: return 0;
    }
  };

  const calculateResult = (a: number, b: number, gateList: Gate[]) => {
    let current = a;
    gateList.forEach((g, idx) => {
      const nextInput = idx === 0 ? b : 1;
      current = processGate(g.type, current, nextInput);
    });
    return current;
  };

  const result = calculateResult(inA, inB, gates);

  const truthTable = useMemo(() => {
    const table = [];
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        table.push({ a, b, y: calculateResult(a, b, gates) });
      }
    }
    return table;
  }, [gates]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="eng-card p-8 lg:p-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Layers className="text-primary w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-foreground tracking-tight">
              {locale === 'en' ? 'Combinational Logic Lab' : 'ห้องปฏิบัติการวงจรลอจิกเชิงผสม'}
            </h4>
            <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-60">Modular gate cascading builder</p>
          </div>
        </div>
        <button 
          onClick={addGate} 
          disabled={gates.length >= 5}
          className="eng-button-primary flex items-center gap-3 py-3 px-6 text-sm disabled:opacity-30 disabled:scale-100 transition-all"
        >
          <PlusCircle size={20} /> {locale === 'en' ? 'Add Logic Gate' : 'เพิ่มเกตลอจิก'}
        </button>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-8 justify-center py-10 min-h-[500px]">
        {/* Input Registers */}
        <div className="flex flex-col gap-12">
          <div className="text-center group">
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">In A</span>
             <button 
                onClick={() => setInA(inA?0:1)} 
                className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-2xl relative ${inA ? 'bg-primary text-on-primary scale-110' : 'bg-background/80 border border-border text-secondary hover:border-primary/50'}`}
             >
                {inA}
                {inA === 1 && <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20"></span>}
             </button>
          </div>
          <div className="text-center group">
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">In B</span>
             <button 
                onClick={() => setInB(inB?0:1)} 
                className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-2xl relative ${inB ? 'bg-primary text-on-primary scale-110' : 'bg-background/80 border border-border text-secondary hover:border-primary/50'}`}
             >
                {inB}
                {inB === 1 && <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20"></span>}
             </button>
          </div>
        </div>

        {/* Modular Cascading Workspace */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-4 bg-slate-950/40 p-8 rounded-[2rem] border border-white/5 flex-grow relative overflow-hidden shadow-inner min-h-[300px]">
          <div className="absolute inset-0 eng-grid-bg opacity-[0.05]"></div>
          
          <AnimatePresence mode="popLayout">
            {gates.map((g, idx) => (
              <motion.div 
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.5, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 50 }}
                className="relative flex items-center gap-4 z-10"
              >
                 <div className="bg-background border-2 border-border p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 hover:border-primary/50 transition-colors group/gate">
                   <div className="text-primary opacity-80 group-hover/gate:opacity-100 transition-opacity">
                      <GateIcon type={g.type} />
                   </div>
                   <div className="relative">
                     <select 
                       value={g.type} 
                       onChange={(e) => updateGateType(g.id, e.target.value as GateType)}
                       className="bg-secondary/10 px-3 py-1 rounded-lg font-black text-xs outline-none cursor-pointer text-center appearance-none hover:bg-secondary/20 transition-colors"
                     >
                       {["AND", "OR", "XOR", "NAND", "NOR", "NOT"].map(t => <option key={t} value={t}>{t}</option>)}
                     </select>
                   </div>
                   <button 
                    onClick={() => removeGate(g.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/gate:opacity-100 transition-all hover:scale-110 shadow-lg"
                   >
                     <MinusCircle size={14} />
                   </button>

                   {/* Pins visualization */}
                   <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                      {g.type !== "NOT" && <div className="w-2 h-2 rounded-full bg-primary/40"></div>}
                   </div>
                   <div className="absolute -right-1 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                   </div>
                 </div>
                 
                 {idx < gates.length - 1 && (
                   <div className="hidden xl:flex items-center">
                      <motion.div 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Activity size={20} className="text-primary opacity-30" />
                      </motion.div>
                   </div>
                 )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Final Output Register */}
        <div className="flex flex-col items-center gap-4">
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Out Y</span>
           <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-2xl relative overflow-hidden ${result ? 'bg-primary text-on-primary scale-110 shadow-primary/40' : 'bg-background/80 border border-border text-secondary/30'}`}>
             <Zap fill={result ? "currentColor" : "none"} size={32} className="relative z-10" />
             {result === 1 && (
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-white blur-2xl"
               />
             )}
           </div>
           <span className="font-black text-2xl text-foreground">{result}</span>
        </div>
      </div>

      {/* Truth Table */}
      <div className="mt-12 bg-background border border-border rounded-[2rem] overflow-hidden">
        <div className="bg-secondary/5 px-8 py-4 border-b border-border flex items-center gap-3">
          <Table size={18} className="text-primary" />
          <h5 className="text-xs font-black uppercase tracking-widest text-foreground">Dynamic Truth Table</h5>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {truthTable.map((row, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                row.a === inA && row.b === inB 
                  ? 'bg-primary/10 border-primary shadow-lg scale-[1.02]' 
                  : 'bg-background border-border opacity-60'
              }`}
            >
              <div className="flex gap-3 font-mono text-sm">
                <span className={row.a ? 'text-primary font-bold' : 'text-secondary'}>{row.a}</span>
                <span className={row.b ? 'text-primary font-bold' : 'text-secondary'}>{row.b}</span>
              </div>
              <ArrowRight size={14} className="text-border" />
              <div className={`font-mono text-lg font-black ${row.y ? 'text-accent' : 'text-secondary/40'}`}>
                {row.y}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-primary/5 border border-primary/10 p-6 rounded-2xl flex items-center gap-4 justify-center">
         <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
         <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-relaxed">
            {locale === 'en' 
              ? 'Logic Path: Output propagates sequentially through the selected gate matrix' 
              : 'ลำดับการประมวลผล: เอาต์พุตจะถูกส่งต่อและประมวลผลผ่านเมทริกซ์เกตที่ถูกเลือกทีละขั้นตอน'}
         </p>
      </div>
    </motion.div>
  );
}
