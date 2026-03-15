"use client";
import { motion } from 'framer-motion';

export default function AboutRide() {
  const features = [
    { title: "Distance", value: "17–18 KM", detail: "Charni Road Loop" },
    { title: "Inclusions", value: "Cycle & Helmet", detail: "Starbucks Refreshment" },
    { title: "Support", value: "Expert Guide", detail: "Mechanical Backup" },
    { title: "Cost", value: "₹599", detail: "Per Person" }
  ];

  return (
    <section id="aboutride" className="relative bg-transparent overflow-hidden border-t border-white/5 py-48 md:py-64">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon-cyan/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="tracking-premium text-[10px] text-white/40 uppercase mb-8 block">The Midnight Odyssey</span>
              <h2 className="text-7xl md:text-9xl font-display leading-[0.85] uppercase tracking-tighter text-white">
                 BORN IN <br/> 
                 <span className="text-neon-cyan">THE SILENCE</span>
              </h2>
            </div>
            
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg uppercase tracking-tight">
               Crafted for the elite. A cinematic 17–18 km journey through Mumbai's iconic shadows. 
               Experience the city when it truly belongs to you.
            </p>

            {/* Route Timeline */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block">The Cinematic Route</span>
              <p className="text-[12px] text-white/80 leading-relaxed tracking-wider uppercase">
                Charni Road — Sardar Pavbhaji — Starbucks — Churchgate — Flora Fountain — Central Library — Gateway — Taj — Mantralay — Marine Drive — Charni Road
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 md:p-12 hover:neon-border-cyan transition-all duration-500 group"
              >
                <span className="text-[10px] uppercase tracking-widest text-white/30 mb-4 block group-hover:text-neon-cyan">{f.title}</span>
                <span className="text-2xl md:text-3xl font-display text-white block mb-2">{f.value}</span>
                <span className="text-[10px] uppercase text-white/40">{f.detail}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// End of component
