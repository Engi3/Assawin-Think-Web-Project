"use client";
import { useState } from "react";
import { Plus, Minus, X, Divide, Info, Settings2, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Base = 2 | 8 | 10 | 16;

export default function MultiBaseArithmetic({ locale }: { locale: string }) {
  const [base, setBase] = useState<Base>(2);
  const [num1, setNum1] = useState("1010");
  const [num2, setNum2] = useState("101");
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");

  const convertToDec = (val: string, b: number) => parseInt(val, b);
  const convertFromDec = (val: number, b: number) => val.toString(b).toUpperCase();

  const n1Dec = convertToDec(num1, base);
  const n2Dec = convertToDec(num2, base);

  let resultDec = 0;
  if (!isNaN(n1Dec) && !isNaN(n2Dec)) {
    switch(op) {
      case "+": resultDec = n1Dec + n2Dec; break;
      case "-": resultDec = n1Dec - n2Dec; break;
      case "*": resultDec = n1Dec * n2Dec; break;
      case "/": resultDec = n2Dec !== 0 ? Math.floor(n1Dec / n2Dec) : 0; break;
    }
  }

  const result = convertFromDec(resultDec, base);

  const getPlaceholder = () => {
    if (base === 2) return "e.g. 1010";
    if (base === 8) return "e.g. 17";
    if (base === 16) return "e.g. 2A";
    return "e.g. 10";
  };

  const validate = (val: string) => {
    const regex = {
      2: /^[0-1]*$/,
      8: /^[0-7]*$/,
      10: /^[0-9]*$/,
      16: /^[0-9A-Fa-f]*$/
    };
    return regex[base].test(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="eng-card p-8 lg:p-12 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Calculator className="text-primary w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-foreground tracking-tight">
              {locale === 'en' ? 'Multi-Base Calculator Lab' : 'ห้องปฏิบัติการคำนวณหลายฐาน'}
            </h4>
            <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-60">Cross-base arithmetic processing</p>
          </div>
        </div>

        <div className="flex bg-background/60 p-1.5 rounded-2xl border border-border shadow-inner backdrop-blur-md">
          {[2, 8, 10, 16].map((b) => (
            <button
              key={b}
              onClick={() => { setBase(b as Base); setNum1(""); setNum2(""); }}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-300 ${
                base === b 
                  ? 'bg-primary text-on-primary shadow-lg scale-105 shadow-primary/20' 
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              BASE {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-12">
        <div className="flex-1 space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Register A</label>
          <input 
            type="text" 
            value={num1} 
            placeholder={getPlaceholder()}
            onChange={(e) => validate(e.target.value) && setNum1(e.target.value.toUpperCase())}
            className="eng-input w-full text-3xl h-24 text-right pr-8"
          />
        </div>

        <div className="flex lg:flex-col justify-center gap-2">
          {[
            { id: "+", icon: <Plus size={20} /> },
            { id: "-", icon: <Minus size={20} /> },
            { id: "*", icon: <X size={20} /> },
            { id: "/", icon: <Divide size={20} /> }
          ].map((operation) => (
            <button
              key={operation.id}
              onClick={() => setOp(operation.id as any)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                op === operation.id 
                  ? 'bg-foreground text-background scale-110 shadow-2xl' 
                  : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
              }`}
            >
              {operation.icon}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Register B</label>
          <input 
            type="text" 
            value={num2} 
            placeholder={getPlaceholder()}
            onChange={(e) => validate(e.target.value) && setNum2(e.target.value.toUpperCase())}
            className="eng-input w-full text-3xl h-24 text-right pr-8"
          />
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="bg-slate-950 rounded-[2.5rem] border border-white/5 p-12 text-center relative shadow-2xl overflow-hidden">
          <div className="absolute inset-0 eng-grid-bg"></div>
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-primary/60 uppercase tracking-[0.4em]">
            <Activity className="w-3 h-3 animate-pulse" /> ALU Output
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${result}-${base}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-6xl lg:text-8xl font-black text-white tracking-tighter glow-text break-all px-4"
            >
              {result || "0"}
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-8 flex justify-center gap-8">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Decimal Value</p>
                <p className="text-xl font-bold text-white/80">{resultDec}</p>
             </div>
             <div className="w-[1px] h-10 bg-white/10"></div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Base</p>
                <p className="text-xl font-bold text-primary">{base}</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
