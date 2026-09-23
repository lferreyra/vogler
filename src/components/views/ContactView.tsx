import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { siteSettings, getWhatsAppLink, addLead } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      alert('Por favor facilitanos un teléfono o email de contacto.');
      return;
    }

    addLead({
      type: 'contacto',
      name,
      email: email || 'contacto_web@vogler.com',
      phone,
      message
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FA58D]">
            Canales de Atención
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#12382C]">
            Hablemos de tu parque o jardín
          </h1>
          <p className="text-base sm:text-lg text-[#1B211E]/80">
            Respondemos tus dudas en el día y coordinamos visitas para presupuestar sin cargo.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick CTA Card */}
            <div className="bg-gradient-to-br from-[#12382C] to-[#1C4A38] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="font-display text-2xl font-bold">
                WhatsApp Directo
              </h3>
              <p className="text-xs sm:text-sm text-[#DCE5D8] leading-relaxed">
                El canal más rápido para coordinar presupuestos, enviarnos fotos de tu jardín o consultar fechas disponibles.
              </p>
              <a
                href={getWhatsAppLink('Hola, me gustaría comunicarme con VOGLER para consultar sobre mantenimiento de jardines.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-neutral-900 font-bold text-xs hover:bg-[#20bd5a] transition-all shadow-md active:scale-[0.98]"
              >
                <span>Chatear al {siteSettings.phone}</span>
              </a>
            </div>

            {/* Other details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12382C]/10 shadow-2xs space-y-5 text-xs text-neutral-700">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#8FA58D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#12382C] text-sm">Zona de Cobertura</h4>
                  <p className="text-neutral-600 mt-0.5">{siteSettings.coverageZone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#8FA58D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#12382C] text-sm">Horarios de Atención</h4>
                  <p className="text-neutral-600 mt-0.5">Lunes a Sábados: 08:00 a 19:30 hs.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Web Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#12382C]/10 shadow-xs">
            <h3 className="font-display text-2xl font-bold text-[#12382C] mb-2">
              Envianos un mensaje
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Completá el formulario y nos contactaremos directamente por WhatsApp o llamada.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Teléfono móvil / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+54 351 ..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Mensaje o consulta</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contanos sobre tu jardín, ubicación o servicio requerido..."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#12382C] text-white font-semibold text-xs hover:bg-[#1C4A38] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar mensaje</span>
                </button>
              </form>
            ) : (
              <div className="py-10 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-display text-xl font-bold text-[#12382C]">
                  ¡Mensaje enviado con éxito!
                </h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Gracias {name}. Hemos recibido tu mensaje y te contactaremos en el transcurso del día.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
