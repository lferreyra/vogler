import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Scissors, TreePine, Compass, Trees, MessageCircle, Calendar } from 'lucide-react';
import { Service } from '../../types';

export const ServicesBento: React.FC = () => {
  const { services, navigateTo, getWhatsAppLink } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return Scissors;
      case 'TreePine':
        return TreePine;
      case 'Compass':
        return Compass;
      default:
        return Trees;
    }
  };

  return (
    <section id="servicios" className="py-24 md:py-32 bg-[#F4F1E8]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
              Especialidades Profesionales
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C] leading-tight">
              Nuestros servicios
            </h2>
            <p className="text-sm sm:text-base text-[#1B211E]/75">
              Cuidado sistemático, diseño y ejecución paisajística adaptados al ritmo y escala de tu propiedad.
            </p>
          </div>

          <button
            onClick={() => navigateTo('booking')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#12382C] hover:text-[#1C4A38] pb-1 border-b-2 border-[#12382C] self-start md:self-auto"
          >
            <span>Ver disponibilidad de turnos</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid: 2 columns with asymmetric heights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {services.map((service: Service, index: number) => {
            const Icon = getServiceIcon(service.icon);
            // Bento layout spans: cards 0 & 3 take 7 columns, cards 1 & 2 take 5 columns
            const colSpan = index === 0 || index === 3 ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <div
                key={service.id}
                className={`${colSpan} group relative bg-white rounded-3xl overflow-hidden border border-[#12382C]/10 shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between`}
              >
                {/* Photo Top Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#DCE5D8]">
                  <img
                    src={service.image}
                    alt={`Servicio de ${service.title} de VOGLER Parques y Jardines`}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle darkening overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute top-4 left-4 glass-floating px-3 py-1 rounded-full text-[11px] font-semibold text-[#12382C] shadow-sm">
                      {service.badge}
                    </div>
                  )}

                  {/* Icon Container in Corner */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#12382C] shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white leading-tight drop-shadow-xs">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-[#F4F1E8]/90 font-medium">
                        {service.estimatedDuration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm text-[#1B211E]/80 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-1.5 pt-2">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="text-xs text-[#1B211E]/75 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8FA58D] mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => navigateTo('service-detail', service.slug)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12382C] hover:text-[#1C4A38] transition-colors group/btn"
                    >
                      <span>Ver servicio completo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Contextual WhatsApp Consultation */}
                      <a
                        href={getWhatsAppLink(service.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-[#12382C]/15 hover:border-[#12382C]/30 text-[#12382C] hover:bg-[#F4F1E8] transition-colors"
                        title={`Consultar por ${service.title} vía WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      </a>

                      {/* Direct Booking for this service */}
                      <button
                        onClick={() => navigateTo('booking')}
                        className="px-3.5 py-1.5 rounded-full bg-[#12382C] hover:bg-[#1C4A38] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Reservar</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
