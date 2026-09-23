import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, ArrowRight, MessageCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { navigateTo, openQuoteModal, getWhatsAppLink } = useApp();

  return (
    <section className="py-24 md:py-32 bg-[#12382C] text-[#F4F1E8] relative overflow-hidden">
      {/* Background Photography with deep gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_gardener_vogler_1790117765354.jpg"
          alt="Paisajismo y cuidado de jardines VOGLER"
          className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12382C] via-[#12382C]/90 to-[#12382C]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#8FA58D] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58D]" />
            Comenzá hoy
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Tu jardín puede verse diferente.
          </h2>

          <p className="text-base sm:text-lg text-[#DCE5D8] leading-relaxed max-w-xl">
            Contanos qué necesitás y encontremos la mejor forma de transformar tu espacio verde en un lugar para disfrutar sin preocupaciones.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#12382C] font-semibold text-sm hover:bg-[#F4F1E8] shadow-xl transition-all active:scale-[0.98]"
            >
              <span>Solicitar presupuesto</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('booking')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1C4A38] text-white border border-white/20 font-semibold text-sm hover:bg-[#1C4A38]/80 transition-all shadow-md active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#8FA58D]" />
              <span>Reservar un servicio</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium text-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#8FA58D]">
            <span>✓ Seguro de rotura de cristales incluido</span>
            <span>·</span>
            <span>✓ Sin cargos ocultos</span>
            <span>·</span>
            <span>✓ Asesoramiento in situ</span>
          </div>

        </div>
      </div>
    </section>
  );
};
