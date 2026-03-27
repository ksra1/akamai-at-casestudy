import SlideLayout from "./SlideLayout";
import { Globe, Shield, Zap, ChevronDown } from "lucide-react";
import akamaiLogo from "@/assets/akamai-logo.png";

const TitleSlide = () => (
  <SlideLayout variant="navy" id="title" pageNumber={1}>
    <div className="flex flex-col items-center justify-center text-center space-y-10 min-h-[70vh]">
      {/* Akamai logo */}
      <div className="mb-2">
        <img src={akamaiLogo} alt="Akamai Technologies" className="h-10 brightness-0 invert opacity-70" />
      </div>

      <div className="space-y-5">
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-foreground">AT Retailers</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Digital Transformation
          </span>
        </h1>
        <p className="text-foreground/30 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
          Delivery, Security & Scale — End-to-End Solution Architecture
        </p>
      </div>

      {/* Three pillars */}
      <div className="flex gap-16 mt-8">
        {[
          { icon: Zap, label: "Delivery", desc: "5,000 hostnames in 30 days" },
          { icon: Shield, label: "Security", desc: "WAF, Bot & API protection" },
          { icon: Globe, label: "Scale", desc: "Multi-region governance" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary">
              <Icon size={28} className="text-primary" />
            </div>
            <span className="text-foreground/70 text-sm font-semibold tracking-wide">{label}</span>
            <span className="text-foreground/25 text-xs max-w-[140px]">{desc}</span>
          </div>
        ))}
      </div>

      {/* Panel Members */}
      <div className="mt-10 pt-8 border-t border-foreground/5 w-full max-w-3xl">
        <p className="text-primary/60 font-semibold tracking-[0.2em] uppercase text-xs mb-5">Interview Panel</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            "Mark Agostino",
            "Mike Buonfiglio",
            "Yancy Carrasco",
            "Jose Chaverri",
            "Danisha Nivas",
            "Shobhit Bhardwaj",
          ].map(name => (
            <div key={name} className="glass-card rounded-lg px-4 py-2.5 text-center">
              <p className="text-foreground/80 font-display font-semibold text-sm">{name}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-foreground/20 text-xs tracking-[0.2em] uppercase">Presented by</p>
          <p className="text-foreground/50 font-display text-sm mt-1">Sravan Kollapudi</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-foreground/15" />
      </div>
    </div>
  </SlideLayout>
);

export default TitleSlide;
