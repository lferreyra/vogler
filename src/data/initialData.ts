import { Service, Project, Testimonial, FAQItem, SiteSettings, Booking, User, ScheduleConfig } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'corte-cesped',
    slug: 'corte-de-cesped',
    title: 'Corte de Césped',
    shortDesc: 'Mantenimiento profesional para mantener tu jardín siempre prolijo y saludable.',
    fullDesc: 'Servicio integral de corte con maquinaria profesional de alta calibración, bordeado prolijo de canteros y aceras, y retiro completo de restos. Cuidamos la altura de corte ideal según la especie y la estación del año.',
    icon: 'Scissors',
    image: '/src/assets/images/service_mowing_vogler_1790117776047.jpg',
    features: [
      'Corte homogéneo con cuchillas afiladas para evitar puntas secas',
      'Bordeadora de precisión en esquinas, árboles y muros',
      'Soplado y limpieza absoluta de senderos y galerías',
      'Disposición responsable de restos vegetales'
    ],
    recommendedFrequency: 'Semanal en primavera/verano, quincenal en otoño/invierno',
    badge: 'Más solicitado',
    estimatedDuration: '1.5 a 3 horas según superficie',
    whatsappMessage: 'Hola, estoy interesado en el servicio de corte de césped para mi espacio. ¿Podrían asesorarme?',
    isActive: true
  },
  {
    id: 'poda',
    slug: 'poda',
    title: 'Poda',
    shortDesc: 'Podas realizadas de forma responsable para mejorar la salud, estructura y estética de árboles y plantas.',
    fullDesc: 'Intervenciones sanitarias, de formación y despeje de altura realizadas con herramientas esterilizadas y criterios botánicos. Prevenimos plagas, estimulamos floraciones y evitamos riesgos sobre estructuras y techos.',
    icon: 'TreePine',
    image: '/src/assets/images/service_pruning_vogler_1790117787529.jpg',
    features: [
      'Poda de formación en arbustos, cercos vivos y frutales',
      'Despeje de ramas secas o peligrosas con arnés y pértiga',
      'Sellado protector en cortes gruesos para evitar hongos',
      'Triturado o retiro prolijo de ramas y restos'
    ],
    recommendedFrequency: 'Estacional (Otoño / Invierno) o mantenimiento liviano',
    badge: 'Técnico especializado',
    estimatedDuration: '2 a 5 horas',
    whatsappMessage: 'Hola, quisiera consultar por el servicio de poda de árboles y arbustos en mi propiedad.',
    isActive: true
  },
  {
    id: 'diseno-jardines',
    slug: 'diseno-de-jardines',
    title: 'Diseño de Jardines',
    shortDesc: 'Diseñamos espacios verdes funcionales y atractivos adaptados a cada propiedad.',
    fullDesc: 'Planificación personalizada que contempla asoleamiento, requerimientos hídricos del suelo, texturas y floraciones escalonadas. Creamos rincones para contemplar, compartir o relajarse con baja demanda de mantenimiento.',
    icon: 'Compass',
    image: '/src/assets/images/service_landscape_vogler_1790117796639.jpg',
    features: [
      'Relevamiento in situ del terreno y análisis de luz',
      'Propuesta de especies autóctonas y adaptadas de bajo consumo hídrico',
      'Integración con canteros, senderos de piedra y sectores de descanso',
      'Manual básico de cuidado para cada especie seleccionada'
    ],
    recommendedFrequency: 'Por proyecto o renovación',
    badge: 'Proyectos a medida',
    estimatedDuration: 'Planificación de 5 a 10 días',
    whatsappMessage: 'Hola, tengo en mente rediseñar mi jardín y me gustaría conocer su propuesta de diseño.',
    isActive: true
  },
  {
    id: 'paisajismo',
    slug: 'paisajismo',
    title: 'Paisajismo',
    shortDesc: 'Transformamos espacios mediante una planificación integral de vegetación, distribución y estética.',
    fullDesc: 'Ejecución integral de obras de exterior para residencias, countries y complejos corporativos. Combinamos nivelación de terreno, trasplantes mayores, iluminación sutil y paisajismo sostenible de alto impacto visual.',
    icon: 'Trees',
    image: '/src/assets/images/hero_gardener_vogler_1790117765354.jpg',
    features: [
      'Movimiento de suelo, enmiendas orgánicas y drenajes',
      'Plantación de ejemplares añosos y canteros de gramíneas',
      'Coordinación con sistemas de riego automático por goteo o aspersión',
      'Seguimiento posplantación durante las primeras 6 semanas'
    ],
    recommendedFrequency: 'Obra integral y seguimiento estacional',
    badge: 'Alta gama',
    estimatedDuration: 'Según alcance del proyecto',
    whatsappMessage: 'Hola, quiero hablar sobre un proyecto integral de paisajismo para mi espacio.',
    isActive: true
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Residencia Las Cañitas',
    category: 'paisajismo',
    serviceTitle: 'Paisajismo Integral',
    image: '/src/assets/images/service_landscape_vogler_1790117796639.jpg',
    description: 'Transformación de un lote de 850m² incorporando canteros perimetrales con gramíneas, senderos de durmientes de quebracho y un rincón de fuego rodeado de vegetación perenne.',
    location: 'Córdoba Zona Norte',
    year: '2025',
    highlights: ['Bajo mantenimiento', 'Riego automatizado', 'Especies nativas']
  },
  {
    id: 'proj-2',
    title: 'Parque Country Los Molles',
    category: 'corte-de-cesped',
    serviceTitle: 'Mantenimiento Periódico',
    image: '/src/assets/images/service_mowing_vogler_1790117776047.jpg',
    description: 'Mantenimiento continuo de grama bahiana con corte helicoidal semanal, control preventivo de malezas y fertilización estacional orgánica.',
    location: 'Villa Allende',
    year: '2025',
    highlights: ['Corte continuo', 'Bordeado impecable', 'Grama bahiana']
  },
  {
    id: 'proj-3',
    title: 'Cercos Vivos y Arbolado El Roble',
    category: 'poda',
    serviceTitle: 'Poda Responsable',
    image: '/src/assets/images/service_pruning_vogler_1790117787529.jpg',
    description: 'Estructuración y poda sanitaria de 120 metros lineales de cerco de laurel de flor y despeje preventivo de dos lapachos añosos.',
    location: 'Mendiolaza',
    year: '2024',
    highlights: ['Sanidad vegetal', 'Despeje de techos', 'Sellado de heridas']
  },
  {
    id: 'proj-4',
    title: 'Patio Moderno & Piedra Natural',
    category: 'diseno',
    serviceTitle: 'Diseño de Jardines',
    image: '/src/assets/images/hero_gardener_vogler_1790117765354.jpg',
    description: 'Diseño de patio urbano integrado a galería con macetones de fibrocemento, vegetación de sombra y texturas de piedra partida gris.',
    location: 'Cerro de las Rosas',
    year: '2025',
    highlights: ['Espacio urbano', 'Texturas combinadas', 'Luz cálida']
  },
  {
    id: 'proj-5',
    title: 'Parque Country Las Delicias',
    category: 'corte-de-cesped',
    serviceTitle: 'Mantenimiento Periódico con Seguro',
    image: '/src/assets/images/service_mowing_vogler_1790117776047.jpg',
    description: 'Mantenimiento quincenal de 1.400 m² de parque con protección perimetral de ventanales y seguro activo de rotura de cristales.',
    location: 'Country Las Delicias',
    year: '2026',
    highlights: ['Seguro de cristales', 'Corte parejo', 'Desmalezado fino']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Martín S.',
    initials: 'MS',
    location: 'Barrio Jardín, Córdoba',
    quote: 'La puntualidad y el detalle con el que dejaron el césped y los canteros es impecable. Nos avisaron con 15 minutos de anticipación al salir y dejaron las veredas totalmente sopladas y limpias.',
    service: 'Corte de césped periódico',
    date: 'Febrero 2026',
    rating: 5,
    badge: 'Mantenimiento Quincenal',
    verified: true,
    isDemo: true
  },
  {
    id: 'test-2',
    name: 'Laura B.',
    initials: 'LB',
    location: 'Country Las Delicias',
    quote: 'Teníamos dudas con la poda de unos frutales y cercos perimetrales. Lo hicieron con mucho criterio biológico, retiraron todos los restos verdes de inmediato y el personal fue super educado.',
    service: 'Poda responsable & Perfilado',
    date: 'Febrero 2026',
    rating: 5,
    badge: 'Propietaria en Country',
    verified: true,
    isDemo: true
  },
  {
    id: 'test-3',
    name: 'Gonzalo F.',
    initials: 'GF',
    location: 'Villa Belgrano',
    quote: 'La tranquilidad de saber que cuentan con póliza y seguro por rotura de cristales al pasar las motoguadañas cerca de los ventanales fue decisiva. Es la primera vez que un servicio de parque me da esta seriedad.',
    service: 'Mantenimiento integral con seguro',
    date: 'Enero 2026',
    rating: 5,
    badge: 'Seguro Verificado',
    verified: true,
    isDemo: true
  },
  {
    id: 'test-4',
    name: 'Patricia M.',
    initials: 'PM',
    location: 'Cerro de las Rosas',
    quote: 'Contraté el desmalezado profundo y resembrado tras las tormentas. Coordinamos el turno desde la web en 2 minutos. Respetaron el margen de horario y la diferencia en el jardín fue asombrosa.',
    service: 'Desmalezado & Recuperación',
    date: 'Enero 2026',
    rating: 5,
    badge: 'Turno Web',
    verified: true,
    isDemo: true
  },
  {
    id: 'test-5',
    name: 'Ing. Esteban Rossi',
    initials: 'ER',
    location: 'Valle Escondido',
    quote: 'Excelente cuadrilla. Tienen maquinaria a combustión moderna, silenciosa y bien calibrada. No te dañan los aspersores automáticos ni los canteros florales. 100% recomendados.',
    service: 'Corte con motoguadaña & orillado',
    date: 'Diciembre 2025',
    rating: 5,
    badge: 'Cliente Frecuente',
    verified: true,
    isDemo: true
  },
  {
    id: 'test-6',
    name: 'Mariana V.',
    initials: 'MV',
    location: 'La Cuesta Villa Residencial',
    quote: 'Excelente sistema de turnos. Te confirman por WhatsApp, te avisan la franja de tolerancia estimada de inicio y el trabajo final es de una prolijidad premium. Se nota la diferencia de nivel.',
    service: 'Mantenimiento preventivo',
    date: 'Diciembre 2025',
    rating: 5,
    badge: 'Residencia en Altura',
    verified: true,
    isDemo: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cuánto cuesta cortar el césped o hacer un mantenimiento?',
    answer: 'El valor depende de la superficie del terreno (m²), la altura actual del pasto, la cantidad de canteros u obstáculos y la periodicidad del servicio. Podés solicitar un presupuesto estimado sin compromiso o agendar una primera visita de evaluación.',
    category: 'servicios'
  },
  {
    id: 'faq-2',
    question: '¿Cada cuánto recomiendan realizar el mantenimiento del jardín?',
    answer: 'En épocas cálidas y de lluvia (octubre a marzo), sugerimos visitas cada 7 a 10 días para evitar que el césped se debilite o florezca desordenado. En otoño e invierno, un intervalo de 15 a 21 días suele ser óptimo.',
    category: 'servicios'
  },
  {
    id: 'faq-3',
    question: '¿Cuentan con seguro por rotura de cristales?',
    answer: 'Sí. En VOGLER trabajamos con protocolos de seguridad estrictos (protectores en motoguadañas y lonas de contención) y contamos con cobertura directa ante cualquier eventual impacto o rotura de cristales asociada al trabajo en tu propiedad.',
    category: 'seguro'
  },
  {
    id: 'faq-4',
    question: '¿Puedo reservar un turno directamente desde la web?',
    answer: 'Sí. Nuestro sistema de turnos online te permite registrarte en 1 minuto, elegir el servicio que necesitás, seleccionar fecha y franja horaria disponible, y recibir confirmación directa con los datos de la visita.',
    category: 'reservas'
  },
  {
    id: 'faq-5',
    question: '¿Puedo cancelar o reprogramar una reserva?',
    answer: 'Sí, desde tu panel de cliente podés cancelar o solicitar una reprogramación hasta 24 horas antes de la franja horaria agendada sin ningún tipo de penalidad.',
    category: 'reservas'
  },
  {
    id: 'faq-6',
    question: '¿Trabajan en casas particulares, comercios y empresas?',
    answer: 'Atendemos tanto residencias familiares y casas en countries como frentes comerciales, predios institucionales y complejos de oficinas que requieran una imagen verde cuidada y constante.',
    category: 'servicios'
  },
  {
    id: 'faq-7',
    question: '¿En qué zonas brindan servicio actualmente?',
    answer: 'Nuestra zona de cobertura principal abarca Córdoba Capital (Zona Norte, Zona Sur, Centro), Villa Allende, Mendiolaza y localidades cercanas. Podés consultar tu ubicación exacta por WhatsApp.',
    category: 'servicios'
  },
  {
    id: 'faq-8',
    question: '¿El presupuesto tiene algún costo?',
    answer: 'No. El presupuesto inicial, ya sea por foto/medidas enviadas por WhatsApp o mediante el formulario de consulta web, es 100% gratuito y sin compromiso.',
    category: 'pagos'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'VOGLER Parques y Jardines',
  tagline: 'Cuidamos y transformamos espacios verdes con profesionalismo, dedicación y seguro integral.',
  phone: '+54 351 520-5893',
  whatsapp: '+543515205893',
  address: 'Córdoba, Argentina',
  coverageZone: 'Córdoba Capital, Villa Allende, Mendiolaza y alrededores',
  glassInsuranceTitle: 'Seguro por rotura de cristales',
  glassInsuranceDescription: 'Sabemos que las máquinas desmalezadoras y cortadoras pueden despedir pequeñas piedras. Por eso, en VOGLER asumimos la total responsabilidad de nuestro trabajo: contamos con cobertura específica ante daños o roturas accidentales de vidrios y ventanales linderos durante la prestación del servicio.',
  glassInsuranceConditions: 'Condiciones: Reporte in situ o dentro de las 24hs del servicio. Verificación del daño en el área trabajada y reposición directa acordada con el cliente.',
  generalGuaranteeTitle: 'Trabajo prolijo y garantizado',
  generalGuaranteeDescription: 'Si al terminar el servicio algún rincón no quedó como esperabas, nos lo avisás y lo repasamos sin ningún costo adicional.'
};

export const DEMO_USERS: Record<string, User> = {
  customer: {
    id: 'usr-lucas',
    name: 'Lucas Ferreyra',
    email: 'lucas.ferreyra@gmail.com',
    phone: '+54 351 555-0192',
    role: 'user',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    addresses: [
      {
        id: 'addr-1',
        title: 'Casa Principal',
        street: 'Av. Laplace',
        number: '5420',
        neighborhood: 'Villa Belgrano',
        city: 'Córdoba',
        notes: 'Timbre en portón negro. Pasto en frente y patio trasero.'
      }
    ],
    gardenPreferences: {
      sizeApprox: '350 m²',
      hasPets: true,
      hasIrrigation: true,
      preferredTime: 'Mañana (09:00 - 12:00)'
    }
  },
  admin: {
    id: 'usr-admin',
    name: 'Director Vogler',
    email: 'admin@vogler.com',
    phone: '+54 351 520-5893',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    addresses: []
  }
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-2026-081',
    userId: 'usr-lucas',
    userName: 'Lucas Ferreyra',
    userEmail: 'lucas.ferreyra@gmail.com',
    userPhone: '+54 351 555-0192',
    serviceId: 'corte-cesped',
    serviceTitle: 'Corte de Césped',
    date: '2026-09-28',
    timeSlot: '09:00 - 11:30',
    address: {
      street: 'Av. Laplace',
      number: '5420',
      neighborhood: 'Villa Belgrano',
      city: 'Córdoba'
    },
    gardenSize: '350 m²',
    propertyType: 'Casa particular',
    notes: 'Corte estándar y perfilado de canteros cerca de la piscina.',
    status: 'confirmada',
    assignedCrew: 'Cuadrilla Norte (Matías & Jorge)',
    createdAt: '2026-09-21T10:30:00Z'
  },
  {
    id: 'BK-2026-074',
    userId: 'usr-lucas',
    userName: 'Lucas Ferreyra',
    userEmail: 'lucas.ferreyra@gmail.com',
    userPhone: '+54 351 555-0192',
    serviceId: 'poda',
    serviceTitle: 'Poda de Cercos Vivos',
    date: '2026-09-10',
    timeSlot: '14:30 - 17:00',
    address: {
      street: 'Av. Laplace',
      number: '5420',
      neighborhood: 'Villa Belgrano',
      city: 'Córdoba'
    },
    gardenSize: '350 m²',
    propertyType: 'Casa particular',
    notes: 'Poda de cerco perimetral de ligustrina y despeje de enredadera.',
    status: 'completada',
    assignedCrew: 'Cuadrilla Especializada',
    createdAt: '2026-09-02T15:12:00Z'
  }
];

export const INITIAL_SCHEDULE_CONFIG: ScheduleConfig = {
  workingDays: [1, 2, 3, 4, 5, 6], // Lunes (1) a Sábados (6). Domingo (0) deshabilitado por defecto.
  maxBookingDaysAhead: 14,
  timeSlots: [
    { id: 'slot-1', slot: '08:30 - 11:00', isActive: true, label: 'Turno Mañana 1' },
    { id: 'slot-2', slot: '11:30 - 14:00', isActive: true, label: 'Turno Mañana 2 / Mediodía' },
    { id: 'slot-3', slot: '14:30 - 17:00', isActive: true, label: 'Turno Tarde 1' },
    { id: 'slot-4', slot: '17:00 - 19:00', isActive: true, label: 'Turno Tarde 2' }
  ],
  blockedDatesList: [
    { date: '2026-09-25', reason: 'Mantenimiento de maquinaria y logística interna' }
  ],
  showDelayNotice: true,
  delayNoticeMinutes: 15,
  delayNoticeMessage: 'Aviso de puntualidad: El inicio del turno puede demorarse unos 15 minutos en comenzar según las distancias de traslado y tráfico desde el servicio anterior. Te avisamos por WhatsApp al salir hacia tu domicilio.'
};

export const AVAILABLE_TIME_SLOTS = [
  '08:30 - 11:00',
  '11:30 - 14:00',
  '14:30 - 17:00',
  '17:00 - 19:00'
];
