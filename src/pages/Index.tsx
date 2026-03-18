import TitleSlide from "@/components/slides/TitleSlide";
import ChallengeSlide from "@/components/slides/ChallengeSlide";
import ArchitectureSlide from "@/components/slides/ArchitectureSlide";
import DeliverySlide from "@/components/slides/DeliverySlide";
import SecuritySlide from "@/components/slides/SecuritySlide";
import BotThreatSlide from "@/components/slides/BotThreatSlide";
import RoadmapSlide from "@/components/slides/RoadmapSlide";
import RiskSlide from "@/components/slides/RiskSlide";
import CompetitiveSlide from "@/components/slides/CompetitiveSlide";
import SummarySlide from "@/components/slides/SummarySlide";
import SlideNav from "@/components/SlideNav";

const Index = () => (
  <div className="relative">
    <SlideNav />
    <TitleSlide />
    <ChallengeSlide />
    <ArchitectureSlide />
    <DeliverySlide />
    <SecuritySlide />
    <BotThreatSlide />
    <RoadmapSlide />
    <RiskSlide />
    <CompetitiveSlide />
    <SummarySlide />
  </div>
);

export default Index;
