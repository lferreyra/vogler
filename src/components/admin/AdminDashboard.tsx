import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, Service, FAQItem } from '../../types';
import {
  Calendar,
  Shield,
  Layers,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Lock,
  AlertTriangle,
  MessageCircle,
  Trash2,
  CalendarCheck,
  CalendarX,
  Sparkles,
  Info,
  MapPin,
  Phone,
  Sliders,
  Bell
} from 'lucide-react';

const WEEKDAYS = [
  { index: 1, name: 'Lunes', short: 'Lun' },
  { index: 2, name: 'Martes', short: 'Mar' },
  { index: 3, name: 'Miércoles', short: 'Mié' },
  { index: 4, name: 'Jueves', short: 'Jue' },
  { index: 5, name: 'Viernes', short: 'Vie' },
  { index: 6, name: 'Sábado', short: 'Sáb' },
  { index: 0, name: 'Domingo', short: 'Dom' }
];

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    updateBookingStatus,
    services,
    updateService,
    siteSettings,
    updateSiteSettings,
    faqs,
    addFAQ,
    leads,
    blockedDates,
    scheduleConfig,
    updateScheduleConfig,
    toggleWorkingDay,
    toggleTimeSlot,
    addTimeSlot,
    removeTimeSlot,
    addBlockedDateWithReason,
    removeBlockedDate,
    updateDelayNotice,
    createBooking,
    navigateTo,
    getWhatsAppLink
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'agenda' | 'reservas' | 'nueva-reserva' | 'servicios' | 'garantia' | 'leads' | 'faqs'
  >('agenda');

  const [statusFilter, setStatusFilter] = useState<string>('todos');

  // Form for manual booking
  const [manualClientName, setManualClientName] = useState('');
  const [manualClientPhone, setManualClientPhone] = useState('');
  const [manualServiceId, setManualServiceId] = useState(services[0]?.id || '');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualSlot, setManualSlot] = useState(scheduleConfig?.timeSlots?.[0]?.slot || '08:30 - 11:00');
  const [manualAddress, setManualAddress] = useState('');

  // Form for site settings
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  // New FAQ form
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Scheduling State
  const [newSlotInput, setNewSlotInput] = useState('');
  const [newSlotLabelInput, setNewSlotLabelInput] = useState('');
  const [dateToBlock, setDateToBlock] = useState('');
  const [blockReasonPreset, setBlockReasonPreset] = useState('Pronóstico de lluvias intensas');
  const [customBlockReason, setCustomBlockReason] = useState('');

  // Delay notice state
  const [delayMessageInput, setDelayMessageInput] = useState(scheduleConfig.delayNoticeMessage);
  const [delayMinutesInput, setDelayMinutesInput] = useState(scheduleConfig.delayNoticeMinutes || 15);
  const [delayEnabledInput, setDelayEnabledInput] = useState(scheduleConfig.showDelayNotice);
  const [delayNoticeSaveSuccess, setDelayNoticeSaveSuccess] = useState(false);

  if (currentUser?.role !== 'admin') {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#12382C] mb-2">
          Acceso Restringido al Administrador
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Esta vista está reservada para el equipo de administración de VOGLER.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 rounded-full bg-[#12382C] text-white text-xs font-semibold"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const filteredBookings = statusFilter === 'todos'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

  const handleManualBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualClientName || !manualAddress) return;

    createBooking({
      userId: `usr-manual-${Date.now()}`,
      userName: manualClientName,
      userEmail: 'manual@vogler.com',
      userPhone: manualClientPhone || '+54 351 000-0000',
      serviceId: manualServiceId,
      serviceTitle: services.find(s => s.id === manualServiceId)?.title || 'Servicio VOGLER',
      date: manualDate,
      timeSlot: manualSlot,
      address: {
        street: manualAddress,
        number: 'S/N',
        neighborhood: 'Zona Programada',
        city: 'Córdoba'
      },
      notes: 'Reserva cargada manualmente desde el panel de control.'
    });

    alert('Reserva manual creada con éxito.');
    setManualClientName('');
    setManualClientPhone('');
    setManualAddress('');
    setActiveTab('reservas');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    alert('Configuración de textos y garantías actualizada correctamente.');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ || !newFaqA) return;
    addFAQ({
      question: newFaqQ,
      answer: newFaqA,
      category: 'servicios'
    });
    setNewFaqQ('');
    setNewFaqA('');
    alert('Nueva pregunta frecuente añadida.');
  };

  const handleAddTimeSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotInput.trim()) return;
    addTimeSlot(newSlotInput.trim(), newSlotLabelInput.trim() || undefined);
    setNewSlotInput('');
    setNewSlotLabelInput('');
  };

  const handleBlockDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateToBlock) return;
    const finalReason = blockReasonPreset === 'Otro'
      ? (customBlockReason.trim() || 'Fecha no disponible')
      : blockReasonPreset;
    addBlockedDateWithReason(dateToBlock, finalReason);
    setDateToBlock('');
    setCustomBlockReason('');
  };

  const handleSaveDelayNotice = () => {
    updateDelayNotice(delayMessageInput, delayMinutesInput, delayEnabledInput);
    setDelayNoticeSaveSuccess(true);
    setTimeout(() => setDelayNoticeSaveSuccess(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#12382C] text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8FA58D] mb-1">
              <Shield className="w-4 h-4" />
              <span>Panel de Control Administrativo</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Configuración & Operaciones VOGLER
            </h1>
            <p className="text-xs text-[#DCE5D8] mt-1 max-w-xl">
              Configurá las fechas y horarios disponibles, el mensaje de tolerancia de inicio para clientes, y gestioná las reservas activas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8FA58D]" />
              Turnos: <strong>{bookings.length}</strong>
            </span>
            <span className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8FA58D]" />
              Franjas activas: <strong>{scheduleConfig.timeSlots.filter(s => s.isActive).length}</strong>
            </span>
            <span className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#8FA58D]" />
              Consultas web: <strong>{leads.length}</strong>
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F4F1E8] rounded-2xl mb-8 overflow-x-auto max-w-full">
          {[
            { id: 'agenda', label: 'Fechas, Horarios & Tolerancia', icon: Clock },
            { id: 'reservas', label: `Reservas (${bookings.length})`, icon: Calendar },
            { id: 'nueva-reserva', label: '+ Cargar Reserva', icon: Plus },
            { id: 'servicios', label: 'Servicios', icon: Layers },
            { id: 'garantia', label: 'Seguro & Contacto', icon: Shield },
            { id: 'leads', label: `Consultas Web (${leads.length})`, icon: MessageCircle },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#12382C] text-white shadow-xs'
                    : 'text-[#12382C]/70 hover:text-[#12382C] hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AGENDA, HORARIOS & AVISO DE TOLERANCIA */}
        {activeTab === 'agenda' && (
          <div className="space-y-8">
            
            {/* 1. SECCIÓN AVISO DE TOLERANCIA / DEMORA AL CLIENTE */}
            <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#FAF6EC] text-[#8C6D1F]">
                      <Bell className="w-4 h-4" />
                    </span>
                    <h2 className="font-display text-xl font-bold text-[#12382C]">
                      Aviso de Tolerancia de Inicio del Turno
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Configurá el mensaje explicativo para que el cliente comprenda que el turno puede demorarse unos 15 minutos en comenzar según las distancias del turno anterior.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={delayEnabledInput}
                      onChange={(e) => setDelayEnabledInput(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#12382C]"></div>
                    <span className="ml-3 text-xs font-bold text-[#12382C]">
                      {delayEnabledInput ? 'Aviso Activo' : 'Aviso Desactivado'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Inputs */}
                <div className="lg:col-span-7 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1.5">
                      Margen de tolerancia estimado:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[10, 15, 20, 25, 30].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setDelayMinutesInput(mins)}
                          className={`px-3.5 py-1.5 rounded-xl font-semibold border transition-all ${
                            delayMinutesInput === mins
                              ? 'bg-[#12382C] text-white border-[#12382C]'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          ±{mins} minutos {mins === 15 && '(Recomendado)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1.5">
                      Mensaje que verá el cliente durante la reserva y confirmación:
                    </label>
                    <textarea
                      rows={4}
                      value={delayMessageInput}
                      onChange={(e) => setDelayMessageInput(e.target.value)}
                      placeholder="Escribí aquí la aclaración sobre puntualidad y distancias..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#12382C] focus:outline-hidden"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Este mensaje aparecerá en la selección de horarios, en el paso final de confirmación y en el comprobante del cliente.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveDelayNotice}
                      className="px-6 py-2.5 rounded-full bg-[#12382C] text-white font-semibold hover:bg-[#1C4A38] transition-all text-xs flex items-center gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Guardar Mensaje de Tolerancia</span>
                    </button>

                    {delayNoticeSaveSuccess && (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ¡Guardado con éxito!
                      </span>
                    )}
                  </div>
                </div>

                {/* Live Preview Box */}
                <div className="lg:col-span-5 bg-[#FAFAF7] p-5 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Vista previa para el cliente
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-neutral-200 font-mono text-neutral-600">
                      {delayEnabledInput ? 'Visible' : 'Oculto'}
                    </span>
                  </div>

                  {delayEnabledInput ? (
                    <div className="bg-[#FAF7F0] border border-[#D9B26A]/40 rounded-2xl p-4 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#E5C158]/20 text-[#8C6D1F] flex items-center justify-center shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-[#12382C] text-xs">
                          Aviso sobre horario de inicio
                        </span>
                        <span className="ml-auto inline-block px-2 py-0.5 text-[10px] font-bold bg-[#E5C158]/30 text-[#6B4F0B] rounded-full">
                          ±{delayMinutesInput} min
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-700 leading-relaxed pl-9">
                        {delayMessageInput || 'Aviso de puntualidad no definido.'}
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-neutral-400 border border-dashed border-neutral-300 rounded-xl">
                      El aviso está desactivado. No se mostrará a los clientes.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. SECCIÓN FRANJAS HORARIAS Y DÍAS DE LA SEMANA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Columna Izquierda: Franjas Horarias */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 space-y-6">
                <div className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#12382C]">
                      Franjas Horarias (Turnos Disponibles)
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Habilitá o pausá los turnos que los clientes pueden seleccionar al reservar.
                    </p>
                  </div>
                </div>

                {/* Lista de Turnos */}
                <div className="space-y-2.5">
                  {scheduleConfig.timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        slot.isActive
                          ? 'bg-white border-neutral-200'
                          : 'bg-neutral-50 border-neutral-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleTimeSlot(slot.id)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            slot.isActive ? 'bg-[#12382C] text-white' : 'bg-neutral-200 text-neutral-500'
                          }`}
                        >
                          {slot.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </button>
                        <div>
                          <p className="font-bold text-xs text-[#12382C] flex items-center gap-2">
                            <span>{slot.slot}</span>
                            {slot.label && (
                              <span className="text-[10px] font-normal px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                                {slot.label}
                              </span>
                            )}
                          </p>
                          <span className="text-[10px] text-neutral-400">
                            {slot.isActive ? 'Disponible para reservas' : 'Pausado temporalmente'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleTimeSlot(slot.id)}
                          className="text-xs font-semibold text-[#12382C] hover:underline px-2 py-1"
                        >
                          {slot.isActive ? 'Pausar' : 'Activar'}
                        </button>
                        {scheduleConfig.timeSlots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(slot.id)}
                            className="text-neutral-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Eliminar franja horaria"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulario para Agregar Nuevo Turno */}
                <form onSubmit={handleAddTimeSlotSubmit} className="pt-4 border-t border-neutral-100 space-y-3">
                  <h4 className="text-xs font-bold text-[#12382C] uppercase tracking-wider">
                    + Agregar nueva franja horaria
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-neutral-600 mb-1">Horario (ej: 07:30 - 10:00) *</label>
                      <input
                        type="text"
                        required
                        value={newSlotInput}
                        onChange={(e) => setNewSlotInput(e.target.value)}
                        placeholder="07:30 - 10:00"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1">Etiqueta opcional (ej: Turno Temprano)</label>
                      <input
                        type="text"
                        value={newSlotLabelInput}
                        onChange={(e) => setNewSlotLabelInput(e.target.value)}
                        placeholder="Ej. Primer turno mañana"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#12382C] text-white font-semibold text-xs hover:bg-[#1C4A38] transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Franja Horaria</span>
                  </button>
                </form>
              </div>

              {/* Columna Derecha: Días Laborales y Antelación */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Días de la semana */}
                <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#12382C]">
                      Días de Atención Semanal
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Hacé click para habilitar o deshabilitar días de trabajo en el calendario.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {WEEKDAYS.map((day) => {
                      const isWorking = scheduleConfig.workingDays.includes(day.index);
                      return (
                        <button
                          key={day.index}
                          type="button"
                          onClick={() => toggleWorkingDay(day.index)}
                          className={`px-4 py-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                            isWorking
                              ? 'bg-white border-[#12382C]/30 text-[#12382C] shadow-2xs'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${isWorking ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
                            <span className="font-bold text-xs">{day.name}</span>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isWorking ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                          }`}>
                            {isWorking ? 'Turnos abiertos' : 'Cerrado'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Antelación Máxima */}
                <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 space-y-3 text-xs">
                  <h3 className="font-display text-base font-bold text-[#12382C]">
                    Ventana de Reserva Anticipada
                  </h3>
                  <p className="text-neutral-500 text-xs">
                    ¿Cuántos días hacia adelante pueden elegir los clientes en el calendario?
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[7, 14, 21, 30].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => updateScheduleConfig({ ...scheduleConfig, maxBookingDaysAhead: days })}
                        className={`px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                          (scheduleConfig.maxBookingDaysAhead || 14) === days
                            ? 'bg-[#12382C] text-white border-[#12382C]'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        {days} días {days === 14 && '(Default)'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* 3. SECCIÓN BLOQUEO DE FECHAS ESPECÍFICAS (LLUVIA, FERIADOS, ETC.) */}
            <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-red-50 text-red-700">
                    <CalendarX className="w-4 h-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#12382C]">
                    Bloqueo de Fechas Específicas (Lluvias, Feriados o Mantenimiento)
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Las fechas bloqueadas no permitirán reservas en el sistema. Los clientes verán el motivo si intentan seleccionarla.
                </p>
              </div>

              {/* Formulario de Bloqueo */}
              <form onSubmit={handleBlockDateSubmit} className="bg-[#FAFAF7] p-5 rounded-2xl border border-neutral-200 space-y-4 text-xs">
                <h4 className="font-bold text-[#12382C] uppercase tracking-wider">
                  Bloquear un nuevo día en la agenda
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Fecha a bloquear *</label>
                    <input
                      type="date"
                      required
                      value={dateToBlock}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDateToBlock(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Motivo del bloqueo</label>
                    <select
                      value={blockReasonPreset}
                      onChange={(e) => setBlockReasonPreset(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                    >
                      <option value="Pronóstico de lluvias intensas">Pronóstico de lluvias intensas</option>
                      <option value="Mantenimiento de maquinaria y vehículos">Mantenimiento de maquinaria</option>
                      <option value="Feriado no laborable">Feriado no laborable</option>
                      <option value="Capacitación de personal y cuadrillas">Capacitación de cuadrillas</option>
                      <option value="Capacidad operativa completa">Capacidad operativa completa</option>
                      <option value="Otro">Otro motivo personalizado...</option>
                    </select>
                  </div>

                  {blockReasonPreset === 'Otro' && (
                    <div>
                      <label className="block text-neutral-600 font-semibold mb-1">Escribir motivo personalizado</label>
                      <input
                        type="text"
                        value={customBlockReason}
                        onChange={(e) => setCustomBlockReason(e.target.value)}
                        placeholder="Ej: Evento interno de la empresa"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-semibold transition-all flex items-center gap-2 shadow-xs"
                >
                  <CalendarX className="w-3.5 h-3.5" />
                  <span>Bloquear esta fecha en la agenda</span>
                </button>
              </form>

              {/* Lista de Fechas Bloqueadas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Fechas actualmente bloqueadas ({scheduleConfig.blockedDatesList.length}):
                </h4>

                {scheduleConfig.blockedDatesList.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic py-2">
                    No hay fechas bloqueadas actualmente. La agenda está disponible según los días laborales configurados.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {scheduleConfig.blockedDatesList.map((item) => (
                      <div
                        key={item.date}
                        className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-red-900">{item.date}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-semibold">
                              Bloqueado
                            </span>
                          </div>
                          <p className="text-[11px] text-red-700 leading-snug">
                            {item.reason}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeBlockedDate(item.date)}
                          className="text-red-500 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                          title="Desbloquear fecha"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: GESTIÓN DE RESERVAS */}
        {activeTab === 'reservas' && (
          <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-[#12382C]">
                  Listado de Turnos Solicitados
                </h2>
                <p className="text-xs text-neutral-500">
                  Actualizá el estado de la visita y asigná la cuadrilla responsable.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500 font-semibold">Filtrar:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-300 bg-white font-medium"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-3">Código</th>
                    <th className="py-3.5 px-3">Cliente</th>
                    <th className="py-3.5 px-3">Servicio</th>
                    <th className="py-3.5 px-3">Fecha & Turno</th>
                    <th className="py-3.5 px-3">Ubicación</th>
                    <th className="py-3.5 px-3">Estado</th>
                    <th className="py-3.5 px-3">Cuadrilla Asignada</th>
                    <th className="py-3.5 px-3 text-right">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-[#12382C]">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-neutral-900">{b.userName}</p>
                        <p className="text-neutral-500 text-[11px]">{b.userPhone}</p>
                      </td>
                      <td className="py-3.5 px-3 font-medium text-neutral-800">
                        {b.serviceTitle}
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-neutral-900">{b.date}</p>
                        <p className="text-neutral-500 text-[11px]">{b.timeSlot}</p>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-600 max-w-[160px] truncate">
                        {b.address.street} {b.address.number}, {b.address.neighborhood}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className="px-2 py-1 rounded-md text-[11px] font-semibold border border-neutral-300 bg-white"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmada">Confirmada</option>
                          <option value="en_proceso">En proceso</option>
                          <option value="completada">Completada</option>
                          <option value="cancelada">Cancelada</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-3">
                        <input
                          type="text"
                          defaultValue={b.assignedCrew || ''}
                          placeholder="Asignar cuadrilla..."
                          onBlur={(e) => updateBookingStatus(b.id, b.status, e.target.value)}
                          className="px-2 py-1 rounded-md border border-neutral-300 text-[11px] w-32 focus:ring-1 focus:ring-[#12382C]"
                        />
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <a
                          href={`https://wa.me/${b.userPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hola ${b.userName}, te contactamos de VOGLER sobre tu reserva ${b.id} para ${b.serviceTitle} el día ${b.date}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold text-[11px]"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-neutral-400 italic">
                        No hay reservas con el filtro seleccionado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CARGA MANUAL DE RESERVA */}
        {activeTab === 'nueva-reserva' && (
          <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 max-w-2xl space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#12382C]">
                Cargar Turno Manual (Llamada o WhatsApp)
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Registrá visitas tomadas de forma telefónica o presencial directamente en la agenda operativa.
              </p>
            </div>

            <form onSubmit={handleManualBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Nombre completo del cliente *</label>
                  <input
                    type="text"
                    required
                    value={manualClientName}
                    onChange={(e) => setManualClientName(e.target.value)}
                    placeholder="Ej. Martín Rodríguez"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={manualClientPhone}
                    onChange={(e) => setManualClientPhone(e.target.value)}
                    placeholder="+54 351 555-0123"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Servicio requerido</label>
                  <select
                    value={manualServiceId}
                    onChange={(e) => setManualServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Fecha programada</label>
                  <input
                    type="date"
                    required
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Franja horaria</label>
                  <select
                    value={manualSlot}
                    onChange={(e) => setManualSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    {scheduleConfig.timeSlots.filter(s => s.isActive).map(s => (
                      <option key={s.id} value={s.slot}>{s.slot} {s.label ? `(${s.label})` : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Dirección y Barrio *</label>
                  <input
                    type="text"
                    required
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder="Ej: Recta Martinoli 7200, Villa Belgrano"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#12382C] text-white font-semibold hover:bg-[#1C4A38] transition-all shadow-md text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agendar y Guardar Reserva</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: SERVICIOS */}
        {activeTab === 'servicios' && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-[#12382C]">
              Gestión de Catálogo de Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-white rounded-2xl p-6 border border-[#12382C]/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[#12382C]">{srv.title}</h3>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={srv.isActive}
                        onChange={(e) => updateService({ ...srv, isActive: e.target.checked })}
                        className="rounded-sm text-[#12382C]"
                      />
                      <span>{srv.isActive ? 'Activo' : 'Inactivo'}</span>
                    </label>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-neutral-500 font-semibold mb-0.5">Descripción corta:</label>
                      <textarea
                        rows={2}
                        defaultValue={srv.shortDesc}
                        onBlur={(e) => updateService({ ...srv, shortDesc: e.target.value })}
                        className="w-full p-2 border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 font-semibold mb-0.5">Mensaje predeterminado de WhatsApp:</label>
                      <input
                        type="text"
                        defaultValue={srv.whatsappMessage}
                        onBlur={(e) => updateService({ ...srv, whatsappMessage: e.target.value })}
                        className="w-full p-2 border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SEGURO, GARANTÍA Y CONTACTO */}
        {activeTab === 'garantia' && (
          <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#12382C]">
                Textos de Garantía, Seguro y Datos de Contacto
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Editá la cobertura del seguro por rotura de cristales y los teléfonos de contacto.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-[#12382C]">Título del Seguro de Cristales</label>
                <input
                  type="text"
                  value={settingsForm.glassInsuranceTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, glassInsuranceTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-[#12382C]">Descripción del Seguro por Rotura de Cristales</label>
                <textarea
                  rows={3}
                  value={settingsForm.glassInsuranceDescription}
                  onChange={(e) => setSettingsForm({ ...settingsForm, glassInsuranceDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-[#12382C]">Condiciones y Plazos de Cobertura</label>
                <textarea
                  rows={2}
                  value={settingsForm.glassInsuranceConditions}
                  onChange={(e) => setSettingsForm({ ...settingsForm, glassInsuranceConditions: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Teléfono / WhatsApp de atención</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value, whatsapp: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Zona geográfica de cobertura</label>
                  <input
                    type="text"
                    value={settingsForm.coverageZone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, coverageZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#12382C] text-white font-semibold hover:bg-[#1C4A38] transition-all text-xs"
              >
                Guardar Textos y Contacto
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: CONSULTAS WEB Y PRESUPUESTOS (LEADS) */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#12382C]">
                Consultas y Solicitudes de Presupuesto
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Leads generados a través del formulario de contacto y cotizador rápido de la web.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">Tipo</th>
                    <th className="py-3 px-3">Nombre</th>
                    <th className="py-3 px-3">Teléfono / WhatsApp</th>
                    <th className="py-3 px-3">Servicio de Interés</th>
                    <th className="py-3 px-3">Mensaje / Detalle</th>
                    <th className="py-3 px-3">Fecha</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50">
                      <td className="py-3 px-3 font-semibold text-[#12382C] uppercase text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F4F1E8] text-[#12382C]">
                          {lead.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-neutral-900">{lead.name || 'Cliente Web'}</td>
                      <td className="py-3 px-3 text-neutral-800 font-mono">{lead.phone || '-'}</td>
                      <td className="py-3 px-3 text-neutral-700 font-semibold">{lead.serviceInterest || 'General'}</td>
                      <td className="py-3 px-3 text-neutral-600 max-w-[200px] truncate">{lead.message || '-'}</td>
                      <td className="py-3 px-3 text-neutral-400 font-mono text-[11px]">{lead.createdAt.split('T')[0]}</td>
                      <td className="py-3 px-3 text-right">
                        {lead.phone ? (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hola ${lead.name || ''}, nos comunicamos de VOGLER sobre tu consulta por ${lead.serviceInterest || 'nuestros servicios'}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold text-[11px]"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Responder</span>
                          </a>
                        ) : (
                          <span className="text-neutral-400 text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-neutral-400 italic">
                        Aún no hay consultas registradas en este período.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: FAQS */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-3xl border border-[#12382C]/10 shadow-xs p-6 sm:p-8 max-w-3xl space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-[#12382C]">
                Gestión de Preguntas Frecuentes
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Respondé dudas comunes sobre el servicio, seguro de cristales y métodos de atención.
              </p>
            </div>

            {/* Add New FAQ Form */}
            <form onSubmit={handleAddFaq} className="bg-[#FAFAF7] p-5 rounded-2xl space-y-3 text-xs border border-neutral-200">
              <h4 className="font-bold text-[#12382C]">Agregar nueva pregunta</h4>
              <input
                type="text"
                required
                value={newFaqQ}
                onChange={(e) => setNewFaqQ(e.target.value)}
                placeholder="Pregunta (ej: ¿Qué sucede si llueve el día de mi turno?)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
              />
              <textarea
                rows={2}
                required
                value={newFaqA}
                onChange={(e) => setNewFaqA(e.target.value)}
                placeholder="Respuesta explicativa detallada..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#12382C] text-white font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publicar FAQ</span>
              </button>
            </form>

            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.id} className="p-4 rounded-xl border border-neutral-200 space-y-1.5 text-xs bg-white">
                  <p className="font-bold text-[#12382C] text-sm">{f.question}</p>
                  <p className="text-neutral-700 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default AdminDashboard;
