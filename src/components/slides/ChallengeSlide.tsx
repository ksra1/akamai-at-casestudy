import SlideLayout from "./SlideLayout";
import TermTooltip from "./TermTooltip";
import { Truck, Shield, Clock, Users, Zap, Image, AlertTriangle, Bot, UserX, Globe, Layers, ArrowRight } from "lucide-react";

const deliveryChallenges = [
  { icon: Clock, text: "5,000 hostnames in 30 days" },
  { icon: Users, text: "New teams untrained on Akamai" },
  { icon: Zap, text: "Handle 5x peak traffic" },
  { icon: Image, text: "Slow image loading" },
  { icon: AlertTriangle, text: "No testing — straight to production" },
  { icon: Layers, text: "Legacy monolith → microservices migration" },
];

const securityChallenges = [
  { icon: Shield, key: "ddos", text: <><TermTooltip term="DDoS" /> attacks on <TermTooltip term="origin" /></> },
  { icon: AlertTriangle, key: "waf", text: <>Legacy <TermTooltip term="WAF" /> rules outdated</> },
  { icon: UserX, key: "cred", text: <><TermTooltip term="Credential stuffing" /> surge</> },
  { icon: Bot, key: "bots", text: <>Scraping, carding & bot <TermTooltip term="evasion" /></> },
];

const scaleGovChallenges = [
  { icon: Globe, text: "Multi-geography resource coordination (Europe, US, Asia)" },
  { icon: Users, text: "Team coordination & change management at scale" },
  { icon: AlertTriangle, text: "Risk management & stakeholder escalation" },
];

const traceability = [
  { label: "Delivery (6)", section: "", slides: "Slide 5", color: "bg-primary" },
  { label: "Security (4)", section: "", slides: "Slide 6", color: "bg-accent" },
  { label: "Scale & Gov (3)", section: "", slides: "Slide 7", color: "bg-akamai-green" },
];

const ChallengeSlide = () => (
  <SlideLayout id="challenge" variant="alt" pageNumber={3}>
    <div className="space-y-5 stagger-children">
      <div>
        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Understanding the Problem</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">13 Key Challenges</h2>
        <p className="text-muted-foreground text-sm mt-1">Across delivery, security, and scale & governance</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h3 className="font-display text-base font-bold text-foreground">Delivery</h3>
            <span className="text-xs text-muted-foreground">6 challenges</span>
          </div>
          {deliveryChallenges.map(({ icon: Icon, text }) => (
            <div key={text} className="stripe-card p-3 flex items-center gap-2.5">
              <Icon size={14} className="text-primary shrink-0" />
              <p className="text-sm text-foreground/80">{text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full bg-accent" />
            <h3 className="font-display text-base font-bold text-foreground">Security</h3>
            <span className="text-xs text-muted-foreground">4 challenges</span>
          </div>
          {securityChallenges.map(({ icon: Icon, text, key }) => (
            <div key={key} className="stripe-card stripe-card-orange p-3 flex items-center gap-2.5">
              <Icon size={14} className="text-accent shrink-0" />
              <p className="text-sm text-foreground/80">{text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full bg-akamai-green" />
            <h3 className="font-display text-base font-bold text-foreground">Scale & Governance</h3>
            <span className="text-xs text-muted-foreground">3 challenges</span>
          </div>
          {scaleGovChallenges.map(({ icon: Icon, text }) => (
            <div key={text} className="stripe-card stripe-card-green p-3 flex items-center gap-2.5">
              <Icon size={14} className="text-akamai-green shrink-0" />
              <p className="text-sm text-foreground/80">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:flex gap-3">
        {traceability.map(t => (
          <div key={t.label} className="flex-1 clean-card flex items-center gap-2 px-3 py-2.5">
            <div className={`w-2 h-2 rounded-full ${t.color} shrink-0`} />
            <div className="flex-1">
              <p className="text-xs font-bold text-foreground/70">{t.label}</p>
              <p className="text-[11px] text-muted-foreground">{t.section} · {t.slides}</p>
            </div>
            <ArrowRight size={10} className="text-muted-foreground/40 shrink-0" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: "5,000", label: "Hostnames to Onboard" },
          { value: "30", label: "Days Timeline" },
          { value: "5×", label: "Peak Traffic Surge" },
          { value: "3+", label: "Regions (NA, LATAM, EU)" },
        ].map(s => (
          <div key={s.label} className="clean-card p-3 text-center">
            <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default ChallengeSlide;
