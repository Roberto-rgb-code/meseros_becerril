"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

const CONTACT = {
  name: "Vianey Becerril",
  phone: "33-10-15-03-58",
  whatsapp: "5213310150358",
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("active");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function SectionHeader({
  number,
  label,
  title,
  description,
  align = "left",
}: {
  number: string;
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-10 md:mb-14 lg:mb-20 ${align === "center" ? "text-center mx-auto" : ""}`}>
      <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 md:mb-8 ${align === "center" ? "justify-center" : ""}`}>
        <span className="section-number">{number}{"//"}</span>
        <span className="section-label">{label}</span>
      </div>
      <h2 className="section-title mb-6">{title}</h2>
      {description && (
        <p className={`section-description ${align === "center" ? "mx-auto" : ""}`}>{description}</p>
      )}
    </div>
  );
}

function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-link group"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? "glass py-3 md:py-4" : "bg-transparent py-4 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="group min-w-0 flex-1 md:flex-none">
            <span
              className="block text-base sm:text-lg md:text-xl tracking-wide text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors duration-300 truncate"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {CONTACT.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link !text-[var(--gold)]"
            >
              Cotizar Ahora
            </a>
          </div>

          <button
            className="md:hidden text-[var(--foreground)] p-2 -mr-2 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[57px] bg-[var(--background)] z-40 overflow-y-auto">
            <div className="flex flex-col gap-6 px-4 sm:px-6 py-8 pb-24">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-base py-2 border-b border-[var(--border)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link !text-[var(--gold)] text-base mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/5032272-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 hero-mobile-overlay md:hidden pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pb-12 sm:pb-16 md:pb-24 pt-24 sm:pt-32 hero-text-shadow md:[text-shadow:none]">
        <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-8 animate-fade-in-up">
          Servicio profesional de meseros en Ciudad de México
        </p>

        <div className="max-w-4xl">
          <span
            className="inline-block text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--gold)] mb-4 sm:mb-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            ✨ +350 Eventos Exitosos
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[var(--foreground)] mb-6 sm:mb-8 leading-[1.1] animate-fade-in-up opacity-0"
            style={{ fontFamily: "var(--font-playfair)", animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Meseros <span className="text-gradient">Profesionales</span>
            <br />
            Para Tus Eventos
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-[var(--muted)] max-w-xl mb-8 sm:mb-10 leading-relaxed animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            Personal capacitado, uniformado y con experiencia en protocolo.
            Hacemos de tu evento una experiencia memorable.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
          >
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20cotizar%20el%20servicio%20de%20meseros`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Cotiza por WhatsApp
            </a>
            <a href="#servicios" className="text-link text-[var(--muted)]">
              Ver Servicios
            </a>
          </div>

          <p
            className="mt-8 sm:mt-12 text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--muted)] animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          >
            Disponibles fines de semana y días festivos
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const ref = useReveal();

  const benefits = [
    { title: "Experiencia Certificada", description: "Personal con años de experiencia en eventos de alta gama" },
    { title: "Protocolo Profesional", description: "Capacitados en etiqueta y servicio de primera clase" },
    { title: "Atención Rápida", description: "Servicio eficiente y atento a cada detalle" },
    { title: "Disponibilidad Total", description: "Fines de semana y días festivos sin problema" },
    { title: "Cobertura Regional", description: "Servicio en toda la región y zonas cercanas" },
    { title: "Uniformes Impecables", description: "Presentación impecable acorde a tu evento" },
  ];

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          <div>
            <SectionHeader
              number="01"
              label="¿Por qué elegirnos?"
              title={
                <>
                  Beneficios que nos <span className="text-gradient">Distinguen</span>
                </>
              }
              description="Nos comprometemos a brindar un servicio excepcional que supere tus expectativas"
            />
            <TextLink href="#galeria">Ver galería</TextLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <span className="text-xs tracking-[0.15em] text-[var(--muted)] mb-3 block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useReveal();
  const [openService, setOpenService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    if (window.matchMedia("(hover: none)").matches) {
      setOpenService(openService === index ? null : index);
    }
  };

  const services = [
    {
      title: "Meseros para Eventos Privados",
      description: "Servicio personalizado para fiestas, reuniones y celebraciones íntimas con atención de primera.",
      features: ["Servicio de mesa", "Atención a invitados", "Montaje básico"],
    },
    {
      title: "Staff para Bodas y XV Años",
      description: "Equipo especializado en eventos sociales con protocolo y elegancia para tu día especial.",
      features: ["Coordinación con organizadores", "Servicio de banquete", "Atención VIP"],
    },
    {
      title: "Eventos Corporativos",
      description: "Profesionalismo y discreción para conferencias, cenas ejecutivas y eventos empresariales.",
      features: ["Imagen corporativa", "Coffee breaks", "Cenas de gala"],
    },
    {
      title: "Capitanes de Meseros",
      description: "Supervisión experta para coordinar equipos grandes y garantizar un servicio impecable.",
      features: ["Coordinación de equipo", "Control de tiempos", "Resolución de imprevistos"],
    },
    {
      title: "Montaje y Desmontaje",
      description: "Preparación completa del espacio antes y después de tu evento con profesionalismo.",
      features: ["Montaje de mesas", "Decoración básica", "Limpieza post-evento"],
    },
    {
      title: "Servicio de Coctelería",
      description: "Bartenders profesionales para barra de bebidas con show y preparaciones especiales.",
      features: ["Coctelería clásica", "Bebidas personalizadas", "Show de barman"],
    },
    {
      title: "Hostess y Recepción",
      description: "Personal de recepción para dar la bienvenida y guiar a tus invitados con elegancia.",
      features: ["Registro de invitados", "Orientación", "Imagen impecable"],
    },
    {
      title: "Servicio a Domicilio",
      description: "Llevamos el servicio profesional hasta tu hogar para cenas y celebraciones privadas.",
      features: ["Eventos en casa", "Cenas íntimas", "Celebraciones familiares"],
    },
  ];

  return (
    <section id="servicios" className="section-padding bg-[var(--charcoal)]">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="02"
          label="Nuestros Servicios"
          title={
            <>
              Soluciones para Cada <span className="text-gradient">Evento</span>
            </>
          }
          description="Servicios adaptados a las necesidades de tu evento"
        />

        <div className="mt-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-item group ${openService === index ? "open" : ""}`}
              onClick={() => toggleService(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleService(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={openService === index}
            >
              <div className="flex items-start sm:items-center justify-between gap-4 py-5 sm:py-6 md:py-8">
                <h3
                  className="text-lg sm:text-xl md:text-2xl text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors duration-300 pr-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <span className="service-toggle text-[var(--muted)] text-xl flex-shrink-0 transition-transform duration-300">
                  +
                </span>
              </div>

              <div className="service-item-content">
                <div className="service-item-inner">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 pb-5 sm:pb-6 md:pb-8">
                    <div className="md:col-span-7">
                      <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">{service.description}</p>
                    </div>
                    <div className="md:col-span-5 mt-2 md:mt-0">
                      <ul className="space-y-1.5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-[10px] sm:text-xs tracking-wide text-[var(--muted)] uppercase">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <TextLink href="#paquetes">Explorar paquetes</TextLink>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const ref = useReveal();

  const packages = [
    {
      name: "Básico",
      subtitle: "Eventos Sencillos",
      description: "Ideal para reuniones pequeñas y eventos íntimos",
      features: ["Servicio de meseros", "Uniforme formal", "4 horas de servicio", "Hasta 50 invitados"],
      popular: false,
    },
    {
      name: "Premium",
      subtitle: "Eventos Especiales",
      description: "Perfecto para bodas, XV años y celebraciones importantes",
      features: [
        "Meseros + Capitán",
        "Montaje y desmontaje",
        "6 horas de servicio",
        "Hasta 150 invitados",
        "Coordinación con proveedores",
        "Servicio de bar incluido",
      ],
      popular: true,
    },
    {
      name: "Empresarial",
      subtitle: "Eventos Corporativos",
      description: "Staff profesional para empresas y eventos de negocios",
      features: [
        "Equipo completo",
        "Disponibilidad extendida",
        "Servicio a largo plazo",
        "Sin límite de invitados",
        "Capitán dedicado",
        "Reportes post-evento",
        "Facturación empresarial",
      ],
      popular: false,
    },
  ];

  return (
    <section id="paquetes" className="section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="03"
          label="Paquetes"
          title={
            <>
              Elige el Plan <span className="text-gradient">Ideal</span>
            </>
          }
          description="Paquetes para diferentes tipos de eventos"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`card-minimal p-6 sm:p-8 md:p-10 flex flex-col ${
                pkg.popular ? "border-[var(--gold)]/40 bg-[var(--charcoal)] md:order-none order-first" : ""
              }`}
            >
              {pkg.popular && (
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Más Popular</span>
              )}
              <h3
                className="text-2xl md:text-3xl text-[var(--foreground)] mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {pkg.name}
              </h3>
              <p className="text-sm tracking-wide text-[var(--gold)] mb-6">{pkg.subtitle}</p>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">{pkg.description}</p>

              <ul className="space-y-3 mb-10 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                    <span className="text-[var(--gold)] mt-0.5">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20el%20paquete%20${pkg.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-3.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  pkg.popular
                    ? "bg-[var(--gold)] text-[var(--background)] hover:bg-[var(--gold-light)]"
                    : "btn-outline text-[var(--foreground)]"
                }`}
              >
                Solicitar Cotización
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { number: "350+", label: "Eventos" },
    { number: "5+", label: "Años" },
    { number: "98%", label: "Satisfechos" },
    { number: "50+", label: "Empresas" },
  ];

  return (
    <section className="border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 py-8 sm:py-12 md:py-16 gap-y-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center px-2 sm:px-4 ${
                index % 2 === 1 ? "border-l border-[var(--border)]" : ""
              } ${index > 1 ? "md:border-l md:border-[var(--border)]" : ""} ${
                index >= 2 ? "border-t border-[var(--border)] pt-6 md:border-t-0 md:pt-0" : ""
              }`}
            >
              <div
                className="text-2xl sm:text-3xl md:text-5xl text-[var(--foreground)] mb-1 sm:mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.number}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useReveal();

  const testimonials = [
    {
      name: "María García",
      event: "Boda",
      text: "Excelente servicio, el equipo fue muy profesional y atento. Todos mis invitados quedaron encantados con la atención. Sin duda los recomiendo para cualquier evento.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      event: "Evento Corporativo",
      text: "Contratamos sus servicios para nuestra cena de fin de año y superaron nuestras expectativas. Puntuales, profesionales y muy atentos a cada detalle.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      event: "XV Años",
      text: "Los meseros fueron increíbles, muy atentos y profesionales. Hicieron que la fiesta de mi hija fuera perfecta. El capitán coordinó todo a la perfección.",
      rating: 5,
    },
    {
      name: "Roberto Sánchez",
      event: "Bautizo",
      text: "Servicio de primera calidad. El montaje quedó hermoso y el equipo fue muy amable con todos nuestros invitados. Definitivamente volveremos a contratarlos.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonios" className="section-padding bg-[var(--charcoal)]">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="04"
          label="Testimonios"
          title={
            <>
              Lo que Dicen <span className="text-gradient">Nuestros Clientes</span>
            </>
          }
          description="La satisfacción de nuestros clientes es nuestra mayor recompensa"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="card-minimal p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                <div>
                  <h4 className="text-[var(--foreground)] font-medium text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[var(--gold)] mt-1">{testimonial.event}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[var(--gold)] text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-[1.85] italic">&ldquo;{testimonial.text}&rdquo;</p>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-[var(--border)]">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-10 text-center">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 gap-y-4">
            {["EMPRESA 1", "EMPRESA 2", "EMPRESA 3", "EMPRESA 4", "EMPRESA 5"].map((company, index) => (
              <div key={index} className="text-[var(--muted)] text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useReveal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    { src: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Celebración elegante", category: "Eventos" },
    { src: "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Boda elegante", category: "Bodas" },
    { src: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Servicio de catering profesional", category: "Catering" },
    { src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Evento corporativo exitoso", category: "Corporativo" },
    { src: "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Mesa elegante preparada", category: "Montajes" },
    { src: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750", alt: "Servicio de bar profesional", category: "Coctelería" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="galeria" className="section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="05"
          label="Galería"
          title={
            <>
              Momentos que <span className="text-gradient">Capturamos</span>
            </>
          }
          description="Cada evento es una oportunidad para crear experiencias memorables"
        />

        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-4 sm:mb-6 -mx-4 sm:mx-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--gold)] mb-2 sm:mb-3 block">{image.category}</span>
                <h3 className="text-lg sm:text-xl md:text-3xl text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}

          <button
            onClick={() => goToSlide((currentSlide - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center text-white hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            aria-label="Imagen anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % images.length)}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center text-white hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            aria-label="Imagen siguiente"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-11 sm:w-20 sm:h-14 md:w-28 md:h-20 overflow-hidden transition-opacity duration-300 ${
                index === currentSlide ? "opacity-100 ring-1 ring-[var(--gold)]" : "opacity-40 hover:opacity-70"
              }`}
              aria-label={`Ver ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-[var(--border)]">
          {[
            { number: "500+", label: "Fotos de Eventos" },
            { number: "8", label: "Tipos de Servicios" },
            { number: "100%", label: "Eventos Documentados" },
            { number: "5⭐", label: "Calificación Promedio" },
          ].map((stat, index) => (
            <div key={index} className="text-center px-1">
              <div className="text-xl sm:text-2xl md:text-3xl text-[var(--foreground)] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                {stat.number}
              </div>
              <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[var(--muted)] leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useReveal();

  const steps = [
    { number: "01", title: "Solicita Cotización", description: "Contáctanos por WhatsApp o formulario con los detalles de tu evento" },
    { number: "02", title: "Confirmamos Disponibilidad", description: "Verificamos fecha, horario y asignamos el equipo ideal para tu evento" },
    { number: "03", title: "Realiza tu Anticipo", description: "Asegura tu fecha con un anticipo y confirma todos los detalles" },
    { number: "04", title: "¡Disfruta tu Evento!", description: "Nuestro equipo llega puntual y se encarga de todo el servicio" },
  ];

  return (
    <section id="proceso" className="section-padding bg-[var(--charcoal)]">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="06"
          label="Proceso"
          title={
            <>
              ¿Cómo <span className="text-gradient">Funciona?</span>
            </>
          }
          description="Contratar nuestros servicios es fácil y rápido"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="group border-t border-[var(--border)] pt-6 sm:border-0 sm:pt-0">
              <span className="section-number block mb-4 sm:mb-6">{step.number}{"//"}</span>
              <h3
                className="text-lg sm:text-xl text-[var(--foreground)] mb-3 sm:mb-4 group-hover:text-[var(--gold)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const ref = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (window.matchMedia("(hover: none)").matches) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const faqs = [
    { question: "¿Cuántas horas incluye el servicio?", answer: "Nuestros paquetes estándar incluyen entre 4 y 6 horas de servicio. Sin embargo, podemos ajustar la duración según las necesidades específicas de tu evento. Las horas extra tienen un costo adicional que te indicamos en la cotización." },
    { question: "¿Qué incluye el uniforme de los meseros?", answer: "Nuestro personal llega uniformado con camisa blanca, pantalón negro de vestir, chaleco (según el tipo de evento), mandil y zapatos formales. Para eventos temáticos o corporativos, podemos adaptar el uniforme según tus requerimientos." },
    { question: "¿Qué pasa si necesito más meseros el día del evento?", answer: "Recomendamos confirmar el número de meseros con anticipación. Sin embargo, si surge la necesidad de personal adicional, haremos todo lo posible por asignarte más staff, sujeto a disponibilidad. Contáctanos lo antes posible para coordinar." },
    { question: "¿Hay costo por traslado?", answer: "El traslado está incluido dentro de nuestra zona de cobertura principal. Para eventos en ubicaciones más alejadas, aplicamos un cargo adicional por traslado que se especifica en tu cotización." },
    { question: "¿Pueden atender eventos el mismo día?", answer: "Aunque trabajamos principalmente con reservaciones anticipadas, en algunos casos podemos atender eventos de último momento. Contáctanos y verificaremos la disponibilidad de nuestro equipo." },
    { question: "¿Incluyen servicio de alimentos o solo meseros?", answer: "Nos especializamos en el servicio de meseros y staff para eventos. No incluimos alimentos ni bebidas, pero trabajamos en coordinación con tu servicio de catering o banquetes para garantizar una experiencia perfecta." },
    { question: "¿Cuál es la forma de pago?", answer: "Solicitamos un anticipo del 50% para confirmar la reservación y el resto se liquida antes o el día del evento. Aceptamos transferencia bancaria, depósito y efectivo." },
  ];

  return (
    <section className="section-padding">
      <div ref={ref} className="reveal max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="07"
          label="FAQ"
          title={
            <>
              Preguntas <span className="text-gradient">Frecuentes</span>
            </>
          }
          description="Resolvemos tus dudas más comunes"
          align="center"
        />

        <div className="border-t border-[var(--border)]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item group ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFaq(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFaq(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={openIndex === index}
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6 py-4 sm:py-6">
                <span className="faq-question text-sm sm:text-base text-[var(--foreground)] font-light transition-colors duration-300 pr-2">
                  {faq.question}
                </span>
                <span className="faq-toggle text-[var(--muted)] flex-shrink-0 text-lg transition-all duration-300">
                  +
                </span>
              </div>
              <div className="faq-item-content">
                <div className="faq-item-inner">
                  <p className="text-[var(--muted)] leading-relaxed text-sm pr-4 sm:pr-8 pb-4 sm:pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola, me interesa cotizar su servicio de meseros.

*Datos del evento:*
- Nombre: ${formData.name}
- Email: ${formData.email}
- Teléfono: ${formData.phone}
- Fecha del evento: ${formData.eventDate}
- Número de invitados: ${formData.guests}
- Mensaje: ${formData.message}`;

    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="contacto" className="section-padding bg-[var(--charcoal)] border-t border-[var(--border)]">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          number="08"
          label="Contacto"
          title={
            <>
              Reserva tu <span className="text-gradient">Fecha</span>
            </>
          }
          description="Contáctanos hoy y asegura el servicio para tu próximo evento"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Visítanos</h3>
              <p className="text-xl sm:text-2xl text-[var(--foreground)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {CONTACT.name}
              </p>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Ciudad de México y área metropolitana
              </p>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Contacto</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm sm:text-base text-[var(--foreground)] hover:text-[var(--gold)] transition-colors break-all"
                >
                  WhatsApp — {CONTACT.phone}
                </a>
                <p className="text-sm sm:text-base text-[var(--muted)]">Teléfono — {CONTACT.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Redes</h3>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {["Facebook", "Instagram", "TikTok"].map((social) => (
                  <a key={social} href="#" className="nav-link hover:!text-[var(--gold)]">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 pt-6 lg:pt-0 border-t lg:border-t-0 border-[var(--border)]">
            <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-8">Solicita tu Cotización</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--gold)] transition-colors"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--gold)] transition-colors"
                  placeholder="Tu teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Correo electrónico</label>
              <input
                type="email"
                required
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--gold)] transition-colors"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Fecha del evento</label>
                <input
                  type="date"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] transition-colors"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  title="Selecciona la fecha de tu evento"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Número de invitados</label>
                <input
                  type="number"
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--gold)] transition-colors"
                  placeholder="Ej: 100"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-xs tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Cuéntanos sobre tu evento</label>
              <textarea
                rows={4}
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--gold)] transition-colors resize-none"
                placeholder="Tipo de evento, servicios que necesitas, ubicación..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-10 py-4 bg-[var(--gold)] text-[var(--background)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors duration-300"
            >
              Enviar Cotización por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="py-12 sm:py-16 md:py-20 border-t border-[var(--border)] pb-24 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="md:col-span-5 sm:col-span-2">
            <span className="text-lg sm:text-xl text-[var(--foreground)]" style={{ fontFamily: "var(--font-playfair)" }}>
              {CONTACT.name}
            </span>
            <p className="text-[var(--muted)] mt-4 max-w-sm leading-relaxed text-sm">
              Servicio profesional de meseros para todo tipo de eventos.
              Experiencia, puntualidad y excelencia en cada celebración.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Enlaces</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link hover:!text-[var(--foreground)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li>{CONTACT.name}</li>
              <li>{CONTACT.phone}</li>
              <li>Ciudad de México</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[10px] sm:text-xs text-[var(--muted)] tracking-wide">
            © {new Date().getFullYear()} {CONTACT.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs">
            <a href="#" className="nav-link hover:!text-[var(--foreground)]">
              Aviso de Privacidad
            </a>
            <a href="#" className="nav-link hover:!text-[var(--foreground)]">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20cotizar%20el%20servicio%20de%20meseros`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 md:w-14 md:h-14 border border-[var(--gold)]/30 bg-[var(--charcoal)] flex items-center justify-center hover:bg-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 group"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--gold)] group-hover:text-[var(--background)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <PackagesSection />
      <StatsSection />
      <TestimonialsSection />
      <GallerySection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
