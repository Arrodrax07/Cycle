"use client";
import { motion } from 'framer-motion';
import { Shield, Eye, AlertCircle } from 'lucide-react';

export default function RouteSection() {
  return (
    <section id="routesection" className="relative py-48 md:py-64 bg-transparent overflow-hidden border-t border-white/5">
      {/* Background Neon Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="tracking-premium text-[10px] text-white/40 uppercase mb-8 block">Operational Hub</span>
              <h2 className="text-6xl md:text-9xl font-display leading-[0.85] uppercase text-white">
                MEETING <br/>
                <span className="text-neon-cyan">POINT</span>
              </h2>
            </div>
            
            <div className="glass-panel p-10 rounded-[2rem] border-white/5 space-y-8 group hover:neon-border-cyan transition-all duration-500">
               <div className="flex items-center gap-6">
                 <div className="p-4 bg-neon-cyan/10 rounded-xl">
                    <Shield className="text-neon-cyan" size={24} />
                 </div>
                 <div>
                    <h3 className="text-white font-display text-2xl uppercase tracking-tighter">Central Plaza Cinema</h3>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Charni Road, Mumbai</span>
                 </div>
               </div>

               <p className="text-white/50 text-[12px] uppercase tracking-wide leading-relaxed">
                 The silence begins here. Join the elite as we gather under the cinematic glow of Charni Road before the midnight deployment.
               </p>

               <div className="pt-6 border-t border-white/10">
                 <a 
                   href="https://maps.app.goo.gl/yQQHSBSZfFxGKzHa8" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn-premium btn-neon-cyan py-4 px-8 text-[9px] tracking-[0.2em]"
                 >
                   OPEN NAVIGATOR (MAPS)
                 </a>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-10 rounded-[2rem] border-white/5">
                   <div className="flex items-center gap-4 mb-6">
                      <Eye className="text-neon-purple" size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Deployment</span>
                   </div>
                   <h4 className="text-3xl font-display text-white uppercase mb-2">10:45 PM</h4>
                   <span className="text-[10px] text-white/40 uppercase">Every Friday & Saturday</span>
                </div>

                <div className="glass-panel p-10 rounded-[2rem] border-white/5 border-l-neon-purple transition-all duration-500 hover:neon-border-purple">
                   <div className="flex items-center gap-4 mb-6">
                      <AlertCircle className="text-neon-purple" size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Reporting</span>
                   </div>
                   <h4 className="text-3xl font-display text-white uppercase mb-2">10:15 PM</h4>
                   <span className="text-[10px] text-white/40 uppercase">Strict Check-in</span>
                </div>
             </div>

             <div className="glass-panel p-10 rounded-[2rem] border-white/5 bg-gradient-to-br from-neon-purple/5 to-transparent">
                <h4 className="text-white/80 font-display text-xl uppercase tracking-tighter mb-4">Midnight Operations</h4>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/30">
                   <span>Start: 10:45 PM</span>
                   <div className="w-12 h-[1px] bg-white/10" />
                   <span>End: 04:00 AM</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
