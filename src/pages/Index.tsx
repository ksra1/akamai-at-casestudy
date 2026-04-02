import TitleSlide from "@/components/slides/TitleSlide";
import CompanyOverviewSlide from "@/components/slides/CompanyOverviewSlide";
import ChallengeSlide from "@/components/slides/ChallengeSlide";
import ArchitectureSlide from "@/components/slides/ArchitectureSlide";
import BulkDVProvisioningSlide from "@/components/slides/BulkDVProvisioningSlide";
import SolutionDesignSlide from "@/components/slides/SolutionDesignSlide";
import SecuritySolutionsSlide from "@/components/slides/SecuritySolutionsSlide";
import GovernanceSlide from "@/components/slides/GovernanceSlide";
// import SecurityAnalysisSlide from "@/components/slides/SecurityAnalysisSlide"; // HIDDEN - How Threats Interconnect
import RoadmapSlide from "@/components/slides/RoadmapSlide";
import ResourcePlanSlide from "@/components/slides/ResourcePlanSlide";
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
    <GovernanceSlide />
    {/* <SecurityAnalysisSlide /> HIDDEN - How Threats Interconnect slide removed */}
    <RoadmapSlide />
    <ResourcePlanSlide />
    <RiskSlide />
    <CompetitiveSlide />
    <SummarySlide />
    <BulkDVProvisioningSlide />
  </div>
);

export default Index;
