import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "dark" | "alt";
  pageNumber?: number;
}

const SlideLayout = ({ children, className, id, variant = "default", pageNumber }: SlideLayoutProps) => {
  const bgClass = {
    default: "bg-background",
    dark: "hero-bg text-white",
    alt: "slide-alt",
  }[variant];

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("slide flex flex-col justify-center px-4 md:px-12 lg:px-20 py-8 md:py-12 relative", bgClass, className)}
    >
      <div className={cn("relative z-10 max-w-6xl mx-auto w-full", visible ? "slide-content-animate" : "opacity-0")}>
        {children}
      </div>
      {pageNumber !== undefined && (
        <div className={cn(
          "absolute bottom-3 right-6 text-xs font-semibold tracking-widest",
          variant === "dark" ? "text-white/20" : "text-muted-foreground/30"
        )}>
          {String(pageNumber).padStart(2, "0")}
        </div>
      )}
    </section>
  );
};

export default SlideLayout;
