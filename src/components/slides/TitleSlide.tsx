import SlideLayout from "./SlideLayout";
import { Globe, Shield, Zap } from "lucide-react";

const TitleSlide = () => (
  <SlideLayout variant="navy" id="title">
    <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
      {/* Akamai-style logo mark */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-2xl">A</span>
        </div>
        <span className="text-primary-foreground/70 font-display text-lg tracking-widest uppercase">Akamai Technologies</span>
      </div>

      <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
        <span className="text-primary-foreground">AT Retailers</span>
        <br />
        <span className="text-primary">Digital Transformation</span>
      </h1>

      <p className="text-primary-foreground/60 text-xl md:text-2xl max-w-3xl font-light">
        Delivery, Security & Scale — A Comprehensive Solution Architecture
      </p>

      <div className="flex gap-8 mt-8">
        {[
          { icon: Zap, label: "Delivery" },
          { icon: Shield, label: "Security" },
          { icon: Globe, label: "Scale" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-primary-foreground/50">
            <Icon size={28} className="text-primary" />
            <span className="text-sm font-medium tracking-wider uppercase">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-primary-foreground/40 text-sm space-y-1">
        <p className="font-semibold text-primary-foreground/60">Sr. Technology Project Manager — Panel Interview</p>
        <p>Prepared for the Akamai Interview Panel</p>
        <p>March 2026</p>
      </div>
    </div>
  </SlideLayout>
);

export default TitleSlide;
