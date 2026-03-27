import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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

  return (
    <section
      id={id}
      className={cn("slide flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 relative", bgClass, className)}
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">{children}</div>
      {pageNumber !== undefined && (
        <div className={cn(
          "absolute bottom-3 right-6 text-[10px] font-semibold tracking-widest",
          variant === "dark" ? "text-white/20" : "text-muted-foreground/30"
        )}>
          {String(pageNumber).padStart(2, "0")}
        </div>
      )}
    </section>
  );
};

export default SlideLayout;
