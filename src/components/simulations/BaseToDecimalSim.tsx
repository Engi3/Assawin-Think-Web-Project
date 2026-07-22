"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw, ChevronRight, Binary } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BaseToDecimalSim({ locale }: { locale: string }) {
  const [inputValue, setInputValue] = useState<string>("11001");
  const [base, setBase] = useState<number>(2);
  const [showResult, setShowResult] = useState(false);

  const calculateDecimal = () => {
    try {
      return parseInt(inputValue, base);
    } catch (e) {
      return NaN;
    }
  };

  const decimalResult = calculateDecimal();

  const getSteps = () => {
    const digits = inputValue.split("");
    const steps = digits.map((digit, index) => {
      const power = digits.length - 1 - index;
      const value = parseInt(digit, base);
      const result = value * Math.pow(base, power);
      return { digit, power, value, result };
    });
    return steps;
  };

  const steps = getSteps();

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="flex-grow space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            {locale === 'en' ? 'Input Number' : 'ตัวเลขนำเข้า'}
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.toUpperCase());
              setShowResult(false);
            }}
            className="w-full bg-background border border-border p-3 rounded-xl font-mono font-bold focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            {locale === 'en' ? 'Source Base' : 'เลขฐานต้นทาง'}
          </label>
          <select
            value={base}
            onChange={(e) => {
              setBase(parseInt(e.target.value));
              setShowResult(false);
            }}
            className="w-full bg-background border border-border p-3 rounded-xl font-bold focus:border-primary outline-none transition-colors"
          >
            <option value={2}>Binary (2)</option>
            <option value={8}>Octal (8)</option>
            <option value={16}>Hexadecimal (16)</option>
          </select>
        </div>
        <div className="flex items-end pt-6">
          <button
            onClick={() => setShowResult(true)}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2"
          >
            {locale === 'en' ? 'Convert' : 'แปลงเลขฐาน'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showResult && !isNaN(decimalResult) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-background border border-border p-6 rounded-2xl shadow-inner">
              <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
                <Binary className="text-primary h-4 w-4" /> {locale === 'en' ? 'Positional Notation' : 'หลักการค่าประจำหลัก'}
              </h4>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-foreground mb-2 border border-border">
                      {step.digit}
                    </div>
                    <div className="text-[10px] font-bold text-secondary uppercase mb-1">
                      {base}<sup>{step.power}</sup>
                    </div>
                    <div className="text-xs font-mono text-primary font-bold">
                      {Math.pow(base, step.power)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">
                  {locale === 'en' ? 'Calculation' : 'การคำนวณ'}
                </h4>
                <div className="font-mono text-sm space-y-2 bg-background p-6 rounded-2xl border border-border">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-secondary">({step.digit} × {base}<sup>{step.power}</sup>)</span>
                      {idx < steps.length - 1 && <span className="text-primary">+</span>}
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border mt-2 flex items-center gap-2 font-bold text-lg">
                    <ArrowRight size={18} className="text-primary" />
                    <span>{steps.map(s => s.result).join(' + ')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-on-primary rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-xl shadow-primary/20">
                <h4 className="text-sm font-bold mb-4 uppercase tracking-[0.2em] opacity-80">
                  {locale === 'en' ? 'Decimal Result' : 'ผลลัพธ์ฐานสิบ'}
                </h4>
                <div className="text-5xl lg:text-7xl font-black tracking-tighter mb-2">
                  {decimalResult}
                </div>
                <p className="text-on-primary/60 font-bold text-xs uppercase tracking-widest">
                  Base 10
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && isNaN(decimalResult) && (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-500 font-bold text-center">
          {locale === 'en' ? 'Invalid number for this base!' : 'ตัวเลขไม่ถูกต้องสำหรับฐานนี้!'}
        </div>
      )}
    </div>
  );
}
