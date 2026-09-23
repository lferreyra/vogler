import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import {
  MapPin,
  Calendar,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Sparkles,
  MessageCircle,
  Layers,
  LayoutGrid
} from 'lucide-react';

export const ProjectsPortfolio: React.FC = () => {
  const { projects, openQuoteModal, getWhatsAppLink } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [expandedProjectId, setExpandedProjectId] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [accordionMode, setAccordionMode] = useState<'horizontal' | 'vertical'>('horizontal');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'corte-de-cesped', label: 'Corte de césped' },
    { id: 'poda', label: 'Poda' },
    { id: 'diseno', label: 'Diseño' },
    { id: 'paisajismo', label: 'Paisajismo' }
  ];

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Initialize and keep valid expanded project
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some(p => p.id === expandedProjectId);
      if (!exists) {
        setExpandedProjectId(filteredProjects[0].id);
      }
    }
  }, [activeCategory, filteredProjects, expandedProjectId]);

  return (
    <section id="proyectos" className="py-24 md:py-32 bg-[#FAFAF7] relative border-t border-[#12382C]/5 overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8FA58D]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12382C]/10 text-[#12382C] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8FA58D]" />
              <span>Galería de Obras & Portafolio</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382C] tracking-tight leading-tight">
              Trabajos que hablan por nosotros.
            </h2>
            
            <p className="text-sm sm:text-base text-[#1B211E]/75 leading-relaxed">
              Explorá nuestras obras en formato acordeón interactivo. Hacé clic en cualquier tarjeta para expandir los detalles de mantenimiento, poda y paisajismo en countries y residencias.
            </p>
          </div>

          {/* Controls: Mode Switcher & Category Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle (Desktop only) */}
            <div className="hidden md:flex items-center p-1 bg-[#F4F1E8] rounded-xl border border-black/5 text-xs">
              <button
                onClick={() => setAccordionMode('horizontal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  accordionMode === 'horizontal'
                    ? 'bg-[#12382C] text-white shadow-2xs'
                    : 'text-[#1B211E]/70 hover:text-[#12382C]'
                }`}
                title="Acordeón Horizontal Extensible"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Horizontal</span>
              </button>
              <button
                onClick={() => setAccordionMode('vertical')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  accordionMode === 'vertical'
                    ? 'bg-[#12382C] text-white shadow-2xs'
                    : 'text-[#1B211E]/70 hover:text-[#12382C]'
                }`}
                title="Acordeón Vertical Desplegable"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Vertical</span>
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F4F1E8] rounded-xl overflow-x-auto max-w-full no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus:outline-hidden ${
                    activeCategory === cat.id
                      ? 'bg-[#12382C] text-[#F4F1E8] shadow-xs'
                      : 'text-[#1B211E]/70 hover:text-[#12382C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP/TABLET: HORIZONTAL EXPANDING ACCORDION PANELS     */}
        {/* ======================================================== */}
        {accordionMode === 'horizontal' ? (
          <div className="hidden md:flex flex-row gap-3 lg:gap-4 h-[560px] w-full items-stretch">
            {filteredProjects.map((proj) => {
              const isExpanded = proj.id === expandedProjectId;

              return (
                <div
                  key={proj.id}
                  onClick={() => setExpandedProjectId(proj.id)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none flex flex-col justify-between ${
                    isExpanded
                      ? 'flex-[3.8] shadow-2xl ring-2 ring-[#12382C]/25'
                      : 'flex-1 min-w-[76px] lg:min-w-[88px] opacity-90 hover:opacity-100 hover:scale-[1.01] bg-neutral-900'
                  }`}
                >
                  {/* Full Cover Image */}
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isExpanded ? 'scale-100' : 'scale-110 filter brightness-75'
                    }`}
                  />

                  {/* Shading Overlays */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? 'bg-gradient-to-t from-black/90 via-black/40 to-black/20'
                        : 'bg-black/55 hover:bg-black/40'
                    }`}
                  />

                  {/* EXPANDED CONTENT VIEW */}
                  {isExpanded ? (
                    <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between animate-in fade-in duration-500">
                      
                      {/* Top Bar inside expanded card */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
                            {proj.serviceTitle}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-[#F4F1E8] text-xs font-mono border border-white/10">
                            {proj.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-white/90 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-[#8FA58D]" />
                          <span>{proj.location}</span>
                        </div>
                      </div>

                      {/* Bottom Info inside expanded card */}
                      <div className="space-y-4 max-w-2xl">
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                          {proj.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#F4F1E8]/90 leading-relaxed max-w-xl">
                          {proj.description}
                        </p>

                        {/* Highlights Tags */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {proj.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white border border-white/15 font-medium"
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuoteModal(proj.serviceTitle);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F0] text-[#12382C] font-semibold text-xs hover:bg-white transition-all shadow-lg active:scale-95"
                          >
                            <span>Quiero un trabajo similar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={getWhatsAppLink(`Hola, estuve viendo la obra "${proj.title}" en su web y me interesa un servicio similar para mi jardín.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 text-xs font-medium hover:bg-black/60 transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>Consultar WhatsApp</span>
                          </a>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(proj);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full text-white/80 hover:text-white text-xs font-medium transition-colors"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span className="underline underline-offset-4">Ver foto completa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED SLICE VIEW */
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between items-center text-center">
                      {/* Year badge */}
                      <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
                        {proj.year}
                      </span>

                      {/* Vertical Title Label */}
                      <div className="flex items-center justify-center flex-1 my-4">
                        <span
                          className="text-white font-display text-lg lg:text-xl font-bold tracking-wider whitespace-nowrap opacity-90 transition-opacity group-hover:opacity-100"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)'
                          }}
                        >
                          {proj.title}
                        </span>
                      </div>

                      {/* Expand Icon Indicator */}
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20 group-hover:bg-[#12382C] group-hover:text-white transition-all shadow-xs">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* ======================================================== */}
        {/* VERTICAL ACCORDION (Always on Mobile & Toggle on Desktop) */}
        {/* ======================================================== */}
        <div className={`${accordionMode === 'horizontal' ? 'md:hidden' : ''} space-y-4`}>
          {filteredProjects.map((proj) => {
            const isExpanded = proj.id === expandedProjectId;

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#12382C]/10 shadow-xs transition-all duration-300"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setExpandedProjectId(isExpanded ? '' : proj.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#FAF7F0]/60 transition-colors focus:outline-hidden"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Small thumbnail preview */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#DCE5D8] shrink-0 border border-black/5">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-[#8FA58D] uppercase tracking-wider truncate">
                          {proj.serviceTitle}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">· {proj.year}</span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#12382C] truncate">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#8FA58D] shrink-0" />
                        <span>{proj.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Chevron Toggle Button */}
                  <div
                    className={`w-10 h-10 rounded-full border border-[#12382C]/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-[#12382C] text-white' : 'bg-white text-[#12382C]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Expandable Body */}
                {isExpanded && (
                  <div className="border-t border-neutral-100 p-5 sm:p-7 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Large Featured Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xs">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 hover:bg-black/80 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Ampliar foto</span>
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#1B211E]/80 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Highlights tags */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-[#12382C] uppercase tracking-wider">
                        Aspectos destacados de la obra:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 bg-[#F4F1E8] text-[#12382C] rounded-lg font-medium border border-[#12382C]/5"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call to action buttons */}
                    <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        onClick={() => openQuoteModal(proj.serviceTitle)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38] transition-all shadow-xs"
                      >
                        <span>Quiero un trabajo similar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getWhatsAppLink(`Hola, estuve viendo la obra "${proj.title}" en su web y quisiera consultar por un trabajo similar.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#25D366] text-[#12382C] hover:bg-[#25D366]/10 text-xs font-semibold transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>Consultar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal / Lightbox for detailed high-resolution inspection */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-neutral-800 flex items-center justify-center hover:bg-white shadow-md transition-all"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8FA58D] uppercase tracking-wider">
                    {selectedProject.serviceTitle}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8FA58D]" /> {selectedProject.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8FA58D]" /> {selectedProject.year}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#12382C]">
                  {selectedProject.title}
                </h3>

                <p className="text-sm text-[#1B211E]/80 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-bold text-[#12382C] uppercase tracking-wider mb-2">
                    Características destacadas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-[#F4F1E8] text-[#12382C] rounded-md font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      openQuoteModal(selectedProject.serviceTitle);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38] transition-all"
                  >
                    <span>Quiero un trabajo similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsPortfolio;
