/* ContaPro - Mock Data
   Datos centralizados consumidos por main.js y contact.js.
   Expone window.CONTA_DATA para acceso global.
*/

(function () {
  'use strict';

  const COMPANY = {
    name: 'ContaPro',
    tagline: 'Asesoría contable y fiscal de confianza',
    description: 'Más de 15 años respaldando a empresas y emprendedores con servicios contables, fiscales y financieros de excelencia.',
    phone: '+52 55 1234 5678',
    phoneRaw: '+525512345678',
    whatsapp: '+52 55 8765 4321',
    email: 'contacto@contapro.mx',
    address: 'Av. Reforma 123, Int. 456, Cuauhtémoc, CDMX, 06600',
    shortAddress: 'Av. Reforma 123, CDMX',
    mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-99.1700%2C19.4200%2C-99.1500%2C19.4350&layer=mapnik&marker=19.4275%2C-99.1600',
    mapLink: 'https://www.openstreetmap.org/?mlat=19.4275&mlon=-99.16#map=17/19.4275/-99.1600',
    hours: {
      weekdays: 'Lunes a Viernes · 9:00 a 18:00',
      saturday: 'Sábado · 9:00 a 13:00',
      sunday: 'Domingo · Cerrado'
    },
    social: {
      facebook:  'https://facebook.com/',
      instagram: 'https://instagram.com/',
      linkedin:  'https://linkedin.com/',
      twitter:   'https://twitter.com/'
    },
    foundedYear: 2009
  };

  const STATS = [
    { value: 15, suffix: '+', label: 'Años de experiencia' },
    { value: 540, suffix: '+', label: 'Clientes activos' },
    { value: 4800, suffix: '+', label: 'Declaraciones presentadas' },
    { value: 220, suffix: '+', label: 'Empresas asesoradas' }
  ];

  const SERVICES = [
    {
      id: 'contabilidad',
      title: 'Contabilidad general',
      short: 'Llevamos el registro contable completo de tu empresa, manteniendo tus finanzas claras y al día.',
      icon: 'calculator',
      features: ['Registros contables mensuales', 'Estados financieros', 'Conciliaciones bancarias', 'Cumplimiento NIF']
    },
    {
      id: 'impuestos',
      title: 'Declaración de impuestos',
      short: 'Calculamos y presentamos tus obligaciones fiscales ante el SAT, optimizando tu carga tributaria.',
      icon: 'document',
      features: ['ISR, IVA, IEPS', 'Declaraciones mensuales y anuales', 'Devoluciones automáticas', 'Dictamen fiscal']
    },
    {
      id: 'auditoria',
      title: 'Auditoría y dictaminación',
      short: 'Revisamos tus estados financieros con apego a las normas para garantizar transparencia y confianza.',
      icon: 'shield',
      features: ['Auditoría interna y externa', 'Dictamen para efectos fiscales', 'Detección de riesgos', 'Recomendaciones de mejora']
    },
    {
      id: 'nomina',
      title: 'Nómina y recursos humanos',
      short: 'Gestionamos el cálculo, timbrado y dispersión de nómina de tu equipo, incluyendo IMSS e INFONAVOT.',
      icon: 'users',
      features: ['Cálculo y timbrado CFDI', 'Altas y bajas IMSS', 'Finiquitos y liquidaciones', 'Reporte anual de nómina']
    },
    {
      id: 'asesoria',
      title: 'Asesoría fiscal y legal',
      short: 'Te acompañamos en decisiones estratégicas con consultoría especializada en materia fiscal.',
      icon: 'lightbulb',
      features: ['Planeación fiscal', 'Atención de requerimientos', 'Recursos de revocación', 'Consultoría legal mercantil']
    },
    {
      id: 'constitucion',
      title: 'Constitución de empresas',
      short: 'Abrimos tu empresa de principio a fin: acta constitutiva, RFC, régimen fiscal y permisos.',
      icon: 'building',
      features: ['Sociedad mercantil y SAS', 'Inscripción al RFC', 'Alta patronal IMSS', 'Permisos y licencias']
    },
    {
      id: 'financieros',
      title: 'Estados financieros',
      short: 'Elaboramos balances, estados de resultados y reportes para toma de decisiones informadas.',
      icon: 'chart',
      features: ['Balance general', 'Estado de resultados', 'Flujo de efectivo', 'Análisis financiero']
    },
    {
      id: 'consultoria',
      title: 'Consultoría financiera',
      short: 'Analizamos tu negocio y diseñamos estrategias financieras para crecer de forma sostenible.',
      icon: 'target',
      features: ['Diagnóstico financiero', 'Planeación estratégica', 'Optimización de costos', 'Indicadores KPI']
    }
  ];

  const PROCESS = [
    { step: '01', title: 'Diagnóstico', desc: 'Analizamos tu situación fiscal y contable actual para detectar oportunidades.' },
    { step: '02', title: 'Propuesta', desc: 'Diseñamos un plan a la medida con alcance, tiempos y costos claros.' },
    { step: '03', title: 'Implementación', desc: 'Ejecutamos el plan con comunicación constante y reportes periódicos.' },
    { step: '04', title: 'Seguimiento', desc: 'Monitoreamos resultados y optimizamos continuamente para tu beneficio.' }
  ];

  const VALUES = [
    { title: 'Integridad', desc: 'Actuamos con ética y transparencia en cada operación que realizamos.', icon: 'compass' },
    { title: 'Excelencia', desc: 'Buscamos la máxima calidad en cada servicio que entregamos.', icon: 'award' },
    { title: 'Compromiso', desc: 'Nos involucramos en el éxito financiero de cada cliente.', icon: 'handshake' },
    { title: 'Innovación', desc: 'Usamos tecnología y procesos modernos para resultados superiores.', icon: 'sparkles' }
  ];

  const WHY_US = [
    { title: 'Atención personalizada', desc: 'Cada cliente tiene un asesor dedicado que conoce su negocio a profundidad.', icon: 'user' },
    { title: 'Tecnología de punta', desc: 'Plataformas seguras en la nube para acceder a tu información 24/7.', icon: 'cloud' },
    { title: 'Equipo certificado', desc: 'Contadores públicos titulados y certificados ante la SHCP y el IMCP.', icon: 'certificate' }
  ];

  const PRICING = [
    {
      id: 'basico',
      name: 'Básico',
      price: '$1,500',
      period: 'MXN / mes',
      description: 'Ideal para emprendedores y pequeños negocios que inician su camino fiscal.',
      highlighted: false,
      features: [
        { text: 'Contabilidad mensual', included: true },
        { text: 'Declaración de IVA e ISR', included: true },
        { text: 'Una persona para asesoría', included: true },
        { text: 'Conciliación bancaria (1 cuenta)', included: true },
        { text: 'Estados financieros básicos', included: true },
        { text: 'Nómina de hasta 3 empleados', included: false },
        { text: 'Auditoría anual', included: false }
      ]
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: '$3,500',
      period: 'MXN / mes',
      description: 'La opción favorita para PyMEs en crecimiento que buscan un aliado integral.',
      highlighted: true,
      features: [
        { text: 'Todo lo del plan Básico', included: true },
        { text: 'Nómina hasta 15 empleados', included: true },
        { text: 'Asesoría fiscal prioritaria', included: true },
        { text: 'Conciliación bancaria (3 cuentas)', included: true },
        { text: 'Estados financieros completos', included: true },
        { text: 'Planeación fiscal trimestral', included: true },
        { text: 'Auditoría anual', included: false }
      ]
    },
    {
      id: 'empresarial',
      name: 'Empresarial',
      price: '$7,500',
      period: 'MXN / mes',
      description: 'Servicio premium para corporativos con múltiples entidades y operaciones complejas.',
      highlighted: false,
      features: [
        { text: 'Todo lo del plan Profesional', included: true },
        { text: 'Nómina ilimitada', included: true },
        { text: 'Auditoría anual', included: true },
        { text: 'Cuentas bancarias ilimitadas', included: true },
        { text: 'Atención de requerimientos SAT', included: true },
        { text: 'Consultoría estratégica mensual', included: true },
        { text: 'Equipo dedicado in-company', included: true }
      ]
    }
  ];

  const FAQ = [
    {
      q: '¿Cuál es el plazo de enganche?',
      a: 'Una vez firmado el contrato iniciamos en un máximo de 5 días hábiles. Para planes Empresarial el arranque puede incluir migración de información histórica.'
    },
    {
      q: '¿Atienden a clientes fuera de la Ciudad de México?',
      a: 'Sí. Trabajamos con clientes en toda la República Mexicana de forma 100% remota con firma electrónica y plataformas en la nube.'
    },
    {
      q: '¿Qué pasa si cambio de régimen fiscal?',
      a: 'Te acompañamos en la transición sin costo adicional dentro de tu plan, incluyendo avisos al SAT y ajuste de obligaciones.'
    },
    {
      q: '¿Puedo cambiar de plan en cualquier momento?',
      a: 'Por supuesto. Puedes subir o bajar de plan con aviso de 15 días, y ajustamos la facturación al siguiente periodo.'
    },
    {
      q: '¿Emitirán comprobantes fiscales (CFDI)?',
      a: 'Sí. Emitimos CFDI de pago por cada mensualidad para que puedas deducir el servicio.'
    }
  ];

  const TEAM = [
    { name: 'María Fernanda Ruiz', role: 'Directora general', bio: 'Contadora pública certificada con 20 años liderando equipos de auditoría fiscal.', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Carlos Méndez Soto', role: 'Socio fiscal', bio: 'Especialista en planeación fiscal y litigio administrativo ante el SAT.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Ana Gabriela Pérez', role: 'Gerente de nómina', bio: 'Líder en gestión de nómina y seguridad social para corporativos.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Roberto Aguilar Lara', role: 'Auditor senior', bio: 'Auditor certificado con enfoque en NIF y normas internacionales IFRS.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Lucía Hernández', role: 'Asesora financiera', bio: 'Asesora a PyMEs en planeación financiera y estrategias de crecimiento.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces' }
  ];

  const TESTIMONIALS = [
    {
      name: 'Daniel Ortega',
      role: 'Director general',
      company: 'Ortega Logística',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
      text: 'ContaPro transformó la manera en que administramos nuestras finanzas. Su equipo siempre está un paso adelante y nos ahorró una multa fiscal que hubiera sido crítica.'
    },
    {
      name: 'Patricia Salinas',
      role: 'Fundadora',
      company: 'Estudio Salinas',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
      text: 'Pasé de preocuparme por los impuestos a tener un plan fiscal claro. La atención personalizada marca la diferencia, me siento acompañada todo el año.'
    },
    {
      name: 'Jorge Vázquez',
      role: 'CFO',
      company: 'Distribuidora VAM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces',
      text: 'Migramos de despacho y el proceso fue impecable. La plataforma en la nube nos da visibilidad total del estado financiero de la empresa.'
    },
    {
      name: 'Sofía Castillo',
      role: 'CEO',
      company: 'Boutique Aurelia',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=faces',
      text: 'Como emprendedora no entendía nada de fiscal. ContaPro me lo explicó con paciencia y hoy tengo mi empresa al 100% regularizada.'
    },
    {
      name: 'Miguel Torres',
      role: 'Socio director',
      company: 'Torres & Asociados',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces',
      text: 'La auditoría que nos realizaron nos detectó puntos de mejora que nadie más había visto. Su visión estratégica es invaluable.'
    }
  ];

  /* Galería: imágenes con categoría para filtro */
  const GALLERY = [
    { id: 1, category: 'oficina', alt: 'Sala de juntas principal',       url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
    { id: 2, category: 'equipo',   alt: 'Equipo de trabajo colaborativo', url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop' },
    { id: 3, category: 'eventos',  alt: 'Conferencia anual de clientes', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop' },
    { id: 4, category: 'oficina',  alt: 'Recepción de oficinas',         url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop' },
    { id: 5, category: 'equipo',   alt: 'Sesión de planeación',          url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop' },
    { id: 6, category: 'eventos',  alt: 'Capacitación a clientes',       url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop' },
    { id: 7, category: 'oficina',  alt: 'Estación de trabajo moderna',   url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop' },
    { id: 8, category: 'equipo',   alt: 'Asesoría personalizada',        url: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=600&fit=crop' },
    { id: 9, category: 'eventos',  alt: 'Networking empresarial',        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop' },
    { id: 10, category: 'oficina', alt: 'Biblioteca técnica fiscal',    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop' },
    { id: 11, category: 'equipo',  alt: 'Reunión con cliente',           url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop' },
    { id: 12, category: 'eventos', alt: 'Celebración aniversario',       url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop' }
  ];

  const COURSES = [
    { name: 'Introducción a la facturación CFDI 4.0',         instructor: 'Carlos Méndez',     duration: '8 horas',  level: 'Principiante', price: '$1,200',  modality: 'Presencial' },
    { name: 'Planeación fiscal para PyMEs',                   instructor: 'María Fernanda Ruiz', duration: '16 horas', level: 'Intermedio',  price: '$2,800',  modality: 'Híbrido' },
    { name: 'Nómina y seguridad social desde cero',           instructor: 'Ana Gabriela Pérez', duration: '12 horas', level: 'Principiante', price: '$1,900',  modality: 'En línea' },
    { name: 'Cierre anual y dictaminación fiscal',            instructor: 'Roberto Aguilar',   duration: '20 horas', level: 'Avanzado',   price: '$3,500',  modality: 'Presencial' },
    { name: 'Excel financiero para contadores',               instructor: 'Lucía Hernández',   duration: '10 horas', level: 'Intermedio',  price: '$1,600',  modality: 'En línea' },
    { name: 'Constitución de empresas paso a paso',           instructor: 'Carlos Méndez',     duration: '6 horas',  level: 'Principiante', price: '$950',    modality: 'En línea' }
  ];

  /* Horario semanal de talleres */
  const SCHEDULE = [
    { day: 'Lunes',     slots: [
        { time: '09:00 – 11:00', course: 'Introducción CFDI 4.0',          instructor: 'Carlos Méndez',     room: 'Aula 1' },
        { time: '17:00 – 19:00', course: 'Excel financiero (turno vespertino)', instructor: 'Lucía Hernández',  room: 'Aula 2' }
      ] },
    { day: 'Martes',    slots: [
        { time: '10:00 – 12:00', course: 'Nómina y seguridad social',     instructor: 'Ana Gabriela Pérez', room: 'Aula 1' },
        { time: '18:00 – 20:00', course: 'Constitución de empresas',       instructor: 'Carlos Méndez',      room: 'Online' }
      ] },
    { day: 'Miércoles', slots: [
        { time: '09:00 – 11:00', course: 'Planeación fiscal para PyMEs',   instructor: 'María Fernanda Ruiz', room: 'Aula 1' },
        { time: '16:00 – 18:00', course: 'Cierre anual y dictaminación',   instructor: 'Roberto Aguilar',    room: 'Aula 2' }
      ] },
    { day: 'Jueves',    slots: [
        { time: '10:00 – 12:00', course: 'Excel financiero para contadores', instructor: 'Lucía Hernández',   room: 'Aula 1' },
        { time: '17:00 – 19:00', course: 'Nómina y seguridad social',      instructor: 'Ana Gabriela Pérez', room: 'Online' }
      ] },
    { day: 'Viernes',   slots: [
        { time: '09:00 – 11:00', course: 'Introducción CFDI 4.0',           instructor: 'Carlos Méndez',     room: 'Aula 1' },
        { time: '15:00 – 17:00', course: 'Planeación fiscal para PyMEs',    instructor: 'María Fernanda Ruiz', room: 'Aula 2' }
      ] },
    { day: 'Sábado',    slots: [
        { time: '09:00 – 12:00', course: 'Taller integral: Constitución + Nómina', instructor: 'Equipo ContaPro', room: 'Aula 1' }
      ] }
  ];

  const SERVICE_CATEGORIES = ['Todos', 'Oficina', 'Equipo', 'Eventos'];

  window.CONTA_DATA = {
    COMPANY,
    STATS,
    SERVICES,
    PROCESS,
    VALUES,
    WHY_US,
    PRICING,
    FAQ,
    TEAM,
    TESTIMONIALS,
    GALLERY,
    COURSES,
    SCHEDULE,
    SERVICE_CATEGORIES
  };
})();
