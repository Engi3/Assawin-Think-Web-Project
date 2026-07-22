"use client";
import { useState } from "react";
import { Database, Binary } from "lucide-react";

export default function DataUnitsSim({ locale }: { locale: string }) {
  const [byte, setByte] = useState<number[]>([0,1,0,0,0,0,0,1]); // 'A' = 65
  
  const toggleBit = (idx: number) => {
    const newByte = [...byte];
    newByte[idx] = newByte[idx] ? 0 : 1;
    setByte(newByte);
  };

  const decimalValue = byte.reduce((acc, val, idx) => acc + val * Math.pow(2, 7 - idx), 0);
  const asciiChar = String.fromCharCode(decimalValue);

  const renderBlocks = (count: number, label: string) => (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{label}</p>
      <div className="flex flex-wrap gap-1">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 bg-primary/20 border border-primary/40 rounded-sm"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-secondary/5 border border-border rounded-3xl p-8 shadow-xl mb-12">
      <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
         <Database className="text-primary h-5 w-5" /> {locale === 'en' ? 'Data Units Size Comparison' : 'เปรียบเทียบขนาดหน่วยข้อมูล'}
      </h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {renderBlocks(1, locale === 'en' ? "1 Bit (Smallest Unit)" : "1 Bit (หน่วยที่เล็กที่สุด)")}
          {renderBlocks(4, locale === 'en' ? "1 Nibble (4 Bits)" : "1 Nibble (4 บิต)")}
          {renderBlocks(8, locale === 'en' ? "1 Byte (8 Bits = 1 Char)" : "1 Byte (8 บิต = ตัวอักษร 1 ตัว)")}
          {renderBlocks(16, locale === 'en' ? "1 Word (16 Bits = 2 Bytes)" : "1 Word (16 บิต = 2 ไบต์)")}
          {renderBlocks(32, locale === 'en' ? "1 Doubleword (32 Bits = 4 Bytes)" : "1 Doubleword (32 บิต = 4 ไบต์)")}
        </div>

        <div className="bg-background rounded-2xl border border-border p-8 shadow-inner flex flex-col justify-center">
          <h4 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Binary className="text-primary h-4 w-4" /> {locale === 'en' ? 'Interactive Byte (8 bits)' : 'ทดลองปรับค่า Byte (8 บิต)'}
          </h4>
          
          <div className="flex justify-center gap-2 mb-8">
            {byte.map((b, i) => (
              <button 
                key={i}
                onClick={() => toggleBit(i)}
                className={`w-10 h-12 rounded-lg font-mono font-bold text-xl transition-all shadow-md ${b ? 'bg-primary text-on-primary scale-110' : 'bg-secondary/20 text-secondary'}`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/5 p-4 rounded-xl border border-border text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Decimal</p>
              <p className="text-3xl font-black text-foreground">{decimalValue}</p>
            </div>
            <div className="bg-secondary/5 p-4 rounded-xl border border-border text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">ASCII Char</p>
              <p className="text-3xl font-black text-primary">{decimalValue >= 32 && decimalValue <= 126 ? asciiChar : '?'}</p>
            </div>
          </div>
          <p className="text-center text-xs text-secondary mt-4 font-medium italic">
            {locale === 'en' ? '* Click the bits above to change their value' : '* คลิกที่บิตด้านบนเพื่อเปลี่ยนค่า 0/1'}
          </p>
        </div>
      </div>
    </div>
  );
}
