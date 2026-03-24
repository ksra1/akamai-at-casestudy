import SlideLayout from "./SlideLayout";
import { Globe, Shield, Zap, ChevronDown } from "lucide-react";

const TitleSlide = () => (
  <SlideLayout variant="navy" id="title" pageNumber={1}>
    <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
      {/* Akamai wave mark */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-xl">A</span>
        </div>
        <span className="text-primary-foreground/50 font-display text-sm tracking-[0.3em] uppercase">Akamai Technologies</span>
      </div>

      <div className="space-y-4">
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-primary-foreground">AT Retailers</span>
          <br />
          <span className="text-primary">Digital Transformation</span>
        </h1>
        <p className="text-primary-foreground/40 text-lg md:text-xl max-w-2xl mx-auto">
          Delivery, Security & Scale — End-to-End Solution Architecture
        </p>
      </div>

      {/* Three pillars */}
      <div className="flex gap-12 mt-6">
        {[
          { icon: Zap, label: "Delivery", desc: "5,000 hostnames in 30 days" },
          { icon: Shield, label: "Security", desc: "WAF, Bot & API protection" },
          { icon: Globe, label: "Scale", desc: "Multi-region governance" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
              <Icon size={26} className="text-primary" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-semibold">{label}</span>
            <span className="text-primary-foreground/30 text-xs max-w-[140px]">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-primary-foreground/10 w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-primary-foreground/40 text-xs tracking-widest uppercase">Presented by</p>
            <p className="text-primary-foreground font-display text-lg font-semibold mt-1">Sravan Kollapudi</p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/40 text-xs tracking-widest uppercase">Panel</p>
            <p className="text-primary-foreground/60 text-sm mt-1">Mark Agostino · Mike Buonfiglio · Yancy Carrasco</p>
            <p className="text-primary-foreground/60 text-sm">Jose Chaverri · Danisha Nivas · Shobhit Bhardwaj</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-primary-foreground/20" />
      </div>
    </div>
  </SlideLayout>
);

export default TitleSlide;
