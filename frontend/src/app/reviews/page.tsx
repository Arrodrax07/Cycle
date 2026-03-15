"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, Calendar } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

interface Review {
  _id: string;
  user: { name: string, email?: string };
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [serverVersion, setServerVersion] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === 'admin');
      } catch (e) {
        console.error("Token parsing error", e);
      }
    }
    checkServerConnection();
    fetchReviews();
  }, []);

  const checkServerConnection = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/health`);
      setServerVersion(data.version);
    } catch (err) {
      setServerVersion('OFFLINE');
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const url = isAdmin && token ? `${API_URL}/api/reviews/admin` : `${API_URL}/api/reviews`;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(url, { headers });
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (id: string, action: 'approve' | 'delete') => {
    const token = localStorage.getItem('token');
    try {
      if (action === 'approve') {
        await axios.patch(`${API_URL}/api/reviews/admin/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Review approved!");
      } else {
        await axios.delete(`${API_URL}/api/reviews/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Review deleted!");
      }
      fetchReviews();
    } catch (err) {
      toast.error("Moderation action failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/reviews`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Review submitted for moderation!");
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-neon-cyan font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Community Feedback</span>
            <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter">
              MISSION <br />
              <span className="text-neon-cyan">DEBRIEFINGS</span>
            </h1>
          </div>

          <div className={`px-6 py-2 rounded-full border text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 ${serverVersion === '1.2.0' || serverVersion === '1.3.0' ? 'border-neon-cyan/30 text-neon-cyan' : 'border-red-500/30 text-red-500'}`}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${serverVersion?.includes('1') ? 'bg-neon-cyan' : 'bg-red-500'}`} />
            API STATUS: {serverVersion || 'CONNECTING...'}
            {serverVersion === 'OFFLINE' && <span className="text-white/40 font-normal"> (RESTART SERVER)</span>}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Submit Review Form */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-[2rem] border-white/5 sticky top-32">
              <h2 className="text-2xl font-display mb-8 uppercase tracking-tight">LOG YOUR EXPERIENCE</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`hover:scale-110 transition-transform ${rating >= star ? 'text-neon-cyan' : 'text-white/10'}`}
                      >
                        <Star fill={rating >= star ? "currentColor" : "none"} size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your thoughts on the midnight deployment..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[150px] focus:border-neon-cyan outline-none transition-colors text-sm uppercase tracking-tight"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-premium btn-neon-cyan py-4 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em]"
                >
                  {loading && !comment ? "TRANSMITTING..." : "SUBMIT DEBRIEF"}
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-8">
            {isAdmin && (
              <div className="mb-12 p-6 rounded-3xl bg-neon-cyan/10 border border-neon-cyan/20">
                <h3 className="text-neon-cyan font-display text-sm tracking-widest uppercase flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                  Admin Moderation Mode Active
                </h3>
                <p className="text-[10px] text-white/40 uppercase mt-2 tracking-widest">Showing all logs (Pending & Approved)</p>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem]">
                <p className="text-white/30 uppercase text-xs tracking-widest">Initial logs being processed...</p>
              </div>
            ) : (
              reviews.map((review: any) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={review._id}
                  className={`glass-panel p-8 rounded-[2rem] border-white/5 group hover:neon-border-cyan transition-all duration-500 ${review.status === 'Pending' ? 'bg-white/[0.02]' : ''}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                        <User size={20} className="text-neon-cyan" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <h3 className="font-display uppercase tracking-tight truncate">{review.user?.name}</h3>
                          {isAdmin && review.user?.email && (
                            <span className="text-[9px] text-neon-cyan/60 uppercase tracking-widest border border-neon-cyan/20 px-3 py-1 rounded-full whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-none">
                              {review.user.email}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={i < review.rating ? "text-neon-cyan" : "text-white/10"}
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
                        <Calendar size={12} />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                      {isAdmin && (
                        <div className={`text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${review.status === 'Approved' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                          {review.status}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-white/60 text-lg font-light leading-relaxed uppercase tracking-tight italic mb-8">
                    "{review.comment}"
                  </p>

                  {isAdmin && (
                    <div className="pt-6 border-t border-white/5 flex gap-4">
                      {review.status === 'Pending' && (
                        <button
                          onClick={() => handleModerate(review._id, 'approve')}
                          className="px-6 py-2 rounded-xl bg-neon-cyan text-black text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                          Approve Debrief
                        </button>
                      )}
                      <button
                        onClick={() => handleModerate(review._id, 'delete')}
                        className="px-6 py-2 rounded-xl border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
                      >
                        Delete Log
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
