import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section
      className="relative py-20 text-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/cta-bg.jpg')`,
        backgroundBlendMode: "multiply",
        backgroundColor: "#000000cc",
      }}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Ready to elevate your game?
        </h2>
        <Link
          to="/register"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold
                     py-3 px-8 rounded-lg shadow-lg transition-colors">
          Start Your Free Trial
        </Link>
      </div>
    </section>
  );
}
