import SlideLayout from "./SlideLayout";
import { TrendingUp } from "lucide-react";

const OutcomesSlide = () => {
  const outcomes = [
    { metric: "60-80%", label: "Origin Load Reduction" },
    { metric: "50-70%", label: "Payload Reduction" },
    { metric: "10+ Tbps", label: "DDoS Protection Capacity" },
  ];

  const stats = [
    { value: "6", label: "Core Products" },
    { value: "13", label: "Challenges Addressed" },
    { value: "1", label: "Unified Platform" },
    { value: "30", label: "Days to Deploy" },
  ];

  return (
    <SlideLayout id="outcomes" variant="alt" pageNumber={8}>
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Results</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Expected Outcomes</h2>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <TrendingUp size={32} className="text-primary" />
                </div>
              </div>
              <div className="font-display text-4xl font-bold text-primary mb-2">{outcome.metric}</div>
              <div className="text-secondary font-semibold">{outcome.label}</div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-secondary/5 rounded-xl border-2 border-secondary/20 p-8">
          <h3 className="font-display text-xl font-semibold text-secondary mb-6 text-center">Program Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default OutcomesSlide;
