"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Users, AlertTriangle, CalendarCheck, CheckCircle2, LayoutDashboard, LogOut, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!token || user.role !== 'admin') {
        toast.error("Unauthorized terminal access");
        return router.push('/login');
      }

      try {
        const [statsRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/api/admin/bookings`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setData(statsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        toast.error("Failed to fetch operational data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const cancelBooking = async (id: string) => {
    if (!confirm("Confirm mission abort for this booking?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/admin/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Booking Deprioritized");

      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'Cancelled' } : b));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Initializing Command Center</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/5 pb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">System Operational</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-white">COMMAND <span className="text-neon-purple">CENTER</span></h1>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="px-6 py-3 glass-panel border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:neon-border-cyan transition-all flex items-center gap-2">
              <Globe size={14} /> Website
            </Link>
            <button onClick={logout} className="px-6 py-3 glass-panel border-white/5 text-[10px] font-bold uppercase tracking-widest text-neon-purple hover:bg-neon-purple hover:text-white transition-all flex items-center gap-2">
              <LogOut size={14} /> Terminate
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-10 glass-panel rounded-[2rem] border-white/5 group hover:neon-border-cyan transition-all">
            <Users className="w-8 h-8 text-neon-cyan mb-6 group-hover:scale-110 transition-transform" />
            <p className="text-white/30 text-[9px] font-bold tracking-widest uppercase mb-2">Total Operators</p>
            <p className="text-5xl font-display text-white">{data?.totalRiders || 0}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-10 glass-panel rounded-[2rem] border-white/5 group hover:neon-border-purple transition-all">
            <CalendarCheck className="w-8 h-8 text-neon-purple mb-6 group-hover:scale-110 transition-transform" />
            <p className="text-white/30 text-[9px] font-bold tracking-widest uppercase mb-2">Active Orders</p>
            <p className="text-5xl font-display text-white">{data?.upcomingRides || 0}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="p-10 glass-panel rounded-[2rem] border-white/5">
            <div className="flex items-center justify-between mb-8">
              <CheckCircle2 className="w-8 h-8 text-white/20" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Inventory Status</span>
            </div>
            <div className="space-y-4 max-h-32 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
              {data?.slotsAvailability?.map((s: any) => (
                <div key={s._id} className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 uppercase tracking-wider">
                  <span className="text-white/40">{s.date} <span className="text-neon-cyan/60">({s.slot})</span></span>
                  <span className="font-bold text-white/80">{s.totalSlots - s.bookedSlots}/{s.totalSlots}</span>
                </div>
              ))}
              {!data?.slotsAvailability?.length && <p className="text-white/20 text-[10px] uppercase tracking-widest mt-2">No data logs found.</p>}
            </div>
          </motion.div>
        </div>

        {/* Bookings Table */}
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 ml-4">Master Operations Log</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-[2.5rem] border-white/5 overflow-hidden bg-black/40"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-8 text-[9px] font-bold text-white/20 tracking-widest uppercase">Identity/Ref</th>
                  <th className="p-8 text-[9px] font-bold text-white/20 tracking-widest uppercase">Operator Details</th>
                  <th className="p-8 text-[9px] font-bold text-white/20 tracking-widest uppercase">Package Info</th>
                  <th className="p-8 text-[9px] font-bold text-white/20 tracking-widest uppercase">Status</th>
                  <th className="p-8 text-[9px] font-bold text-white/20 tracking-widest uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-8">
                      <p className="font-display text-white text-lg group-hover:text-neon-cyan transition-colors">{b.ticketId}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{b.rideDate}</p>
                    </td>
                    <td className="p-8">
                      <p className="font-bold text-white/70 text-sm mb-1">{b.userId?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-white/40 lowercase tracking-tight">{b.userId?.email || '-'}</p>
                    </td>
                    <td className="p-8">
                      <p className="text-sm text-white/60 mb-1 font-bold">{b.slot}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{b.participants} Units</p>
                    </td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full inline-block ${b.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-8">
                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="p-3 glass-panel border-white/5 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-xl"
                          title="Abort mission"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-24 text-center">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">Empty Database Log</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
