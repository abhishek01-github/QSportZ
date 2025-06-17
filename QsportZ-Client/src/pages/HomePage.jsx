import CTABanner from "../components/Home/CTABanner";
import FeaturesSection from "../components/Home/FeaturesSection";
import HeroSection from "../components/Home/HeroSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}
