const pexelsVideo = (id: number, quality = "hd_1920_1080_25fps") =>
  `https://videos.pexels.com/video-files/${id}/${id}-${quality}.mp4`;

const local = (filename: string) => `/nuevas_fotos/${filename}`;

export type PhotoItem = {
  src: string;
  alt: string;
  category: string;
};

export const PHOTOS = {
  bodaPadrinhos: {
    src: local("pexels-rebornfilmes-31254026.jpg"),
    alt: "Mesa de boda con reservación para padrinos",
    category: "Bodas",
  },
  sillaReservado: {
    src: local("pexels-bertellifotografia-17001821.jpg"),
    alt: "Silla reservada con tarjeta floral en evento",
    category: "Bodas",
  },
  mesaReservado: {
    src: local("pexels-thisisjooh-35143280.jpg"),
    alt: "Mesa elegante con menú y señal de reservado",
    category: "Montaje",
  },
  menuBanquete: {
    src: local("pexels-bertellifotografia-17001814.jpg"),
    alt: "Menú de banquete en centro de mesa floral",
    category: "Banquetes",
  },
  felicidades: {
    src: local("pexels-lauraoliveira-35279297.jpg"),
    alt: "Centro de mesa con tarjeta Felicidades",
    category: "Celebraciones",
  },
  margarita: {
    src: local("pexels-caio-niceas-2148806704-36580797.jpg"),
    alt: "Bartender sirviendo margarita en barra",
    category: "Coctelería",
  },
  tequilaShots: {
    src: local("pexels-eduardo199o9-178988127-29683260.jpg"),
    alt: "Preparación de shots con tequila en barra",
    category: "Barra",
  },
  coctelPremium: {
    src: local("pexels-mohamed9380-36593616.jpg"),
    alt: "Coctel de autor con guarnición de manzana",
    category: "Mixología",
  },
} as const satisfies Record<string, PhotoItem>;

export const GALLERY: PhotoItem[] = [
  PHOTOS.bodaPadrinhos,
  PHOTOS.mesaReservado,
  PHOTOS.menuBanquete,
  PHOTOS.coctelPremium,
  PHOTOS.margarita,
  PHOTOS.sillaReservado,
  PHOTOS.felicidades,
  PHOTOS.tequilaShots,
];

export const MEDIA = {
  benefits: {
    hero: PHOTOS.bodaPadrinhos,
    accent: PHOTOS.felicidades,
    video: pexelsVideo(4763824),
  },
  services: {
    bannerVideo: pexelsVideo(7578616),
    showcase: [
      PHOTOS.mesaReservado,
      PHOTOS.sillaReservado,
      PHOTOS.menuBanquete,
      PHOTOS.bodaPadrinhos,
    ],
  },
  additionalServices: {
    bannerVideo: pexelsVideo(3196277),
    Parrillero: PHOTOS.mesaReservado,
    Bartender: PHOTOS.margarita,
    Mixólogo: PHOTOS.coctelPremium,
  },
  packages: {
    Básico: PHOTOS.mesaReservado,
    Premium: PHOTOS.bodaPadrinhos,
    Empresarial: PHOTOS.menuBanquete,
  },
  stats: {
    background: PHOTOS.menuBanquete,
  },
  testimonials: {
    Boda: PHOTOS.bodaPadrinhos,
    "Evento Corporativo": PHOTOS.menuBanquete,
    "XV Años": PHOTOS.sillaReservado,
    Bautizo: PHOTOS.felicidades,
  },
  process: {
    "Solicita Cotización": PHOTOS.mesaReservado,
    "Confirmamos Disponibilidad": PHOTOS.sillaReservado,
    "Realiza tu Anticipo": PHOTOS.menuBanquete,
    "¡Disfruta tu Evento!": PHOTOS.coctelPremium,
  },
  faq: {
    side: PHOTOS.coctelPremium,
  },
  contact: {
    side: PHOTOS.felicidades,
    video: pexelsVideo(3254066),
  },
  gallery: GALLERY,
} as const;
