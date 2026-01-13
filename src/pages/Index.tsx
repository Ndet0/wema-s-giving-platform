import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/features/home/HeroSection";
import ImpactStats from "@/components/features/home/ImpactStats";
import FeaturedCauses from "@/components/features/home/FeaturedCauses";
import HowItWorks from "@/components/features/home/HowItWorks";
import Testimonials from "@/components/features/home/Testimonials";
import CallToAction from "@/components/features/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ImpactStats />
        <FeaturedCauses />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
