import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "../constants";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Vianey Becerril",
  description: "Términos y condiciones del servicio de meseros y staff para eventos de Vianey Becerril.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-base sm:text-lg tracking-wide text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {CONTACT.name}
          </Link>
          <Link href="/" className="text-link text-xs sm:text-sm">
            Volver al inicio
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-20">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-6">Legal</p>
        <h1
          className="text-3xl sm:text-4xl text-[var(--foreground)] mb-8 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Términos y Condiciones
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-lg text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Servicios contratados
            </h2>
            <p>
              Los servicios cotizados y contratados con {CONTACT.name} incluyen exclusivamente lo
              acordado por escrito al momento de la reservación: personal de meseros, staff, horario,
              número de personas asignadas y actividades descritas en la cotización aceptada.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Servicios adicionales
            </h2>
            <p>
              Cualquier servicio adicional que no haya sido incluido en la cotización original
              —como lavar loza, preparación de alimentos, montaje especial, decoración o cualquier
              actividad similar— tendrá un costo extra.
            </p>
            <p className="mt-4">
              El monto de dicho cargo se determinará según la cantidad de trabajo requerida, el tipo
              de servicio solicitado y el número de personas necesarias para realizarlo. Estos
              servicios deben ser solicitados y confirmados con anticipación; de no ser posible, se
              cotizarán el día del evento sujetos a disponibilidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Cotización y pagos
            </h2>
            <p>
              Para confirmar la fecha del evento se solicita un anticipo del 50% del total acordado.
              El saldo restante deberá liquidarse antes o el día del evento, por transferencia
              bancaria, depósito o efectivo, según lo acordado.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Cancelaciones y cambios
            </h2>
            <p>
              Las cancelaciones o modificaciones de fecha deberán notificarse con la mayor
              anticipación posible. Los cambios en número de invitados, horario o servicios pueden
              ajustar el costo final de la cotización.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[var(--foreground)] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Contacto
            </h2>
            <p>
              Para dudas sobre estos términos o para solicitar una cotización, contáctanos al{" "}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                className="text-[var(--gold)] hover:underline"
              >
                {CONTACT.phone}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-12 pt-8 border-t border-[var(--border)] text-xs text-[var(--muted)]">
          Última actualización: {new Date().getFullYear()}
        </p>
      </article>
    </main>
  );
}
