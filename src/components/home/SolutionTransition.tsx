import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ArrowRight, Shield } from 'lucide-react';

export const SolutionTransition: React.FC = () => {
  const { navigateTo, openQuoteModal } = useApp();

  return (
    <section className="py-24 md:py-32 bg-[#12382C] text-[#F4F1E8] relative overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1C4A38] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8FA58D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#8FA58D] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58D]" />
              La respuesta VOGLER
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Nosotros nos ocupamos. <br />
              <span className="font-normal italic text-[#DCE5D8]">Vos solo disfrutás.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#F4F1E8]/85 leading-relaxed max-w-xl">
              Coordinamos las visitas, llevamos maquinaria profesional afilada, protegemos tus cristales y dejamos el parque impecable. Sin vueltas ni ausencias imprevistas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-6 h-6 rounded-full bg-[#8FA58D]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#F4F1E8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Cronograma previsible</h4>
                  <p className="text-xs text-[#F4F1E8]/70 mt-0.5">Sabés exactamente qué día y en qué horario estamos en tu domicilio.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="w-6 h-6 rounded-full bg-[#8FA58D]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-3.5 h-3.5 text-[#F4F1E8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Cero riesgos para vos</h4>
                  <p className="text-xs text-[#F4F1E8]/70 mt-0.5">Seguro directo por rotura de vidrios y operarios con elementos de seguridad.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('booking')}
                className="px-6 py-3.5 rounded-full bg-white text-[#12382C] font-semibold text-sm hover:bg-[#F4F1E8] shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                <span>Agendar mi servicio</span>
                <ArrowRight className="w-4 h-4 text-[#12382C]" />
              </button>

              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3.5 rounded-full border border-white/25 text-white hover:bg-white/10 font-semibold text-sm transition-all"
              >
                Solicitar cotización personalizada
              </button>
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-[#8FA58D] font-semibold mb-3">
                Compromiso de entrega
              </p>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs text-[#8FA58D]">Antes</span>
                  <p className="text-sm font-medium text-white/90">Pasto sobrecrecido, canteros invadidos y preocupación constante.</p>
                </div>
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs text-[#8FA58D]">Durante</span>
                  <p className="text-sm font-medium text-white/90">Cuadrilla uniforme con herramientas profesionales y lonas de contención.</p>
                </div>
                <div>
                  <span className="text-xs text-[#8FA58D]">Después</span>
                  <p className="text-sm font-medium text-white/90">Galería soplada, bordes rectos y el aroma a pasto recién cortado listo para disfrutar.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
