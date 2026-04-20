import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "billing" | "budget" | "result";
type Scenario = "A" | "B" | null;

const QualificationModal = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<Step>("billing");
  const [billing, setBilling] = useState("");
  const [scenario, setScenario] = useState<Scenario>(null);

  const reset = () => {
    setStep("billing");
    setBilling("");
    setScenario(null);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const handleBilling = (value: string) => {
    setBilling(value);
    if (value === "less1000") {
      setScenario("A");
      setStep("result");
    } else {
      setStep("budget");
    }
  };

  const handleBudget = (value: string) => {
    if (value === "no") {
      setScenario("A");
    } else {
      setScenario("B");
    }
    setStep("result");
  };

  const OptionButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-border bg-secondary p-4 text-left text-foreground transition-all hover:border-primary hover:bg-primary/10"
    >
      {label}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            {step === "billing" && "Paso 1 de 2"}
            {step === "budget" && "Paso 2 de 2"}
            {step === "result" && "Resultado"}
          </DialogTitle>
        </DialogHeader>

        {step === "billing" && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              ¿Cuál es tu facturación mensual actual?
            </p>
            <div className="space-y-3">
              <OptionButton label="Menos de $1,000" onClick={() => handleBilling("less1000")} />
              <OptionButton label="$1,000 a $5,000" onClick={() => handleBilling("1000to5000")} />
              <OptionButton label="Más de $5,000" onClick={() => handleBilling("more5000")} />
            </div>
          </div>
        )}

        {step === "budget" && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              ¿Tienes presupuesto para invertir en pauta publicitaria?
            </p>
            <div className="space-y-3">
              <OptionButton label="Sí" onClick={() => handleBudget("yes")} />
              <OptionButton label="No" onClick={() => handleBudget("no")} />
            </div>
          </div>
        )}

        {step === "result" && scenario === "A" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <span className="text-2xl">🙏</span>
            </div>
            <p className="text-muted-foreground">
              Gracias por tu interés. En este momento nuestro sistema de trabajo requiere una
              inversión mínima que parece no ajustarse a tu perfil actual. Te recomendamos
              seguirnos en redes para contenido gratuito.
            </p>
            <Button variant="outline" onClick={() => handleClose(false)} className="w-full">
              Cerrar
            </Button>
          </div>
        )}

        {step === "result" && scenario === "B" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              ¡Excelente! Eres un candidato ideal para nuestro programa.
            </p>
            <p className="text-muted-foreground">
              Agenda una llamada con uno de nuestros asesores para comenzar.
            </p>
            <a
              href="https://wa.me/1234567890?text=Hola%2C%20quiero%20agendar%20mi%20consultor%C3%ADa%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(142,70%,45%)] px-6 py-4 text-lg font-bold text-[hsl(0,0%,100%)] transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-6 w-6" />
              Hablar con un asesor por WhatsApp
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QualificationModal;
