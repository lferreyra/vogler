import React from 'react';

export const ComparisonSection: React.FC = () => {
  const comparisonRows = [
    {
      aspect: 'Regularidad y Compromiso',
      occasional: 'Visitas esporádicas sin fecha fija, supeditadas al tiempo libre.',
      vogler: 'Cronograma estandarizado coordinado con anticipación en tu agenda.'
    },
    {
      aspect: 'Planificación Estacional',
      occasional: 'Mismo tratamiento todo el año sin considerar ciclos biológicos.',
      vogler: 'Ajuste de altura de corte, fertilización y podas según la estación.'
    },
    {
      aspect: 'Herramientas y Calibración',
      occasional: 'Cuchillas desgastadas que desgarran la hoja y dejan puntas amarillas.',
      vogler: 'Maquinaria con filo de precisión y herramientas botánicas sanitizadas.'
    },
    {
      aspect: 'Cuidado y Protección',
      occasional: 'Sin protección en zonas vidriadas o ante eventuales roturas.',
      vogler: 'Lonas de contención y seguro directo por rotura de cristales.'
    },
    {
      aspect: 'Terminación y Limpieza',
      occasional: 'Pasto barrido superficialmente con restos en veredas y canteros.',
      vogler: 'Bordes milimétricos, soplado completo de galerías y retiro de restos.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Criterio Profesional
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#12382C]">
            ¿Qué diferencia a un servicio profesional?
          </h2>
          <p className="text-sm sm:text-base text-[#1B211E]/75">
            Una comparativa objetiva sobre el impacto de un cuidado metódico en la salud de tu parque.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-sm overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#12382C] text-white p-5 md:p-6 text-sm font-semibold">
            <div className="md:col-span-4 uppercase tracking-wider text-xs text-[#8FA58D]">
              Criterio de Evaluación
            </div>
            <div className="hidden md:block md:col-span-4 text-[#DCE5D8]">
              Mantenimiento Ocasional
            </div>
            <div className="hidden md:block md:col-span-4 text-white flex items-center gap-2">
              <span>VOGLER Planificado</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral-100">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 md:p-6 gap-4 items-center hover:bg-[#F4F1E8]/30 transition-colors"
              >
                {/* Aspect Column */}
                <div className="md:col-span-4">
                  <h4 className="font-display text-base font-bold text-[#12382C]">
                    {row.aspect}
                  </h4>
                </div>

                {/* Occasional */}
                <div className="md:col-span-4 text-xs sm:text-sm text-[#1B211E]/70 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <span className="md:hidden block font-semibold text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                    Mantenimiento Ocasional:
                  </span>
                  {row.occasional}
                </div>

                {/* VOGLER */}
                <div className="md:col-span-4 text-xs sm:text-sm text-[#12382C] font-medium bg-[#12382C]/5 md:bg-transparent p-3 md:p-0 rounded-xl border-l-2 md:border-l-0 border-[#12382C]">
                  <span className="md:hidden block font-bold text-[11px] uppercase tracking-wider text-[#12382C] mb-1">
                    VOGLER Planificado:
                  </span>
                  {row.vogler}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
