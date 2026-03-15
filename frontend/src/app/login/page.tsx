"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Identity Verified");
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-obsidian">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-12 glass-panel rounded-[2.5rem] border-white/5 relative z-10 mx-4 bg-black/40"
      >
        <div className="text-center mb-12">
          <Link href="/" className="font-display font-bold text-4xl tracking-tighter inline-block mb-10 group">
            <span className="text-white">ELITE</span><span className="text-neon-cyan group-hover:text-neon-purple transition-colors">BMW</span>
          </Link>
          <h2 className="text-3xl font-display text-white mb-3">Welcome Back</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/30">Secure Terminal Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Protocol</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-cyan transition-colors" />
              <input 
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-cyan transition-all text-sm"
                placeholder="operator@elite-bmw.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-cyan transition-colors" />
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-white/5 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:neon-border-cyan transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-5 btn-premium btn-neon-cyan justify-center flex items-center gap-3 mt-4 group"
          >
            {loading ? "VERIFYING..." : "Request Access"}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-[10px] uppercase tracking-widest text-white/20 mb-4">
            Unauthorized override?
           </p>
           <Link href="/register" className="text-white text-[11px] font-bold uppercase tracking-widest hover:text-neon-cyan transition-colors">
            Create Access Identity
           </Link>
        </div>

      </motion.div>
    </div>
  );
}
