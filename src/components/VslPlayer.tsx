import { useEffect, useRef, useState, useCallback } from "react";
import { VolumeX, Pause, Play, RotateCcw } from "lucide-react";

const VslPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showReturnAlert, setShowReturnAlert] = useState(false);
  const savedTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setIsReady(true);
      video.play().catch(() => {});
    };

    const onTimeUpdate = () => {
      const video = videoRef.current;
      if (!video || !video.duration || video.duration === 0) return;

      const realRatio = video.currentTime / video.duration;
      const k = 100; // ajusta este valor si quieres más o menos agresividad
      const newProgress = (Math.log(1 + realRatio * k) / Math.log(1 + k)) * 100;

      setProgress(Math.min(newProgress, 100));
    };

    const onEnded = () => {
      if (hasClicked) setProgress(100);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [hasClicked]);

  // Observer eliminado: el video se sigue reproduciendo aunque el usuario baje la página

  const handleClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasClicked) {
      setShowAlert(false);
      setHasClicked(true);
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      video.play();
      setProgress(0);
    }
    // Ya no pausamos ni mostramos alerta al hacer clic en el video
    // Solo el botón de pausa hará eso
  }, [hasClicked]);

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !hasClicked) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [hasClicked]);

  // Continuar desde donde dejó
  const handleContinue = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowReturnAlert(false);
    video.currentTime = savedTimeRef.current;
    video.play().catch(() => {});
    setIsPaused(false);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Comenzar desde el principio
  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowReturnAlert(false);
    setProgress(0);
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPaused(false);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-black cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="aspect-video w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          loop
        >
          <source src="/videos/vsl-market.mp4" type="video/mp4" />
          {/* Agregando la etiqueta source con el type ayuda al navegador a identificar el códec */}
        </video>
      </div>

      {/* Alerta inicial: haz clic para escuchar */}
      {showAlert && isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            className="flex flex-col items-center gap-2 rounded-xl px-8 py-5 animate-pulse"
            style={{ background: "rgba(220, 60, 40, 0.92)" }}
          >
            <VolumeX className="h-10 w-10 text-white" />
            <p className="text-white font-bold text-base sm:text-lg" style={{ fontFamily: "'Hind', sans-serif" }}>
              Tu video ya ha comenzado
            </p>
            <p className="text-white/90 text-sm" style={{ fontFamily: "'Hind', sans-serif" }}>
              Haz clic para escuchar
            </p>
          </div>
        </div>
      )}

      {/* Alerta de regreso — ocupa todo el video */}
      {showReturnAlert && (
        <div 
          className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-2 sm:gap-5 px-3 sm:px-8 text-center bg-[rgba(74,0,255,0.97)] overflow-y-auto py-2 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); handleContinue(); }}
        >
          
          {/* Mensaje persuasivo */}
          <div className="flex flex-col gap-1 sm:gap-2 text-center mt-auto sm:mt-0">
            <p className="font-anton text-white text-base sm:text-3xl leading-tight font-medium">
              Si pausaste aquí recuerda que...
            </p>
            <p className="font-hind text-white/85 text-[10px] sm:text-base max-w-[340px] mx-auto leading-snug sm:leading-relaxed text-center">
              "No hay viento favorable para el que no sabe a donde va"  
            </p>
          </div>

          {/* Ícono central */}
          <div className="my-0.5 sm:my-2 shrink-0">
            <img
              src="/icons/avion.webp"
              alt="sigue adelante"
              className="h-8 sm:h-20 w-auto"
            />
          </div>

          {/* Botones - SIEMPRE EN FILA (flex-row) */}
          <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 w-full max-w-[340px] sm:max-w-md mb-auto sm:mb-0">
            
            {/* Botón Continuar */}
          <button
            onClick={(e) => { e.stopPropagation(); handleContinue(); }}
            className="flex w-fit items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full border sm:border-2 border-white px-5 py-1.5 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-bold text-white transition-all hover:bg-white hover:text-[#4a00ff]"
          >
            <div className="flex h-4 w-4 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border sm:border-2 border-white">
              <Play className="h-2 w-2 sm:h-3 sm:w-3 fill-white" />
            </div>
            <span className="leading-none sm:hidden">Continuar</span>
            <span className="leading-none hidden sm:inline">Continuar viendo</span>
          </button>

          {/* Botón Reiniciar */}
          <button
            onClick={(e) => { e.stopPropagation(); handleRestart(); }}
            className="flex w-fit items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full border sm:border-2 border-white px-5 py-1.5 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-bold text-white transition-all hover:bg-white hover:text-[#4a00ff]"
          >
            <div className="flex h-4 w-4 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border sm:border-2 border-white">
              <RotateCcw className="h-2 w-2 sm:h-3 sm:w-3" />
            </div>
            <span className="leading-none sm:hidden">Reiniciar</span>
            <span className="leading-none hidden sm:inline">Comenzar de nuevo</span>
          </button>

          </div>
        </div>
      )}

      {/* Barra de progreso */}
      {hasClicked && !showReturnAlert && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/60 z-30">
          <div
            className="h-full transition-all duration-75 ease-out" // Bajamos a 75ms para que sea más responsivo
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #e53e3e, #c53030)",
            }}
          />
        </div>
      )}

      {/* Botón de pausa - esquina inferior izquierda */}
      {hasClicked && !showReturnAlert && (
        <button
          onClick={(e) => {
  e.stopPropagation();
  const video = videoRef.current;
  if (video) {
    savedTimeRef.current = video.currentTime; // ✅ guarda el tiempo
    video.pause();
    setIsPaused(true);
    setShowReturnAlert(true);
  }
}}
          className="absolute bottom-2 left-2 z-40 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white transition-all hover:bg-black/90"
        >
          <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
};

export default VslPlayer;