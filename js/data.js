// =========================================================================
// DATA COMPARTIDA — CALLEJEROS RÍO CUARTO
// Centralización de datos para que todas las páginas compartan la misma información.
// =========================================================================

const samplePets = [
  {
    id: 'loki',
    name: 'Loki',
    specie: 'perro',
    sex: 'macho',
    age: '2 Años',
    ageYears: 2,
    sociable: true,
    castrado: true,
    urgent: false,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    description: 'Rescatado en barrio Alberdi. Es juguetón, sociable con otros perros y niños, muy compañero y con libreta sanitaria al día.',
    salud: {
      estado: 'Sano y vital',
      vacunas: 'Al Día (Séxtuple y Antirrábica)',
      parasitos: 'Desparasitado hace 1 mes',
      pulgas: 'Tratado con pipeta',
      otros: 'Sin observaciones clínicas'
    },
    notas: 'Le encanta correr en espacios abiertos. Ideal para familias activas.'
  },
  {
    id: 'luna',
    name: 'Luna',
    specie: 'gato',
    sex: 'hembra',
    age: '8 Meses',
    ageYears: 0.7,
    sociable: true,
    castrado: true,
    urgent: false,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    description: 'Gatita muy dulce y tranquila. Utiliza piedritas sanitarias a la perfección, ideal para departamento o casa cerrada.',
    salud: {
      estado: 'Excelente estado de salud',
      vacunas: 'Triple felina completa',
      parasitos: 'Sin parásitos',
      pulgas: 'Pipeta al día',
      otros: 'Negativa a VIF y ViLEF'
    },
    notas: 'Muy mimosa, busca contacto humano y se adapta rápido a nuevos ambientes.'
  },
  {
    id: 'rocco',
    name: 'Rocco',
    specie: 'perro',
    sex: 'macho',
    age: '4 Años',
    ageYears: 4,
    sociable: false,
    castrado: true,
    urgent: true,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    description: 'Perro leal y protector. Su hogar de tránsito vence en pocos días. Necesita una familia sin otros animales que le brinde paciencia y afecto.',
    salud: {
      estado: 'En recuperación motriz leve',
      vacunas: 'Al Día',
      parasitos: 'Desparasitado',
      pulgas: 'Protegido con collar antiparasitario',
      otros: 'Dermatitis alérgica controlada'
    },
    notas: '🚨 CASO URGENTE: El hogar de tránsito actual finaliza este fin de semana. Requiere adoptante paciente.'
  },
  {
    id: 'misa',
    name: 'Misa',
    specie: 'gato',
    sex: 'hembra',
    age: '1 Año',
    ageYears: 1,
    sociable: true,
    castrado: false,
    urgent: false,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    description: 'Curiosa y ronroneadora. Se entrega con compromiso formal de castración gratuita por parte de la red de voluntarios.',
    salud: {
      estado: 'Sana y activa',
      vacunas: 'Esquema de cachorro completo',
      parasitos: 'Desparasitada',
      pulgas: 'Sin pulgas',
      otros: 'Turno de castración asignado para el próximo mes'
    },
    notas: 'No castrada aún por edad y peso previo, incluye voucher para castración sin costo.'
  },
  {
    id: 'bora',
    name: 'Bora',
    specie: 'perro',
    sex: 'hembra',
    age: '3 Meses',
    ageYears: 0.25,
    sociable: true,
    castrado: false,
    urgent: true,
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&q=80',
    description: 'Cachorrita mestiza de tamaño mediano encontrada en Banda Norte. Muy juguetona, desparasitada y con primera vacuna aplicada.',
    salud: {
      estado: 'Cachorra en crecimiento saludable',
      vacunas: 'Primeras 2 dosis de Séxtuple',
      parasitos: 'Desparasitada (requiere refuerzo a los 4 meses)',
      pulgas: 'Sin ectoparásitos',
      otros: 'Castración obligatoria a los 6 meses'
    },
    notas: '🚨 CASO URGENTE: Fue hallada sola en una caja. Necesita hogar definitivo o tránsito de largo plazo.'
  },
  {
    id: 'thor',
    name: 'Thor',
    specie: 'perro',
    sex: 'macho',
    age: '5 Años',
    ageYears: 5,
    sociable: true,
    castrado: true,
    urgent: false,
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
    description: 'Un gigante bueno y bonachón. Camina muy bien con correa y adora las siestas al sol. Apto para convivir con niños.',
    salud: {
      estado: 'Excelente estado clínico general',
      vacunas: 'Completo al día',
      parasitos: 'Tratamiento trimestral al día',
      pulgas: 'Sin pulgas',
      otros: 'Control dental anual realizado'
    },
    notas: 'Perro muy tranquilo y equilibrado. Ideal para casa con patio o departamento espacioso.'
  }
];

const initialNotifications = [
  { id: 1, title: 'Alerta Perro Perdido en Centro', text: 'Mestizo mediano marrón con collar azul visto en Plaza Roca.', time: 'Hace 15 min', unread: true, tag: 'Urgente' },
  { id: 2, title: 'Jornada de Castración Gratuita', text: 'Sábado 10:00 hs en Vecinal Alberdi. Cupos limitados por orden de llegada.', time: 'Hace 2 horas', unread: true, tag: 'Comunidad' },
  { id: 3, title: 'Cachorritos Huérfanos Rescatados', text: '3 gatitos de 1 mes buscan nodriza o leche especial en Banda Norte.', time: 'Hace 4 horas', unread: true, tag: 'Urgente' },
  { id: 4, title: '¡Final Feliz!', text: 'Pancho fue adoptado y ya está en su nuevo hogar definitivo.', time: 'Ayer', unread: false, tag: 'Adopción' },
  { id: 5, title: 'Colecta de Mantas y Alimento', text: 'Recibimos donaciones para los refugios este fin de semana.', time: 'Hace 2 días', unread: false, tag: 'Colecta' }
];

// Comentarios de ejemplo (simulados) para la ficha de cada alerta.
// Son personas ficticias: la sección de comentarios es solo una maqueta.
const sampleAlertComments = {
  'alt-1': [
    { author: 'Carla M.', time: 'Hace 10 min', text: 'Lo vi hace un rato cruzando por Sobremonte y Constitución, iba hacia el Concejo.' },
    { author: 'Diego R.', time: 'Hace 6 min', text: 'Comparto en el grupo del barrio. ¿Tiene chapita con nombre?' },
    { author: 'Sofía L.', time: 'Hace 2 min', text: 'Estoy cerca de la plaza, salgo a buscarlo con mi hijo. Les aviso cualquier cosa.' }
  ],
  'alt-2': [
    { author: 'Marcelo P.', time: 'Hace 1 hora', text: 'Hola, a mi vecina se le perdió un gatito atigrado la semana pasada en Banda Norte. Le paso el contacto.' },
    { author: 'Lucía G.', time: 'Hace 40 min', text: 'Si nadie lo reclama puedo darle tránsito por unos días, tengo transportadora.' }
  ],
  'alt-3': [
    { author: 'Veterinaria Pasteur', time: 'Hace 3 horas', text: 'Estamos a dos cuadras. Si alguien puede acercarla, la revisamos sin costo.' },
    { author: 'Javier T.', time: 'Hace 2 horas', text: 'Pasé con el auto y ya no estaba en la esquina, creo que se fue para el lado de la plaza.' },
    { author: 'Ana B.', time: 'Hace 1 hora', text: 'La encontré en la plaza Alberdi. Le dejé comida y agua, me quedo con ella hasta que alguien pueda llevarla.' }
  ],
  'alt-4': [
    { author: 'Rocío F.', time: 'Ayer', text: 'Pobrecito, hacía mucho frío anoche. ¿Alguien sabe si sigue por la costanera?' },
    { author: 'Martín S.', time: 'Hace 5 horas', text: 'Hoy temprano estaba debajo del puente. Le llevé una manta.' }
  ]
};

// Alertas comunitarias de animales en la vía pública (Río Cuarto)
const initialAlerts = [
  {
    id: 'alt-1',
    title: 'Perro mestizo extraviado en Plaza Roca',
    specie: 'perro',
    situation: 'perdido', // 'perdido', 'encontrado', 'emergencia'
    location: 'Plaza Roca (Centro)',
    description: 'Mestizo mediano color canela con collar azul. Se asustó con una bocina y corrió hacia calle Sobremonte.',
    contact: '358 4123456',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    timestamp: Date.now() - 1000 * 60 * 18, // Hace 18 minutos
    timeAgo: 'Hace 18 minutos'
  },
  {
    id: 'alt-2',
    title: 'Gatito atigrado encontrado en Banda Norte',
    specie: 'gato',
    situation: 'encontrado',
    location: 'Marcelo T. de Alvear al 1400',
    description: 'Gatito manso y limpio. Lo retuvimos en el local de la esquina para que no lo atropellen.',
    contact: '358 4987654',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    timestamp: Date.now() - 1000 * 60 * 115, // Hace casi 2 horas
    timeAgo: 'Hace 2 horas'
  },
  {
    id: 'alt-3',
    title: 'Perrita con herida visible en pata trasera',
    specie: 'perro',
    situation: 'emergencia',
    location: 'Av. Colombres y Pasteur (Alberdi)',
    description: 'Hembra mediana, renguea mucho y busca sombra. Le dimos agua fresca. Se necesita veterinario o tránsito.',
    contact: '358 4567890',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    timestamp: Date.now() - 1000 * 60 * 230, // Hace 4 horas
    timeAgo: 'Hace 4 horas'
  },
  {
    id: 'alt-4',
    title: 'Cachorro solitario visto en Costanera Sur',
    specie: 'perro',
    situation: 'encontrado',
    location: 'Costanera Sur cerca del Puente Carretero',
    description: 'Cachorrito negro con mancha blanca en el pecho, de unos 3 meses. Asustado pero dócil.',
    contact: '358 4112233',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&q=80',
    timestamp: Date.now() - 1000 * 60 * 60 * 22, // Ayer
    timeAgo: 'Ayer'
  }
];
