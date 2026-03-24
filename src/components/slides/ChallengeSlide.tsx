import SlideLayout from "./SlideLayout";
import { Truck, Shield, Clock, Users, Zap, Image, AlertTriangle, Bot, CreditCard, ShoppingCart, UserX, Radio } from "lucide-react";

const deliveryChallenges = [
  { icon: Clock, text: "5,000 hostnames in 30 days" },
  { icon: Users, text: "New teams untrained on Akamai" },
  { icon: Zap, text: "Handle 5x peak traffic" },
  { icon: Image, text: "Slow image loading" },
  { icon: AlertTriangle, text: "No testing — straight to production" },
  { icon: Radio, text: "Multi-geography resource management" },
];

const securityChallenges = [
  { icon: Shield, text: "DDoS attacks on origin" },
  { icon: AlertTriangle, text: "Legacy WAF rules outdated" },
  { icon: UserX, text: "Credential stuffing surge" },
  { icon: ShoppingCart, text: "Inventory scraping by bots" },
  { icon: CreditCard, text: "Carding on checkout APIs" },
  { icon: Bot, text: "Sophisticated bot evasion" },
];

const ChallengeSlide = () => {
  return (
    <SlideLayout id="challenge" variant="alt" pageNumber={3}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Understanding the Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Key Challenges</h2>
          <p className="text-muted-foreground text-sm">12 challenges across delivery and security</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Delivery */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Truck size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-secondary">Delivery Issues</h3>
                <p className="text-xs text-muted-foreground">6 challenges</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {deliveryChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="visual-card bg-card rounded-xl border border-border p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Shield size={20} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-secondary">Bot & Automated Threats</h3>
                <p className="text-xs text-muted-foreground">6 challenges</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {securityChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="visual-card bg-card rounded-xl border border-border p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key stats ribbon */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "5,000", label: "Hostnames to Onboard" },
            { value: "30", label: "Days Timeline" },
            { value: "5×", label: "Peak Traffic Surge" },
            { value: "3+", label: "Regions (NA, LATAM, EU)" },
          ].map(s => (
            <div key={s.label} className="bg-secondary text-secondary-foreground rounded-xl p-4 text-center">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="text-secondary-foreground/60 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ChallengeSlide;
