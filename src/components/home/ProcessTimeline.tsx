import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Wind,
  Check
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  short: string;
  detail: string;
  highlights: string[];
  icon: React.ElementType;
}

export const ProcessTimeline: React.FC = () => {
  // Mode: 'accordion' | 'carousel'
  const [viewMode, setViewMode] = useState<'accordion' | 'carousel'>('accordion');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [openAccordionIndices, setOpenAccordionIndices] = useState<number[]>([0]);

  const steps: ProcessStep[] = [
    {
      step: '01',
      title: 'Evaluamos el espacio',
      short: 'Reconocemos dimensiones, relieve, tipo de césped y sectores delicados.',
      detail: 'Relevamos el estado botánico, la humedad del sustrato, la presencia de riego por aspersión enterrado, mascotas y posibles obstáculos para trabajar con máxima seguridad.',
      highlights: ['Mapeo de aspersores y tomas de agua', 'Identificación de especies y áreas de sombra', 'Inspección de ventanales y zonas vidriadas'],
      icon: Compass
    },
    {
      step: '02',
      title: 'Detectamos necesidades',
      short: 'Identificamos si hace falta corte regular, poda formativa o mejoras de suelo.',
      detail: 'Analizamos zonas donde el césped ralea, presencia de malezas perennes, ramas bajas que rozan canaletas o cables y requerimientos de bordeado fino.',
      highlights: ['Detección temprana de plagas o musgo', 'Evaluación de altura adecuada según estación', 'Recomendación de aireado o fertilización'],
      icon: FileCheck
    },
    {
      step: '03',
      title: 'Definimos el plan de trabajo',
      short: 'Acordamos el cronograma con vos y asignamos maquinaria calibrada.',
      detail: 'Establecemos la altura de corte ideal para la estación, el tipo de cuchilla (rotativa o helicoidal) y las precauciones de seguridad en sectores vidriados.',
      highlights: ['Cronograma estandarizado sin demoras', 'Cuchillas con afilado de precisión', 'Protocolo preventivo con lona antichispas'],
      icon: SlidersHorizontal
    },
    {
      step: '04',
      title: 'Realizamos el servicio',
      short: 'Ejecutamos con disciplina profesional, protegiendo tus aberturas y plantas.',
      detail: 'Cortamos de forma homogénea, perfilamos canteros y aceras, aplicamos lonas de contención de ventanas e intervenimos con herramientas esterilizadas.',
      highlights: ['Protección de cristales con seguro directo', 'Bordeado milimétrico en cordones y plantas', 'Desinfección de herramientas de corte'],
      icon: ShieldCheck
    },
    {
      step: '05',
      title: 'Control de calidad final',
      short: 'Revisión exhaustiva en cada borde, cantero y sector intervenido.',
      detail: 'Verificamos que no queden escalones en el césped, que los arbustos guarden simetría armónica y que las tapas de riego estén en perfecto estado.',
      highlights: ['Nivelación visual en 360 grados', 'Inspección de canteros y raíces superficiales', 'Comprobación de toberas de riego intactas'],
      icon: Sparkles
    },
    {
      step: '06',
      title: 'Dejamos el espacio impecable',
      short: 'Soplado completo de galerías, accesos y retiro prolijo de todos los restos.',
      detail: 'Soplamos restos vegetales en veredas, galerías y accesos vehiculares. Embolsamos o retiramos el pasto según lo coordinado para que solo disfrutes.',
      highlights: ['Soplado de galerías, terrazas y cocheras', 'Recolección ordenada sin dejar residuos', 'Parque listo para usar al instante'],
      icon: Wind
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const nextStep = () => {
    setActiveStepIndex(prev => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStepIndex(prev => (prev - 1 + steps.length) % steps.length);
  };

  const activeStep = steps[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative border-b border-[#12382C]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#8FA58D] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58D]" />
              Metodología de Trabajo
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
              Cómo cuidamos cada espacio
            </h2>
            <p className="text-sm sm:text-base text-[#1B211E]/75 leading-relaxed">
              Un método sistemático en 6 pasos estructurados para garantizar terminaciones impecables y máxima previsibilidad en cada visita.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-white border border-[#12382C]/15 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('accordion')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'accordion'
                  ? 'bg-[#12382C] text-white shadow-xs'
                  : 'text-[#1B211E]/70 hover:text-[#12382C]'
              }`}
            >
              Vista Acordeón
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-[#12382C] text-white shadow-xs'
                  : 'text-[#1B211E]/70 hover:text-[#12382C]'
              }`}
            >
              Vista Carrusel
            </button>
          </div>
        </div>

        {/* 1. ACCORDION FORMAT */}
        {viewMode === 'accordion' && (
          <div className="space-y-3.5 max-w-4xl mx-auto animate-in fade-in duration-300">
            {steps.map((item, index) => {
              const isOpen = openAccordionIndices.includes(index);
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.step}
                  className={`rounded-2xl transition-all border overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#12382C]/25 shadow-md ring-1 ring-[#12382C]/10'
                      : 'bg-white/80 hover:bg-white border-[#12382C]/10 hover:border-[#12382C]/20 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-base shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#12382C] text-white'
                            : 'bg-[#F4F1E8] text-[#12382C]'
                        }`}
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[#12382C] truncate">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#1B211E]/70 truncate mt-0.5 max-w-xl">
                          {item.short}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'bg-[#12382C]/5 border-[#12382C]/20 text-[#12382C] rotate-180'
                          : 'bg-transparent border-neutral-200 text-neutral-400 rotate-0'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm border-t border-neutral-100 bg-[#FAFAF7]/50 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-3">
                        <div className="md:col-span-7 space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#8FA58D]">
                            Detalle del procedimiento:
                          </p>
                          <p className="text-[#1B211E]/80 leading-relaxed text-sm">
                            {item.detail}
                          </p>
                        </div>

                        <div className="md:col-span-5 bg-white p-4 rounded-xl border border-[#12382C]/10 space-y-2.5">
                          <p className="text-xs font-bold text-[#12382C] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8FA58D]" /> Puntos clave:
                          </p>
                          <ul className="space-y-1.5">
                            {item.highlights.map((h, i) => (
                              <li key={i} className="text-xs text-[#1B211E]/75 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58D] mt-1.5 shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. CAROUSEL FORMAT */}
        {viewMode === 'carousel' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            {/* Step progress pills */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {steps.map((st, i) => (
                <button
                  key={st.step}
                  onClick={() => setActiveStepIndex(i)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    i === activeStepIndex
                      ? 'bg-[#12382C] text-white border-[#12382C] shadow-xs'
                      : i < activeStepIndex
                      ? 'bg-white text-[#12382C] border-[#12382C]/20'
                      : 'bg-white/60 text-neutral-400 border-neutral-200'
                  }`}
                >
                  <span className="block text-[10px] opacity-70">Paso</span>
                  <span>{st.step}</span>
                </button>
              ))}
            </div>

            {/* Main Carousel Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#12382C]/15 shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#12382C] text-[#F4F1E8] flex items-center justify-center font-display text-2xl font-bold shrink-0">
                    {activeStep.step}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8FA58D] font-bold">
                      Fase {activeStepIndex + 1} de {steps.length}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#12382C]">
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                {/* Next / Prev Controls */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    onClick={prevStep}
                    className="w-10 h-10 rounded-full border border-neutral-200 hover:border-[#12382C] hover:bg-[#F4F1E8] flex items-center justify-center text-[#12382C] transition-colors cursor-pointer"
                    aria-label="Paso anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-10 h-10 rounded-full bg-[#12382C] hover:bg-[#1C4A38] flex items-center justify-center text-white transition-colors shadow-xs cursor-pointer"
                    aria-label="Siguiente paso"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-base sm:text-lg font-medium text-[#12382C] leading-relaxed">
                    {activeStep.short}
                  </p>
                  <p className="text-sm text-[#1B211E]/75 leading-relaxed bg-[#FAFAF7] p-4 rounded-2xl border border-neutral-100">
                    {activeStep.detail}
                  </p>
                </div>

                <div className="md:col-span-5 bg-[#F4F1E8]/70 p-5 rounded-2xl border border-[#12382C]/10 space-y-3">
                  <p className="text-xs font-bold text-[#12382C] uppercase tracking-wider flex items-center gap-2">
                    <StepIcon className="w-4 h-4 text-[#8FA58D]" /> Garantías de esta etapa:
                  </p>
                  <ul className="space-y-2">
                    {activeStep.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs text-[#1B211E]/85 flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#12382C]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#12382C]" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
