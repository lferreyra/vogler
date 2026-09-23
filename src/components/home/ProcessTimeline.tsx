import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      step: '01',
      title: 'Evaluamos el espacio',
      short: 'Reconocemos dimensiones, relieve, tipo de pasto y sectores delicados.',
      detail: 'Relevamos el estado botánico, la humedad del sustrato, la presencia de riego por aspersión enterrado, mascotas y posibles obstáculos para trabajar sin riesgos.'
    },
    {
      step: '02',
      title: 'Detectamos necesidades',
      short: 'Identificamos si hace falta corte, poda formativa o mejoras de suelo.',
      detail: 'Analizamos zonas sombreadas donde el césped ralea, presencia de malezas perennes, ramas que rozan canaletas y requerimientos de bordeado fino.'
    },
    {
      step: '03',
      title: 'Definimos el trabajo',
      short: 'Acordamos el plan con vos y asignamos el equipo y maquinaria específica.',
      detail: 'Establecemos la altura de corte ideal para la estación, el tipo de cuchilla (rotativa o helicoidal) y las precauciones de seguridad en sectores vidriados.'
    },
    {
      step: '04',
      title: 'Realizamos el servicio',
      short: 'Ejecutamos con disciplina, protegiendo tus aberturas y plantas.',
      detail: 'Cortamos de forma homogénea, perfilamos canteros y aceras, aplicamos lonas de protección de ventanas e intervenimos con herramientas esterilizadas.'
    },
    {
      step: '05',
      title: 'Revisamos el resultado',
      short: 'Control de calidad en cada borde, cantero y sector intervenido.',
      detail: 'Verificamos que no queden escalones en el césped, que los arbustos guarden simetría armónica y que las tapas de riego estén en perfecto estado.'
    },
    {
      step: '06',
      title: 'Dejamos el espacio en condiciones',
      short: 'Soplado completo de galerías y retiro prolijo de todos los restos.',
      detail: 'Aspiramos o soplamos restos vegetales en veredas, galerías y accesos vehiculares. Embolsamos o retiramos el pasto según lo coordinado.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
              Metodología de Trabajo
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
              Cómo cuidamos cada espacio
            </h2>
            <p className="text-sm sm:text-base text-[#1B211E]/75">
              Un método sistemático en 6 pasos para garantizar terminaciones impecables en cada visita.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#12382C] px-4 py-2 rounded-full border border-[#12382C]/20 hover:bg-[#F4F1E8] transition-colors self-start md:self-auto"
          >
            <span>{isExpanded ? 'Ver versión compacta' : 'Ver detalle técnico completo'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-7 border border-[#12382C]/10 shadow-2xs hover:border-[#12382C]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-[#12382C]">
                    {item.step}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#8FA58D]" />
                </div>

                <h3 className="font-display text-xl font-bold text-[#12382C] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1B211E]/80 leading-relaxed">
                  {item.short}
                </p>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-[#1B211E]/70 leading-relaxed bg-[#F4F1E8]/40 p-3 rounded-lg animate-in fade-in">
                    <p className="font-semibold text-[#12382C] mb-1">Detalle técnico:</p>
                    {item.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
