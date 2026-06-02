"use client";
import { useState } from "react";
import { Grid2X2, Info, CheckCircle2, HelpCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdvancedKMapSim({ locale }: { locale: string }) {
  const [variables, setVariables] = useState<2 | 3 | 4>(2);
  const [cells, setCells] = useState<number[]>(new Array(4).fill(0));
  const [practiceMode, setPracticeMode] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const updateVariables = (v: 2 | 3 | 4) => {
    setVariables(v);
    setCells(new Array(Math.pow(2, v)).fill(0));
    setIsCorrect(null);
    setUserInput("");
    setShowAnswer(false);
  };

  const toggleCell = (idx: number) => {
    const newCells = [...cells];
    newCells[idx] = newCells[idx] ? 0 : 1;
    setCells(newCells);
    setIsCorrect(null);
  };

  const getSimplifiedExpression = () => {
    const ones = cells.filter(c => c === 1).length;
    if (ones === 0) return "0";
    if (ones === cells.length) return "1";
    
    if (variables === 2) {
      const state = (cells[0]?1:0) | (cells[1]?2:0) | (cells[2]?4:0) | (cells[3]?8:0);
      const expressions = [
        "0", "A'B'", "A'B", "A'",
        "AB'", "B'", "A'B + AB'", "A' + B'",
        "AB", "A'B' + AB", "B", "A' + B",
        "A", "A + B'", "A + B", "1"
      ];
      return expressions[state];
    }
    
    return "SOP"; // Placeholder for higher variables
  };

  const checkAnswer = () => {
    const correct = getSimplifiedExpression().replace(/\s/g, '').toLowerCase();
    const user = userInput.replace(/\s/g, '').toLowerCase();
    setIsCorrect(correct === user);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="eng-card p-8 lg:p-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Grid2X2 className="text-primary w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-foreground tracking-tight">
              {locale === 'en' ? 'Variable K-Map Lab' : 'ห้องปฏิบัติการแผนผังคาร์โนห์'}
            </h4>
            <p className="text-secondary text-sm font-bold uppercase tracking-widest opacity-60">Logic minimization matrix</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPracticeMode(!practiceMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${practiceMode ? 'bg-accent text-white' : 'bg-secondary/10 text-secondary'}`}
          >
            {practiceMode ? <EyeOff size={16} /> : <Eye size={16} />}
            {practiceMode ? (locale === 'en' ? 'Practice Mode' : 'โหมดฝึกฝน') : (locale === 'en' ? 'Learning Mode' : 'โหมดเรียนรู้')}
          </button>
          <div className="flex bg-background/60 p-1.5 rounded-2xl border border-border shadow-inner backdrop-blur-md">
            {[2, 3, 4].map((v) => (
              <button
                key={v}
                onClick={() => updateVariables(v as 2|3|4)}
                className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-300 ${
                  variables === v 
                    ? 'bg-primary text-white shadow-lg scale-105 shadow-primary/20' 
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {v} VARS
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-16 items-center justify-center py-10 min-h-[500px]">
        {/* K-Map Grid */}
        <div className="relative p-12 bg-slate-950 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group">
           <div className="absolute inset-0 eng-grid-bg opacity-[0.1]"></div>
           
           <div className={`grid gap-4 relative z-10 ${variables === 2 ? 'grid-cols-2' : variables === 3 ? 'grid-cols-4' : 'grid-cols-4'}`}>
              <AnimatePresence mode="popLayout">
                {cells.map((val, idx) => (
                  <motion.button
                    key={`${variables}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => toggleCell(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 text-3xl font-black rounded-2xl transition-all duration-500 shadow-2xl relative group/cell ${
                      val 
                        ? 'bg-primary text-white scale-110 shadow-primary/30 ring-4 ring-primary/20' 
                        : 'bg-white/5 border border-white/10 text-white/20 hover:bg-white/10 hover:text-white/40'
                    }`}
                  >
                    {val}
                    <div className="absolute top-2 left-2 text-[8px] font-mono opacity-40 font-black">{idx}</div>
                  </motion.button>
                ))}
              </AnimatePresence>
           </div>
        </div>

        {/* Result & Explanation */}
        <div className="flex flex-col gap-8 xl:w-[450px]">
           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2.5rem] blur-xl"></div>
              <div className="bg-background/80 border border-border p-10 rounded-[2.5rem] text-center relative backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} className="text-primary" /> Simplified Output
                </p>
                
                {!practiceMode || showAnswer ? (
                  <div className="text-5xl font-black text-foreground tracking-tighter leading-tight italic">
                    Y = <span className="text-primary glow-text">{getSimplifiedExpression()}</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <span className="text-4xl font-black text-foreground">Y = </span>
                      <input 
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="e.g. A'B + AB'"
                        className="flex-grow bg-secondary/10 border-b-4 border-primary p-2 text-2xl font-black outline-none text-foreground placeholder:opacity-20"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={checkAnswer}
                        className="flex-grow bg-primary text-white py-3 rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                      >
                        {locale === 'en' ? 'Check Result' : 'ตรวจคำตอบ'}
                      </button>
                      <button 
                        onClick={() => setShowAnswer(true)}
                        className="bg-secondary/20 text-secondary p-3 rounded-xl hover:bg-secondary/30 transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                    
                    {isCorrect !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm font-black uppercase tracking-widest ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {isCorrect ? (locale === 'en' ? 'Correct!' : 'ถูกต้อง!') : (locale === 'en' ? 'Try again' : 'ยังไม่ถูก ลองใหม่อีกครั้ง')}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
           </div>

           <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                 <h5 className="text-xs font-black text-foreground uppercase tracking-widest">Lab Diagnostics</h5>
              </div>
              <p className="text-xs text-secondary leading-relaxed font-bold italic opacity-80">
                {practiceMode 
                  ? (locale === 'en' ? "Practice Mode: Group the 1s and write down the simplified expression. Use ' for NOT (e.g., A')." : "โหมดฝึกฝน: จัดกลุ่มเลข 1 และเขียนสมการที่ลดรูปแล้ว ใช้ ' สำหรับ NOT (เช่น A')")
                  : (locale === 'en' ? "Learning Mode: Watch how the expression changes as you toggle cells in the K-Map." : "โหมดเรียนรู้: สังเกตการเปลี่ยนแปลงของสมการเมื่อคุณเปิด/ปิดเซลล์ในแผนผังคาร์โนห์")}
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
