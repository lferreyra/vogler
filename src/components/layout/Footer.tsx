import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, MapPin, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { VoglerLogo } from '../common/VoglerLogo';

export const Footer: React.FC = () => {
  const { navigateTo, siteSettings, getWhatsAppLink, openQuoteModal } = useApp();

  return (
    <footer className="bg-[#12382C] text-[#F4F1E8] pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div>
              <VoglerLogo size="lg" variant="white" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#8FA58D] font-medium mt-1.5 pl-1">
                Parques & Jardines
              </p>
            </div>
            <p className="text-sm text-[#F4F1E8]/75 leading-relaxed">
              {siteSettings.tagline}
            </p>

            {/* Insurance Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#DCE5D8]">
              <ShieldCheck className="w-4 h-4 text-[#8FA58D] shrink-0" />
              <span>Cobertura con <strong>seguro por rotura de cristales</strong></span>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8FA58D]">
              Servicios
            </h4>
            <ul className="space-y-2 text-sm text-[#F4F1E8]/80">
              <li>
                <button
                  onClick={() => navigateTo('service-detail', 'corte-de-cesped')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Corte de Césped
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-detail', 'poda')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Poda de Formación y Altura
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-detail', 'diseno-de-jardines')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diseño de Jardines
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('service-detail', 'paisajismo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Paisajismo Integral
                </button>
              </li>
            </ul>
          </div>

          {/* Simplified Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8FA58D]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-[#F4F1E8]/80">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  Todos los Servicios
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Sobre Nosotros & Garantía
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contacto Directo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('booking')}
                  className="hover:text-white transition-colors font-semibold text-[#8FA58D] cursor-pointer"
                >
                  Reservar Turno Online →
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8FA58D]">
              Contacto
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F4F1E8]/80">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8FA58D] shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  {siteSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8FA58D] shrink-0" />
                <span>{siteSettings.coverageZone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8FA58D] shrink-0" />
                <span>Lun a Sáb: 08:00 - 19:30 hs.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all text-center border border-white/15 cursor-pointer"
              >
                Solicitar Cotización Rápida
              </button>
            </div>
          </div>
        </div>

        {/* Clean Copyright Bottom Bar */}
        <div className="pt-8 text-center text-xs text-[#8FA58D]">
          <p>© {new Date().getFullYear()} VOGLER Parques y Jardines. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
