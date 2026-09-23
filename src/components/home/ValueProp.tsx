import React from 'react';
import { Sparkles, CheckCheck, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ValueProp: React.FC = () => {
  const benefits = [
    {
      number: '01',
      title: 'Cuidado profesional',
      description: 'Conocimiento botánico y maquinaria calibrada para preservar la salud de tu césped, plantas y arboleda.',
      icon: Sparkles
    },
    {
      number: '02',
      title: 'Trabajo prolijo',
      description: 'Terminaciones de bordes milimétricas, soplado de galerías y retiro responsable de todos los restos vegetales.',
      icon: CheckCheck
    },
    {
      number: '03',
      title: 'Seguro por rotura de cristales',
      description: 'Protección real frente a proyectiles accidentales de máquinas desmalezadoras. Tranquilidad absoluta garantizada.',
      icon: ShieldCheck
    },
    {
      number: '04',
      title: 'Atención personalizada',
      description: 'Trato directo, presupuestos claros y planes adaptados a las necesidades reales de tu parque o patio.',
      icon: HeartHandshake
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7] relative border-y border-[#12382C]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Espacios que hacen la diferencia
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C] leading-tight">
            Más que cortar el césped. <br />
            <span className="font-normal italic text-[#1C4A38]">Cuidamos tu espacio.</span>
          </h2>
          <p className="text-base text-[#1B211E]/75 leading-relaxed pt-2">
            VOGLER brinda servicios profesionales integrales para mantener, mejorar y transformar áreas verdes de hogares, barrios privados y predios corporativos con constancia y prolijidad.
          </p>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.number}
                className="group relative bg-white rounded-2xl p-7 border border-[#12382C]/10 hover:border-[#12382C]/30 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-bold text-[#8FA58D]/80 group-hover:text-[#12382C] transition-colors">
                      {b.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] group-hover:bg-[#12382C] text-[#12382C] group-hover:text-[#F4F1E8] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#12382C] mb-2.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#1B211E]/75 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1 text-xs font-semibold text-[#12382C] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Compromiso VOGLER</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
