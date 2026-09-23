import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { getWhatsAppLink } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on Desktop */}
      <div
        className={`hidden sm:flex items-center bg-white text-[#12382C] px-3.5 py-2 rounded-xl text-xs font-medium shadow-lg border border-neutral-200/80 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span>¿Dudas? Escribinos por WhatsApp</span>
        <div className="w-2 h-2 bg-white border-t border-r border-neutral-200/80 rotate-45 ml-2 -mr-4" />
      </div>

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar por WhatsApp a VOGLER"
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Soft pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        <MessageCircle className="w-7 h-7 fill-white text-transparent relative z-10" />
      </a>
    </div>
  );
};
