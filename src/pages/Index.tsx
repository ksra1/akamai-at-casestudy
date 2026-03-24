import TitleSlide from "@/components/slides/TitleSlide";
import CompanyOverviewSlide from "@/components/slides/CompanyOverviewSlide";
import ChallengeSlide from "@/components/slides/ChallengeSlide";
import ArchitectureSlide from "@/components/slides/ArchitectureSlide";
import SolutionDesignSlide from "@/components/slides/SolutionDesignSlide";
import SecuritySolutionsSlide from "@/components/slides/SecuritySolutionsSlide";
import SecurityAnalysisSlide from "@/components/slides/SecurityAnalysisSlide";
import RoadmapSlide from "@/components/slides/RoadmapSlide";
import RiskSlide from "@/components/slides/RiskSlide";
import CompetitiveSlide from "@/components/slides/CompetitiveSlide";
import SummarySlide from "@/components/slides/SummarySlide";
import SlideNav from "@/components/SlideNav";

const Index = () => (
  <div className="relative">
    <SlideNav />
    <TitleSlide />
    <CompanyOverviewSlide />
    <ChallengeSlide />
    <ArchitectureSlide />
    <SolutionDesignSlide />
    <SecuritySolutionsSlide />
    <SecurityAnalysisSlide />
    <RoadmapSlide />
    <RiskSlide />
    <CompetitiveSlide />
    <SummarySlide />
  </div>
);

export default Index;
