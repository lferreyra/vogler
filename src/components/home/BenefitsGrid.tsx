import React from 'react';
import { Sun, CheckCircle2, Shield, CalendarCheck, Smile, Sparkles } from 'lucide-react';

export const BenefitsGrid: React.FC = () => {
  const benefits = [
    {
      title: 'Más tiempo para vos',
      description: 'Disfrutá tus fines de semana descansando o con amigos mientras nosotros nos ocupamos de las tareas pesadas.',
      icon: Sun
    },
    {
      title: 'Tu jardín siempre cuidado',
      description: 'El césped con la altura ideal, canteros limpios y arbustos controlados sin altibajos ni descuidos.',
      icon: Sparkles
    },
    {
      title: 'Trabajo prolijo',
      description: 'Bordeado con hilo fino de calidad, recolección completa de restos y soplado minucioso de veredas.',
      icon: CheckCircle2
    },
    {
      title: 'Planificación profesional',
      description: 'Cronogramas adaptados a la época del año para realizar cortes, fertilización o podas en el momento justo.',
      icon: CalendarCheck
    },
    {
      title: 'Atención personalizada',
      description: 'Canal de WhatsApp ágil para coordinar visitas, enviar consultas o avisar requerimientos específicos.',
      icon: Smile
    },
    {
      title: 'Mayor tranquilidad',
      description: 'Personal de confianza con experiencia práctica y respaldo asegurador por rotura de vidrios.',
      icon: Shield
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F4F1E8]/40 border-t border-[#12382C]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Calidad de Vida
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
            Lo que ganás al trabajar con VOGLER
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75">
            Beneficios tangibles desde el primer día en la comodidad de tu hogar.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-[#12382C]/10 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#12382C] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1B211E]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
