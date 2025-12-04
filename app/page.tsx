"use client";

import { useState, useEffect } from "react";
import LottieAnimation from "./components/LottieAnimation";
import { starAnimation, celebrationAnimation, pulseAnimation } from "./components/animations";

// Navigation Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        isScrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center text-black font-bold text-sm sm:text-lg">
              MB
            </div>
            <span className="text-base sm:text-xl font-semibold tracking-wide text-white group-hover:text-[var(--gold)] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
              Meseros Becerril
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[var(--gold)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--gold)] transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[var(--gold)]/20 transition-all"
            >
              Cotizar Ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--gold)]/20">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/521234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-black px-6 py-2.5 rounded-full font-semibold text-sm text-center"
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

// Hero Section with Video Background
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/5032272-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <LottieAnimation animationData={celebrationAnimation} className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 opacity-20">
        <LottieAnimation animationData={starAnimation} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-0">
        <div className="animate-fade-in-up">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm">
            ✨ +350 Eventos Exitosos
          </span>
        </div>

        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up opacity-0 leading-tight" 
          style={{ fontFamily: "var(--font-playfair)", animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          Meseros <span className="text-gradient">Profesionales</span>
          <br />
          Para Tus Eventos
        </h1>

        <p 
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up opacity-0 px-2"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          Personal capacitado, uniformado y con experiencia en protocolo. 
          Hacemos de tu evento una experiencia memorable.
        </p>

        <div 
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center animate-fade-in-up opacity-0 px-4 sm:px-0"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <a
            href="https://wa.me/521234567890?text=Hola,%20me%20interesa%20cotizar%20el%20servicio%20de%20meseros"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-[var(--gold)]/30 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cotiza por WhatsApp
          </a>
          <a
            href="#servicios"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            Ver Servicios
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[var(--gold)] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      icon: "🎓",
      title: "Experiencia Certificada",
      description: "Personal con años de experiencia en eventos de alta gama",
    },
    {
      icon: "👔",
      title: "Protocolo Profesional",
      description: "Capacitados en etiqueta y servicio de primera clase",
    },
    {
      icon: "⚡",
      title: "Atención Rápida",
      description: "Servicio eficiente y atento a cada detalle",
    },
    {
      icon: "📅",
      title: "Disponibilidad Total",
      description: "Fines de semana y días festivos sin problema",
    },
    {
      icon: "📍",
      title: "Cobertura Regional",
      description: "Servicio en toda la región y zonas cercanas",
    },
    {
      icon: "✨",
      title: "Uniformes Impecables",
      description: "Presentación impecable acorde a tu evento",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-[var(--charcoal)] to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gold)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 px-4">
          <span className="text-[var(--gold)] text-xs sm:text-sm font-semibold tracking-wider uppercase">¿Por qué elegirnos?</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Beneficios que nos <span className="text-gradient">Distinguen</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Nos comprometemos a brindar un servicio excepcional que supere tus expectativas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-[var(--gold)]/10 hover:border-[var(--gold)]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--gold)]/10"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 md:mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 to-transparent rounded-lg sm:rounded-xl" />
                <span className="text-2xl sm:text-3xl md:text-4xl relative z-10 group-hover:scale-110 transition-transform">{benefit.icon}</span>
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-semibold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed hidden sm:block">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: "Meseros para Eventos Privados",
      description: "Servicio personalizado para fiestas, reuniones y celebraciones íntimas con atención de primera.",
      icon: "🥂",
      features: ["Servicio de mesa", "Atención a invitados", "Montaje básico"],
    },
    {
      title: "Staff para Bodas y XV Años",
      description: "Equipo especializado en eventos sociales con protocolo y elegancia para tu día especial.",
      icon: "💒",
      features: ["Coordinación con organizadores", "Servicio de banquete", "Atención VIP"],
    },
    {
      title: "Eventos Corporativos",
      description: "Profesionalismo y discreción para conferencias, cenas ejecutivas y eventos empresariales.",
      icon: "🏢",
      features: ["Imagen corporativa", "Coffee breaks", "Cenas de gala"],
    },
    {
      title: "Capitanes de Meseros",
      description: "Supervisión experta para coordinar equipos grandes y garantizar un servicio impecable.",
      icon: "👨‍💼",
      features: ["Coordinación de equipo", "Control de tiempos", "Resolución de imprevistos"],
    },
    {
      title: "Montaje y Desmontaje",
      description: "Preparación completa del espacio antes y después de tu evento con profesionalismo.",
      icon: "🪑",
      features: ["Montaje de mesas", "Decoración básica", "Limpieza post-evento"],
    },
    {
      title: "Servicio de Coctelería",
      description: "Bartenders profesionales para barra de bebidas con show y preparaciones especiales.",
      icon: "🍸",
      features: ["Coctelería clásica", "Bebidas personalizadas", "Show de barman"],
    },
    {
      title: "Hostess y Recepción",
      description: "Personal de recepción para dar la bienvenida y guiar a tus invitados con elegancia.",
      icon: "💁‍♀️",
      features: ["Registro de invitados", "Orientación", "Imagen impecable"],
    },
    {
      title: "Servicio a Domicilio",
      description: "Llevamos el servicio profesional hasta tu hogar para cenas y celebraciones privadas.",
      icon: "🏠",
      features: ["Eventos en casa", "Cenas íntimas", "Celebraciones familiares"],
    },
  ];

  return (
    <section id="servicios" className="py-16 sm:py-20 md:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="text-[var(--gold)] text-xs sm:text-sm font-semibold tracking-wider uppercase">Nuestros Servicios</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Soluciones para Cada <span className="text-gradient">Evento</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Servicios adaptados a las necesidades de tu evento
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-white/5 hover:border-[var(--gold)]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 block">{service.icon}</span>
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 leading-relaxed hidden sm:block">
                  {service.description}
                </p>
                <ul className="space-y-1 sm:space-y-2 hidden sm:block">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Packages Section
function PackagesSection() {
  const packages = [
    {
      name: "Básico",
      subtitle: "Eventos Sencillos",
      description: "Ideal para reuniones pequeñas y eventos íntimos",
      features: [
        "Servicio de meseros",
        "Uniforme formal",
        "4 horas de servicio",
        "Hasta 50 invitados",
      ],
      popular: false,
      icon: "⭐",
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
      icon: "👑",
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
      icon: "🏆",
    },
  ];

  return (
    <section id="paquetes" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-[var(--charcoal)] to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-32 sm:w-64 h-32 sm:h-64 opacity-10 hidden sm:block">
        <LottieAnimation animationData={celebrationAnimation} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="text-[var(--gold)] text-xs sm:text-sm font-semibold tracking-wider uppercase">Paquetes</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Elige el Plan <span className="text-gradient">Ideal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Paquetes para diferentes tipos de eventos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                pkg.popular
                  ? "bg-gradient-to-br from-[var(--gold-dark)]/20 via-[var(--charcoal-light)] to-[var(--charcoal)] border-2 border-[var(--gold)] md:scale-105 shadow-2xl shadow-[var(--gold)]/20 order-first md:order-none"
                  : "bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-white/10 hover:border-[var(--gold)]/30"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] rounded-full text-black text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Más Popular
                </div>
              )}

              <div className="text-center mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl mb-2 sm:mb-4 block">{pkg.icon}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  {pkg.name}
                </h3>
                <p className="text-[var(--gold)] font-medium text-sm sm:text-base">{pkg.subtitle}</p>
              </div>

              <p className="text-gray-400 text-center mb-4 sm:mb-6 text-sm sm:text-base">{pkg.description}</p>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/521234567890?text=Hola,%20me%20interesa%20el%20paquete%20${pkg.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3 sm:py-4 rounded-full font-semibold text-center transition-all text-sm sm:text-base ${
                  pkg.popular
                    ? "btn-primary bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-black hover:shadow-lg hover:shadow-[var(--gold)]/30"
                    : "border-2 border-[var(--gold)]/50 text-[var(--gold)] hover:bg-[var(--gold)]/10"
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

// Stats Section
function StatsSection() {
  const stats = [
    { number: "350+", label: "Eventos", icon: "🎉" },
    { number: "5+", label: "Años", icon: "📅" },
    { number: "98%", label: "Satisfechos", icon: "⭐" },
    { number: "50+", label: "Empresas", icon: "🏢" },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="text-xl sm:text-2xl md:text-4xl mb-1 sm:mb-2 block">{stat.icon}</span>
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-0.5 sm:mb-1 md:mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {stat.number}
              </div>
              <div className="text-black/70 font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "María García",
      event: "Boda",
      text: "Excelente servicio, el equipo fue muy profesional y atento. Todos mis invitados quedaron encantados con la atención. Sin duda los recomiendo para cualquier evento.",
      rating: 5,
      image: "MG",
    },
    {
      name: "Carlos Rodríguez",
      event: "Evento Corporativo",
      text: "Contratamos sus servicios para nuestra cena de fin de año y superaron nuestras expectativas. Puntuales, profesionales y muy atentos a cada detalle.",
      rating: 5,
      image: "CR",
    },
    {
      name: "Ana Martínez",
      event: "XV Años",
      text: "Los meseros fueron increíbles, muy atentos y profesionales. Hicieron que la fiesta de mi hija fuera perfecta. El capitán coordinó todo a la perfección.",
      rating: 5,
      image: "AM",
    },
    {
      name: "Roberto Sánchez",
      event: "Bautizo",
      text: "Servicio de primera calidad. El montaje quedó hermoso y el equipo fue muy amable con todos nuestros invitados. Definitivamente volveremos a contratarlos.",
      rating: 5,
      image: "RS",
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 opacity-10">
        <LottieAnimation animationData={starAnimation} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] text-sm font-semibold tracking-wider uppercase">Testimonios</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Lo que Dicen <span className="text-gradient">Nuestros Clientes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-white/5 hover:border-[var(--gold)]/30 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center text-black font-bold text-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-[var(--gold)] text-sm">{testimonial.event}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Logos de empresas */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <p className="text-center text-gray-500 mb-8">Empresas que confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["EMPRESA 1", "EMPRESA 2", "EMPRESA 3", "EMPRESA 4", "EMPRESA 5"].map((company, index) => (
              <div key={index} className="text-white/50 font-bold text-lg tracking-wider">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Gallery Section with Carousel - Using Pexels Images
function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Imágenes de Pexels (gratuitas y con licencia)
  const images = [
    { 
      src: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Celebración elegante",
      category: "Eventos"
    },
    { 
      src: "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Boda elegante",
      category: "Bodas"
    },
    { 
      src: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Servicio de catering profesional",
      category: "Catering"
    },
    { 
      src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Evento corporativo exitoso",
      category: "Corporativo"
    },
    { 
      src: "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Mesa elegante preparada",
      category: "Montajes"
    },
    { 
      src: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Servicio de bar profesional",
      category: "Coctelería"
    },
    { 
      src: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Celebración familiar",
      category: "Fiestas"
    },
    { 
      src: "https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      alt: "Banquete elegante",
      category: "Banquetes"
    },
  ];

  // Auto-play carousel
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-[var(--charcoal)] to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] text-sm font-semibold tracking-wider uppercase">Galería</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Momentos que <span className="text-gradient">Capturamos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cada evento es una oportunidad para crear experiencias memorables
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
                  {/* Category Badge */}
                  <span className="inline-block px-4 py-2 rounded-full bg-[var(--gold)]/90 text-black text-sm font-semibold mb-4">
                    {image.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    {image.alt}
                  </h3>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[var(--gold)]/50 rounded-tl-xl" />
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[var(--gold)]/50 rounded-tr-xl" />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all group"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all group"
              aria-label="Imagen siguiente"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 overflow-x-auto pb-2 px-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide
                    ? "ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-black scale-105"
                    : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
                aria-label={`Ver ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {index === currentSlide && (
                  <div className="absolute inset-0 border-2 border-[var(--gold)] rounded-xl" />
                )}
              </button>
            ))}
          </div>

          {/* Dots Navigation (Mobile) */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-6 h-2 bg-[var(--gold)] rounded-full"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500 rounded-full"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          </div>

        {/* Stats below carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10">
          {[
            { number: "500+", label: "Fotos de Eventos" },
            { number: "8", label: "Tipos de Servicios" },
            { number: "100%", label: "Eventos Documentados" },
            { number: "5⭐", label: "Calificación Promedio" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--gold)] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Solicita Cotización",
      description: "Contáctanos por WhatsApp o formulario con los detalles de tu evento",
      icon: "📝",
    },
    {
      number: "02",
      title: "Confirmamos Disponibilidad",
      description: "Verificamos fecha, horario y asignamos el equipo ideal para tu evento",
      icon: "✅",
    },
    {
      number: "03",
      title: "Realiza tu Anticipo",
      description: "Asegura tu fecha con un anticipo y confirma todos los detalles",
      icon: "💳",
    },
    {
      number: "04",
      title: "¡Disfruta tu Evento!",
      description: "Nuestro equipo llega puntual y se encarga de todo el servicio",
      icon: "🎉",
    },
  ];

  return (
    <section id="proceso" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] text-sm font-semibold tracking-wider uppercase">Proceso</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            ¿Cómo <span className="text-gradient">Funciona?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Contratar nuestros servicios es fácil y rápido
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Step circle */}
                <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border-2 border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-all duration-500 flex items-center justify-center">
                  <span className="text-4xl">{step.icon}</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center text-black text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--gold)] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cuántas horas incluye el servicio?",
      answer: "Nuestros paquetes estándar incluyen entre 4 y 6 horas de servicio. Sin embargo, podemos ajustar la duración según las necesidades específicas de tu evento. Las horas extra tienen un costo adicional que te indicamos en la cotización.",
    },
    {
      question: "¿Qué incluye el uniforme de los meseros?",
      answer: "Nuestro personal llega uniformado con camisa blanca, pantalón negro de vestir, chaleco (según el tipo de evento), mandil y zapatos formales. Para eventos temáticos o corporativos, podemos adaptar el uniforme según tus requerimientos.",
    },
    {
      question: "¿Qué pasa si necesito más meseros el día del evento?",
      answer: "Recomendamos confirmar el número de meseros con anticipación. Sin embargo, si surge la necesidad de personal adicional, haremos todo lo posible por asignarte más staff, sujeto a disponibilidad. Contáctanos lo antes posible para coordinar.",
    },
    {
      question: "¿Hay costo por traslado?",
      answer: "El traslado está incluido dentro de nuestra zona de cobertura principal. Para eventos en ubicaciones más alejadas, aplicamos un cargo adicional por traslado que se especifica en tu cotización.",
    },
    {
      question: "¿Pueden atender eventos el mismo día?",
      answer: "Aunque trabajamos principalmente con reservaciones anticipadas, en algunos casos podemos atender eventos de último momento. Contáctanos y verificaremos la disponibilidad de nuestro equipo.",
    },
    {
      question: "¿Incluyen servicio de alimentos o solo meseros?",
      answer: "Nos especializamos en el servicio de meseros y staff para eventos. No incluimos alimentos ni bebidas, pero trabajamos en coordinación con tu servicio de catering o banquetes para garantizar una experiencia perfecta.",
    },
    {
      question: "¿Cuál es la forma de pago?",
      answer: "Solicitamos un anticipo del 50% para confirmar la reservación y el resto se liquida antes o el día del evento. Aceptamos transferencia bancaria, depósito y efectivo.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-[var(--charcoal)] to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="text-[var(--gold)] text-xs sm:text-sm font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Resolvemos tus dudas más comunes
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[var(--gold)]/30"
            >
              <button
                className="w-full p-4 sm:p-6 text-left flex items-center justify-between bg-[var(--charcoal-light)] hover:bg-[var(--charcoal)] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium pr-3 sm:pr-4 text-sm sm:text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="p-4 sm:p-6 pt-0 text-gray-400 leading-relaxed bg-[var(--charcoal-light)] text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
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
    // Construir mensaje de WhatsApp
    const message = `Hola, me interesa cotizar su servicio de meseros.

*Datos del evento:*
- Nombre: ${formData.name}
- Email: ${formData.email}
- Teléfono: ${formData.phone}
- Fecha del evento: ${formData.eventDate}
- Número de invitados: ${formData.guests}
- Mensaje: ${formData.message}`;

    window.open(`https://wa.me/521234567890?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="contacto" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10">
        <LottieAnimation animationData={celebrationAnimation} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] text-sm font-semibold tracking-wider uppercase">Contacto</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Reserva tu <span className="text-gradient">Fecha</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Contáctanos hoy y asegura el servicio para tu próximo evento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Información de Contacto
              </h3>

              <div className="space-y-6">
                <a
                  href="https://wa.me/521234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-green-400 transition-colors">WhatsApp</p>
                    <p className="text-gray-400 text-sm">+52 123 456 7890</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--charcoal)] border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Teléfono</p>
                    <p className="text-gray-400 text-sm">+52 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--charcoal)] border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Correo</p>
                    <p className="text-gray-400 text-sm">contacto@meserosbecerril.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--charcoal)] border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Ubicación</p>
                    <p className="text-gray-400 text-sm">Ciudad de México y área metropolitana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { name: "TikTok", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 rounded-full bg-[var(--charcoal-light)] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[var(--gold)] hover:border-[var(--gold)]/50 transition-all"
                  aria-label={`Síguenos en ${social.name}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)] border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Solicita tu Cotización
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  placeholder="Tu teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Correo electrónico</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fecha del evento</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  title="Selecciona la fecha de tu evento"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Número de invitados</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  placeholder="Ej: 100"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Cuéntanos sobre tu evento</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-[var(--gold)] focus:outline-none transition-colors resize-none"
                placeholder="Tipo de evento, servicios que necesitas, ubicación..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 rounded-xl bg-gradient-to-r from-[var(--gold-dark)] via-[var(--gold)] to-[var(--gold-dark)] text-black font-semibold text-lg hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all"
            >
              Enviar Cotización por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-[var(--charcoal)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center text-black font-bold text-lg">
                MB
              </div>
              <span className="text-xl font-semibold tracking-wide text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Meseros Becerril
              </span>
            </a>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Servicio profesional de meseros para todo tipo de eventos. 
              Experiencia, puntualidad y excelencia en cada celebración.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {["Servicios", "Paquetes", "Testimonios", "Proceso", "Contacto"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-[var(--gold)] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+52 123 456 7890</li>
              <li>contacto@meserosbecerril.com</li>
              <li>Ciudad de México</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Meseros Becerril. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-[var(--gold)] transition-colors">
              Aviso de Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-[var(--gold)] transition-colors">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp Floating Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/521234567890?text=Hola,%20me%20interesa%20cotizar%20el%20servicio%20de%20meseros"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform group"
    >
      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="hidden sm:block absolute right-full mr-3 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ¡Cotiza ahora!
      </span>
    </a>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
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
