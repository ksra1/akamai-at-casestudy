import SlideLayout from "./SlideLayout";
import { ChevronDown } from "lucide-react";
import akamaiLogo from "@/assets/akamai-logo.png";

const TitleSlide = () => (
  <SlideLayout variant="dark" id="title" pageNumber={1}>
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] space-y-8">
      <img src={akamaiLogo} alt="Akamai Technologies" className="h-8 brightness-0 invert opacity-70" />

      <div className="space-y-4">
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">
          AT Retailers
        </h1>
        <div className="w-16 h-0.5 bg-white/30 mx-auto" />
        <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto font-light">
          Delivery · Security · Scale
        </p>
        <p className="text-white/30 text-sm">End-to-End Solution Architecture</p>
      </div>

      <div className="flex gap-10 mt-4">
        {[
          { label: "Delivery", sub: "5,000 hostnames · 30 days" },
          { label: "Security", sub: "WAF · Bot · API protection" },
          { label: "Scale", sub: "Multi-region governance" },
        ].map(({ label, sub }) => (
          <div key={label} className="text-center space-y-1">
            <p className="text-sm font-semibold text-white/80 tracking-wide">{label}</p>
            <p className="text-[11px] text-white/30">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-2xl">
        <p className="text-white/25 font-semibold tracking-[0.2em] uppercase text-[10px] mb-4">Interview Panel</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {["Mark Agostino", "Mike Buonfiglio", "Yancy Carrasco", "Jose Chaverri", "Danisha Nivas", "Shobhit Bhardwaj"].map(name => (
            <div key={name} className="bg-white/5 border border-white/10 rounded px-3 py-2 text-center">
              <p className="text-white/70 font-display font-semibold text-xs">{name}</p>
            </div>
          ))}
        </div>
        <p className="text-white/15 text-[10px] tracking-[0.15em] uppercase">Presented by</p>
        <p className="text-white/40 font-display text-sm mt-0.5">Sravan Kollapudi</p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={20} className="text-white/15" />
      </div>
    </div>
  </SlideLayout>
);

export default TitleSlide;
