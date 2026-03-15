"use client";
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative bg-transparent overflow-hidden border-t border-white/5 pt-48 pb-24 md:pt-64">
      {/* Final Cinematic Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-neon-cyan/10 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="text-neon-cyan font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Final Deployment</span>
              <h2 className="text-7xl md:text-9xl font-display leading-[0.85] uppercase tracking-tighter text-white">
                READY TO <br/>
                <span className="text-neon-cyan">RIDE THE NIGHT?</span>
              </h2>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-16 py-8 btn-premium btn-neon-cyan flex items-center gap-10 group transition-all duration-700 text-[10px] tracking-[0.4em]"
            >
              REGISTER NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-700 text-neon-cyan" />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="tel:9082943365" className="group p-10 glass-panel rounded-[2.5rem] border border-white/5 hover:neon-border-cyan transition-all duration-700">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">Direct Comms</p>
                <div className="flex items-center justify-between">
                   <span className="text-white font-display text-2xl tracking-tighter">9082943365</span>
                   <Phone className="text-neon-cyan w-4 h-4 group-hover:scale-125 transition-all duration-500" />
                </div>
              </a>
              
              <a href="mailto:elitebmwcycling@gmail.com" className="group p-10 glass-panel rounded-[2.5rem] border border-white/5 hover:neon-border-purple transition-all duration-700 min-w-0">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">Official Hub</p>
                <div className="flex items-center justify-between gap-4">
                   <span className="text-white font-display text-sm md:text-lg lowercase tracking-tight truncate">elitebmwcycling@gmail.com</span>
                   <Mail className="text-neon-purple w-4 h-4 flex-shrink-0 group-hover:scale-125 transition-all duration-500" />
                </div>
              </a>

              <a href="https://www.instagram.com/elitebmwcycling" target="_blank" rel="noreferrer" className="md:col-span-2 group p-12 glass-panel rounded-[2.5rem] border border-white/5 hover:neon-border-cyan transition-all duration-700">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-8">Visual Intel</p>
                <div className="flex items-center justify-between">
                   <span className="text-white font-display text-4xl uppercase tracking-tighter grad-text-cyan">
                      FOLLOW @ELITEBMWCYCLING
                   </span>
                   <Instagram className="text-neon-cyan w-8 h-8 group-hover:rotate-12 transition-all duration-500" />
                </div>
              </a>
            </div>

            <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-30">
              <span className="text-[8px] text-white/50 font-bold uppercase tracking-[0.5em]">© {new Date().getFullYear()} Elite BMW — Midnight Excellence.</span>
              <div className="flex gap-12 text-[8px] text-white/50 font-bold uppercase tracking-[0.3em]">
                 <a href="#" className="hover:text-neon-cyan transition-colors">POLICIES</a>
                 <a href="#" className="hover:text-neon-purple transition-colors">SAFETY</a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
