import { useState, useEffect } from "react";

interface NavbarProps {
  onCtaClick: () => void;
}

const Navbar = ({ onCtaClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <nav className={`hidden sm:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[80%] max-w-[500px] transition-all duration-500 rounded-full border ${
        scrolled
          ? "bg-white/5 backdrop-blur-md shadow-[0_4px_24px_rgba(74,0,255,0.15)] border-white/10 py-2.5 px-4 sm:px-6"
          : "bg-transparent border-transparent py-4 px-4 sm:px-6"
      }`}>
        <div className="flex items-center w-full gap-3 sm:gap-6">

          {/* CTA izquierda — tamaño fijo */}
          <button
            onClick={onCtaClick}
            className="btn-pulse shrink-0 rounded-full px-4 sm:px-6 py-2 text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white border border-white/20"
            style={{
              fontFamily: "'Hind', sans-serif",
              background: "linear-gradient(135deg, #4a00ff 0%, #7c3aff 50%, #a855f7 100%)",
            }}
          >
            Consultoría Gratis
          </button>

          {/* Links — ocupan el resto y se alinean al centro/derecha */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-6">
            <a href="#clientes" className="nav-link text-[11px] sm:text-base font-semibold text-white/80" style={{ fontFamily: "'Hind', sans-serif" }}>
              Clientes
            </a>
            <a href="#metodo" className="nav-link text-[11px] sm:text-base font-semibold text-white/80" style={{ fontFamily: "'Hind', sans-serif" }}>
              Método
            </a>
            <a href="#faq" className="nav-link text-[11px] sm:text-base font-semibold text-white/80" style={{ fontFamily: "'Hind', sans-serif" }}>
              FAQ
            </a>
          </div>

        </div>
      </nav>
  );
};

export default Navbar;