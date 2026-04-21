import { useEffect, useState } from 'react';

const CalendlyWidget = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Cargar el script de Calendly si no está cargado
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePopupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/marketteamagency/cristhian?hide_event_type_details=1&hide_gdpr_banner=1'
      });
    }
  };

  if (isMobile) {
    return (
      <div className="w-full text-center">
        <button
          onClick={handlePopupClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Agendar Consultoría Gratuita
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/marketteamagency/cristhian?hide_gdpr_banner=1"
        style={{
          minWidth: '320px',
          height: '700px',
        }}
      ></div>
    </div>
  );
};

export default CalendlyWidget;