import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "navy" | "blue" | "alt";
  pageNumber?: number;
}

const SlideLayout = ({ children, className, id, variant = "default", pageNumber }: SlideLayoutProps) => {
  const bgClass = {
    default: "bg-background",
    navy: "animated-gradient text-foreground",
    blue: "gradient-blue text-foreground",
    alt: "slide-alt",
  }[variant];

  return (
    <section
      id={id}
      className={cn("slide flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 relative", bgClass, className)}
    >
      <div className="gradient-mesh grid-pattern absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto w-full">{children}</div>
      {pageNumber !== undefined && (
        <div className="absolute bottom-4 right-8 text-xs font-semibold text-muted-foreground/30">
          {pageNumber}
        </div>
      )}
    </section>
  );
};

export default SlideLayout;
