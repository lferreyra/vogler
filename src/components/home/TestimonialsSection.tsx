import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  Calendar,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, navigateTo, getWhatsAppLink } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const totalItems = testimonials.length;
    if (totalItems > 0 && scrollWidth > clientWidth) {
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      const calculatedIndex = Math.round(progress * (totalItems - 1));
      setActiveIndex(calculatedIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [testimonials.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 24 : 380;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const containerLeft = container.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const targetScroll = container.scrollLeft + (cardLeft - containerLeft);

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#F4F1E8]/40 relative border-t border-[#12382C]/5 overflow-hidden">
      
      {/* Subtle organic background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8FA58D]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#12382C]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12382C]/10 text-[#12382C] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8FA58D]" />
              <span>Experiencias Verificadas & Opiniones Reales</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382C] tracking-tight leading-tight">
              Lo que dicen quienes confían su parque a VOGLER
            </h2>

            <p className="text-sm sm:text-base text-[#1B211E]/75 leading-relaxed">
              Vecinos de countries, barrios residenciales y empresas de Córdoba que eligen nuestro servicio periódico con puntualidad, seguro de cristales y terminaciones impecables.
            </p>

            {/* Social Proof Badges Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#12382C] bg-white px-3 py-1.5 rounded-xl border border-black/5 shadow-2xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="ml-1">4.9 / 5</span>
                <span className="text-neutral-400 font-normal">(+240 reseñas)</span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Cobertura de Cristales</span>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Slider Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-start lg:self-end">
            <span className="text-xs text-neutral-400 hidden sm:inline-block">
              Deslizá para explorar testimonios
            </span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Ver testimonio anterior"
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'border-[#12382C]/20 bg-white hover:bg-[#12382C] text-[#12382C] hover:text-white shadow-xs active:scale-95'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Ver siguiente testimonio"
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'border-[#12382C]/20 bg-white hover:bg-[#12382C] text-[#12382C] hover:text-white shadow-xs active:scale-95'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-300 cursor-not-allowed opacity-60'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CSS-BASED HORIZONTAL SCROLL SLIDER CONTAINER */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 no-scrollbar scroll-pl-4 sm:scroll-pl-0"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[410px] snap-start bg-white rounded-3xl p-6 sm:p-7 border border-[#12382C]/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                {/* Decorative Quote Watermark */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#12382C]/5 pointer-events-none transition-transform group-hover:scale-110" />

                <div className="space-y-4">
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    {t.badge ? (
                      <span className="text-[10px] font-semibold tracking-tight px-2.5 py-1 rounded-full bg-[#FAF6EC] text-[#8C6D1F] border border-[#D9B26A]/30">
                        {t.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold tracking-tight px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Verificado ✓
                      </span>
                    )}
                  </div>

                  {/* Customer Quote */}
                  <blockquote className="text-sm sm:text-[15px] text-[#1B211E]/85 leading-relaxed italic font-normal">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Author Info & Service Metadata */}
                <div className="pt-5 mt-6 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#12382C] text-[#F4F1E8] flex items-center justify-center font-bold text-xs tracking-wider shadow-2xs shrink-0 ring-2 ring-[#8FA58D]/30">
                      {t.initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display text-base font-bold text-[#12382C] truncate">
                          {t.name}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>

                      <p className="text-xs text-neutral-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-[#8FA58D] shrink-0" />
                        <span>{t.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="font-medium text-[#12382C]/80 bg-[#FAFAF7] px-2.5 py-1 rounded-md border border-neutral-200/70">
                      {t.service}
                    </span>
                    <span className="font-mono text-neutral-400">
                      {t.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Progress & Dots Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 mb-16 pt-2">
          {/* Progress bar */}
          <div className="w-full sm:w-64 h-1.5 bg-neutral-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#12382C] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-[#12382C]'
                    : 'w-2 bg-[#12382C]/20 hover:bg-[#12382C]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Guarantees Summary Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-neutral-100">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF6EC] text-[#8C6D1F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#8C6D1F]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12382C]">Seguro por Rotura de Cristales</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Si una piedra de motoguadaña daña un vidrio o ventanal, lo reponemos sin vueltas ni demoras burocráticas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#12382C] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#12382C]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12382C]">Puntualidad con Aviso Previo</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Margen transparente de ~15 min de tolerancia según traslados previos. Te avisamos por WhatsApp al salir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F4F1E8] text-[#12382C] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#12382C]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12382C]">Retiro & Limpieza Total</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Veredas, canteros, cocheras y galerías sopladas e impecables al finalizar cada turno de trabajo.
                </p>
              </div>
            </div>
          </div>

          {/* Action Callout inside Testimonial Box */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-center sm:text-left">
              <span className="font-bold text-[#12382C] text-sm block">¿Listo para renovar el mantenimiento de tu parque?</span>
              <span className="text-neutral-500">Agendá tu turno online en 2 minutos o consultanos disponibilidad inmediata.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigateTo('booking')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#12382C] text-white font-semibold hover:bg-[#1C4A38] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Reservar Turno Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppLink('Hola, estuve viendo las opiniones en su web y me gustaría coordinar una visita para mi jardín.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#25D366] text-[#12382C] hover:bg-[#25D366]/10 font-semibold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
