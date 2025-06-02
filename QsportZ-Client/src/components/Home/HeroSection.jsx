import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://sc.hudl.com/cms/assets/images/homepage/hudl_homepage_hero_20240112_1080p.av1.mp4"
        autoPlay
        muted
        loop
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Capture. Analyze. Win.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          QSportz brings video analysis, team management, and highlights
          together in one platform—built for schools, coaches, and athletes.
        </p>
        <Link
          to="/register"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors">
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
