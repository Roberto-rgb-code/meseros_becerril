"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CONTACT } from "./constants";
import { MEDIA, type PhotoItem } from "./media";

type RevealDirection = "left" | "right" | "up";

function useRevealRef() {
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: RevealDirection;
  delay?: number;
  className?: string;
}) {
  const ref = useRevealRef();

  return (
    <div
      ref={ref}
      className={`reveal reveal-from-${from}${className ? ` ${className}` : ""}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function sideFromIndex(index: number): RevealDirection {
  return index % 2 === 0 ? "left" : "right";
}

function scrollToAnchor(href: string, onBeforeScroll?: () => void) {
  const id = href.replace(/^#/, "");
  const element = document.getElementById(id);
  if (!element) return;

  onBeforeScroll?.();

  requestAnimationFrame(() => {
    setTimeout(() => {
      const navOffset = window.matchMedia("(max-width: 768px)").matches ? 88 : 72;
      const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }, 100);
  });
}

function SectionHeader({
  number,
  label,
  title,
  description,
  align = "center",
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
      <h2 className={`section-title mb-6 ${align === "center" ? "mx-auto" : ""}`}>{title}</h2>
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

function SectionVideoBanner({
  src,
  className = "min-h-[38vh] sm:min-h-[44vh]",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden pointer-events-none border border-[var(--border)] ${className}`}>
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 via-transparent to-[var(--background)]/10 pointer-events-none" />
    </div>
  );
}

function EditorialPhoto({
  src,
  alt,
  category,
  className = "aspect-[4/3]",
  variant = "editorial",
  showCaption = false,
  priority = false,
}: {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  variant?: "editorial" | "card" | "ambient" | "plain";
  showCaption?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className={`editorial-photo editorial-photo--${variant} ${className}`}>
      <span className="editorial-photo__corner" aria-hidden="true" />
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      {showCaption && (category || alt) && (
        <figcaption className="editorial-photo__caption">
          {category && <span className="editorial-photo__category">{category}</span>}
          <span className="editorial-photo__label">{alt}</span>
        </figcaption>
      )}
    </figure>
  );
}

function PhotoFilmstrip({ photos }: { photos: readonly PhotoItem[] }) {
  return (
    <div className="photo-filmstrip scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {photos.map((photo) => (
        <div key={photo.src} className="photo-filmstrip__item">
          <EditorialPhoto
            src={photo.src}
            alt={photo.alt}
            category={photo.category}
            showCaption
            className="aspect-[3/4] h-full"
            variant="card"
          />
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollPositionRef = useRef(0);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unlockBodyScroll = (restoreScroll = true) => {
    const scrollY = scrollPositionRef.current;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    if (restoreScroll) {
      window.scrollTo(0, scrollY);
    }
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    scrollPositionRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      unlockBodyScroll(!isNavigatingRef.current);
      isNavigatingRef.current = false;
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#contacto", label: "Contacto" },
  ];

  const mobileMenu = isMobileMenuOpen && isMounted
    ? createPortal(
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[9998] bg-[var(--background)]"
          style={{ paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))" }}
        >
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="flex flex-col gap-2 px-4 sm:px-6 py-6 pb-24">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-base py-4 border-b border-[var(--border)]"
                  onClick={(e) => {
                    e.preventDefault();
                    isNavigatingRef.current = true;
                    unlockBodyScroll(false);
                    scrollToAnchor(link.href, () => setIsMobileMenuOpen(false));
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link !text-[var(--gold)] text-base mt-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 max-md:bg-[var(--background)] max-md:py-3 ${
          isScrolled || isMobileMenuOpen
            ? "md:glass md:py-3 lg:py-4 max-md:border-b max-md:border-[var(--border)]"
            : "md:bg-transparent md:py-4 lg:py-8"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          WebkitTransform: "translate3d(0, 0, 0)",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-[1] text-[var(--foreground)] w-11 h-11 flex items-center justify-center flex-shrink-0 touch-manipulation cursor-pointer bg-transparent border-0 p-0"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <div className="flex flex-col items-center text-center min-h-11 md:min-h-0">
            <a href="#" className="group inline-block max-w-full px-12 md:px-0">
              <span
                className="block text-lg sm:text-xl md:text-2xl tracking-wide text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {CONTACT.name}
              </span>
            </a>

            <div className="hidden md:flex items-center justify-center flex-wrap gap-x-8 lg:gap-x-10 gap-y-3 mt-4 md:mt-5">
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
          </div>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pointer-events-none">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
        <source src="/5032272-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 hero-mobile-overlay md:hidden pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pb-12 sm:pb-16 md:pb-24 pt-24 sm:pt-32 hero-text-shadow md:[text-shadow:none] pointer-events-auto">
        <p className="text-xs sm:text-sm md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-8 animate-fade-in-up">
          Servicio profesional de meseros en la zona metropolitana de Guadalajara
        </p>

        <div className="max-w-4xl">
          <span
            className="inline-block text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--gold)] mb-4 sm:mb-6 animate-fade-in-up opacity-0"
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
            className="mt-8 sm:mt-12 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--muted)] animate-fade-in-up opacity-0"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="up">
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
        </Reveal>

        <Reveal from="up" delay={80} className="my-10 md:my-14">
          <SectionVideoBanner src={MEDIA.benefits.video} className="min-h-[24vh] sm:min-h-[30vh]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
          <Reveal from="left" delay={100}>
            <div className="benefits-photo-stack mb-10 lg:mb-0">
              <EditorialPhoto
                src={MEDIA.benefits.hero.src}
                alt={MEDIA.benefits.hero.alt}
                category={MEDIA.benefits.hero.category}
                showCaption
                className="benefits-photo-stack__main aspect-[4/5] sm:aspect-[3/4]"
                priority
              />
              <EditorialPhoto
                src={MEDIA.benefits.accent.src}
                alt={MEDIA.benefits.accent.alt}
                category={MEDIA.benefits.accent.category}
                showCaption
                className="benefits-photo-stack__accent aspect-square hidden sm:block"
                variant="card"
              />
            </div>
            <div className="flex justify-center mt-8">
              <TextLink href="#galeria">Ver galería</TextLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {benefits.map((benefit, index) => (
              <Reveal key={index} from="right" delay={index * 80}>
                <div className="group">
                  <span className="text-sm tracking-[0.15em] text-[var(--muted)] mb-3 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-base text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [openService, setOpenService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setOpenService((prev) => (prev === index ? null : index));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="left">
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
        </Reveal>

        <Reveal from="up" delay={80} className="mb-8 md:mb-10">
          <SectionVideoBanner src={MEDIA.services.bannerVideo} className="min-h-[28vh] sm:min-h-[34vh]" />
        </Reveal>

        <Reveal from="up" delay={120} className="mb-10 md:mb-14">
          <PhotoFilmstrip photos={MEDIA.services.showcase} />
        </Reveal>

        <div className="mt-4">
          {services.map((service, index) => (
            <Reveal key={index} from={sideFromIndex(index)} delay={index * 60}>
              <div
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
                  <div className="pb-5 sm:pb-6 md:pb-8 md:max-w-3xl">
                    <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-1.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm sm:text-sm tracking-wide text-[var(--muted)] uppercase">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        <Reveal from="up" delay={200} className="mt-16 pt-8 border-t border-[var(--border)] flex justify-center">
          <TextLink href="#paquetes">Explorar paquetes</TextLink>
        </Reveal>
      </div>
    </section>
  );
}

function AdditionalServicesSection() {
  const services = [
    {
      title: "Parrillero",
      description:
        "Experto en parrilla para tus eventos al aire libre. Preparación de carnes, cortes especiales y servicio en vivo frente a tus invitados.",
      features: ["Parrilla en vivo", "Carnes y cortes premium", "Atención en jardín o terraza"],
      image: MEDIA.additionalServices.Parrillero.src,
      alt: "Mesa elegante preparada para evento al aire libre",
    },
    {
      title: "Bartender",
      description:
        "Servicio profesional de barra con bebidas clásicas y de autor. Atención ágil, presentación impecable y ambiente sofisticado para tu evento.",
      features: ["Barra completa", "Bebidas clásicas y especiales", "Servicio dinámico"],
      image: MEDIA.additionalServices.Bartender.src,
      alt: MEDIA.additionalServices.Bartender.alt,
    },
    {
      title: "Mixólogo",
      description:
        "Coctelería de autor y creaciones exclusivas para ocasiones especiales. Menús personalizados, ingredientes premium y show de mixología.",
      features: ["Cocteles de autor", "Menú personalizado", "Experiencia premium"],
      image: MEDIA.additionalServices.Mixólogo.src,
      alt: MEDIA.additionalServices.Mixólogo.alt,
    },
  ];

  return (
    <section id="servicios-adicionales" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="left">
          <SectionHeader
            number="03"
            label="Servicios Adicionales"
            title={
              <>
                Especialistas para tu <span className="text-gradient">Evento</span>
              </>
            }
            description="Personal capacitado para complementar tu celebración con servicios premium"
          />
        </Reveal>

        <Reveal from="up" delay={60} className="my-10 md:my-14">
          <SectionVideoBanner src={MEDIA.additionalServices.bannerVideo} className="min-h-[28vh] sm:min-h-[36vh]" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              from={index === 0 ? "left" : index === 1 ? "up" : "right"}
              delay={index * 100}
            >
              <article className="card-minimal group overflow-hidden flex flex-col h-full">
              <EditorialPhoto
                src={service.image}
                alt={service.alt}
                category={service.title}
                showCaption
                className="aspect-[4/3] border-0 border-b border-[var(--border)]"
                variant="card"
              />

              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3
                  className="text-xl sm:text-2xl text-[var(--foreground)] mb-4 group-hover:text-[var(--gold)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <p className="text-base text-[var(--muted)] leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm sm:text-sm tracking-wide text-[var(--muted)] uppercase">
                      — {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20contratar%20${encodeURIComponent(service.title)}%20para%20mi%20evento`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-sm"
                >
                  Cotizar {service.title}
                </a>
              </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MixologistSection() {
  const features = [
    "Cocteles de autor y creaciones exclusivas",
    "Menús personalizados para tu evento",
    "Ingredientes premium y presentación impecable",
  ];

  return (
    <section
      id="mixologo"
      className="relative min-h-[75dvh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/7593094-uhd_4096_1974_30fps.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-24 md:py-32 text-center hero-text-shadow pointer-events-auto">
        <Reveal from="up">
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 mb-6 md:mb-8">
            <span className="section-number">04{"//"}</span>
            <span className="section-label">Servicio Premium</span>
          </div>

          <h2 className="section-title mb-6">
            Servicio de <span className="text-gradient">Mixólogo</span>
          </h2>

          <p className="section-description mb-8 sm:mb-10">
            Coctelería de autor y experiencias exclusivas para bodas, eventos corporativos y celebraciones
            que buscan un toque sofisticado y memorable.
          </p>

          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            {features.map((feature) => (
              <li
                key={feature}
                className="text-xs sm:text-sm tracking-wide text-[var(--foreground)] uppercase border border-[var(--border)] px-4 py-2 bg-black/40 backdrop-blur-sm"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20contratar%20el%20servicio%20de%20Mix%C3%B3logo%20para%20mi%20evento`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center px-10 py-4 bg-[var(--gold)] text-[var(--background)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors duration-300"
            >
              Cotizar Mixólogo
            </a>
            <a href="#servicios-adicionales" className="text-link text-[var(--foreground)]">
              Ver más servicios
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PackagesSection() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="right">
          <SectionHeader
            number="05"
            label="Paquetes"
            title={
              <>
                Elige el Plan <span className="text-gradient">Ideal</span>
              </>
            }
            description="Paquetes para diferentes tipos de eventos"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <Reveal key={index} from={index === 0 ? "left" : index === 1 ? "up" : "right"} delay={index * 100}>
              <div
                className={`card-minimal overflow-hidden flex flex-col h-full ${
                pkg.popular ? "border-[var(--gold)]/40 bg-[var(--charcoal)] md:order-none order-first" : ""
              }`}
            >
              <EditorialPhoto
                src={MEDIA.packages[pkg.name as keyof typeof MEDIA.packages].src}
                alt={`Paquete ${pkg.name} — ${pkg.subtitle}`}
                category={pkg.subtitle}
                showCaption
                className="aspect-[16/10] border-0 border-b border-[var(--border)]"
                variant="card"
              />
              <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-grow">
              {pkg.popular && (
                <span className="text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Más Popular</span>
              )}
              <h3
                className="text-2xl md:text-3xl text-[var(--foreground)] mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {pkg.name}
              </h3>
              <p className="text-base tracking-wide text-[var(--gold)] mb-6">{pkg.subtitle}</p>
              <p className="text-[var(--muted)] text-base leading-relaxed mb-8">{pkg.description}</p>

              <ul className="space-y-3 mb-10 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-[var(--muted)]">
                    <span className="text-[var(--gold)] mt-0.5">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Hola,%20me%20interesa%20el%20paquete%20${pkg.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  pkg.popular
                    ? "bg-[var(--gold)] text-[var(--background)] hover:bg-[var(--gold-light)]"
                    : "btn-outline text-[var(--foreground)]"
                }`}
              >
                Solicitar Cotización
              </a>
              </div>
              </div>
            </Reveal>
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
    <section className="relative border-y border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={MEDIA.stats.background.src}
          alt={MEDIA.stats.background.alt}
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[var(--background)]/80" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 py-8 sm:py-12 md:py-16 gap-y-6">
          {stats.map((stat, index) => (
            <Reveal key={index} from={index < 2 ? "left" : "right"} delay={index * 80}>
              <div
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
              <div className="text-sm tracking-[0.2em] uppercase text-[var(--muted)]">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="left">
          <SectionHeader
            number="06"
            label="Testimonios"
            title={
              <>
                Lo que Dicen <span className="text-gradient">Nuestros Clientes</span>
              </>
            }
            description="La satisfacción de nuestros clientes es nuestra mayor recompensa"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} from={sideFromIndex(index)} delay={index * 100}>
              <article className="card-minimal p-6 sm:p-8 md:p-10 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                <div>
                  <h4 className="text-[var(--foreground)] font-medium text-base sm:text-lg">{testimonial.name}</h4>
                  <p className="text-sm sm:text-sm tracking-[0.15em] uppercase text-[var(--gold)] mt-1">{testimonial.event}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[var(--gold)] text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-[1.85] italic flex-grow">&ldquo;{testimonial.text}&rdquo;</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal from="up" delay={150} className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-[var(--border)]">
          <p className="text-sm sm:text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-10 text-center">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 gap-y-4">
            {["EMPRESA 1", "EMPRESA 2", "EMPRESA 3", "EMPRESA 4", "EMPRESA 5"].map((company, index) => (
              <Reveal key={index} from={sideFromIndex(index)} delay={index * 60}>
                <div className="text-[var(--muted)] text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                  {company}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = MEDIA.gallery.map((item) => ({ ...item }));

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="right">
          <SectionHeader
            number="07"
            label="Galería"
            title={
              <>
                Momentos que <span className="text-gradient">Capturamos</span>
              </>
            }
            description="Cada evento es una oportunidad para crear experiencias memorables"
          />
        </Reveal>

        <Reveal from="left" delay={100}>
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
                <span className="text-sm sm:text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-2 sm:mb-3 block">{image.category}</span>
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
        </Reveal>

        <Reveal from="right" delay={150}>
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
        </Reveal>

        <Reveal from="up" delay={180} className="mt-8 md:mt-12 hidden md:block">
          <div className="gallery-mosaic">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goToSlide(index)}
                className={`gallery-mosaic__item ${index === currentSlide ? "is-active" : ""}`}
                aria-label={`Ver ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-[var(--border)]">
          {[
            { number: "8", label: "Momentos Destacados" },
            { number: "8", label: "Tipos de Servicios" },
            { number: "100%", label: "Atención al Detalle" },
            { number: "5⭐", label: "Calificación Promedio" },
          ].map((stat, index) => (
            <Reveal key={index} from={sideFromIndex(index)} delay={index * 80}>
              <div className="text-center px-1">
                <div className="text-xl sm:text-2xl md:text-3xl text-[var(--foreground)] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  {stat.number}
                </div>
                <div className="text-sm sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[var(--muted)] leading-snug">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { number: "01", title: "Solicita Cotización", description: "Contáctanos por WhatsApp o formulario con los detalles de tu evento", image: MEDIA.process["Solicita Cotización"] },
    { number: "02", title: "Confirmamos Disponibilidad", description: "Verificamos fecha, horario y asignamos el equipo ideal para tu evento", image: MEDIA.process["Confirmamos Disponibilidad"] },
    { number: "03", title: "Realiza tu Anticipo", description: "Asegura tu fecha con un anticipo y confirma todos los detalles", image: MEDIA.process["Realiza tu Anticipo"] },
    { number: "04", title: "¡Disfruta tu Evento!", description: "Nuestro equipo llega puntual y se encarga de todo el servicio", image: MEDIA.process["¡Disfruta tu Evento!"] },
  ];

  return (
    <section id="proceso" className="section-padding bg-[var(--charcoal)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="right">
          <SectionHeader
            number="08"
            label="Proceso"
            title={
              <>
                ¿Cómo <span className="text-gradient">Funciona?</span>
              </>
            }
            description="Contratar nuestros servicios es fácil y rápido"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {steps.map((step, index) => (
            <Reveal key={index} from={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
              <div className="group h-full">
                <EditorialPhoto
                  src={step.image.src}
                  alt={step.title}
                  category={step.number}
                  className="aspect-[4/3] mb-5 sm:mb-6"
                  variant="card"
                />
                <span className="section-number block mb-4 sm:mb-6">{step.number}{"//"}</span>
                <h3
                  className="text-lg sm:text-xl text-[var(--foreground)] mb-3 sm:mb-4 group-hover:text-[var(--gold)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {step.title}
                </h3>
                <p className="text-base text-[var(--muted)] leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="up">
          <SectionHeader
            number="09"
            label="FAQ"
            title={
              <>
                Preguntas <span className="text-gradient">Frecuentes</span>
              </>
            }
            description="Resolvemos tus dudas más comunes"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal from="left" delay={80} className="lg:col-span-5 hidden lg:block">
            <EditorialPhoto
              src={MEDIA.faq.side.src}
              alt={MEDIA.faq.side.alt}
              category={MEDIA.faq.side.category}
              showCaption
              className="aspect-[3/4] sticky top-28"
              variant="editorial"
            />
          </Reveal>

          <div className="lg:col-span-7 border-t border-[var(--border)]">
          {faqs.map((faq, index) => (
            <Reveal key={index} from={sideFromIndex(index)} delay={index * 50}>
              <div
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
                <span className="faq-question text-base sm:text-lg text-[var(--foreground)] font-light transition-colors duration-300 pr-2">
                  {faq.question}
                </span>
                <span className="faq-toggle text-[var(--muted)] flex-shrink-0 text-lg transition-all duration-300">
                  +
                </span>
              </div>
              <div className="faq-item-content">
                <div className="faq-item-inner">
                  <p className="text-[var(--muted)] leading-relaxed text-base pr-4 sm:pr-8 pb-4 sm:pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal from="left">
          <SectionHeader
            number="10"
            label="Contacto"
            title={
              <>
                Reserva tu <span className="text-gradient">Fecha</span>
              </>
            }
            description="Contáctanos hoy y asegura el servicio para tu próximo evento"
          />
        </Reveal>

        <Reveal from="up" delay={80} className="mb-10 md:mb-14">
          <SectionVideoBanner src={MEDIA.contact.video} className="min-h-[28vh] sm:min-h-[34vh]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20">
          <Reveal from="left" delay={100} className="lg:col-span-5">
            <div className="space-y-8 sm:space-y-12">
            <EditorialPhoto
              src={MEDIA.contact.side.src}
              alt={MEDIA.contact.side.alt}
              category={MEDIA.contact.side.category}
              showCaption
              className="aspect-[4/3]"
              variant="editorial"
            />
            <div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Visítanos</h3>
              <p className="text-xl sm:text-2xl text-[var(--foreground)] mb-3 sm:mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {CONTACT.name}
              </p>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                Zona metropolitana de Guadalajara
              </p>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Contacto</h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base sm:text-lg text-[var(--foreground)] hover:text-[var(--gold)] transition-colors break-all"
                >
                  WhatsApp — {CONTACT.phone}
                </a>
                <p className="text-base sm:text-lg text-[var(--muted)]">Teléfono — {CONTACT.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-4 sm:mb-6">Redes</h3>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {["Facebook", "Instagram", "TikTok"].map((social) => (
                  <a key={social} href="#" className="nav-link hover:!text-[var(--gold)]">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={150} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="pt-6 lg:pt-0 border-t lg:border-t-0 border-[var(--border)]">
            <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-6 sm:mb-8">Solicita tu Cotización</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Nombre completo</label>
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
                <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Teléfono</label>
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
              <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Correo electrónico</label>
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
                <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Fecha del evento</label>
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
                <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Número de invitados</label>
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
              <label className="block text-sm tracking-[0.1em] uppercase text-[var(--muted)] mb-3">Cuéntanos sobre tu evento</label>
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
              className="btn-primary w-full sm:w-auto px-10 py-4 bg-[var(--gold)] text-[var(--background)] text-sm tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors duration-300"
            >
              Enviar Cotización por WhatsApp
            </button>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Servicios Adicionales", href: "#servicios-adicionales" },
    { label: "Mixólogo", href: "#mixologo" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="py-12 sm:py-16 md:py-20 border-t border-[var(--border)] pb-24 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <Reveal from="left" className="md:col-span-5 sm:col-span-2">
          <div>
            <span className="text-base sm:text-lg text-[var(--foreground)]" style={{ fontFamily: "var(--font-playfair)" }}>
              {CONTACT.name}
            </span>
            <p className="text-[var(--muted)] mt-4 max-w-sm leading-relaxed text-sm">
              Servicio profesional de meseros para todo tipo de eventos.
              Experiencia, puntualidad y excelencia en cada celebración.
            </p>
          </div>
          </Reveal>

          <Reveal from="right" delay={80} className="md:col-span-3">
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Enlaces</h4>
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
          </Reveal>

          <Reveal from="left" delay={160} className="md:col-span-4">
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li>{CONTACT.name}</li>
              <li>{CONTACT.phone}</li>
              <li>Zona metropolitana de Guadalajara</li>
            </ul>
          </div>
          </Reveal>
        </div>

        <Reveal from="up" delay={100}>
        <div className="pt-6 sm:pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-[var(--muted)] tracking-wide">
            © {new Date().getFullYear()} {CONTACT.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
            <a href="#" className="nav-link hover:!text-[var(--foreground)]">
              Aviso de Privacidad
            </a>
            <Link href="/terminos-y-condiciones" className="nav-link hover:!text-[var(--foreground)]">
              Términos y Condiciones
            </Link>
          </div>
        </div>
        </Reveal>
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
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)]">
        <HeroSection />
        <BenefitsSection />
        <ServicesSection />
        <AdditionalServicesSection />
        <MixologistSection />
        <PackagesSection />
        <StatsSection />
        <TestimonialsSection />
        <GallerySection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}
