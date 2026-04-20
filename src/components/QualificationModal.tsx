import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "branch" | "clients" | "rejected" | "calendar";
type ClientOption = "0-1" | "2-5" | "6-25" | "26-55" | "56+" | "";

declare global {
  interface Window {
    Calendly?: any;
  }
}

const clientOptions: Array<{ value: ClientOption; label: string }> = [
  { value: "0-1", label: "0 - 1 cliente" },
  { value: "2-5", label: "2 - 5 clientes" },
  { value: "6-25", label: "6 - 25 clientes" },
  { value: "26-55", label: "26 - 55 clientes" },
  { value: "56+", label: "56 a más clientes" },
];

const QualificationModal = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<Step>("branch");
  const [branch, setBranch] = useState("");
  const [clients, setClients] = useState<ClientOption>("");
  const [invalidBranch, setInvalidBranch] = useState(false);
  const [invalidClients, setInvalidClients] = useState(false);
  const [calendarRendered, setCalendarRendered] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const reset = () => {
    setStep("branch");
    setBranch("");
    setClients("");
    setInvalidBranch(false);
    setInvalidClients(false);
    setCalendarRendered(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const getCalendlyDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = `${tomorrow.getMonth() + 1}`.padStart(2, "0");
    const day = `${tomorrow.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderCalendly = () => {
    if (!calendarRef.current || calendarRendered) return;
    const date = getCalendlyDate();
    calendarRef.current.innerHTML = `
      <iframe
        src="https://calendly.com/marketteamagency/cristhian?hide_gdpr_banner=1&date=${date}&embed_domain=market-team-agency.com&embed_type=Inline"
        style="width:100%; height:100%; border:0; min-height:0;"
        allowtransparency="true"
      ></iframe>
    `;
    setCalendarRendered(true);
  };

  useEffect(() => {
    if (!open || step !== "calendar") return;
    renderCalendly();
  }, [open, step]);

  const handleNextBranch = () => {
    if (!branch.trim()) {
      setInvalidBranch(true);
      return;
    }
    setInvalidBranch(false);
    setStep("clients");
  };

  const handleNextClients = () => {
    if (!clients) {
      setInvalidClients(true);
      return;
    }
    setInvalidClients(false);
    if (clients === "0-1") {
      setStep("rejected");
      return;
    }
    setStep("calendar");
  };

  const dialogClassName =
    step === "calendar"
      ? "fixed left-[50%] top-[50%] z-50 w-[96vw] max-w-[1240px] max-h-[96vh] translate-x-[-50%] translate-y-[-50%] rounded-none border-none bg-transparent p-0 shadow-none overflow-hidden"
      : "w-full sm:max-w-[28rem] rounded-[32px] border border-white/10 bg-[#111219] p-5 shadow-lg";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={dialogClassName}>
        {step !== "calendar" && (
          <DialogHeader>
            <DialogTitle
              className="text-center text-foreground font-bold"
              style={{ fontFamily: "'Hind', sans-serif" }}
            >
              {step === "branch" && "¿A qué rama del derecho te dedicas?"}
              {step === "clients" && "¿Cuántos clientes activos manejas actualmente?"}
              {step === "rejected" && "Lo sentimos aún no podemos trabajar juntos"}
            </DialogTitle>
            {/* Renderiza el botón de cerrar sólo si no estamos en 'calendar' */}
            <DialogClose asChild>
              <button className="sr-only">Cerrar</button>
            </DialogClose>
          </DialogHeader>
        )}

        {step === "branch" && (
          <div className="space-y-5">
            <input
              type="text"
              value={branch}
              onChange={(event) => {
                setBranch(event.target.value);
                setInvalidBranch(false);
              }}
              placeholder="Ej. Derecho Civil, Penal, Laboral..."
              className={`w-full rounded-[28px] border bg-[#0f1117] px-4 py-4 text-white outline-none transition ${
                invalidBranch
                  ? "border-red-500 ring-2 ring-red-500/30"
                  : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <button
              onClick={handleNextBranch}
              className="w-full rounded-full bg-[#7c3aff] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Siguiente →
            </button>
          </div>
        )}

        {step === "clients" && (
          <div className="space-y-5">
            <div className="relative">
              <select
                value={clients}
                onChange={(event) => {
                  setClients(event.target.value as ClientOption);
                  setInvalidClients(false);
                }}
                className={`w-full appearance-none rounded-[28px] border bg-[#0f1117] px-4 py-4 pr-12 text-white outline-none transition ${
                  invalidClients
                    ? "border-red-500 ring-2 ring-red-500/30"
                    : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {clientOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#111219] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">▾</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("branch")}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-primary"
              >
                Atrás
              </button>
              <button
                onClick={handleNextClients}
                className="flex-1 rounded-full bg-[#7c3aff] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {step === "rejected" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-[#111219] border border-white/10">
              <img src="/icons/404.png" alt="404" className="h-20 w-20 object-contain" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Lo sentimos aún no podemos trabajar juntos
            </p>
            <Button variant="outline" onClick={() => handleClose(false)} className="w-full">
              OK
            </Button>
          </div>
        )}

        {step === "calendar" && (
          <div className="h-[94vh] w-full overflow-hidden bg-transparent">
            <div
              ref={calendarRef}
              className="calendly-widget-wrapper h-full w-full bg-transparent"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QualificationModal;