import React, { useState } from "react";
import { Play } from "lucide-react";
import VslPlayer from "@/components/VslPlayer";
import QualificationModal from "@/components/QualificationModal";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollToTop from "@/components/ScrollToTop";

const clientes = [
  {
    name: "Nick Name",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non justo vel lacus viverra placerat.",
    videoId: "1-2eyS0k-IA",
  },
  {
    name: "Nick Name",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non justo vel lacus viverra placerat.",
    videoId: "TixlT7lTWMQ",
  },
];

const faqs = [
  {
    q: "¿Esto funciona para mi tipo de negocio?",
    a: <>Trabajamos con negocios B2B, expertos y marcas personales que ya tienen conocimiento y buscan convertirlo en clientes. <br /> Si ya tienes algo validado pero no logras escalar, es donde más impacto generamos.</>,
  },
  {
    q: "¿Necesito tener experiencia creando contenido o vendiendo?",
    a: "No. Nosotros nos encargamos de toda la estrategia, creación de contenido y gestión de campañas. Tú solo te enfocas en atender a tus nuevos clientes.",
  },
  {
    q: "¿Qué pasa si no obtengo resultados?",
    a: "Trabajamos gratis hasta lograr el resultado. Tenemos un track record comprobado y evaluamos tu caso antes de comenzar.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo necesitas agendar tu consultoría gratuita. Ahí analizaremos tu caso y te diremos exactamente qué necesitas.",
  },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-repeating-glow text-foreground relative overflow-hidden">
      <div className="relative z-10">
        <Navbar onCtaClick={() => setModalOpen(true)} />

        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 sm:pt-20 text-center">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl space-y-4 sm:space-y-4">
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl leading-snug sm:leading-normal">
                No necesitas hacer más videitos...{" "}
                <span>
                  Necesitas entender por qué no estás consiguiendo clientes
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm sm:text-lg text-muted-foreground leading-snug sm:leading-none">
                <span className="block -mb-0 sm:-mb-1">
                  Implementamos un sistema para <span className="font-semibold text-foreground text-base sm:text-xl">generar clientes constantes</span>
                </span>
                <span className="block">
                  y escalar tus resultados
                </span>
              </p>

            </div>
          </ScrollReveal>

          {/* Video */}
          <ScrollReveal delay={200} className="mt-10 sm:mt-5 w-full max-w-3xl">
            <VslPlayer />
          </ScrollReveal>

          {/* CTA below video */}
          <ScrollReveal delay={400} className="mt-10 sm:mt-5 w-full flex flex-col items-center">
            <div className="cta-section-gradient py-3 sm:py-2 px-6 sm:px-8 rounded-xl max-w-xl w-full text-center shadow-lg">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                Si eres <span className="font-bold">Abogado</span> o tienes un{" "}
                <span className="font-bold">Estudio Jurídico</span> y quieres{" "}
                <span className="font-bold">dejar de perder</span> clientes frente a tu competencia,
                agenda tu consultoría gratuita.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-pulse mt-10 sm:mt-8 rounded-full px-8 py-4 text-sm uppercase tracking-wider text-white border border-white/20 transition-all duration-300"
              style={{ 
                fontFamily: "'Hind', sans-serif",
                background: "linear-gradient(135deg, #4a00ff 0%, #7c3aff 50%, #a855f7 100%)"
              }}
            >
              Consultoría <span className=" font-extrabold">Gratis</span>
            </button>

          </ScrollReveal>
        </section>

        {/* Clientes */}
        <section id="clientes" className="px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="gradient-title mb-16 text-center text-5xl sm:text-6xl tracking-wide uppercase">
                Clientes
              </h2>
            </ScrollReveal>
            <div className="space-y-8">
              {clientes.map((c, i) => (
                <ScrollReveal key={i} delay={i * 150} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="flex flex-col sm:flex-row items-center gap-8 rounded-xl border-2 border-white-500 bg-secondary/30 backdrop-blur-sm p-8 transition-all duration-300 hover:border-purple-400 hover:bg-secondary/50">
                    <div className="w-full sm:w-3/5 aspect-[16/9] rounded-lg bg-secondary/80 flex items-center justify-center overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${c.videoId}`}
                        title={c.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-full sm:w-2/5 space-y-2">
                      <h3 className="text-base font-extrabold uppercase tracking-wide">{c.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Hind', sans-serif" }}>{c.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Método */}
        <section id="metodo" className="px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="gradient-title mb-16 text-center text-5xl sm:text-6xl tracking-wide uppercase">
                Método
              </h2>
            </ScrollReveal>

            <div className="grid gap-6 md:gap-1 md:grid-cols-2 items-center">

              {/* Tarjeta 1: Agencias Estiércol */}
              <ScrollReveal delay={0} direction="left">
                <div className="flex flex-col gap-3 mx-auto w-full max-w-[300px] md:max-w-sm">
                  <h3 className="text-3xl md:text-4xl text-center tracking-tight text-white">
                    Agencias Estiércol
                  </h3>
                  {/* Reduje a p-4 en móvil para que quede más ajustado */}
                  <div className="rounded-[1.3rem] px-7 py-7 md:px-10 md:py-10 shadow-lg" style={{ backgroundColor: '#333547' }}>
                    <div className="mb-4 md:mb-6 flex justify-center">
                      <img
                        src="/icons/tarjeta.png"
                        alt="Logo A"
                        className="w-14 md:w-20 h-auto drop-shadow-md"
                      />
                    </div>
                    {/* CAMBIO AQUÍ: text-xs en lugar de text-sm */}
                    <ul className="space-y-2 md:space-y-3 text-base md:text-xl text-white" style={{ fontFamily: "'Hind', sans-serif" }}>
                      {[
                        "Publican contenido sin generar ventas",
                        "Se enfocan en likes y alcance",
                        "Procesos desordenados y sin claridad (IMPROVISACIÓN)",
                        "Dependes de ellos para todo",
                        "Contratan a terceros y no obtienen resultados",
                        "No garantizan resultados"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 text-white/80 font-bold leading-snug">•</span>
                          <span className="leading-snug text-left w-full text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              {/* Tarjeta 2: Market Team Agency */}
              <ScrollReveal delay={200} direction="right">
                <div className="flex flex-col gap-3 mx-auto w-full max-w-[350px] md:max-w-md">
                  <h3 className="text-3xl md:text-4xl text-center tracking-tight text-white">
                    Market Team Agency
                  </h3>
                  {/* Reduje a p-4 en móvil para que quede más ajustado */}
                  <div
                    className="rounded-[1.3rem] px-7 py-7 md:px-10 md:py-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(74,0,255,0.4)]"
                    style={{ backgroundColor: '#4a00ff' }}
                  >
                    <div className="mb-4 md:mb-6 flex justify-center">
                      <img
                        src="/icons/logo.png"
                        alt="Logo Market Team Agency"
                        className="w-14 md:w-20 h-auto drop-shadow-md"
                      />
                    </div>
                    {/* CAMBIO AQUÍ: text-xs en lugar de text-sm */}
                    <ul className="space-y-2 md:space-y-3 text-base md:text-xl text-white" style={{ fontFamily: "'Hind', sans-serif" }}>
                      {[
                        <>Implementamos un sistema que genera <span className="font-semibold md:text-xl">clientes constantes</span></>,
                        "Nos enfocamos en conversión y rentabilidad real",
                        <>Trabajamos con metodologías <span className="font-semibold md:text-xl">TRACK + PAE + Troyanos</span></>,
                        <>Construimos un sistema que <span className="font-semibold md:text-xl">No depende de ti</span></>,
                        "Equipo interno optimizado para un rendimiento real",
                        "Trabajamos gratis hasta lograr el resultado"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 text-white font-bold leading-snug">•</span>
                          <span className="leading-snug text-left w-full">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* TRACK */}
        <section className="px-4 py-24">
          
          {/* Título */}
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="gradient-title mb-12 text-center text-5xl sm:text-6xl tracking-widest uppercase">
                Track
              </h2>
            </ScrollReveal>
          </div>

          {/* Imagen */}
          <ScrollReveal delay={200} direction="scale">
            <div className="mx-auto max-w-6xl">
              
              {/* Mobile image */}
              <img
                src="/icons/track-movil.png"
                alt="Sistema Track"
                className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(74,0,255,0.3)] md:hidden"
              />
              {/* Desktop image */}
              <img
                src="/icons/track.png"
                alt="Sistema Track"
                className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(74,0,255,0.3)] hidden md:block"
              />

            </div>
          </ScrollReveal>

        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-24">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="gradient-title mb-12 text-center text-5xl sm:text-6xl tracking-wide uppercase">
                Preguntas Frecuentes
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <FaqAccordion faqs={faqs} />
            </ScrollReveal>

            {/* CTA debajo del FAQ */}
            <ScrollReveal delay={300}>
              <div className="mt-16 text-center">
                <p className="mx-auto mb-8 max-w-xl text-base sm:text-xl text-white font-hind font-light">
                  <span>
                    No necesitas más contenido, más herramientas o más personas.
                  </span>{" "}
                    Necesitas entender por qué todo eso <span className="font-semibold">no te está dando resultados</span>.
                </p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-pulse mt-10 sm:mt-8 rounded-full px-8 py-4 text-sm uppercase tracking-wider text-white border border-white/20 transition-all duration-300"
                  style={{ 
                    fontFamily: "'Hind', sans-serif",
                    background: "linear-gradient(135deg, #4a00ff 0%, #7c3aff 50%, #a855f7 100%)"
                  }}
                >
                  Consultoría <span className=" font-extrabold">Gratis</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Hind', sans-serif" }}>
              Este sitio no forma parte del sitio web de Facebook ni de Meta Platforms, Inc. y no está respaldado por ellos de ninguna manera. Facebook es una marca registrada de Meta Platforms, Inc. {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>

      <QualificationModal open={modalOpen} onOpenChange={setModalOpen} />
      
      <ScrollToTop />
      
    </div>
  );
};

export default Index;