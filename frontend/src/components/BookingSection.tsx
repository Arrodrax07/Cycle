"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ChevronRight, Users } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BookingSection() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<any>({
    defaultValues: { name: '', email: '', phone: '', slot: '10:45 PM Night Ride', participants: 1, rideDate: new Date().toISOString().split('T')[0] }
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const participants = watch('participants');
  const totalPrice = participants * 599;

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/bookings`, data);
      toast.success("Spot secured. Intelligence report sent to email.");
    } catch (err) {
      toast.error("Deployment failed. System breach.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="relative py-48 md:py-64 bg-transparent overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="tracking-premium text-[10px] text-white/40 uppercase mb-8 block">Ride Registration</span>
              <h2 className="text-6xl md:text-9xl font-display leading-[0.85] uppercase text-white">
                SECURE <br/>
                <span className="text-neon-cyan">YOUR SPOT</span>
              </h2>
            </div>
            
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-lg uppercase tracking-tight">
               Exclusive limited access. Experience Mumbai like never before with an elite group of night riders.
            </p>

            <div className="space-y-8 glass-panel p-10 border-white/5 bg-gradient-to-br from-neon-cyan/5 to-transparent">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Availability</span>
                  <span className="text-neon-cyan font-display text-xl">50 SLOTS MAX</span>
               </div>
               <div className="w-full h-[2px] bg-white/5 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                  />
               </div>
               <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">65% Secured for next Friday</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 glass-panel rounded-[3rem] neon-border-cyan border-white/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <input 
                  placeholder="FULL NAME"
                  {...register("name")}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-neon-cyan transition-colors outline-none text-white font-display text-lg tracking-wider"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <input 
                     placeholder="EMAIL"
                     {...register("email")}
                     className="w-full bg-transparent border-b border-white/10 py-4 focus:border-neon-cyan transition-colors outline-none text-white font-display text-lg tracking-wider"
                   />
                   <input 
                     placeholder="PHONE"
                     {...register("phone")}
                     className="w-full bg-transparent border-b border-white/10 py-4 focus:border-neon-cyan transition-colors outline-none text-white font-display text-lg tracking-wider"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <input 
                     type="date"
                     {...register("rideDate")}
                     className="w-full bg-transparent border-b border-white/10 py-4 focus:border-neon-cyan transition-colors outline-none text-white font-display text-lg uppercase"
                   />
                   <select 
                     {...register("slot")}
                     className="w-full bg-transparent border-b border-white/10 py-4 focus:border-neon-cyan transition-colors outline-none text-white font-display text-lg uppercase cursor-pointer appearance-none"
                   >
                     <option value="10:45 PM Night Ride" className="bg-black">10:45 PM Ride</option>
                   </select>
                </div>

                <div className="pt-6">
                   <label className="text-[10px] text-white/30 tracking-widest uppercase mb-4 block">No. of Participants</label>
                   <input 
                     type="number"
                     min="1" max="10"
                     {...register("participants", { valueAsNumber: true })}
                     className="w-24 bg-transparent border-b border-white/10 py-2 focus:border-neon-cyan transition-colors outline-none text-4xl font-display text-white"
                   />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                 <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block mb-2">Registration Fee</span>
                    <span className="text-5xl font-display text-white tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                 </div>
                 <Users className="text-neon-cyan/20 w-12 h-12" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-premium btn-neon-cyan w-full py-8 text-[10px] tracking-[0.3em] justify-center flex items-center gap-3 group"
              >
                {loading ? "INITIALIZING..." : "REGISTER NOW"}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
