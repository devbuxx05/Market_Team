import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        src="https://calendly.com/marketteamagency/cristhian?hide_gdpr_banner=1&primary_color=4a00ff&background_color=05050b&text_color=ffffff"
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
    ? "fixed left-[50%] top-[50%] z-50 w-[96vw] max-w-[1240px] max-h-[96vh] translate-x-[-50%] translate-y-[-50%] rounded-xl p-0 shadow-none overflow-hidden calendly-dialog-dark"
    : "w-[90%] sm:w-full sm:max-w-[28rem] rounded-lg border border-white/10 bg-[#111219] p-5 shadow-lg";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${dialogClassName} ${(step === "branch" || step === "clients" || step === "rejected" || step === "calendar") ? "[&>button]:hidden" : ""}`}>
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
          </DialogHeader>
        )}

        {step === "branch" && (
          <div className="flex flex-col space-y-5">
            <input
              type="text"
              value={branch}
              onChange={(event) => {
                setBranch(event.target.value);
                setInvalidBranch(false);
              }}
              placeholder="Ej. Derecho Civil, Penal, Laboral..."
              className={`w-full rounded-lg border bg-[#0f1117] px-4 py-4 text-white outline-none transition ${
                invalidBranch
                  ? "border-red-500 ring-2 ring-red-500/30"
                  : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            <button
              onClick={handleNextBranch}
              className="self-end rounded-md bg-gradient-to-r from-[#7800ff] to-[#3a00bf] px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:brightness-110 flex items-center gap-2"
            >
              Siguiente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}

        {step === "clients" && (
          <div className="space-y-5">
            <Select
              value={clients}
              onValueChange={(value) => {
                setClients(value as ClientOption);
                setInvalidClients(false);
              }}
            >
              <SelectTrigger className={`w-full rounded-lg border bg-[#0f1117] px-4 py-4 text-white outline-none transition ${
                invalidClients
                  ? "border-red-500 ring-2 ring-red-500/30"
                  : "border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent className="bg-[#111219] border-white/10">
                {clientOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white focus:bg-white/10">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-12">
              <button
                onClick={() => setStep("branch")}
                className="flex-1 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-primary flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Atrás
              </button>
              <button
                onClick={handleNextClients}
                className="flex-1 rounded-md bg-gradient-to-r from-[#7800ff] to-[#3a00bf] px-5 py-3 text-sm font-bold tracking-wide text-white transition hover:brightness-110 flex items-center justify-center gap-2"
              >
                Siguiente
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        )}

        {step === "rejected" && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-lg bg-[#111219] border border-white/10">
              <img src="/icons/404.png" alt="404"/>
            </div>
            <Button variant="outline" onClick={() => handleClose(false)} className=" text-sm font-bold bg-gradient-to-r from-[#7800ff] to-[#3a00bf] w-[150px] transition hover:brightness-110">
              OK
            </Button>
          </div>
        )}

        {step === "calendar" && (
          <div className="relative h-[94vh] w-full overflow-auto bg-transparent">

            {/* Botón cerrar */}
            <button
              onClick={() => handleClose(false)}
              className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full text-white/70 border border-white/20 bg-black/30 backdrop-blur-sm transition hover:bg-black/50 hover:text-white hover:scale-105"
            >
              <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

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