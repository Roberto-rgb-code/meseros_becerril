const mix = (filename: string) => `/nuevas_fotos/mix/${filename}`;

export const MIXOLOGY_IMAGES = {
  hero: mix("pexels-mohamed9380-36169160.jpg"),
  heroAccent: mix("pexels-diego-silveira-675020766-33833715.jpg"),
  barCliente: mix("pexels-jonathan-reynaga-861774-19841830.jpg"),
  barClienteDetail: mix("pexels-baris-17903471.jpg"),
  shake: mix("pexels-mike-c-2151163165-35896286.jpg"),
  signature: mix("pexels-rafaela-freire-2148880808-32435276.jpg"),
  menuMedida: mix("pexels-charlotte-may-5946643.jpg"),
  menuBar: mix("pexels-maribernotti-4012417.jpg"),
  spirits: mix("pexels-dennilson-navichoque-522596985-16407731.jpg"),
  service: mix("pexels-stephen-leonardi-587681991-35925508.jpg"),
} as const;

export const BAR_CLIENTE_COCKTAILS = [
  "Tequila Sunrise",
  "Mojitos",
  "Gin & Tonic",
  "St-Germain Spritz",
  "Aperol Spritz",
  "Martinis",
  "Cosmopolitan",
  "Trago especial del invitado",
] as const;

export const MENU_SPIRITS = [
  {
    name: "Tequilas",
    examples: ["Paloma", "Margarita clásica", "Tequila Sunrise", "Spicy Margarita"],
    image: mix("pexels-pedrofurtadoo-28617333.jpg"),
  },
  {
    name: "Rones",
    examples: ["Mojito", "Daiquiri", "Piña Colada", "Old Cuban"],
    image: mix("pexels-unal-aslan-48172282-29093620.jpg"),
  },
  {
    name: "Whiskys",
    examples: ["Old Fashioned", "Whisky Sour", "Manhattan", "Highball"],
    image: mix("pexels-dmitriy-tarasenko-70199286-17383865.jpg"),
  },
  {
    name: "Vodkas",
    examples: ["Cosmopolitan", "Moscow Mule", "Espresso Martini", "Vodka Tonic"],
    image: mix("pexels-joseismaelespinola-16936760.jpg"),
  },
] as const;

export const MIXOLOGY_OPTIONS = [
  {
    id: "bar-cliente",
    number: "01",
    badge: "Experiencia en vivo",
    title: "Tu Bar, Nuestro Arte",
    subtitle: "Coctelería con los destilados de tu evento",
    description:
      "Llegamos a tu celebración, evaluamos la cantidad y variedad de destilados que ya tienes y, con esa base, creamos un repertorio de tragos clásicos y de autor. Cada bebida se prepara al momento —shake, presentación y detalle— para que cada invitado viva una experiencia única.",
    highlights: [
      "Aprovechamos tu inventario de licores",
      "Creación de tragos en vivo frente a tus invitados",
      "Presentación premium y trago especial por invitado",
      "Ideal para eventos con barra ya surtida",
    ],
    cocktails: BAR_CLIENTE_COCKTAILS,
    image: MIXOLOGY_IMAGES.barCliente,
    imageSecondary: MIXOLOGY_IMAGES.shake,
    cta: "Activar mi bar personal",
    ctaHint: "Cuéntanos qué destilados tienes y armamos la experiencia",
    whatsappMessage:
      "Hola, me interesa la opción *Tu Bar, Nuestro Arte* (coctelería con mis destilados). Quiero que creen tragos en vivo para mi evento.",
  },
  {
    id: "menu-medida",
    number: "02",
    badge: "Menú personalizado",
    title: "Menú a tu Medida",
    subtitle: "Coctelería diseñada para tu número de invitados",
    description:
      "Nosotros llevamos el menú completo: según la cantidad de personas, el tipo de celebración y el estilo de tragos que deseas, diseñamos una carta de coctelería con opciones creadas a partir de tequilas, rones, whiskys y vodkas premium.",
    highlights: [
      "Menú diseñado para tu número de invitados",
      "Selección por perfil de sabor y tipo de evento",
      "Carta con tequilas, rones, whiskys y vodkas",
      "Servicio llave en mano con mixólogo profesional",
    ],
    spirits: MENU_SPIRITS,
    image: MIXOLOGY_IMAGES.menuMedida,
    imageSecondary: MIXOLOGY_IMAGES.menuBar,
    cta: "Armar mi menú de cocteles",
    ctaHint: "Indica invitados, fecha y estilo de tragos que buscas",
    whatsappMessage:
      "Hola, me interesa la opción *Menú a tu Medida*. Necesito un menú de coctelería personalizado para mi evento.",
  },
] as const;
