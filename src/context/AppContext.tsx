import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Service,
  Booking,
  Project,
  Testimonial,
  FAQItem,
  SiteSettings,
  Lead,
  BookingStatus,
  ScheduleConfig,
  TimeSlotConfig,
  BlockedDateInfo
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_SITE_SETTINGS,
  DEMO_USERS,
  INITIAL_BOOKINGS,
  INITIAL_SCHEDULE_CONFIG
} from '../data/initialData';
import { auth, loginWithGoogle, logoutFirebase } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  fetchUserProfile,
  saveUserProfile,
  subscribeBookings,
  saveBookingFirestore,
  updateBookingFirestore,
  createLeadFirestore,
  subscribeScheduleConfig,
  saveScheduleConfigFirestore,
  subscribeBlockedDates,
  addBlockedDateFirestore,
  deleteBlockedDateFirestore,
  subscribeSiteSettings,
  saveSiteSettingsFirestore
} from '../services/firestoreService';

export type ViewType =
  | 'home'
  | 'services'
  | 'service-detail'
  | 'projects'
  | 'about'
  | 'faq'
  | 'contact'
  | 'booking'
  | 'dashboard'
  | 'admin';

interface AppContextType {
  // Navigation
  currentView: ViewType;
  selectedServiceSlug: string | null;
  navigateTo: (view: ViewType, serviceSlug?: string) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;

  // Auth
  currentUser: User | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (email: string, pass?: string) => boolean;
  loginAsDemo: (role: 'customer' | 'admin') => void;
  signInWithGoogle: () => Promise<void>;
  register: (name: string, email: string, phone: string, pass?: string) => boolean;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;

  // Modals
  isQuoteModalOpen: boolean;
  quoteModalService: string | null;
  openQuoteModal: (serviceTitle?: string) => void;
  closeQuoteModal: () => void;

  // Data & Mutators
  services: Service[];
  updateService: (service: Service) => void;
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, crew?: string) => void;
  cancelBooking: (id: string) => void;
  projects: Project[];
  updateProject: (project: Project) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  faqs: FAQItem[];
  updateFAQ: (faq: FAQItem) => void;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  blockedDates: string[];
  toggleBlockedDate: (date: string) => void;

  // Schedule & Availability Management
  scheduleConfig: ScheduleConfig;
  updateScheduleConfig: (config: ScheduleConfig) => void;
  toggleWorkingDay: (dayIndex: number) => void;
  toggleTimeSlot: (slotId: string) => void;
  addTimeSlot: (slot: string, label?: string) => void;
  removeTimeSlot: (slotId: string) => void;
  addBlockedDateWithReason: (date: string, reason: string) => void;
  removeBlockedDate: (date: string) => void;
  updateDelayNotice: (message: string, minutes: number, enabled: boolean) => void;

  // Helpers
  getWhatsAppLink: (customMessage?: string) => string;
  userBookings: Booking[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('vogler_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Lucas Ferreyra' || parsed.email?.includes('lucas.ferreyra')) {
          return DEMO_USERS.customer;
        }
        return parsed;
      }
      return DEMO_USERS.customer;
    } catch {
      return DEMO_USERS.customer;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalService, setQuoteModalService] = useState<string | null>(null);

  // Core Data State
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((b: Booking) =>
          b.userName === 'Lucas Ferreyra' || b.userEmail?.includes('lucas.ferreyra')
            ? { ...b, userName: 'Jhon Doer', userEmail: 'jhondoer@ejemplo.com' }
            : b
        );
      }
      return INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PROJECTS.length) {
          return parsed;
        }
      }
      return INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_TESTIMONIALS.length) {
          return parsed;
        }
      }
      return INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_faqs');
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('vogler_settings');
      return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [blockedDates, setBlockedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vogler_blocked_dates');
      return saved ? JSON.parse(saved) : ['2026-09-25'];
    } catch {
      return ['2026-09-25'];
    }
  });

  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>(() => {
    try {
      const saved = localStorage.getItem('vogler_schedule_config');
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULE_CONFIG;
    } catch {
      return INITIAL_SCHEDULE_CONFIG;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('vogler_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vogler_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('vogler_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('vogler_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('vogler_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('vogler_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('vogler_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('vogler_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vogler_blocked_dates', JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    localStorage.setItem('vogler_schedule_config', JSON.stringify(scheduleConfig));
  }, [scheduleConfig]);

  // Navigation Helper
  const navigateTo = (view: ViewType, serviceSlug?: string) => {
    setCurrentView(view);
    if (serviceSlug) {
      setSelectedServiceSlug(serviceSlug);
    }
    setIsMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync Firebase Auth on Mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const profile = await fetchUserProfile(fbUser.uid);
          const isAdminUser = fbUser.email === 'lucas.ferreyra@gmail.com';
          if (profile) {
            setCurrentUser({
              ...profile,
              role: isAdminUser ? 'admin' : profile.role
            });
          } else {
            const newProfile: User = {
              id: fbUser.uid,
              name: fbUser.displayName || 'Usuario Google',
              email: fbUser.email || '',
              phone: fbUser.phoneNumber || '',
              role: isAdminUser ? 'admin' : 'user',
              avatarUrl: fbUser.photoURL || undefined,
              addresses: [],
              gardenPreferences: {
                sizeApprox: '200 m²',
                hasPets: false,
                hasIrrigation: false
              }
            };
            setCurrentUser(newProfile);
            saveUserProfile(newProfile).catch(console.error);
          }
        } catch (e) {
          console.error('Failed to sync auth user profile:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to schedule config from Firestore
  useEffect(() => {
    try {
      const unsubscribe = subscribeScheduleConfig((remoteConfig) => {
        if (remoteConfig) {
          setScheduleConfig((prev) => ({ ...prev, ...remoteConfig }));
        }
      });
      return () => unsubscribe && unsubscribe();
    } catch (err) {
      console.warn('Firestore schedule listener notice:', err);
    }
  }, []);

  // Listen to blocked dates from Firestore
  useEffect(() => {
    try {
      const unsubscribe = subscribeBlockedDates((dates) => {
        if (dates && dates.length > 0) {
          setBlockedDates(dates.map((d) => d.date));
          setScheduleConfig((prev) => ({
            ...prev,
            blockedDatesList: dates
          }));
        }
      });
      return () => unsubscribe && unsubscribe();
    } catch (err) {
      console.warn('Firestore blocked dates listener notice:', err);
    }
  }, []);

  // Listen to bookings from Firestore for user/admin
  useEffect(() => {
    if (!currentUser) return;
    try {
      const unsubscribe = subscribeBookings(
        currentUser.id,
        currentUser.role === 'admin',
        (remoteBookings) => {
          if (remoteBookings && remoteBookings.length > 0) {
            setBookings((prev) => {
              const remoteIds = new Set(remoteBookings.map((b) => b.id));
              const locals = prev.filter((b) => !remoteIds.has(b.id));
              return [...remoteBookings, ...locals];
            });
          }
        }
      );
      return () => unsubscribe && unsubscribe();
    } catch (err) {
      console.warn('Firestore bookings listener notice:', err);
    }
  }, [currentUser?.id, currentUser?.role]);

  // Auth Helpers
  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginAsDemo = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_USERS.admin);
      navigateTo('admin');
    } else {
      setCurrentUser(DEMO_USERS.customer);
      navigateTo('dashboard');
    }
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    try {
      const fbUser = await loginWithGoogle();
      const isAdminUser = fbUser.email === 'lucas.ferreyra@gmail.com';
      const userProfile: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Usuario Google',
        email: fbUser.email || '',
        phone: fbUser.phoneNumber || '',
        role: isAdminUser ? 'admin' : 'user',
        avatarUrl: fbUser.photoURL || undefined,
        addresses: [],
        gardenPreferences: {
          sizeApprox: '200 m²',
          hasPets: false,
          hasIrrigation: false
        }
      };
      setCurrentUser(userProfile);
      saveUserProfile(userProfile).catch(console.error);
      setIsAuthModalOpen(false);
      if (isAdminUser) {
        navigateTo('admin');
      } else {
        navigateTo('dashboard');
      }
    } catch (err) {
      console.error('Google Sign-In failed', err);
    }
  };

  const login = (email: string) => {
    if (email.toLowerCase().includes('admin')) {
      setCurrentUser(DEMO_USERS.admin);
      navigateTo('admin');
    } else {
      const existingUser: User = {
        ...DEMO_USERS.customer,
        email: email
      };
      setCurrentUser(existingUser);
    }
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'user',
      addresses: [],
      gardenPreferences: {
        sizeApprox: '200 m²',
        hasPets: false,
        hasIrrigation: false
      }
    };
    setCurrentUser(newUser);
    saveUserProfile(newUser).catch(console.error);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    logoutFirebase().catch(() => {});
    setCurrentUser(null);
    navigateTo('home');
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);
    saveUserProfile(updated).catch(console.error);
  };

  // Modals
  const openQuoteModal = (serviceTitle?: string) => {
    setQuoteModalService(serviceTitle || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalService(null);
  };

  // Bookings
  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    saveBookingFirestore(newBooking).catch(console.error);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, crew?: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status, ...(crew ? { assignedCrew: crew } : {}) } : b))
    );
    updateBookingFirestore(id, { status, ...(crew ? { assignedCrew: crew } : {}) }).catch(console.error);
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelada');
  };

  // Services
  const updateService = (updated: Service) => {
    setServices(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  // Projects
  const updateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = { ...project, id: `proj-${Date.now()}` };
    setProjects(prev => [newProj, ...prev]);
  };

  // Testimonials
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = { ...test, id: `test-${Date.now()}` };
    setTestimonials(prev => [newTest, ...prev]);
  };

  // FAQs
  const updateFAQ = (updated: FAQItem) => {
    setFaqs(prev => prev.map(f => (f.id === updated.id ? updated : f)));
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = { ...faq, id: `faq-${Date.now()}` };
    setFaqs(prev => [...prev, newFaq]);
  };

  // Leads
  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
    createLeadFirestore(newLead).catch(console.error);
  };

  // Blocked Dates & Schedule Management
  const addBlockedDateWithReason = (date: string, reason: string) => {
    const trimmedReason = reason.trim() || 'Fecha no disponible por logística o mantenimiento';
    setScheduleConfig(prev => {
      const filtered = prev.blockedDatesList.filter(b => b.date !== date);
      return {
        ...prev,
        blockedDatesList: [...filtered, { date, reason: trimmedReason }]
      };
    });
    setBlockedDates(prev => (prev.includes(date) ? prev : [...prev, date]));
    addBlockedDateFirestore({ id: `block-${date}`, date, reason: trimmedReason }).catch(console.error);
  };

  const removeBlockedDate = (date: string) => {
    setScheduleConfig(prev => ({
      ...prev,
      blockedDatesList: prev.blockedDatesList.filter(b => b.date !== date)
    }));
    setBlockedDates(prev => prev.filter(d => d !== date));
    deleteBlockedDateFirestore(`block-${date}`).catch(console.error);
  };

  const toggleBlockedDate = (date: string) => {
    const isBlocked = scheduleConfig.blockedDatesList.some(b => b.date === date) || blockedDates.includes(date);
    if (isBlocked) {
      removeBlockedDate(date);
    } else {
      addBlockedDateWithReason(date, 'Bloqueo manual');
    }
  };

  const updateScheduleConfig = (config: ScheduleConfig) => {
    setScheduleConfig(config);
    setBlockedDates(config.blockedDatesList.map(b => b.date));
    saveScheduleConfigFirestore(config).catch(console.error);
  };

  const toggleWorkingDay = (dayIndex: number) => {
    setScheduleConfig(prev => {
      const exists = prev.workingDays.includes(dayIndex);
      const nextDays = exists
        ? prev.workingDays.filter(d => d !== dayIndex)
        : [...prev.workingDays, dayIndex].sort((a, b) => a - b);
      return { ...prev, workingDays: nextDays };
    });
  };

  const toggleTimeSlot = (slotId: string) => {
    setScheduleConfig(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map(s => (s.id === slotId ? { ...s, isActive: !s.isActive } : s))
    }));
  };

  const addTimeSlot = (slot: string, label?: string) => {
    const newSlot: TimeSlotConfig = {
      id: `slot-${Date.now()}`,
      slot: slot.trim(),
      isActive: true,
      label: label?.trim() || undefined
    };
    setScheduleConfig(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, newSlot]
    }));
  };

  const removeTimeSlot = (slotId: string) => {
    setScheduleConfig(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter(s => s.id !== slotId)
    }));
  };

  const updateDelayNotice = (message: string, minutes: number, enabled: boolean) => {
    setScheduleConfig(prev => ({
      ...prev,
      delayNoticeMessage: message,
      delayNoticeMinutes: minutes,
      showDelayNotice: enabled
    }));
  };

  // WhatsApp Link Helper
  const getWhatsAppLink = (customMessage?: string) => {
    // Exact requirement: Phone +543515205893
    // Exact default message: "Hola, estoy interesado en sus servicios de jardinería, vi su sitio web."
    const phone = '543515205893';
    const text = customMessage || 'Hola, estoy interesado en sus servicios de jardinería, vi su sitio web.';
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const userBookings = bookings.filter(b => b.userId === currentUser?.id || b.userEmail === currentUser?.email);

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedServiceSlug,
        navigateTo,
        isMobileNavOpen,
        setIsMobileNavOpen,
        currentUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        loginAsDemo,
        signInWithGoogle,
        register,
        logout,
        updateUserProfile,
        isQuoteModalOpen,
        quoteModalService,
        openQuoteModal,
        closeQuoteModal,
        services,
        updateService,
        bookings,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        projects,
        updateProject,
        addProject,
        testimonials,
        addTestimonial,
        faqs,
        updateFAQ,
        addFAQ,
        siteSettings,
        updateSiteSettings: setSiteSettings,
        leads,
        addLead,
        blockedDates,
        toggleBlockedDate,
        scheduleConfig,
        updateScheduleConfig,
        toggleWorkingDay,
        toggleTimeSlot,
        addTimeSlot,
        removeTimeSlot,
        addBlockedDateWithReason,
        removeBlockedDate,
        updateDelayNotice,
        getWhatsAppLink,
        userBookings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
