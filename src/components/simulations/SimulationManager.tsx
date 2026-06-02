"use client";
import MemoryVisualizer from "./MemoryVisualizer";
import ShortDivisionSim from "./ShortDivisionSim";
import BaseToDecimalSim from "./BaseToDecimalSim";
import MultiBaseArithmetic from "./MultiBaseArithmetic";
import LogicGateExplorer from "./LogicGateExplorer";
import AdderSim from "./AdderSim";
import AdvancedKMapSim from "./AdvancedKMapSim";

interface SimulationManagerProps {
  simulationId?: string;
  locale: string;
}

export default function SimulationManager({ simulationId, locale }: SimulationManagerProps) {
  if (!simulationId) return null;

  return (
    <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-primary rounded-full"></div>
        <h3 className="text-2xl font-bold text-foreground italic">
          {locale === 'en' ? 'Advanced Engineering Lab' : 'ห้องปฏิบัติการวิศวกรรมขั้นสูง'}
        </h3>
      </div>
      
      {simulationId === "chapter-1-sims" && (
        <div className="space-y-16">
          <MemoryVisualizer locale={locale} />
          <ShortDivisionSim locale={locale} />
          <BaseToDecimalSim locale={locale} />
        </div>
      )}
      
      {simulationId === "arithmetic-sandbox" && (
        <MultiBaseArithmetic locale={locale} />
      )}
      
      {simulationId === "logic-gate-explorer" && (
        <LogicGateExplorer locale={locale} />
      )}
      
      {simulationId === "adder-sim" && (
        <AdderSim locale={locale} />
      )}
      
      {simulationId === "kmap-sim" && (
        <AdvancedKMapSim locale={locale} />
      )}
      
      {/* Fallback */}
      {![
        "chapter-1-sims",
        "arithmetic-sandbox",
        "logic-gate-explorer",
        "adder-sim",
        "kmap-sim"
      ].includes(simulationId) && (
        <div className="bg-secondary/5 border border-border border-dashed rounded-3xl p-20 text-center text-secondary font-bold">
          {locale === 'en' ? 'Simulation Coming Soon' : 'เครื่องมือจำลองกำลังอยู่ระหว่างการพัฒนา'}
        </div>
      )}
    </div>
  );
}
