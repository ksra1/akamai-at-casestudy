import { useEffect, useState } from "react";

const slides = [
  { id: "title", label: "Title" },
  { id: "challenge", label: "Challenge" },
  { id: "architecture", label: "Architecture" },
  { id: "delivery", label: "Delivery" },
  { id: "security", label: "Security" },
  { id: "bot-threat", label: "Bot & Threats" },
  { id: "roadmap", label: "Roadmap" },
  { id: "risk", label: "Risk Mgmt" },
  { id: "competitive", label: "Why Akamai" },
  { id: "summary", label: "Summary" },
];

const SlideNav = () => {
  const [active, setActive] = useState("title");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    slides.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="slide-nav fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {slides.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-2 justify-end"
          title={s.label}
        >
          <span className={`text-xs font-medium transition-all opacity-0 group-hover:opacity-100 ${active === s.id ? "!opacity-100 text-primary" : "text-muted-foreground"}`}>
            {s.label}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full transition-all ${active === s.id ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />
        </button>
      ))}
    </nav>
  );
};

export default SlideNav;
