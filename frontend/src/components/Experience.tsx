"use client";
import { motion } from 'framer-motion';

const features = [
  {
    tag: "High Performance",
    title: "Guided Night Adventure",
    desc: "Navigate through Mumbai's midnight pulse with expert lead riders and tactical support. Our guides ensure a safe, cinematic journey through the city's icons.",
    img: "/assets/cycle-detail.png",
    specs: [
      { label: "Safety", value: "Led by Experts" },
      { label: "Pace", value: "Aero/Endurance" }
    ],
    reverse: false
  },
  {
    tag: "Social Hub",
    title: "The Midnight Social",
    desc: "Join an elite community of riders. From iconic Starbucks refreshments to mid-ride group activities, the experience is about the people as much as the pedals.",
    img: "/assets/group-ride.png",
    specs: [
      { label: "Community", value: "Elite Network" },
      { label: "Activity", value: "Group Challenges" }
    ],
    reverse: true
  }
];

export default function Experience() {
  return (
    <section id="experience" className="bg-transparent py-48 md:py-64 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-64">
        
        {features.map((f, idx) => (
          <div key={idx} className={`flex flex-col ${f.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-center`}>
            
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute inset-0 bg-neon-cyan/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/5">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content Box */}
            <motion.div 
              initial={{ opacity: 0, x: f.reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-12"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neon-cyan mb-6 block">{f.tag}</span>
                <h3 className="text-5xl md:text-7xl font-display text-white uppercase leading-none">{f.title}</h3>
                <p className="text-white/50 mt-8 text-lg font-light leading-relaxed uppercase tracking-tight max-w-lg">
                  {f.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {f.specs.map((s, i) => (
                  <div key={i} className="glass-panel p-6 border-white/5 group hover:neon-border-cyan transition-all duration-500">
                    <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2">{s.label}</span>
                    <span className="text-lg font-display text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        ))}

      </div>
    </section>
  );
}
