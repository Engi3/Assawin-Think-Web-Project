"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Info } from "lucide-react";

export default function ArithmeticSandbox({ locale }: { locale: string }) {
  const [num1, setNum1] = useState("1010");
  const [num2, setNum2] = useState("0110");
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [result, setResult] = useState("");
  const [carry, setCarry] = useState<string[]>([]);

  useEffect(() => {
    const n1 = parseInt(num1, 2);
    const n2 = parseInt(num2, 2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error");
      return;
    }

    if (operation === "+") {
      const sum = n1 + n2;
      setResult(sum.toString(2));
      
      // Calculate carry bits for visualization
      const c = [];
      let bitCarry = 0;
      const s1 = num1.padStart(8, '0');
      const s2 = num2.padStart(8, '0');
      for (let i = 7; i >= 0; i--) {
        const b1 = parseInt(s1[i]);
        const b2 = parseInt(s2[i]);
        const bitSum = b1 + b2 + bitCarry;
        bitCarry = bitSum >= 2 ? 1 : 0;
        c.unshift(bitCarry.toString());
      }
      setCarry(c);
    } else {
      const diff = n1 - n2;
      setResult(diff >= 0 ? diff.toString(2) : "Negative");
      setCarry([]);
    }
  }, [num1, num2, operation]);

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
        <div className="space-y-2 flex-grow">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">Binary Number A</label>
          <input 
            type="text" 
            value={num1} 
            onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
            className="w-full bg-background border border-border p-4 rounded-2xl font-mono text-2xl focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
           <button onClick={() => setOperation("+")} className={`p-4 rounded-xl transition-all ${operation === '+' ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-background border border-border text-secondary'}`}><Plus /></button>
           <button onClick={() => setOperation("-")} className={`p-4 rounded-xl transition-all ${operation === '-' ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-background border border-border text-secondary'}`}><Minus /></button>
        </div>
        <div className="space-y-2 flex-grow">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">Binary Number B</label>
          <input 
            type="text" 
            value={num2} 
            onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
            className="w-full bg-background border border-border p-4 rounded-2xl font-mono text-2xl focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl p-10 font-mono text-3xl text-right relative overflow-hidden shadow-inner">
        <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
          <Info size={14} /> {locale === 'en' ? 'Calculation View' : 'มุมมองการคำนวณ'}
        </div>
        
        {operation === "+" && (
          <div className="text-sm text-primary mb-4 flex justify-end gap-4 opacity-70">
            {carry.map((c, i) => <span key={i} className="w-6">{c === '1' ? '1' : ''}</span>)}
            <span className="text-[10px] self-center">CARRY</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="tracking-[0.5em]">{num1.padStart(8, '0')}</div>
          <div className="tracking-[0.5em] flex justify-end items-center gap-4">
            <span className="text-primary text-xl font-bold">{operation}</span>
            {num2.padStart(8, '0')}
          </div>
          <div className="h-1 bg-border w-full"></div>
          <div className="tracking-[0.5em] font-black text-primary animate-in fade-in zoom-in-95 duration-300">
            {result.padStart(8, '0')}
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-center text-sm font-medium text-secondary italic">
        {locale === 'en' ? '* Supports up to 8-bit operations' : '* รองรับการคำนวณสูงสุด 8 บิต'}
      </p>
    </div>
  );
}
