import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { VoglerLogo } from '../common/VoglerLogo';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    login,
    loginAsDemo,
    register,
    navigateTo
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    register(name, email, phone, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <VoglerLogo size="md" variant="dark" />
          </div>
          <h3 className="font-display text-xl font-bold text-neutral-900">
            {mode === 'login' && 'Bienvenido a VOGLER'}
            {mode === 'register' && 'Crear cuenta de cliente'}
            {mode === 'forgot' && 'Recuperar contraseña'}
          </h3>
          <p className="text-xs text-neutral-500">
            {mode === 'login' && 'Accedé a tus turnos, historial y presupuestos personalizados.'}
            {mode === 'register' && 'Completá tus datos para agendar servicios y gestionar tu jardín.'}
            {mode === 'forgot' && 'Te enviaremos las instrucciones a tu correo electrónico.'}
          </p>
        </div>

        {/* Quick Demo Access (For Evaluators & Testing) */}
        {mode === 'login' && (
          <div className="bg-[#F4F1E8] p-3 rounded-2xl mb-6 space-y-2 text-xs border border-[#12382C]/10">
            <p className="text-[11px] font-bold text-[#12382C] uppercase tracking-wider text-center">
              Acceso Rápido Demo (1 Click)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemo('customer')}
                className="py-2 px-3 rounded-xl bg-white border border-neutral-200 hover:border-[#12382C] text-[#12382C] font-semibold text-center shadow-2xs transition-all hover:bg-white"
              >
                👤 Cliente (Lucas)
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('admin');
                  navigateTo('admin');
                }}
                className="py-2 px-3 rounded-xl bg-[#12382C] text-white font-semibold text-center shadow-2xs transition-all hover:bg-[#1C4A38]"
              >
                🛡️ Administrador
              </button>
            </div>
          </div>
        )}

        {/* Google Demo Login */}
        {mode !== 'forgot' && (
          <button
            type="button"
            onClick={() => loginAsDemo('customer')}
            className="w-full py-2.5 px-4 mb-4 rounded-xl border border-neutral-300 hover:bg-neutral-50 font-medium text-xs text-neutral-700 flex items-center justify-center gap-3 transition-colors shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>
        )}

        {/* Divider */}
        {mode !== 'forgot' && (
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-neutral-400">
              o con email
            </span>
          </div>
        )}

        {/* Traditional Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Correo electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-neutral-700">Contraseña</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#12382C] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#12382C] hover:bg-[#1C4A38] text-white font-semibold text-xs shadow-md transition-all mt-2"
            >
              Iniciar sesión
            </button>
          </form>
        )}

        {/* Register Mode */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Nombre completo *</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Perez"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Correo electrónico *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@correo.com"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Teléfono / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+54 351 000-0000"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#12382C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#12382C] hover:bg-[#1C4A38] text-white font-semibold text-xs shadow-md transition-all mt-2"
            >
              Crear mi cuenta
            </button>
          </form>
        )}

        {/* Forgot Password Mode */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs">
            <p className="text-neutral-600">
              Ingresá tu correo electrónico registrado y te enviaremos un enlace temporal para reestablecer tu clave.
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300"
            />
            <button
              onClick={() => {
                alert('Enlace de recuperación enviado (simulado).');
                setMode('login');
              }}
              className="w-full py-2.5 rounded-full bg-[#12382C] text-white font-semibold"
            >
              Enviar enlace
            </button>
            <button
              onClick={() => setMode('login')}
              className="w-full text-center text-neutral-500 hover:text-neutral-800"
            >
              Volver a Iniciar Sesión
            </button>
          </div>
        )}

        {/* Bottom Switch */}
        <div className="mt-6 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-600">
          {mode === 'login' ? (
            <p>
              ¿Todavía no tenés cuenta?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-[#12382C] font-bold hover:underline"
              >
                Registrate acá
              </button>
            </p>
          ) : mode === 'register' ? (
            <p>
              ¿Ya tenés cuenta creada?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[#12382C] font-bold hover:underline"
              >
                Iniciá sesión
              </button>
            </p>
          ) : null}
        </div>

      </div>
    </div>
  );
};
