import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { VoglerLogo } from '../common/VoglerLogo';

export const QuickQuoteModal: React.FC = () => {
  const {
    isQuoteModalOpen,
    closeQuoteModal,
    quoteModalService,
    services,
    addLead,
    getWhatsAppLink
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceChoice, setServiceChoice] = useState(quoteModalService || services[0]?.title || 'Corte de Césped');
  const [spaceApprox, setSpaceApprox] = useState('300 m²');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Por favor ingresá tu número de teléfono / WhatsApp para contactarte.');
      return;
    }

    addLead({
      type: 'presupuesto',
      name,
      phone,
      serviceInterest: serviceChoice,
      message: `Espacio: ${spaceApprox}. Notas: ${details}`
    });

    setSubmitted(true);
  };

  const handleSendWhatsAppDirect = () => {
    const text = `Hola, mi nombre es ${name || 'un cliente interesado'}. Deseo cotizar el servicio de ${serviceChoice} para un espacio de aprox ${spaceApprox}. Detalle: ${details || 'Sin observaciones'}.`;
    window.open(getWhatsAppLink(text), '_blank');
    closeQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={closeQuoteModal}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5 text-xs">
            <div>
              <div className="mb-2">
                <VoglerLogo size="md" variant="dark" />
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-900 mt-1">
                Solicitá tu presupuesto sin costo
              </h3>
              <p className="text-neutral-500 mt-0.5">
                Evaluamos tu espacio y te enviamos una cotización personalizada con seguro de cristales incluido.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Nombre o Apellido</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Lucas Ferreyra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 351 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Servicio de interés</label>
                  <select
                    value={serviceChoice}
                    onChange={(e) => setServiceChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Superficie aprox.</label>
                  <select
                    value={spaceApprox}
                    onChange={(e) => setSpaceApprox(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    <option value="Menos de 200 m²">Menos de 200 m²</option>
                    <option value="200 a 500 m²">200 a 500 m²</option>
                    <option value="500 a 1000 m²">500 a 1.000 m²</option>
                    <option value="Más de 1000 m²">Más de 1.000 m²</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Detalles de la consulta</label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ubicación aproximada, estado actual del césped o plantas..."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 rounded-full bg-[#12382C] text-white font-semibold hover:bg-[#1C4A38] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar solicitud</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppDirect}
                  className="w-full sm:w-auto py-3 px-5 rounded-full border border-[#25D366] text-[#12382C] hover:bg-[#25D366]/10 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Pedir por WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 text-xs animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#12382C]">
              ¡Solicitud enviada con éxito!
            </h3>
            <p className="text-neutral-600 max-w-sm mx-auto">
              Muchas gracias {name}. Un especialista de VOGLER analizará tu consulta y te contactará a la brevedad.
            </p>
            <div className="pt-2">
              <button
                onClick={closeQuoteModal}
                className="px-6 py-2.5 rounded-full bg-[#12382C] text-white font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
