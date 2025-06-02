import React from "react";

const testimonials = [
  {
    name: "Coach Alex Morgan",
    role: "Head Coach, St. Mary’s HS",
    quote:
      "QSportz transformed how we review film. Our players arrive to practice sharper and more prepared than ever.",
    avatar: "/images/testimonial-alex.jpg",
  },
  {
    name: "Jamie Lee",
    role: "Point Guard, Eastside Academy",
    quote:
      "I love the instant highlight reels—my college recruiters actually reached out after seeing my clips!",
    avatar: "/images/testimonial-jamie.jpg",
  },
  {
    name: "Coach Tony Brown",
    role: "Athletic Director, Northview HS",
    quote:
      "Managing schedules, film sharing, and stats all in one place saves our staff hours every week.",
    avatar: "/images/testimonial-tony.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-black/90">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">
          What Coaches & Athletes Say
        </h2>
        <p className="text-gray-400 mt-2">
          Real feedback from teams using QSportz to win more games.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay={idx * 150}>
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-red-600"
            />
            <p className="text-gray-200 italic mb-4">“{t.quote}”</p>
            <p className="font-semibold text-white">{t.name}</p>
            <p className="text-gray-400 text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
