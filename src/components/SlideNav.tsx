import { useEffect, useState } from "react";

const slides = [
  { id: "title", label: "Title" },
  { id: "company-overview", label: "AT Retailers" },
  { id: "challenge", label: "Challenges" },
  { id: "architecture", label: "Architecture" },
  { id: "delivery-solutions", label: "Delivery" },
  { id: "security-solutions", label: "Security" },
  { id: "security-analysis", label: "Analysis" },
  { id: "roadmap", label: "Roadmap" },
  { id: "risk", label: "Risk" },
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
          <span className={`text-xs font-medium transition-all opacity-0 group-hover:opacity-100 ${active === s.id ? "!opacity-100 text-primary" : "text-foreground/40"}`}>
            {s.label}
          </span>
          <div className={`w-2 h-2 rounded-full transition-all ${active === s.id ? "bg-primary scale-150 glow-primary" : "bg-foreground/20 hover:bg-foreground/40"}`} />
        </button>
      ))}
    </nav>
  );
};

export default SlideNav;
