import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scissors,
  TreePine,
  Compass,
  Trees,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';

export const ServiceDetailView: React.FC = () => {
  const {
    selectedServiceSlug,
    services,
    navigateTo,
    getWhatsAppLink,
    openQuoteModal
  } = useApp();

  const service = services.find(s => s.slug === selectedServiceSlug) || services[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scissors': return Scissors;
      case 'TreePine': return TreePine;
      case 'Compass': return Compass;
      default: return Trees;
    }
  };

  const Icon = getIcon(service.icon);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#12382C] hover:text-[#1C4A38] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al listado de servicios</span>
        </button>

        {/* Hero Banner of Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12382C]/10 text-xs font-semibold uppercase tracking-wider text-[#12382C]">
              <Icon className="w-4 h-4" />
              <span>Servicio Especializado</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#12382C] leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-[#1B211E]/80 leading-relaxed max-w-xl">
              {service.fullDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-neutral-700">
              <div className="p-4 rounded-xl bg-white border border-[#12382C]/10 shadow-2xs">
                <span className="text-neutral-400 block mb-1">Duración estimada:</span>
                <p className="font-bold text-[#12382C] text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8FA58D]" />
                  {service.estimatedDuration}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#12382C]/10 shadow-2xs">
                <span className="text-neutral-400 block mb-1">Frecuencia sugerida:</span>
                <p className="font-bold text-[#12382C] text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8FA58D]" />
                  {service.recommendedFrequency}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => navigateTo('booking')}
                className="px-6 py-3.5 rounded-full bg-[#12382C] text-white font-semibold text-xs hover:bg-[#1C4A38] shadow-md transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar turno para este servicio</span>
              </button>

              <button
                onClick={() => openQuoteModal(service.title)}
                className="px-6 py-3.5 rounded-full bg-white text-[#12382C] border border-[#12382C]/20 font-semibold text-xs hover:bg-[#F4F1E8] transition-all"
              >
                Solicitar cotización
              </button>

              <a
                href={getWhatsAppLink(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full border border-[#25D366] text-[#12382C] hover:bg-[#25D366]/10 font-semibold text-xs transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#12382C]/10 shadow-xs mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#12382C] mb-6">
            Qué incluye el servicio de {service.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feat, index) => (
              <div key={index} className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FAFAF7] border border-neutral-100">
                <CheckCircle2 className="w-5 h-5 text-[#12382C] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Insurance Banner in Service */}
          <div className="mt-8 p-5 rounded-2xl bg-[#12382C]/5 border border-[#12382C]/15 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#12382C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#12382C] text-sm">
                Garantía y seguro incluidos en cada visita
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Todas nuestras intervenciones de {service.title.toLowerCase()} cuentan con cobertura contra roturas de cristales y verificación final de orden y limpieza.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
