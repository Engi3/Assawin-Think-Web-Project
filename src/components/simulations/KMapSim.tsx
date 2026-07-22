"use client";
import { useState } from "react";
import { Grid2X2 } from "lucide-react";

export default function KMapSim({ locale }: { locale: string }) {
  const [cells, setCells] = useState([0,0,0,0]); // 00, 01, 10, 11 (A'B', A'B, AB', AB)

  const toggleCell = (idx: number) => {
    const newCells = [...cells];
    newCells[idx] = newCells[idx] ? 0 : 1;
    setCells(newCells);
  };

  const state = (cells[0]?1:0) | (cells[1]?2:0) | (cells[2]?4:0) | (cells[3]?8:0);
  const expressions = [
    "0", "A'B'", "A'B", "A'",
    "AB'", "B'", "A'B + AB'", "A' + B'",
    "AB", "A'B' + AB", "B", "A' + B",
    "A", "A + B'", "A + B", "1"
  ];
  const result = expressions[state];

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl">
       <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
         <Grid2X2 className="text-primary h-5 w-5" /> {locale === 'en' ? '2-Variable Karnaugh Map (K-Map)' : 'แผนผังคาร์โนห์ 2 ตัวแปร'}
       </h4>
       <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
         
         {/* K-Map Grid */}
         <div className="relative border-4 border-border bg-background p-6 rounded-2xl shadow-inner mt-6 ml-6">
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-secondary text-lg">B</div>
           <div className="absolute top-1/2 -left-8 -translate-y-1/2 font-bold text-secondary text-lg">A</div>
           
           {/* Column headers */}
           <div className="absolute -top-6 left-6 font-mono text-sm text-secondary">0</div>
           <div className="absolute -top-6 right-8 font-mono text-sm text-primary">1</div>
           
           {/* Row headers */}
           <div className="absolute top-8 -left-6 font-mono text-sm text-secondary">0</div>
           <div className="absolute bottom-8 -left-6 font-mono text-sm text-primary">1</div>

           <div className="grid grid-cols-2 gap-3">
             <button onClick={() => toggleCell(0)} className={`w-20 h-20 text-3xl font-black rounded-xl transition-all shadow-md ${cells[0] ? 'bg-primary text-on-primary scale-105' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}>{cells[0]}</button>
             <button onClick={() => toggleCell(1)} className={`w-20 h-20 text-3xl font-black rounded-xl transition-all shadow-md ${cells[1] ? 'bg-primary text-on-primary scale-105' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}>{cells[1]}</button>
             <button onClick={() => toggleCell(2)} className={`w-20 h-20 text-3xl font-black rounded-xl transition-all shadow-md ${cells[2] ? 'bg-primary text-on-primary scale-105' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}>{cells[2]}</button>
             <button onClick={() => toggleCell(3)} className={`w-20 h-20 text-3xl font-black rounded-xl transition-all shadow-md ${cells[3] ? 'bg-primary text-on-primary scale-105' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}>{cells[3]}</button>
           </div>
         </div>
         
         {/* Result */}
         <div className="bg-background rounded-2xl border border-border p-10 text-center min-w-[250px] shadow-sm">
           <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">
             {locale === 'en' ? 'Simplified Expression' : 'สมการที่ลดรูปแล้ว'}
           </p>
           <p className="text-5xl font-black text-primary tracking-tight">Y = {result}</p>
         </div>
       </div>
       
       <p className="text-center text-sm text-secondary mt-10 font-medium italic">
         {locale === 'en' ? '* Click the cells in the grid to toggle the output states (0 or 1)' : '* คลิกที่ช่องตารางเพื่อเปลี่ยนสถานะเอาต์พุต (0 หรือ 1)'}
       </p>
    </div>
  );
}
