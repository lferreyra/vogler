import React from 'react';
import { Clock, AlertCircle, HelpCircle, ShieldAlert, CalendarClock, Compass } from 'lucide-react';

export const PainPoints: React.FC = () => {
  const painPoints = [
    {
      icon: Clock,
      title: 'Falta de tiempo continuo',
      desc: 'El fin de semana debería ser para disfrutar en familia, no para lidiar con máquinas y horas de esfuerzo físico.'
    },
    {
      icon: AlertCircle,
      title: 'Césped crecido y desparejo',
      desc: 'Cuando el pasto supera la altura adecuada se debilita la raíz, proliferan malezas y el corte posterior se vuelve complejo.'
    },
    {
      icon: ShieldAlert,
      title: 'Árboles y ramas descuidadas',
      desc: 'Copas densas que tapan la luz solar, tocan cableados o amenazan con roturas ante tormentas fuertes de verano.'
    },
    {
      icon: CalendarClock,
      title: 'Mantenimiento irregular',
      desc: 'Servicios informales que fallan en la fecha prometida o no vuelven, dejando el espacio a medio terminar.'
    },
    {
      icon: HelpCircle,
      title: 'Falta de alguien de confianza',
      desc: 'La incertidumbre de meter personas a tu propiedad que no cuenten con seguros ni responsabilidad por daños accidentales.'
    },
    {
      icon: Compass,
      title: 'Espacios verdes desaprovechados',
      desc: 'Tener un lindo parque o patio pero no poder sentarte a disfrutarlo porque siempre está desprolijo o falto de diseño.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative border-b border-[#12382C]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Realidad Cotidiana
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C] leading-tight text-balance">
            Sabemos lo que pasa cuando tu jardín queda para después.
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75 leading-relaxed">
            Mantener un espacio verde saludable exige continuidad, herramientas adecuadas y tiempo. Cuando se pospone, recuperarlo cuesta el doble.
          </p>
        </div>

        {/* Editorial Grid of Dilemmas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 p-7 rounded-2xl border border-[#12382C]/8 hover:border-[#12382C]/25 shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#12382C] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1B211E]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
