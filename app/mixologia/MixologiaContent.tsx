"use client";

import Link from "next/link";
import { CONTACT } from "../constants";
import {
  MIXOLOGY_IMAGES,
  MIXOLOGY_OPTIONS,
} from "./mixologia-data";

function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

function MixPhoto({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`mix-photo ${className}`}>
      <span className="mix-photo__corner" aria-hidden="true" />
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
    </div>
  );
}

function CocktailChip({ label }: { label: string }) {
  return (
    <span className="mix-chip">{label}</span>
  );
}

function OptionBlock({
  option,
  reversed,
}: {
  option: (typeof MIXOLOGY_OPTIONS)[number];
  reversed?: boolean;
}) {
  const isBarCliente = option.id === "bar-cliente";

  return (
    <section id={option.id} className="mix-option section-padding border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${
            reversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className={`lg:col-span-5 space-y-5 ${reversed ? "lg:[direction:ltr]" : ""}`}>
            <div className="mix-photo-stack">
              <MixPhoto
                src={option.image}
                alt={option.title}
                className="mix-photo-stack__main aspect-[4/5]"
                priority={option.number === "01"}
              />
              <MixPhoto
                src={option.imageSecondary}
                alt={`Detalle — ${option.title}`}
                className="mix-photo-stack__accent aspect-square hidden sm:block"
              />
            </div>
          </div>

          <div className={`lg:col-span-7 ${reversed ? "lg:[direction:ltr]" : ""}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
              <span className="section-number">{option.number}{"//"}</span>
              <span className="mix-badge">{option.badge}</span>
            </div>

            <h2 className="section-title mb-3">{option.title}</h2>
            <p className="text-base sm:text-lg tracking-wide text-[var(--gold)] mb-6">{option.subtitle}</p>
            <p className="text-base text-[var(--muted)] leading-relaxed mb-8 max-w-2xl">{option.description}</p>

            <ul className="space-y-3 mb-8">
              {option.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted)]">
                  <span className="text-[var(--gold)] mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>

            {isBarCliente ? (
              <div className="mb-10">
                <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-4">
                  Tragos que podemos crear
                </p>
                <div className="flex flex-wrap gap-2">
                  {(option.cocktails as readonly string[]).map((cocktail) => (
                    <CocktailChip key={cocktail} label={cocktail} />
                  ))}
                </div>
                <p className="text-sm text-[var(--muted)] mt-5 leading-relaxed">
                  Cada trago se <strong className="text-[var(--foreground)] font-normal">shekea</strong> al momento
                  y, con la presentación acorde a tu evento, se convierte en un{" "}
                  <strong className="text-[var(--foreground)] font-normal">producto especial</strong> para tu invitado.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {option.spirits.map((spirit) => (
                  <article key={spirit.name} className="mix-spirit-card card-minimal overflow-hidden">
                    <MixPhoto src={spirit.image} alt={spirit.name} className="aspect-[16/10] border-0 border-b border-[var(--border)]" />
                    <div className="p-4 sm:p-5">
                      <h3
                        className="text-lg text-[var(--foreground)] mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {spirit.name}
                      </h3>
                      <ul className="space-y-1.5">
                        {spirit.examples.map((example) => (
                          <li key={example} className="text-xs sm:text-sm tracking-wide text-[var(--muted)] uppercase">
                            — {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-6 border-t border-[var(--border)]">
              <a
                href={whatsappUrl(option.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-[var(--gold)] text-[var(--background)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors duration-300 text-center"
              >
                {option.cta}
              </a>
              <p className="text-sm text-[var(--muted)] max-w-xs">{option.ctaHint}</p>
            </div>

            <Link
              href={isBarCliente ? "#menu-medida" : "#bar-cliente"}
              className="inline-flex mt-6 text-link text-sm"
            >
              {isBarCliente ? "Ver menú a medida" : "Ver bar con tus destilados"}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MixologiaContent() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-base sm:text-lg tracking-wide text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {CONTACT.name}
          </Link>
          <Link href="/#mixologo" className="text-link text-xs sm:text-sm">
            Volver al inicio
          </Link>
        </div>
      </header>

      <section className="relative min-h-[72vh] md:min-h-[80vh] flex items-end overflow-hidden pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/7593094-uhd_4096_1974_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/55 to-[var(--background)]/25 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6">
                <span className="section-number">Mixología{"//"}</span>
                <span className="section-label">Servicio Premium</span>
              </div>
              <h1 className="section-title mb-6">
                Dos formas de vivir la <span className="text-gradient">Coctelería</span>
              </h1>
              <p className="section-description mb-8 max-w-xl">
                Elige la experiencia que mejor se adapte a tu evento: crear con tus destilados o recibir un menú
                diseñado para tus invitados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#bar-cliente" className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-[var(--gold)] text-[var(--background)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors">
                  Bar con tus destilados
                </a>
                <a href="#menu-medida" className="btn-outline inline-flex items-center justify-center px-8 py-4 text-xs tracking-[0.15em] uppercase text-[var(--foreground)]">
                  Menú personalizado
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 hidden lg:block">
              <MixPhoto
                src={MIXOLOGY_IMAGES.heroAccent}
                alt="Coctelería de autor en evento"
                className="aspect-[4/5] mix-photo--lift"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center md:text-left">
            {[
              { step: "01", label: "Eliges tu modalidad", detail: "Bar del cliente o menú a medida" },
              { step: "02", label: "Personalizamos", detail: "Destilados, invitados y estilo del evento" },
              { step: "03", label: "Servimos en vivo", detail: "Shake, presentación y trago especial" },
            ].map((item) => (
              <div key={item.step} className="px-2">
                <span className="section-number block mb-3">{item.step}{"//"}</span>
                <p className="text-[var(--foreground)] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  {item.label}
                </p>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OptionBlock option={MIXOLOGY_OPTIONS[0]} />
      <OptionBlock option={MIXOLOGY_OPTIONS[1]} reversed />

      <section className="section-padding border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="card-minimal overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <MixPhoto
              src={MIXOLOGY_IMAGES.service}
              alt="Servicio de mixología profesional"
              className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-full border-0 lg:border-r border-[var(--border)]"
            />
            <div className="lg:col-span-7 p-8 sm:p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] mb-4">¿Listo para tu evento?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--foreground)] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Hagamos que cada copa cuente una historia
              </h2>
              <p className="text-base text-[var(--muted)] leading-relaxed mb-8 max-w-xl">
                Cuéntanos fecha, número de invitados y qué experiencia prefieres. Te respondemos con una propuesta
                clara y personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl("Hola, quiero cotizar el servicio de mixología para mi evento. ¿Me pueden asesorar?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center px-10 py-4 bg-[var(--gold)] text-[var(--background)] text-xs tracking-[0.15em] uppercase hover:bg-[var(--gold-light)] transition-colors text-center"
                >
                  Cotizar por WhatsApp
                </a>
                <Link href="/#contacto" className="btn-outline inline-flex items-center justify-center px-10 py-4 text-xs tracking-[0.15em] uppercase text-[var(--foreground)] text-center">
                  Formulario de contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} {CONTACT.name}</p>
          <Link href="/" className="text-link text-sm">
            Volver al sitio principal
          </Link>
        </div>
      </footer>
    </main>
  );
}
