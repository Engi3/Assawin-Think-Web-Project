"use client";
import React, { useState } from "react";
import { Cpu, Zap } from "lucide-react";

// A more component-based and theme-aligned version of the logic from the HTML file.

const C_OFF = '#475569'; // slate-600
const C_ON = 'hsl(var(--primary))';

const logic: { [key: string]: (a: boolean, b?: boolean) => boolean } = {
    AND: (a, b) => a && b!,
    OR: (a, b) => a || b!,
    NOT: (a) => !a,
    NAND: (a, b) => !(a && b!),
    NOR: (a, b) => !(a || b!),
    XOR: (a, b) => a !== b!,
    XNOR: (a, b) => a === b!
};

const Wire = ({ d, state }: { d: string, state: boolean }) => (
    <path 
        d={d} 
        stroke={state ? C_ON : C_OFF} 
        strokeWidth="2" 
        fill="none" 
        className="transition-all duration-300"
        style={{ filter: state ? `drop-shadow(0 0 4px ${C_ON})` : 'none' }}
    />
);

const GateSVG = ({ type, active }: { type: string, active: boolean }) => {
    const strokeColor = active ? C_ON : '#94a3b8';
    const props = {
        stroke: strokeColor,
        strokeWidth: "2",
        fill: "hsl(var(--secondary-foreground) / 0.1)",
        className: 'transition-all duration-300'
    };

    let paths: JSX.Element;
    switch(type) {
        case 'AND': paths = <path d="M5,5 h25 a25,25 0 0,1 0,50 h-25 Z" {...props} />; break;
        case 'OR': paths = <path d="M5,5 q25,0 50,25 q-25,25 -50,25 q15,-25 0,-50 Z" {...props} />; break;
        case 'XOR': paths = (<g><path d="M12,5 q25,0 48,25 q-23,25 -48,25 q15,-25 0,-50 Z" {...props} /><path d="M5,5 q15,25 0,50" stroke={strokeColor} strokeWidth="2" fill="none" /></g>); break;
        case 'NAND': paths = (<g><path d="M5,5 h20 a25,25 0 0,1 0,50 h-20 Z" {...props} /><circle cx="55" cy="30" r="4" {...props} /></g>); break;
        case 'NOR': paths = (<g><path d="M5,5 q20,0 42,25 q-22,25 -42,25 q15,-25 0,-50 Z" {...props} /><circle cx="51" cy="30" r="4" {...props} /></g>); break;
        case 'XNOR': paths = (<g><path d="M12,5 q20,0 40,25 q-20,25 -40,25 q15,-25 0,-50 Z" {...props} /><path d="M5,5 q15,25 0,50" stroke={strokeColor} strokeWidth="2" fill="none" /><circle cx="56" cy="30" r="4" {...props} /></g>); break;
        case 'NOT': paths = (<g><path d="M10,10 l30,20 l-30,20 Z" {...props} /><circle cx="45" cy="30" r="4" {...props} /></g>); break;
        default: paths = <rect x="5" y="5" width="50" height="50" {...props} />;
    }

    return (
        <g transform="translate(170, 70) scale(1.2)">
            {paths}
            <text x="30" y="34" fill={strokeColor} fontSize="10" textAnchor="middle" fontWeight="bold" className="pointer-events-none select-none">{type}</text>
        </g>
    );
};

const Switch = ({ label, value, onChange }: { label: string, value: boolean, onChange: (v: boolean) => void }) => (
    <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">{label}</span>
        <button 
            onClick={() => onChange(!value)}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                value 
                ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]' 
                : 'border-border bg-background text-secondary hover:border-border/70'
            }`}
        >
            {value ? '1' : '0'}
        </button>
    </div>
);

const Bulb = ({ label, value }: { label: string, value: boolean }) => (
    <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">{label}</span>
        <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
            value 
            ? 'border-accent bg-accent/20 text-accent shadow-[0_0_15px_hsl(var(--accent)/0.5)]' 
            : 'border-border bg-background text-secondary'
        }`}>
            <Zap className={`transition-all ${value ? 'text-accent' : 'text-secondary/50'}`} fill={value ? "currentColor" : "none"} />
        </div>
    </div>
);

export default function LogicGateExplorer({ locale }: { locale: string }) {
    const [gate, setGate] = useState('AND');
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    const isNot = gate === 'NOT';
    const out = isNot ? logic.NOT(a) : logic[gate](a, b);
    const gates = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Simulator */}
            <div className="flex-1 eng-card p-6">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Cpu size={20} />
                        <span>{locale === 'th' ? 'วงจรจำลอง' : 'Simulator'}</span>
                    </h3>
                    <select 
                        value={gate} 
                        onChange={(e) => setGate(e.target.value)}
                        className="bg-background border border-border rounded-lg px-4 py-2 text-foreground font-bold focus:outline-none focus:border-primary"
                    >
                        {gates.map(g => <option key={g} value={g}>{g} Gate</option>)}
                    </select>
                </div>
                
                <div className="relative w-full aspect-[2/1] bg-slate-900/50 rounded-xl grid-bg border border-border flex items-center justify-center overflow-hidden p-4">
                    <svg viewBox="0 0 400 200" className="w-full h-full max-h-[300px]">
                        <Wire d={`M 60 ${isNot ? 100 : 70} L 170 ${isNot ? 100 : 70}`} state={a} />
                        {!isNot && <Wire d="M 60 130 L 170 130" state={b} />}
                        <Wire d="M 245 100 L 340 100" state={out} />
                        
                        <GateSVG type={gate} active={out} />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-between px-[5%] md:px-[10%]">
                        <div className={`flex flex-col ${isNot ? 'justify-center' : 'justify-between'} h-full py-8`}>
                            <Switch label="Input A" value={a} onChange={setA} />
                            {!isNot && <Switch label="Input B" value={b} onChange={setB} />}
                        </div>
                        <Bulb label="Output" value={out} />
                    </div>
                </div>
                <p className="mt-4 text-secondary text-sm text-center font-bold">{locale === 'th' ? 'ทดลองสลับสวิตช์อินพุตเพื่อดูการเปลี่ยนแปลงของเอาต์พุต' : 'Toggle the input switches to see the output change'}</p>
            </div>

            {/* Truth Table */}
            <div className="w-full lg:w-96 eng-card p-6 flex flex-col">
                <h3 className="text-xl font-bold text-primary mb-6">{locale === 'th' ? 'ตารางค่าความจริง' : 'Truth Table'}</h3>
                <div className="overflow-hidden rounded-xl border border-border flex-1">
                    <table className="w-full text-center text-sm h-full">
                        <thead className="bg-secondary/10 text-secondary font-bold uppercase">
                            <tr>
                                <th className="p-3">A</th>
                                {!isNot && <th className="p-3">B</th>}
                                <th className="p-3 text-primary">Output</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono font-bold">
                            {isNot ? (
                                [false, true].map((valA, idx) => {
                                    const isActive = a === valA;
                                    return (
                                        <tr key={idx} className={`border-t border-border transition-colors ${isActive ? 'bg-primary/10 text-primary' : ''}`}>
                                            <td className="p-3">{valA ? '1' : '0'}</td>
                                            <td className="p-3">{logic.NOT(valA) ? '1' : '0'}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                [[false, false], [false, true], [true, false], [true, true]].map(([valA, valB], idx) => {
                                    const isActive = a === valA && b === valB;
                                    return (
                                        <tr key={idx} className={`border-t border-border transition-colors ${isActive ? 'bg-primary/10 text-primary' : ''}`}>
                                            <td className="p-3">{valA ? '1' : '0'}</td>
                                            <td className="p-3">{valB ? '1' : '0'}</td>
                                            <td className="p-3">{logic[gate](valA, valB) ? '1' : '0'}</td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
