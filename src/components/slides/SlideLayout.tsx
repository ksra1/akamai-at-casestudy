import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "noir" | "alt";
  pageNumber?: number;
}

const SlideLayout = ({ children, className, id, variant = "default", pageNumber }: SlideLayoutProps) => {
  const bgClass = {
    default: "bg-background",
    noir: "gradient-noir",
    alt: "slide-alt",
  }[variant];

  return (
    <section
      id={id}
      className={cn("slide flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 relative", bgClass, className)}
    >
      <div className="noir-mesh absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">{children}</div>
      {pageNumber !== undefined && (
        <div className="absolute bottom-3 right-6 text-[10px] font-semibold text-muted-foreground/25 tracking-widest">
          {String(pageNumber).padStart(2, "0")}
        </div>
      )}
    </section>
  );
};

export default SlideLayout;
