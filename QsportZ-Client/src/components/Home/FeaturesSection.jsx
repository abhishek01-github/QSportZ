import React from "react";

const features = [
  {
    title: "Video Library",
    desc: "Upload, tag, and organize your team videos in one place—accessible anywhere.",
    icon: "https://static.hudl.com/craft/home/_600xAUTO_crop_center-center_none/home-see-sports-differently.jpg?mtime=20240221130854",
  },
  {
    title: "Analytics",
    desc: "Dive deep into stats: performance insights, win/loss trends, and more.",
    icon: "https://static.hudl.com/craft/_618x348_crop_center-center_none/200535/value-of-video-sb-1.jpg?mtime=20231101071750",
  },
  {
    title: "Team Management",
    desc: "Manage rosters, schedules, and communications with ease.",
    icon: "https://static.hudl.com/craft/_618x348_crop_center-center_none/Rizing-Zephyr-featured-image.jpg?mtime=20240102142827",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-black/80">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, idx) => (
          <div
            key={f.title}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay={idx * 150}>
            <img
              src={f.icon}
              alt=""
              className="h-25 rounded-xl mb-6 transition-all duration-300 hover:scale-110"
            />
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {f.title}
            </h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
