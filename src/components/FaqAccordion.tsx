import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

const FaqAccordion = ({ faqs }: { faqs: FaqItem[] }) => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className="space-y-3"
    >
      {faqs.map((f, i) => {
        const value = `faq-${i}`;
        const isOpen = openItem === value;
        return (
          <AccordionItem
            key={i}
            value={value}
            className="border rounded-xl overflow-hidden transition-all duration-300"
            style={{
              borderColor: isOpen ? "transparent" : "hsl(265 100% 50% / 0.6)",
              background: "transparent",
            }}
          >
            <div
              className="px-5 rounded-xl transition-all duration-300"
              style={{
                background: isOpen
                  ? "linear-gradient(90deg, #7800ff, #3a00bf)"
                  : "hsl(240 10% 14% / 0.3)",
              }}
            >
              <AccordionTrigger className="text-left text-sm sm:text-lg font-semibold hover:no-underline text-foreground py-4" style={{ fontFamily: "'Hind', sans-serif" }}>
                {f.q}
              </AccordionTrigger>
            </div>
            <AccordionContent className="text-sm sm:text-base px-5 pb-4 pt-3" style={{ fontFamily: "'Hind', sans-serif", color: "hsl(0, 0%, 100%)" }}>
              {f.a}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FaqAccordion;
