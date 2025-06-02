import CTABanner from "../components/Home/CTABanner";
import FeaturesSection from "../components/Home/FeaturesSection";
import HeroSection from "../components/Home/HeroSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-black text-white">
      <NavBar/>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTABanner />
      {/* Footer will be its own component, added later */}
    </div>
  );
}
