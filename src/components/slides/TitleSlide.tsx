import SlideLayout from "./SlideLayout";
import { Globe, Shield, Zap, ChevronDown } from "lucide-react";
import akamaiLogo from "@/assets/akamai-logo.png";

const TitleSlide = () => (
  <SlideLayout variant="navy" id="title" pageNumber={1}>
    <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
      <div className="mb-2">
        <img src={akamaiLogo} alt="Akamai Technologies" className="h-10 brightness-0 invert" />
      </div>

      <div className="space-y-4">
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-primary-foreground">AT Retailers ×</span>
          <br />
          <span className="text-primary">Akamai</span>
        </h1>
        <p className="text-primary-foreground/50 text-xl md:text-2xl max-w-2xl mx-auto font-display">
          5,000 hostnames. 30 days. Zero excuses.
        </p>
        <p className="text-primary-foreground/25 text-sm max-w-xl mx-auto">
          A delivery, security & governance plan for a company that doesn't have time to wait.
        </p>
      </div>

      <div className="flex gap-12 mt-6">
        {[
          { icon: Zap, label: "Ship It", desc: "Migrate fast, break nothing" },
          { icon: Shield, label: "Lock It Down", desc: "Bots, DDoS, carding — handled" },
          { icon: Globe, label: "Scale It", desc: "3 regions, 1 platform" },
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

      <div className="mt-8 pt-6 border-t border-primary-foreground/10 w-full max-w-3xl">
        <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-4">Interview Panel</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            "Mark Agostino",
            "Mike Buonfiglio",
            "Yancy Carrasco",
            "Jose Chaverri",
            "Danisha Nivas",
            "Shobhit Bhardwaj",
          ].map(name => (
            <div key={name} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-4 py-2.5 text-center">
              <p className="text-primary-foreground font-display font-semibold text-sm">{name}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-primary-foreground/30 text-xs tracking-widest uppercase">Presented by</p>
          <p className="text-primary-foreground/60 font-display text-sm mt-1">Sravan Kollapudi</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-primary-foreground/20" />
      </div>
    </div>
  </SlideLayout>
);

export default TitleSlide;
