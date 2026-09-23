import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  XCircle,
  User as UserIcon,
  Home,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    userBookings,
    cancelBooking,
    scheduleConfig,
    navigateTo,
    updateUserProfile,
    getWhatsAppLink,
    openAuthModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'turnos' | 'perfil' | 'preferencias'>('turnos');
  const [editingPhone, setEditingPhone] = useState(currentUser?.phone || '');
  const [editingNotes, setEditingNotes] = useState(currentUser?.addresses[0]?.notes || '');

  if (!currentUser) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#F4F1E8] text-[#12382C] flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-[#12382C] mb-2">
          Iniciá sesión para ver tu panel
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Accedé a tus turnos agendados, direcciones guardadas y el historial de mantenimiento de tu jardín.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-3 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38]"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  const upcomingBookings = userBookings.filter(b => b.status === 'pendiente' || b.status === 'confirmada' || b.status === 'en_proceso');
  const pastBookings = userBookings.filter(b => b.status === 'completada' || b.status === 'cancelada');

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmada':
        return <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Confirmada</span>;
      case 'en_proceso':
        return <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">En proceso</span>;
      case 'completada':
        return <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">Completada</span>;
      case 'cancelada':
        return <span className="text-xs font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">Cancelada</span>;
      default:
        return <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">Pendiente</span>;
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ phone: editingPhone });
    alert('Datos de contacto actualizados.');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#12382C] text-[#F4F1E8] flex items-center justify-center font-display text-2xl font-bold shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8FA58D] font-semibold">
                Panel del Cliente
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#12382C]">
                Hola, {currentUser.name}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                {currentUser.email} · {currentUser.phone || 'Sin teléfono asignado'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('booking')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#12382C] text-white font-semibold text-xs hover:bg-[#1C4A38] shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Reservar nuevo servicio</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Zero-Pill discipline: segmented tabs) */}
        <div className="flex items-center gap-2 p-1.5 bg-[#F4F1E8] rounded-xl mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('turnos')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'turnos' ? 'bg-[#12382C] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Mis Turnos ({userBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'perfil' ? 'bg-[#12382C] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Datos Personales
          </button>
          <button
            onClick={() => setActiveTab('preferencias')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'preferencias' ? 'bg-[#12382C] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Preferencias de Jardín
          </button>
        </div>

        {/* Tab 1: Bookings (Upcoming & Past) */}
        {activeTab === 'turnos' && (
          <div className="space-y-8">
            
            {/* Upcoming Services Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="font-display text-xl font-bold text-[#12382C]">
                  Próximos servicios agendados
                </h2>
              </div>

              {scheduleConfig?.showDelayNotice && (
                <div className="bg-[#FAF7F0] border border-[#D9B26A]/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-neutral-700 shadow-2xs">
                  <Clock className="w-4 h-4 text-[#8C6D1F] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#12382C]">Aviso sobre tolerancia de inicio (±{scheduleConfig.delayNoticeMinutes || 15} min):</span>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                      {scheduleConfig.delayNoticeMessage}
                    </p>
                  </div>
                </div>
              )}

              {upcomingBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingBookings.map((b: Booking) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl p-6 border border-[#12382C]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                              ID: {b.id}
                            </span>
                            <h3 className="font-display text-xl font-bold text-[#12382C]">
                              {b.serviceTitle}
                            </h3>
                          </div>
                          {getStatusBadge(b.status)}
                        </div>

                        <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#8FA58D]" />
                            <span className="font-semibold text-neutral-900">Fecha: {b.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#8FA58D]" />
                            <span>Llegada estimada: {b.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#8FA58D]" />
                            <span>
                              {b.address.street} {b.address.number}, {b.address.neighborhood}
                            </span>
                          </div>
                          {b.assignedCrew && (
                            <div className="pt-2 border-t border-neutral-200 text-neutral-700">
                              <span>Cuadrilla: <strong>{b.assignedCrew}</strong></span>
                            </div>
                          )}
                          {b.notes && (
                            <p className="text-[11px] text-neutral-500 italic pt-1">
                              "{b.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <a
                          href={getWhatsAppLink(`Hola, consulto por mi turno ${b.id} del día ${b.date} para ${b.serviceTitle}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12382C] hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>Coordinar por WhatsApp</span>
                        </a>

                        {b.status !== 'cancelada' && (
                          <button
                            onClick={() => {
                              if (confirm('¿Estás seguro de que deseás cancelar este turno?')) {
                                cancelBooking(b.id);
                              }
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancelar turno
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-neutral-300">
                  <p className="text-sm text-neutral-600 mb-4">
                    No tenés servicios reservados todavía.
                  </p>
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-6 py-2.5 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38] transition-all"
                  >
                    Reservar mi primer servicio
                  </button>
                </div>
              )}
            </div>

            {/* Past Services Section */}
            {pastBookings.length > 0 && (
              <div className="space-y-4 pt-6">
                <h2 className="font-display text-xl font-bold text-[#12382C]">
                  Historial de servicios anteriores
                </h2>
                <div className="bg-white rounded-2xl border border-[#12382C]/10 overflow-hidden divide-y divide-neutral-100">
                  {pastBookings.map((b) => (
                    <div key={b.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base font-bold text-[#12382C]">
                            {b.serviceTitle}
                          </h4>
                          {getStatusBadge(b.status)}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {b.date} · {b.address.neighborhood} · ID: {b.id}
                        </p>
                      </div>

                      <button
                        onClick={() => navigateTo('booking')}
                        className="text-xs text-[#12382C] font-semibold hover:underline self-start sm:self-auto"
                      >
                        Repetir servicio
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Profile & Saved Addresses */}
        {activeTab === 'perfil' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs space-y-6">
              <h3 className="font-display text-xl font-bold text-[#12382C]">
                Mis datos personales
              </h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.name}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Email</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Teléfono móvil / WhatsApp</label>
                  <input
                    type="tel"
                    value={editingPhone}
                    onChange={(e) => setEditingPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#12382C] text-white text-xs font-semibold hover:bg-[#1C4A38]"
                >
                  Guardar cambios
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs space-y-6">
              <h3 className="font-display text-xl font-bold text-[#12382C]">
                Dirección principal guardada
              </h3>
              {currentUser.addresses.length > 0 ? (
                currentUser.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                    <p className="font-bold text-[#12382C] text-sm">{addr.title}</p>
                    <p className="text-neutral-700">{addr.street} {addr.number}</p>
                    <p className="text-neutral-500">{addr.neighborhood}, {addr.city}</p>
                    {addr.notes && <p className="text-neutral-500 italic mt-2">Nota: {addr.notes}</p>}
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-500">No tenés direcciones guardadas aún.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Garden Preferences */}
        {activeTab === 'preferencias' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-xs max-w-2xl space-y-6">
            <h3 className="font-display text-xl font-bold text-[#12382C]">
              Ficha botánica y características del espacio
            </h3>
            <div className="space-y-4 text-xs text-neutral-700">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">Superficie estimada de césped:</span>
                <span className="font-semibold text-neutral-900">{currentUser.gardenPreferences?.sizeApprox || '350 m²'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">Mascotas en el predio:</span>
                <span className="font-semibold text-neutral-900">{currentUser.gardenPreferences?.hasPets ? 'Sí (Tener precaución al ingresar)' : 'No'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">Sistema de riego por aspersión:</span>
                <span className="font-semibold text-neutral-900">{currentUser.gardenPreferences?.hasIrrigation ? 'Sí (Aspersores emergentes instalados)' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Horario de preferencia habitual:</span>
                <span className="font-semibold text-neutral-900">{currentUser.gardenPreferences?.preferredTime || 'Mañana (09:00 - 12:00)'}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
