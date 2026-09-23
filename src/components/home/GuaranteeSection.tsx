import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, BadgeCheck, Eye } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  const { siteSettings, navigateTo } = useApp();

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Garantía & Confianza
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C] leading-tight">
            Trabajamos para que estés tranquilo.
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75 leading-relaxed">
            Priorizamos la integridad de tu casa, la seguridad de tu familia y la transparencia en cada paso de nuestro servicio.
          </p>
        </div>

        {/* Big Spotlight Card: Seguro de Cristales */}
        <div className="bg-gradient-to-br from-[#12382C] to-[#1C4A38] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <ShieldCheck className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8794B] text-white text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cobertura Verificable</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {siteSettings.glassInsuranceTitle}
            </h3>

            <p className="text-sm sm:text-base text-[#DCE5D8] leading-relaxed">
              {siteSettings.glassInsuranceDescription}
            </p>

            <div className="bg-white/10 border border-white/15 p-4 rounded-xl text-xs text-[#F4F1E8]/90">
              <p className="font-semibold text-white mb-1">Términos claros y honestos:</p>
              <p>{siteSettings.glassInsuranceConditions}</p>
            </div>
          </div>
        </div>

        {/* 3 Auxiliary Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-[#12382C]/10 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#12382C] mb-2">
              {siteSettings.generalGuaranteeTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#1B211E]/75 leading-relaxed">
              {siteSettings.generalGuaranteeDescription}
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#12382C]/10 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mb-4">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#12382C] mb-2">
              Presupuestos Claros y Sin Sorpresas
            </h4>
            <p className="text-xs sm:text-sm text-[#1B211E]/75 leading-relaxed">
              El valor cotizado es el valor final. No hay recargos ocultos ni adicionales imprevistos al terminar la labor.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#12382C]/10 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-bold text-[#12382C] mb-2">
              Cuidado Integral de la Propiedad
            </h4>
            <p className="text-xs sm:text-sm text-[#1B211E]/75 leading-relaxed">
              Respetamos tus macetas, aspersores de riego, mascotas y accesos. Cerramos portones y dejamos todo ordenado.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
