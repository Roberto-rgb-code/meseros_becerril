const pexelsImage = (id: number, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const pexelsVideo = (id: number, quality = "hd_1920_1080_25fps") =>
  `https://videos.pexels.com/video-files/${id}/${id}-${quality}.mp4`;

export const MEDIA = {
  benefits: {
    featured: pexelsImage(5411887, 1400),
    accent: pexelsImage(1267320, 900),
    video: pexelsVideo(4763824),
  },
  services: {
    bannerVideo: pexelsVideo(7578616),
    items: {
      "Meseros para Eventos Privados": pexelsImage(769289, 900),
      "Staff para Bodas y XV Años": pexelsImage(265631, 900),
      "Eventos Corporativos": pexelsImage(3184183, 900),
      "Capitanes de Meseros": pexelsImage(2373335, 900),
      "Montaje y Desmontaje": pexelsImage(1045541, 900),
      "Servicio de Coctelería": pexelsImage(696218, 900),
      "Hostess y Recepción": pexelsImage(3171837, 900),
      "Servicio a Domicilio": pexelsImage(1025327, 900),
    },
  },
  additionalServices: {
    bannerVideo: pexelsVideo(3196277),
    Parrillero: pexelsImage(2338407, 800),
    Bartender: pexelsImage(2747448, 800),
    Mixólogo: pexelsImage(1283219, 800),
  },
  packages: {
    Básico: pexelsImage(941694, 900),
    Premium: pexelsImage(2788792, 900),
    Empresarial: pexelsImage(3184418, 900),
  },
  stats: {
    background: pexelsImage(1579739, 1920),
  },
  testimonials: {
    Boda: pexelsImage(2788792, 800),
    "Evento Corporativo": pexelsImage(3184183, 800),
    "XV Años": pexelsImage(2301284, 800),
    Bautizo: pexelsImage(1547248, 800),
  },
  process: {
    "Solicita Cotización": pexelsImage(7688460, 800),
    "Confirmamos Disponibilidad": pexelsImage(3184296, 800),
    "Realiza tu Anticipo": pexelsImage(4386466, 800),
    "¡Disfruta tu Evento!": pexelsImage(5411887, 800),
  },
  faq: {
    side: pexelsImage(262978, 1000),
  },
  contact: {
    side: pexelsImage(3171837, 1000),
    video: pexelsVideo(3254066),
  },
  gallery: [
    { src: pexelsImage(3171837, 1260), alt: "Celebración elegante", category: "Eventos" },
    { src: pexelsImage(2788792, 1260), alt: "Boda elegante", category: "Bodas" },
    { src: pexelsImage(1579739, 1260), alt: "Servicio de catering profesional", category: "Catering" },
    { src: pexelsImage(3184183, 1260), alt: "Evento corporativo exitoso", category: "Corporativo" },
    { src: pexelsImage(1045541, 1260), alt: "Mesa elegante preparada", category: "Montajes" },
    { src: pexelsImage(696218, 1260), alt: "Servicio de bar profesional", category: "Coctelería" },
    { src: pexelsImage(5411887, 1260), alt: "Mesero sirviendo en evento", category: "Servicio" },
    { src: pexelsImage(1267320, 1260), alt: "Banquete de gala", category: "Banquetes" },
  ],
} as const;
