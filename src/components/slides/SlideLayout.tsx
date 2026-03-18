import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "navy" | "blue" | "alt";
}

const SlideLayout = ({ children, className, id, variant = "default" }: SlideLayoutProps) => {
  const bgClass = {
    default: "bg-background",
    navy: "animated-gradient text-primary-foreground",
    blue: "gradient-blue text-primary-foreground",
    alt: "slide-alt",
  }[variant];

  return (
    <section
      id={id}
      className={cn("slide flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16", bgClass, className)}
    >
      <div className="gradient-mesh absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
};

export default SlideLayout;
