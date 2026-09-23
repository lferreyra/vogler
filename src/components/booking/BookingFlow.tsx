import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AVAILABLE_TIME_SLOTS } from '../../data/initialData';
import { Service, Booking } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Scissors,
  TreePine,
  Compass,
  Trees,
  UserCheck
} from 'lucide-react';

export const BookingFlow: React.FC = () => {
  const {
    services,
    currentUser,
    openAuthModal,
    createBooking,
    blockedDates,
    scheduleConfig,
    navigateTo,
    getWhatsAppLink
  } = useApp();

  // Wizard Step State
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Available slots from scheduleConfig
  const activeSlots = (scheduleConfig?.timeSlots?.filter(s => s.isActive) || []).map(s => s.slot);
  const availableTimeSlots = activeSlots.length > 0 ? activeSlots : AVAILABLE_TIME_SLOTS;

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'corte-cesped');
  const [street, setStreet] = useState<string>(currentUser?.addresses[0]?.street || 'Av. Laplace');
  const [number, setNumber] = useState<string>(currentUser?.addresses[0]?.number || '5420');
  const [neighborhood, setNeighborhood] = useState<string>(currentUser?.addresses[0]?.neighborhood || 'Villa Belgrano');
  const [city, setCity] = useState<string>(currentUser?.addresses[0]?.city || 'Córdoba');
  const [propertyType, setPropertyType] = useState<string>('Casa particular');
  const [gardenSize, setGardenSize] = useState<string>('Hasta 400 m²');
  const [notes, setNotes] = useState<string>('');

  // Selected Date: Next available weekday
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(() => availableTimeSlots[0] || '08:30 - 11:00');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  // Helper to generate dynamic days ahead for selection based on scheduleConfig
  const daysAhead = scheduleConfig?.maxBookingDaysAhead || 14;
  const upcomingDays = Array.from({ length: daysAhead }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const dateString = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.

    const isWorkingDay = scheduleConfig?.workingDays ? scheduleConfig.workingDays.includes(dayOfWeek) : dayOfWeek !== 0;
    const blockedItem = scheduleConfig?.blockedDatesList?.find(b => b.date === dateString);
    const isExplicitlyBlocked = blockedDates.includes(dateString) || !!blockedItem;
    const isBlocked = !isWorkingDay || isExplicitlyBlocked;

    const dayName = date.toLocaleDateString('es-AR', { weekday: 'short' });
    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString('es-AR', { month: 'short' });

    let blockedReason = 'Fecha no disponible';
    if (!isWorkingDay) {
      blockedReason = dayOfWeek === 0 ? 'Domingo no laborable' : 'Día de descanso de cuadrilla';
    } else if (blockedItem?.reason) {
      blockedReason = blockedItem.reason;
    } else if (blockedDates.includes(dateString)) {
      blockedReason = 'Mantenimiento o cupo completo';
    }

    return {
      dateString,
      dayName,
      dayNum,
      monthName,
      isBlocked,
      blockedReason
    };
  });

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      if (!street || !neighborhood) {
        alert('Por favor completá los datos de tu dirección.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate || !selectedTimeSlot) {
        alert('Por favor seleccioná fecha y horario.');
        return;
      }
      setStep(4);
    }
  };

  const handleConfirm = () => {
    if (!currentUser) {
      // Must be logged in
      openAuthModal('login');
      return;
    }

    const newBooking = createBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: currentUser.phone || '+54 351 555-0000',
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      address: {
        street,
        number,
        neighborhood,
        city
      },
      gardenSize,
      propertyType,
      notes
    });

    setConfirmedBooking(newBooking);
    setStep(5);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scissors': return Scissors;
      case 'TreePine': return TreePine;
      case 'Compass': return Compass;
      default: return Trees;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wizard Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D] mb-1">
            Sistema de Turnos Online
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12382C]">
            Reservá tu servicio en VOGLER
          </h1>
          <p className="text-sm text-[#1B211E]/75 mt-2">
            Completá los 4 pasos y coordiná la visita de nuestra cuadrilla con seguro por rotura de cristales incluido.
          </p>
        </div>

        {/* Steps Progress Indicator (Anti-slop compliant) */}
        {step < 5 && (
          <div className="mb-10 bg-white p-4 rounded-2xl border border-[#12382C]/10 shadow-2xs">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { s: 1, label: '1. Servicio' },
                { s: 2, label: '2. Dirección' },
                { s: 3, label: '3. Fecha y Turno' },
                { s: 4, label: '4. Confirmación' },
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => item.s < step && setStep(item.s as any)}
                  disabled={item.s > step}
                  className={`py-2 px-1 rounded-xl font-medium transition-all ${
                    step === item.s
                      ? 'bg-[#12382C] text-white shadow-xs font-semibold'
                      : step > item.s
                      ? 'bg-[#12382C]/10 text-[#12382C]'
                      : 'text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Confirmation Success Screen */}
        {step === 5 && confirmedBooking && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#12382C]/10 shadow-lg max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold bg-[#F4F1E8] px-3 py-1 rounded-md text-[#12382C]">
                Código: {confirmedBooking.id}
              </span>
              <h2 className="font-display text-3xl font-bold text-[#12382C]">
                ¡Solicitud de turno recibida!
              </h2>
              <p className="text-sm text-[#1B211E]/75">
                Hemos registrado tu reserva para <strong>{confirmedBooking.serviceTitle}</strong> el día <strong>{confirmedBooking.date}</strong> en la franja de <strong>{confirmedBooking.timeSlot}</strong>.
              </p>
            </div>

            <div className="bg-[#FAFAF7] rounded-2xl p-5 text-left border border-neutral-100 text-xs space-y-2 text-[#1B211E]/80">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Dirección:</span>
                <span className="font-semibold text-[#12382C]">
                  {confirmedBooking.address.street} {confirmedBooking.address.number}, {confirmedBooking.address.neighborhood}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500">Cliente:</span>
                <span className="font-semibold text-[#12382C]">{confirmedBooking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estado inicial:</span>
                <span className="font-semibold text-amber-700 uppercase tracking-wider text-[11px]">
                  Pendiente de confirmación
                </span>
              </div>
            </div>

            {scheduleConfig?.showDelayNotice && (
              <div className="bg-[#FAF7F0] border border-[#D9B26A]/40 rounded-2xl p-4 text-left flex items-start gap-3 text-xs text-neutral-700">
                <Clock className="w-4 h-4 text-[#8C6D1F] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-[#12382C] block">Tolerancia de inicio (±{scheduleConfig.delayNoticeMinutes || 15} min):</span>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    {scheduleConfig.delayNoticeMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38] transition-all"
              >
                Ver en Mi Panel de Reservas
              </button>

              <a
                href={getWhatsAppLink(`Hola, acabo de realizar la reserva ${confirmedBooking.id} para ${confirmedBooking.serviceTitle} el ${confirmedBooking.date}. ¿Podrían confirmarme los detalles?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#25D366] text-[#12382C] hover:bg-[#25D366]/10 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Avisar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Wizard Main Layout (Steps 1 to 4) */}
        {step < 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Area (Steps 1 to 4) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs space-y-8">
              
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#12382C]">
                      Paso 1: Seleccioná el servicio
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Elegí la tarea principal que requerís en tu espacio verde.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((srv: Service) => {
                      const Icon = getIcon(srv.icon);
                      const isSelected = selectedServiceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#12382C] bg-[#F4F1E8]/60 shadow-sm ring-1 ring-[#12382C]'
                              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#12382C]">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-500">
                              {srv.estimatedDuration}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-display text-lg font-bold text-[#12382C]">
                              {srv.title}
                            </h3>
                            <p className="text-xs text-[#1B211E]/70 mt-1 line-clamp-2">
                              {srv.shortDesc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Address & Property Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#12382C]">
                      Paso 2: Datos del espacio y ubicación
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Indicanos dónde realizaremos la tarea para planificar la cuadrilla y equipos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Calle / Avenida *
                      </label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Ej: Av. Laplace"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Número / Lote / Dpto *
                      </label>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Ej: 5420 o Manzana 4 Lote 12"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Barrio / Country *
                      </label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Ej: Villa Belgrano, Las Delicias..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Ciudad / Localidad
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Tipo de propiedad
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      >
                        <option value="Casa particular">Casa particular / Residencial</option>
                        <option value="Country / Barrio Privado">Country / Barrio Privado</option>
                        <option value="Comercio / Empresa">Comercio / Predio corporativo</option>
                        <option value="Edificio / Consorcio">Edificio / Consorcio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#12382C] mb-1">
                        Superficie aproximada de verde
                      </label>
                      <select
                        value={gardenSize}
                        onChange={(e) => setGardenSize(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                      >
                        <option value="Hasta 200 m²">Hasta 200 m² (Patio chico)</option>
                        <option value="200 a 500 m²">200 a 500 m² (Jardín estándar)</option>
                        <option value="500 a 1000 m²">500 a 1.000 m² (Parque mediano)</option>
                        <option value="Más de 1000 m²">Más de 1.000 m² (Parque grande / Chacra)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Native Calendar Picker */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#12382C]">
                      Paso 3: Seleccioná fecha y turno
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Agenda nativa en tiempo real. Los domingos y fechas bloqueadas por mantenimiento no están disponibles.
                    </p>
                  </div>

                  {/* Horizontal Scroll Day Picker */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#12382C]">
                      Próximos días disponibles:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      {upcomingDays.slice(0, 7).map((d) => (
                        <button
                          key={d.dateString}
                          disabled={d.isBlocked}
                          onClick={() => setSelectedDate(d.dateString)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            d.isBlocked
                              ? 'bg-neutral-100 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                              : selectedDate === d.dateString
                              ? 'bg-[#12382C] text-white border-[#12382C] shadow-md ring-2 ring-[#12382C]/30'
                              : 'bg-white border-neutral-200 hover:border-[#12382C] text-[#12382C]'
                          }`}
                        >
                          <span className="block text-[11px] uppercase tracking-wider font-semibold opacity-80">
                            {d.dayName}
                          </span>
                          <span className="block text-lg font-bold my-0.5">
                            {d.dayNum}
                          </span>
                          <span className="block text-[10px] opacity-75">
                            {d.monthName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Date Input Fallback */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#12382C] mb-1">
                      O elegí otra fecha en el calendario:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2 pt-4">
                    <label className="block text-xs font-semibold text-[#12382C]">
                      Franja horaria estimada de llegada:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableTimeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-[#12382C] text-white border-[#12382C] font-semibold'
                                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-[#12382C]'
                            }`}
                          >
                            <span className="text-xs sm:text-sm flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {slot}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Configurable delay notice banner */}
                    {scheduleConfig?.showDelayNotice && (
                      <div className="mt-4 bg-[#FAF7F0] border border-[#D9B26A]/40 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
                        <div className="w-8 h-8 rounded-full bg-[#E5C158]/20 text-[#8C6D1F] flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#12382C]">Aviso sobre horario de inicio</span>
                            <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-[#E5C158]/30 text-[#6B4F0B] rounded-full">
                              ±{scheduleConfig.delayNoticeMinutes || 15} min tolerancia
                            </span>
                          </div>
                          <p className="text-neutral-700 leading-relaxed text-[11px] sm:text-xs">
                            {scheduleConfig.delayNoticeMessage ||
                              'El turno puede demorarse unos 15 minutos en iniciar dependiendo las distancias y tráfico del turno anterior. Te avisamos por WhatsApp al salir.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Observations & Final Confirmation */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#12382C]">
                      Paso 4: Observaciones y confirmación
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Detalles para que el equipo llegue preparado (mascotas, aspersores, portón, etc.).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12382C] mb-1">
                      Observaciones o instrucciones especiales
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej: Hay un perro guardián, avisar 10 min antes por WhatsApp. Tener cuidado con cantero de orquídeas."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#12382C]"
                    />
                  </div>

                  {/* Authentication Banner / Gate */}
                  {!currentUser ? (
                    <div className="bg-[#F4F1E8] border border-[#12382C]/15 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#12382C]">
                        <UserCheck className="w-4 h-4" />
                        <span>Se requiere cuenta de usuario para confirmar la reserva</span>
                      </div>
                      <p className="text-xs text-[#1B211E]/75">
                        Para asociar tu visita y enviarte el recibo y estado de cuadrilla, ingresá o creá tu cuenta en 1 click.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => openAuthModal('login')}
                          className="px-4 py-2 bg-[#12382C] text-white rounded-lg text-xs font-semibold hover:bg-[#1C4A38]"
                        >
                          Iniciar sesión / Registro rápido
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                      <div>
                        <span>Reservando como: <strong>{currentUser.name}</strong> ({currentUser.email})</span>
                      </div>
                      <span className="font-semibold text-emerald-700">✓ Usuario verificado</span>
                    </div>
                  )}

                  {scheduleConfig?.showDelayNotice && (
                    <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#D9B26A]/40 text-xs text-neutral-700 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#8C6D1F] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#12382C]">Tolerancia estimada: </span>
                        <span>{scheduleConfig.delayNoticeMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#12382C] shrink-0 mt-0.5" />
                    <span>
                      Recordá que este turno incluye automáticamente el <strong>seguro por rotura de cristales</strong> y nuestra garantía de repaso sin cargo si algún sector requiere ajuste.
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as any)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38] shadow-sm transition-all"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#12382C] text-white text-xs font-bold hover:bg-[#1C4A38] shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>Confirmar mi reserva de turno</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>
                )}
              </div>

            </div>

            {/* Right Summary Sidebar (Desktop sticky / mobile block) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#12382C]/10 shadow-xs space-y-5 lg:sticky lg:top-24">
              <h3 className="font-display text-lg font-bold text-[#12382C] border-b border-neutral-100 pb-3">
                Resumen de tu Turno
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Servicio:</span>
                  <p className="font-bold text-[#12382C] text-sm">{selectedService.title}</p>
                </div>

                <div>
                  <span className="text-neutral-400 block mb-0.5">Ubicación:</span>
                  <p className="font-medium text-neutral-800">
                    {street} {number}, {neighborhood}, {city}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-400 block mb-0.5">Espacio y Tipo:</span>
                  <p className="font-medium text-neutral-800">
                    {propertyType} · {gardenSize}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-400 block mb-0.5">Fecha y Horario:</span>
                  <p className="font-bold text-[#12382C]">
                    {selectedDate} · {selectedTimeSlot}
                  </p>
                  {scheduleConfig?.showDelayNotice && (
                    <p className="text-[10px] text-amber-800 bg-[#FAF6EC] px-2 py-1 rounded mt-1.5 border border-[#D9B26A]/30">
                      ±{scheduleConfig.delayNoticeMinutes || 15} min tolerancia según traslados previos
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Seguro de cristales activado</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Herramientas profesionales</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
                ¿Necesitás coordinar algo urgente?{' '}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#12382C] underline font-semibold"
                >
                  Consultanos por WhatsApp
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
