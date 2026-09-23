import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, Shield, Clock, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo, openQuoteModal } = useApp();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F4F1E8]/60 via-[#FAFAF7] to-[#FAFAF7]">
      {/* Subtle organic light blobs in background */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#8FA58D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#12382C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#12382C] uppercase bg-[#12382C]/8 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12382C]" />
              PARQUES & JARDINES
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#12382C] leading-[1.08] text-balance">
              Transformamos espacios en <span className="italic font-normal text-[#1C4A38] underline decoration-[#8FA58D]/40 decoration-wavy underline-offset-8">lugares para disfrutar.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#1B211E]/80 leading-relaxed max-w-xl text-pretty font-normal">
              Servicio profesional de corte de césped, poda, diseño de jardines y paisajismo para hogares, comercios y espacios corporativos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#12382C] text-[#F4F1E8] font-semibold text-sm hover:bg-[#1C4A38] shadow-md hover:shadow-lg transition-all active:scale-[0.99] focus:outline-hidden"
              >
                <span>Solicitar presupuesto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('booking')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#12382C] border border-[#12382C]/20 font-semibold text-sm hover:bg-[#F4F1E8] transition-all shadow-xs active:scale-[0.99] focus:outline-hidden"
              >
                <Calendar className="w-4 h-4 text-[#12382C]" />
                <span>Reservar un servicio</span>
              </button>
            </div>

            {/* Micro-proof points */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#1B211E]/75">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1C4A38]" />
                <span>Maquinaria calibrada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#1C4A38]" />
                <span>Seguro de cristales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1C4A38]" />
                <span>Puntualidad garantizada</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Glass Floating Badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Photograph Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[16/11]">
                <img
                  src="/src/assets/images/hero_gardener_vogler_1790117765354.jpg"
                  alt="Jardinero profesional de VOGLER realizando mantenimiento prolijo de parque residencial"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gentle ambient gradient at bottom for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12382C]/50 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Floating Glass Badge 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 glass-floating rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-xl border border-white/80 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-7 h-7 rounded-full bg-[#12382C] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#12382C] leading-none">Servicio Profesional</p>
                  <p className="text-[11px] text-[#1B211E]/70 mt-0.5">Cuadrillas capacitadas</p>
                </div>
              </div>

              {/* Floating Glass Badge 2: Bottom Left */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 glass-floating rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/80 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-8 h-8 rounded-full bg-[#B8794B] text-white flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#12382C] leading-tight">Seguro por rotura de cristales</p>
                  <p className="text-[11px] text-[#1B211E]/75">Cobertura real durante el trabajo</p>
                </div>
              </div>

              {/* Floating Glass Badge 3: Bottom Right Small */}
              <div className="hidden sm:flex absolute bottom-6 -right-4 glass-floating rounded-xl px-3 py-1.5 items-center gap-1.5 shadow-lg border border-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-medium text-[#12382C]">Turnos disponibles esta semana</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
