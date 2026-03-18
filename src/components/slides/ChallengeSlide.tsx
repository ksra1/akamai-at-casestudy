import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Truck, Shield, TrendingUp, Globe, Clock, Users, AlertTriangle, Server } from "lucide-react";

const stats = [
  { value: "5,000", label: "Hostnames", sub: "to onboard in 30 days" },
  { value: "5x", label: "Traffic Surge", sub: "during peak events" },
  { value: "3+", label: "Regions", sub: "NA, LATAM, Europe, Asia" },
  { value: "30", label: "Days", sub: "aggressive timeline" },
];

const challenges = [
  {
    icon: Truck,
    title: "Delivery",
    color: "bg-primary",
    items: [
      "5,000 hostnames in 30 days — bulk onboarding at scale",
      "New teams untrained on Akamai products",
      "5x peak traffic handling required",
      "Slow image loading across sites",
      "Customer wants to skip testing — push straight to production",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    color: "bg-accent",
    items: [
      "DDoS attacks targeting customer origins",
      "Outdated WAF rule sets on legacy configs",
      "Credential stuffing surge",
      "Inventory scraping by competitive bots",
      "Carding attempts on checkout APIs",
      "Sophisticated evasion: IP rotation, spoofed clients",
    ],
  },
  {
    icon: TrendingUp,
    title: "Scale & Governance",
    color: "bg-akamai-green",
    items: [
      "Multi-geography resource coordination",
      "Legacy monolith → microservices migration",
      "Acquired companies need platform migration",
      "Cross-team change management at scale",
    ],
  },
];

const ChallengeSlide = () => {
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <SlideLayout id="challenge" variant="alt">
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Understanding the Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">The Challenge at a Glance</h2>
        </div>

        {/* Stats ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border">
              <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
              <div className="font-semibold text-secondary mt-1">{s.label}</div>
              <div className="text-muted-foreground text-sm">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Challenge cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <div
              key={c.title}
              onClick={() => setModalIdx(i)}
              className="callout-badge bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${c.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <c.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-secondary">{c.title}</h3>
              </div>
              <ul className="space-y-2">
                {c.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {c.items.length > 3 && (
                <p className="text-primary text-xs mt-3 font-semibold group-hover:underline">
                  + {c.items.length - 3} more — click to expand
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Context bar */}
        <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
          {[
            { icon: Globe, text: "Global Operations" },
            { icon: Server, text: "AWS + On-Prem Hybrid" },
            { icon: Users, text: "Multi-team Coordination" },
            { icon: Clock, text: "Aggressive Timeline" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="text-primary" /> {text}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {challenges.map((c, i) => (
        <CalloutModal key={c.title} open={modalIdx === i} onOpenChange={() => setModalIdx(null)} title={`${c.title} Challenges — Deep Dive`}>
          <ul className="space-y-3">
            {c.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-accent mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default ChallengeSlide;
