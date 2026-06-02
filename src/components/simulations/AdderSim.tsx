"use client";
import React, { useState } from "react";
import { Zap, Cpu } from "lucide-react";

// --- Shared Components (adapted from LogicGateExplorer and HTML file) ---

const C_OFF = '#475569'; // slate-600
const C_ON = 'hsl(var(--primary))';
const C_SUM = 'hsl(var(--accent))';
const C_CARRY = '#facc15'; // yellow-400

const Wire = ({ d, state, color = C_ON }: { d: string, state: boolean, color?: string }) => (
    <path 
        d={d} 
        stroke={state ? color : C_OFF} 
        strokeWidth="2" 
        fill="none" 
        className="transition-all duration-300"
        style={{ filter: state ? `drop-shadow(0 0 4px ${color})` : 'none' }}
    />
);

const Node = ({ cx, cy, state, color = C_ON }: { cx: number, cy: number, state: boolean, color?: string }) => (
    <circle 
        cx={cx} cy={cy} r="3" 
        fill={state ? color : C_OFF} 
        className="transition-all duration-300"
        style={{ filter: state ? `drop-shadow(0 0 5px ${color})` : 'none' }}
    />
);

const GateSVG = ({ type, x, y, active }: { type: string, x: number, y: number, active: boolean }) => {
    const strokeColor = active ? C_ON : '#94a3b8';
    const props = {
        stroke: strokeColor,
        strokeWidth: "2",
        fill: "hsl(var(--secondary-foreground) / 0.1)",
        className: 'transition-all duration-300'
    };
    
    let paths = <rect x="5" y="5" width="50" height="50" {...props} />;
    switch(type) {
        case 'AND': paths = <path d="M5,5 h25 a25,25 0 0,1 0,50 h-25 Z" {...props} />; break;
        case 'OR': paths = <path d="M5,5 q25,0 50,25 q-25,25 -50,25 q15,-25 0,-50 Z" {...props} />; break;
        case 'XOR': paths = (<g><path d="M12,5 q25,0 48,25 q-23,25 -48,25 q15,-25 0,-50 Z" {...props} /><path d="M5,5 q15,25 0,50" stroke={strokeColor} strokeWidth="2" fill="none" /></g>); break;
    }
    return (
        <g transform={`translate(${x}, ${y})`}>
            {paths}
            <text x="30" y="34" fill={strokeColor} fontSize="10" textAnchor="middle" fontWeight="bold" className="pointer-events-none select-none">{type}</text>
        </g>
    );
};

const Switch = ({ label, value, onChange }: { label: string, value: boolean, onChange: (v: boolean) => void }) => (
    <div className="flex items-center gap-3">
        <button 
            onClick={() => onChange(!value)}
            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                value ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]' : 'border-border bg-background text-secondary'
            }`}
        >
            {value ? '1' : '0'}
        </button>
        <span className="font-bold text-sm uppercase tracking-widest text-secondary">{label}</span>
    </div>
);

const Bulb = ({ label, value, color = C_SUM }: { label: string, value: boolean, color?: string }) => (
    <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300`}
            style={{
                borderColor: value ? color : 'hsl(var(--border))',
                backgroundColor: value ? `${color}20` : 'hsl(var(--background))',
                boxShadow: value ? `0 0 15px ${color}50` : 'none'
            }}
        >
            <Zap className={`transition-all`} style={{ color: value ? color : 'hsl(var(--secondary))' }} />
        </div>
        <span className="font-bold text-sm uppercase tracking-widest" style={{ color: value ? color : 'hsl(var(--secondary))' }}>{label}</span>
    </div>
);

// --- Adder Components ---

const HalfAdder = ({ locale }: { locale: string }) => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const sum = a !== b;
    const carry = a && b;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 eng-card p-4 sm:p-6">
                <h3 className="text-lg font-bold text-primary mb-4">{locale === 'th' ? 'ผังวงจร (Schematic)' : 'Schematic'}</h3>
                <div className="flex items-center justify-around gap-4 w-full min-h-[250px] bg-slate-900/50 rounded-xl grid-bg border border-border p-4">
                    {/* Inputs */}
                    <div className="flex flex-col gap-8">
                        <Switch label="A" value={a} onChange={setA} />
                        <Switch label="B" value={b} onChange={setB} />
                    </div>

                    {/* SVG Schematic */}
                    <div className="flex-grow h-full w-full max-w-md">
                        <svg viewBox="0 0 300 200" className="w-full h-full">
                            {/* Wires from Inputs */}
                            <Wire d="M 0 50 L 70 50" state={a} />
                            <Wire d="M 0 150 L 70 150" state={b} />

                            {/* Wires to Gates */}
                            <Wire d="M 70 50 L 110 50" state={a} />
                            <Wire d="M 40 50 L 40 120 L 110 120" state={a} />
                            <Node cx={40} cy={50} state={a} />
                            
                            <Wire d="M 70 150 L 110 140" state={b} />
                            <Wire d="M 40 150 L 40 70 L 110 70" state={b} />
                            <Node cx={40} cy={150} state={b} />

                            {/* Gates */}
                            <GateSVG type="XOR" x={110} y={30} active={sum} />
                            <GateSVG type="AND" x={110} y={100} active={carry} />

                            {/* Output Wires */}
                            <Wire d="M 170 60 L 300 60" state={sum} color={C_SUM} />
                            <Wire d="M 170 130 L 300 130" state={carry} color={C_CARRY} />
                        </svg>
                    </div>

                    {/* Outputs */}
                    <div className="flex flex-col gap-8">
                        <Bulb label="Sum" value={sum} color={C_SUM} />
                        <Bulb label="Carry" value={carry} color={C_CARRY} />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-80 eng-card p-6">
                <h3 className="text-lg font-bold text-primary mb-4">{locale === 'th' ? 'ตารางค่าความจริง' : 'Truth Table'}</h3>
                <table className="w-full text-center text-sm font-mono font-bold">
                    <thead className="text-secondary uppercase"><tr><th className="p-2">A</th><th className="p-2">B</th><th className="p-2" style={{color: C_SUM}}>S</th><th className="p-2" style={{color: C_CARRY}}>C</th></tr></thead>
                    <tbody>
                        {[[false, false], [false, true], [true, false], [true, true]].map(([vA, vB], i) => {
                            const isActive = a === vA && b === vB;
                            return (
                                <tr key={i} className={`border-t border-border transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
                                    <td className={`p-2 ${isActive ? 'text-primary' : ''}`}>{vA ? 1:0}</td>
                                    <td className={`p-2 ${isActive ? 'text-primary' : ''}`}>{vB ? 1:0}</td>
                                    <td className="p-2" style={{color: vA !== vB ? C_SUM : C_OFF}}>{vA !== vB ? 1:0}</td>
                                    <td className="p-2" style={{color: vA && vB ? C_CARRY : C_OFF}}>{vA && vB ? 1:0}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FullAdder = ({ locale }: { locale: string }) => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const [cin, setCin] = useState(false);
    const xor1 = a !== b, and1 = a && b;
    const sum = xor1 !== cin, and2 = xor1 && cin;
    const cout = and1 || and2;

    return (
         <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1 eng-card p-4 sm:p-6">
                <h3 className="text-lg font-bold text-primary mb-4">{locale === 'th' ? 'ผังวงจร (Schematic)' : 'Schematic'}</h3>
                 <div className="flex items-center justify-around gap-2 w-full min-h-[300px] bg-slate-900/50 rounded-xl grid-bg border border-border p-2 sm:p-4">
                    {/* Inputs */}
                    <div className="flex flex-col gap-8">
                        <Switch label="A" value={a} onChange={setA} />
                        <Switch label="B" value={b} onChange={setB} />
                        <Switch label="Cin" value={cin} onChange={setCin} />
                    </div>

                    {/* SVG Schematic */}
                    <div className="flex-grow h-full w-full max-w-lg">
                        <svg viewBox="0 0 450 250" className="w-full h-full">
                            {/* --- First Stage (Half Adder) --- */}
                            {/* A & B inputs */}
                            <Wire d="M 0 40 L 50 40" state={a} />
                            <Wire d="M 0 80 L 50 80" state={b} />
                            {/* XOR Gate 1 */}
                            <Wire d="M 50 40 L 80 60" state={a} />
                            <Wire d="M 50 80 L 80 60" state={b} />
                            <GateSVG type="XOR" x={80} y={20} active={xor1} />
                            {/* AND Gate 1 */}
                            <Wire d="M 30 40 L 30 130 L 80 130" state={a} />
                            <Wire d="M 30 80 L 30 150 L 80 150" state={b} />
                            <Node cx={30} cy={40} state={a} /><Node cx={30} cy={80} state={b} />
                            <GateSVG type="AND" x={80} y={110} active={and1} />
                            
                            {/* --- Second Stage --- */}
                            {/* Output of XOR 1 to XOR 2 */}
                            <Wire d="M 140 50 L 200 70" state={xor1} />
                             {/* Cin input */}
                            <Wire d="M 0 200 L 170 200 L 170 90 L 200 90" state={cin} />
                            <Node cx={170} cy={200} state={cin} />
                            {/* XOR Gate 2 (Final Sum) */}
                            <GateSVG type="XOR" x={200} y={50} active={sum} />
                            
                            {/* Output of XOR 1 to AND 2 */}
                            <Wire d="M 170 50 L 170 170 L 200 170" state={xor1} />
                            <Node cx={170} cy={50} state={xor1} />
                            {/* Cin to AND 2 */}
                            <Wire d="M 150 200 L 150 190 L 200 190" state={cin} />
                             <Node cx={150} cy={200} state={cin} />
                            <GateSVG type="AND" x={200} y={150} active={and2} />

                            {/* --- Final Stage (OR Gate for Cout) --- */}
                            {/* Output of AND 1 to OR Gate */}
                            <Wire d="M 140 140 L 280 140 L 280 120" state={and1} color={C_CARRY} />
                             {/* Output of AND 2 to OR Gate */}
                            <Wire d="M 260 180 L 280 180 L 280 100" state={and2} color={C_CARRY} />
                            <GateSVG type="OR" x={280} y={80} active={cout} />
                            
                            {/* --- Final Outputs --- */}
                            <Wire d="M 260 80 L 450 80" state={sum} color={C_SUM} />
                            <Wire d="M 340 110 L 450 110" state={cout} color={C_CARRY} />
                        </svg>
                    </div>
                     {/* Outputs */}
                    <div className="flex flex-col gap-16">
                        <Bulb label="Sum" value={sum} color={C_SUM} />
                        <Bulb label="Cout" value={cout} color={C_CARRY} />
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-96 eng-card p-6">
                <h3 className="text-lg font-bold text-primary mb-4">{locale === 'th' ? 'ตารางค่าความจริง' : 'Truth Table'}</h3>
                <table className="w-full text-center text-sm font-mono font-bold">
                    <thead className="text-secondary uppercase"><tr><th className="p-1">A</th><th className="p-1">B</th><th className="p-1">Cin</th><th className="p-1" style={{color: C_SUM}}>S</th><th className="p-1" style={{color: C_CARRY}}>Cout</th></tr></thead>
                    <tbody>
                        {[[false,false,false], [false,false,true], [false,true,false], [false,true,true], [true,false,false], [true,false,true], [true,true,false], [true,true,true]].map(([vA, vB, vCin], i) => {
                            const isActive = a === vA && b === vB && cin === vCin;
                            const vSum = (vA !== vB) !== vCin;
                            const vCout = (vA && vB) || ((vA !== vB) && vCin);
                            return (
                                <tr key={i} className={`border-t border-border transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
                                    <td className={`p-1.5 ${isActive ? 'text-primary' : ''}`}>{vA ? 1:0}</td>
                                    <td className={`p-1.5 ${isActive ? 'text-primary' : ''}`}>{vB ? 1:0}</td>
                                    <td className={`p-1.5 ${isActive ? 'text-primary' : ''}`}>{vCin ? 1:0}</td>
                                    <td className="p-1.5" style={{color: vSum ? C_SUM : C_OFF}}>{vSum ? 1:0}</td>
                                    <td className="p-1.5" style={{color: vCout ? C_CARRY : C_OFF}}>{vCout ? 1:0}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default function AdderSim({ locale }: { locale: string }) {
    const [mode, setMode] = useState('half');

    return (
        <div className="space-y-6">
            <div className="flex gap-2 border-b border-border p-1">
                <button 
                    className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors ${mode === 'half' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-secondary/5'}`}
                    onClick={() => setMode('half')}
                >
                    {locale === 'th' ? 'วงจรบวกเลขครึ่งบิต' : 'Half Adder'}
                </button>
                <button 
                    className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors ${mode === 'full' ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-secondary/5'}`}
                    onClick={() => setMode('full')}
                >
                    {locale === 'th' ? 'วงจรบวกเลขเต็มบิต' : 'Full Adder'}
                </button>
            </div>

            {mode === 'half' ? <HalfAdder locale={locale} /> : <FullAdder locale={locale} />}
        </div>
    );
}
