"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Ticket, MapPin, Clock, Calendar, QrCode, XCircle } from 'lucide-react';

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      try {
        const res = await axios.get(`${API_URL}/api/bookings/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [router]);

  const cancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Booking cancelled successfully");
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'Cancelled' } : b));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-16 border-b border-gray-800 pb-8">
          <div>
            <Link href="/" className="font-display font-bold text-2xl tracking-tighter mb-4 inline-block">
              <span className="text-white">Elite</span><span className="text-neon-blue">BMW</span>
            </Link>
            <h1 className="text-4xl font-black font-display text-white">Your <span className="text-neon-green">Dashboard</span></h1>
          </div>
          <button onClick={logout} className="px-6 py-2 border border-gray-700 text-gray-400 hover:text-white hover:border-white rounded-full transition-colors">
            Logout
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Bookings Found</h2>
            <p className="text-gray-400 mb-8">You haven't booked any rides yet.</p>
            <Link href="/#booking" className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:bg-white transition-colors">
              Book a Ride
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={booking._id} 
                className={`p-1 glass rounded-3xl ${booking.status === 'Cancelled' ? 'opacity-60 grayscale' : 'shadow-[0_0_30px_rgba(0,243,255,0.1)]'}`}
              >
                <div className="bg-dark-900 rounded-[22px] p-8 h-full border border-gray-800 relative overflow-hidden">
                  
                  {/* Status Badge */}
                  <div className={`absolute top-0 right-0 px-6 py-2 text-sm font-bold rounded-bl-2xl ${booking.status === 'Cancelled' ? 'bg-red-500/20 text-red-500' : 'bg-neon-green/20 text-neon-green'}`}>
                    {booking.status}
                  </div>

                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-gray-400 text-sm font-bold tracking-widest mb-1">TICKET ID</h3>
                      <p className="text-xl font-display font-bold text-white tracking-widest">{booking.ticketId}</p>
                    </div>
                    <QrCode className="w-12 h-12 text-neon-blue" />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex gap-3">
                      <Calendar className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                        <p className="font-bold">{booking.rideDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Slot / Reporting</p>
                        <p className="font-bold">{booking.slot} / 10:15 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Meeting Point</p>
                        <p className="font-bold text-sm">Central Plaza Cinema</p>
                        <a href="https://maps.app.goo.gl/yQQHSBSZfFxGKzHa8" target="_blank" className="text-neon-blue text-xs hover:underline block mt-1">Google Maps</a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Ticket className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Participants</p>
                        <p className="font-bold">{booking.participants}</p>
                      </div>
                    </div>
                  </div>

                  {booking.status !== 'Cancelled' && (
                    <div className="flex gap-4 pt-6 border-t border-gray-800">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 py-3 bg-neon-blue/10 text-neon-blue font-bold rounded-xl hover:bg-neon-blue hover:text-black transition-colors"
                      >
                        Download PDF
                      </button>
                      <button 
                        onClick={() => cancelBooking(booking._id)}
                        className="flex-1 py-3 bg-red-500/10 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <XCircle className="w-5 h-5" /> Cancel
                      </button>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
