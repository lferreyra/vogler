import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, UserCheck, Clock, CheckSquare, Sparkles, ArrowRight } from 'lucide-react';

export const HowToBook: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Elegí el servicio',
      desc: 'Corte de césped, poda, diseño o paisajismo.',
      icon: CheckSquare
    },
    {
      num: '02',
      title: 'Indicá tus datos',
      desc: 'Dirección de tu propiedad y medidas aproximadas.',
      icon: UserCheck
    },
    {
      num: '03',
      title: 'Seleccioná fecha y turno',
      desc: 'Elegí día y franja horaria en la agenda interactiva.',
      icon: Clock
    },
    {
      num: '04',
      title: 'Confirmá la solicitud',
      desc: 'Revisá el resumen y enviá tu reserva en 1 click.',
      icon: Calendar
    },
    {
      num: '05',
      title: 'VOGLER confirma',
      desc: 'Recibís confirmación y asignación de cuadrilla.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F4F1E8]/50 relative border-y border-[#12382C]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Proceso sin fricciones
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
            Reservar es simple.
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75">
            Agendá tu servicio en menos de dos minutos desde cualquier dispositivo.
          </p>
        </div>

        {/* 5 Steps Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-white rounded-2xl p-6 border border-[#12382C]/10 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-lg font-bold text-[#8FA58D]">
                      Paso {s.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F4F1E8] text-[#12382C] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#12382C] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#1B211E]/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('booking')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#12382C] hover:bg-[#1C4A38] text-[#F4F1E8] font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>Reservar un servicio ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
