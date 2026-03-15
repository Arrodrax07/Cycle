"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, ChevronRight } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Identity Created");
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-obsidian py-20 px-4">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg p-12 glass-panel rounded-[2.5rem] border-white/5 relative z-10 bg-black/40"
      >
        <div className="text-center mb-12">
          <Link href="/" className="font-display font-bold text-4xl tracking-tighter inline-block mb-10 group">
            <span className="text-white">ELITE</span><span className="text-neon-purple group-hover:text-neon-cyan transition-colors">BMW</span>
          </Link>
          <h2 className="text-3xl font-display text-white mb-3">Join the Elite</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/30">Initialize Operator Credentials</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="text" required
                  value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-purple transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Terminal</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="email" required
                  value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-purple transition-all text-sm"
                  placeholder="operator@elite.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Phone Comms</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="tel" required
                  value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-purple transition-all text-sm"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                <input 
                  type="password" required minLength={6}
                  value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
                  className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-purple transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-5 btn-premium btn-neon-purple justify-center flex items-center gap-3 mt-4 group text-white"
          >
            {loading ? "INITIALIZING..." : "Confirm Deployment"}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-[10px] uppercase tracking-widest text-white/20 mb-4">
            Existing operator?
           </p>
           <Link href="/login" className="text-white text-[11px] font-bold uppercase tracking-widest hover:text-neon-purple transition-colors">
            Terminate to Login
           </Link>
        </div>

      </motion.div>
    </div>
  );
}
