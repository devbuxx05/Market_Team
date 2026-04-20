import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: Props) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const directionClasses = {
    up: "translate-y-10",
    left: "-translate-x-10",
    right: "translate-x-10",
    scale: "scale-95",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
