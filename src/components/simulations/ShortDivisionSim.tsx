"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw, ChevronRight } from "lucide-react";

export default function ShortDivisionSim({ locale }: { locale: string }) {
  const [number, setNumber] = useState<number>(25);
  const [base, setBase] = useState<number>(2);
  const [steps, setSteps] = useState<{ quotient: number; remainder: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const calculateSteps = () => {
    const newSteps = [];
    let temp = number;
    while (temp > 0) {
      const quotient = Math.floor(temp / base);
      let remainder = (temp % base).toString();
      if (base === 16) {
        remainder = (temp % base).toString(16).toUpperCase();
      }
      newSteps.push({ quotient, remainder });
      temp = quotient;
    }
    setSteps(newSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const reset = () => {
    setSteps([]);
    setCurrentStep(-1);
  };

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="flex-grow space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            {locale === 'en' ? 'Decimal Number' : 'ตัวเลขฐานสิบ'}
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
            className="w-full bg-background border border-border p-3 rounded-xl font-bold focus:border-primary outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            {locale === 'en' ? 'Target Base' : 'ฐานที่ต้องการ'}
          </label>
          <select
            value={base}
            onChange={(e) => setBase(parseInt(e.target.value))}
            className="w-full bg-background border border-border p-3 rounded-xl font-bold focus:border-primary outline-none transition-colors"
          >
            <option value={2}>Binary (2)</option>
            <option value={8}>Octal (8)</option>
            <option value={16}>Hexadecimal (16)</option>
          </select>
        </div>
        <div className="flex items-end pt-6">
          <button
            onClick={calculateSteps}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2"
          >
            {locale === 'en' ? 'Start' : 'เริ่มคำนวณ'}
          </button>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="text-primary h-4 w-4" /> {locale === 'en' ? 'Step-by-Step Division' : 'การหารสั้นทีละขั้นตอน'}
            </h4>
            <div className="font-mono text-xl space-y-2 bg-background p-6 rounded-2xl border border-border shadow-inner">
              {steps.slice(0, currentStep + 1).map((step, idx) => {
                const prevQuotient = idx === 0 ? number : steps[idx - 1].quotient;
                return (
                  <div key={idx} className="flex items-center gap-4 text-secondary">
                    <span className="text-primary font-bold w-6">{base}</span>
                    <span className="text-border">|</span>
                    <span className="w-12 text-right text-foreground">{prevQuotient}</span>
                    <span className="text-accent italic text-sm">
                      {locale === 'en' ? 'rem' : 'เศษ'} {step.remainder}
                    </span>
                    {idx === steps.length - 1 && (
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">MSB</span>
                    )}
                    {idx === 0 && (
                      <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded ml-2">LSB</span>
                    )}
                  </div>
                );
              })}
              {currentStep === steps.length - 1 && (
                <div className="flex items-center gap-4 text-secondary opacity-50">
                  <span className="w-6"></span>
                  <span className="text-border">|</span>
                  <span className="w-12 text-right">0</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex-grow bg-foreground text-background py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 transition-all"
              >
                {locale === 'en' ? 'Next Step' : 'ขั้นตอนถัดไป'} <ChevronRight size={18} />
              </button>
              <button
                onClick={reset}
                className="p-3 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-[0.2em]">
              {locale === 'en' ? 'Result' : 'ผลลัพธ์'}
            </h4>
            <div className="text-4xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-4 break-all">
              {steps.slice(0, currentStep + 1).reverse().map(s => s.remainder).join('') || '?'}
            </div>
            <p className="text-secondary font-bold text-sm">
              Base {base} {base === 2 ? '(Binary)' : base === 8 ? '(Octal)' : '(Hex)'}
            </p>
            {currentStep === steps.length - 1 && (
              <div className="mt-8 animate-bounce">
                <span className="bg-accent text-on-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Success!
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
