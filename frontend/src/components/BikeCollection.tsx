"use client";
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const bikes = [
  { name: "S-Works Tarmac", model: "SL8", price: "₹85,000", accent: "cyan", specs: ["Carbon Frame", "Dura-Ace Di2", "6.8kg"] },
  { name: "Pinarello Dogma", model: "F12", price: "₹1,20,000", accent: "purple", specs: ["Torayca T1100", "SRAM Red", "7.0kg"] },
  { name: "Specialized Venge", model: "Pro", price: "₹65,000", accent: "white", specs: ["Fact Carbon", "Ultegra Di2", "7.4kg"] },
];

export default function BikeCollection() {
  return (
    <section id="specs" className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="tracking-premium text-[10px] text-white/40 block mb-4">Precision Engineering</span>
          <h2 className="text-6xl font-display text-white">The <span className="text-neon-cyan">Collection</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bikes.map((bike, idx) => (
            <motion.div
              key={bike.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="glass-panel rounded-[2rem] p-8 group hover:neon-border-cyan transition-all duration-500"
            >
              <div className="h-48 flex items-center justify-center mb-8 relative">
                 <div className={`absolute inset-0 bg-${bike.accent}/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700`} />
                 <div className="text-6xl opacity-10 font-display absolute top-0 -left-4">0{idx+1}</div>
                 <TrendingUp size={80} className={`text-${bike.accent} opacity-20 group-hover:opacity-100 transition-all duration-700`} />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">{bike.model}</span>
                <h3 className="text-3xl font-display text-white mb-4">{bike.name}</h3>
                <div className="space-y-3 mb-8">
                  {bike.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-3 text-white/50 text-[11px] uppercase tracking-wider">
                      <div className={`w-1 h-1 rounded-full bg-${bike.accent}`} />
                      {spec}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-2xl font-display text-white">{bike.price}</span>
                  <button className={`btn-premium py-2 px-6 text-[8px] btn-${bike.accent === 'white' ? 'premium' : 'neon-' + (bike.accent.includes('cyan') ? 'cyan' : 'purple')}`}>
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
