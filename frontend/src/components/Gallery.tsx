"use client";
import { motion } from 'framer-motion';

const images = [
  "/assets/gallery/1.png",
  "/assets/gallery/2.png",
  "/assets/gallery/3.png",
  "/assets/gallery/4.png",
  "/assets/gallery/5.png",
  "/assets/gallery/6.png",
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-64 bg-transparent overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-32"
        >
          <span className="tracking-premium text-[10px] text-white/40 uppercase mb-8 block">Cinematic Archive</span>
          <h2 className="text-6xl md:text-9xl font-display leading-[0.85] uppercase text-white">
            VISUAL <br/>
            <span className="text-neon-cyan">LEGACY</span>
          </h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
          {images.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] overflow-hidden border border-white/5 group bg-black transition-all duration-700 hover:neon-border-cyan cursor-none"
            >
              <img 
                src={src} 
                alt={`Gallery ${idx}`} 
                className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
