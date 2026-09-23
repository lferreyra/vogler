import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, getWhatsAppLink } = useApp();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#FAFAF7] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Dudas Comunes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
            Preguntas frecuentes
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75">
            Respuestas claras sobre tarifas estimadas, frecuencias, seguros y coberturas.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave (ej. seguro, poda, costo...)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#12382C]/10 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]/20 shadow-2xs placeholder:text-neutral-400"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#12382C]/10 overflow-hidden transition-all duration-200 shadow-2xs hover:border-[#12382C]/30"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#12382C]">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#F4F1E8] flex items-center justify-center shrink-0 text-[#12382C]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#1B211E]/80 leading-relaxed border-t border-neutral-100 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-neutral-100 text-sm text-neutral-500">
              No encontramos preguntas relacionadas con "{searchQuery}". Podés consultarnos directamente.
            </div>
          )}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center text-xs text-[#1B211E]/70">
          ¿Tenés una consulta específica sobre tu parque?{' '}
          <a
            href={getWhatsAppLink('Hola, tengo una pregunta sobre sus servicios que no encontré en la sección FAQ.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#12382C] font-semibold underline underline-offset-4 hover:text-[#1C4A38]"
          >
            Escribinos directamente a nuestro WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
