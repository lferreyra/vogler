import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, Sparkles, CheckCheck, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { siteSettings, navigateTo, openQuoteModal } = useApp();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Sobre VOGLER
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#12382C] leading-tight">
            Pasión botánica, precisión técnica y compromiso real.
          </h1>
          <p className="text-base sm:text-lg text-[#1B211E]/80 leading-relaxed">
            VOGLER nació con la premisa de jerarquizar el oficio de parques y jardines: cumpliendo horarios, usando maquinaria calibrada y asumiendo total responsabilidad sobre el espacio de cada cliente.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-sm text-[#1B211E]/80 leading-relaxed">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#12382C]">
              Una nueva forma de entender el cuidado verde
            </h2>
            <p>
              Entendemos que un jardín no es solo pasto: es el escenario de tus asados familiares, el descanso de tus tardes y la primera impresión de tu hogar o empresa.
            </p>
            <p>
              Por eso nos diferenciamos de la informalidad habitual: invertimos en equipos de corte de última generación con cuchillas helicoidales y rotativas afiladas a diario para no deshilachar la fibra vegetal, lo que evita que las puntas del césped tomen un color amarillento.
            </p>
            <p>
              Además, capacitamos a nuestras cuadrillas en botánica básica, podas sanitarias y protocolos estrictos de seguridad perimetral.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="/src/assets/images/hero_gardener_vogler_1790117765354.jpg"
                alt="Equipo VOGLER trabajando en parque residencial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Insurance Pillar Detailed */}
        <div className="bg-[#12382C] text-[#F4F1E8] rounded-3xl p-8 sm:p-12 mb-20 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8794B] text-white text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantía Institucional</span>
            </div>

            <h3 className="font-display text-3xl font-bold text-white">
              {siteSettings.glassInsuranceTitle}
            </h3>

            <p className="text-sm sm:text-base text-[#DCE5D8] leading-relaxed">
              {siteSettings.glassInsuranceDescription}
            </p>

            <div className="bg-white/10 p-4 rounded-xl text-xs text-[#F4F1E8]/90 mt-4 border border-white/10">
              <p className="font-bold text-white mb-1">Términos de aplicación:</p>
              <p>{siteSettings.glassInsuranceConditions}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-[#12382C]">
            ¿Listo para transformar tu espacio verde?
          </h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-3.5 rounded-full bg-[#12382C] text-white font-semibold text-xs hover:bg-[#1C4A38] shadow-md transition-all"
            >
              Pedir presupuesto sin cargo
            </button>
            <button
              onClick={() => navigateTo('booking')}
              className="px-6 py-3.5 rounded-full bg-white text-[#12382C] border border-[#12382C]/20 font-semibold text-xs hover:bg-[#F4F1E8] transition-all"
            >
              Reservar un turno
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
