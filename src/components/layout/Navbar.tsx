import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, Calendar, User as UserIcon, Shield, ChevronRight } from 'lucide-react';
import { VoglerLogo } from '../common/VoglerLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    currentUser,
    openAuthModal,
    logout,
    isMobileNavOpen,
    setIsMobileNavOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', view: 'home' as const },
    { label: 'Servicios', view: 'services' as const },
    { label: 'Nosotros', view: 'about' as const },
    { label: 'Preguntas frecuentes', view: 'faq' as const },
    { label: 'Contacto', view: 'contact' as const },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#12382C]/10 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single Brand element with official clean logo */}
        <button
          onClick={() => navigateTo('home')}
          className="group text-left focus:outline-hidden flex items-center gap-2.5 transition-transform active:scale-[0.98]"
        >
          <VoglerLogo size="md" variant="dark" />
          <span className="hidden sm:inline-block pl-2.5 border-l border-[#12382C]/15 text-[10px] uppercase tracking-[0.2em] text-[#8FA58D] font-semibold leading-tight">
            Parques & Jardines
          </span>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1B211E]/80">
          {navLinks.map(link => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => navigateTo(link.view)}
                className={`relative py-1 transition-colors hover:text-[#12382C] focus:outline-hidden ${
                  isActive ? 'text-[#12382C] font-semibold' : 'text-[#1B211E]/75'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#12382C] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions & User Auth */}
        <div className="flex items-center gap-3">
          {/* User Profile / Login dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#12382C]/15 bg-white/70 hover:bg-white text-xs font-medium text-[#12382C] transition-all shadow-2xs focus:outline-hidden"
              >
                <div className="w-6 h-6 rounded-full bg-[#12382C] text-[#F4F1E8] flex items-center justify-center font-bold text-[10px]">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden md:inline max-w-[110px] truncate">{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="px-1.5 py-0.2 text-[9px] bg-[#B8794B] text-white rounded-sm uppercase tracking-wider font-semibold">
                    Admin
                  </span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 p-2 text-xs z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="font-semibold text-neutral-900 truncate">{currentUser.name}</p>
                    <p className="text-neutral-500 truncate text-[11px]">{currentUser.email}</p>
                  </div>

                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-lg flex items-center justify-between text-neutral-700 hover:bg-[#F4F1E8] hover:text-[#12382C] transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <Shield className="w-3.5 h-3.5 text-[#12382C]" /> Panel Administrador
                      </span>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigateTo('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-lg flex items-center justify-between text-neutral-700 hover:bg-[#F4F1E8] hover:text-[#12382C] transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <UserIcon className="w-3.5 h-3.5 text-[#12382C]" /> Mi Cuenta & Reservas
                      </span>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 mt-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3 py-2 text-xs font-medium text-[#12382C] hover:text-[#1C4A38] transition-colors focus:outline-hidden"
            >
              Ingresar
            </button>
          )}

          {/* Primary CTA: Reservar turno */}
          <button
            onClick={() => navigateTo('booking')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#F4F1E8] bg-[#12382C] hover:bg-[#1C4A38] rounded-full shadow-sm hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap focus:outline-hidden"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservar turno</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 rounded-lg text-[#12382C] hover:bg-black/5 focus:outline-hidden"
            aria-label="Abrir menú"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-[#FAFAF7] border-b border-[#12382C]/10 px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => navigateTo(link.view)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.view
                    ? 'bg-[#12382C]/10 text-[#12382C] font-semibold'
                    : 'text-[#1B211E]/80 hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => navigateTo(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-left bg-white border border-neutral-200 flex items-center justify-between"
                >
                  <span>
                    Conectado como <strong>{currentUser.name}</strong>
                  </span>
                  <span className="text-[#12382C] font-semibold">Ir al panel</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 px-4 text-xs text-red-600 text-left font-medium"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl border border-[#12382C]/20 text-[#12382C] text-center"
              >
                Iniciar sesión / Registrarse
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
