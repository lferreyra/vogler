export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  addresses: SavedAddress[];
  gardenPreferences?: {
    sizeApprox?: string;
    hasPets?: boolean;
    hasIrrigation?: boolean;
    preferredTime?: string;
  };
}

export interface SavedAddress {
  id: string;
  title: string; // e.g. "Casa Country", "Local Comercial"
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  notes?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  features: string[];
  recommendedFrequency: string;
  badge?: string;
  estimatedDuration: string;
  whatsappMessage: string;
  isActive: boolean;
}

export type BookingStatus = 'pendiente' | 'confirmada' | 'en_proceso' | 'completada' | 'cancelada';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceId: string;
  serviceTitle: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 - 11:30"
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
  };
  gardenSize?: string;
  propertyType?: string;
  notes?: string;
  status: BookingStatus;
  assignedCrew?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'corte-de-cesped' | 'poda' | 'diseno' | 'paisajismo';
  serviceTitle: string;
  image: string;
  description: string;
  location: string;
  year: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  quote: string;
  service: string;
  date: string;
  isDemo: boolean;
  rating?: number;
  badge?: string;
  verified?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'servicios' | 'reservas' | 'seguro' | 'pagos';
}

export interface TimeSlotConfig {
  id: string;
  slot: string; // e.g. "08:30 - 11:00"
  isActive: boolean;
  label?: string; // e.g. "Mañana temprana", "Tarde"
}

export interface BlockedDateInfo {
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface ScheduleConfig {
  workingDays: number[]; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  maxBookingDaysAhead: number;
  timeSlots: TimeSlotConfig[];
  blockedDatesList: BlockedDateInfo[];
  showDelayNotice: boolean;
  delayNoticeMinutes: number;
  delayNoticeMessage: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  address: string;
  coverageZone: string;
  glassInsuranceTitle: string;
  glassInsuranceDescription: string;
  glassInsuranceConditions: string;
  generalGuaranteeTitle: string;
  generalGuaranteeDescription: string;
}

export interface Lead {
  id: string;
  type: 'presupuesto' | 'contacto';
  email?: string;
  name?: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
  createdAt: string;
}
