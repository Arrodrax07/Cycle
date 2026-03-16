"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();
    const interval = setInterval(checkAuth, 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    router.push('/login');
  };

  const links = [
    { name: 'Our Story', id: 'aboutride' },
    { name: 'Experience', id: 'experience' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Routes', id: 'routesection' },
    { name: 'Reserve', id: 'reserve' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#' + id);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/40 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center border border-neon-cyan/50 rounded-lg group-hover:rotate-[360deg] transition-all duration-1000">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
             </div>
             <span className="font-display text-2xl tracking-premium text-white">ELITE<span className="text-neon-cyan font-black">BMW</span></span>
          </Link>
          
          {/* Desktop Menu - Visible only on LG and above to prevent tablet overflow */}
          <div className="hidden lg:flex lg:space-x-6 xl:space-x-10 items-center">
            {links.map((link) => (
              link.href ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id!)}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-neon-cyan transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan transition-all duration-300 group-hover:w-full" />
                </button>
              )
            ))}
          </div>

          {/* Right Section: User/Login + Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center lg:border-l lg:border-white/10 lg:pl-6 xl:pl-10">
               {user ? (
                 <div className="relative">
                   <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white hover:text-neon-purple transition-all"
                   >
                     <User size={14} className="text-neon-purple" />
                     <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                   </button>
                   
                   <AnimatePresence>
                     {showUserMenu && (
                       <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-48 glass-panel rounded-xl p-2 border border-neon-purple/20 shadow-2xl"
                       >
                         {user.role === 'admin' && (
                           <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 rounded-lg transition-all text-white/80 hover:text-white">
                             <LayoutDashboard size={14} className="text-neon-purple" /> Admin
                           </Link>
                         )}
                         <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 rounded-lg transition-all text-white/80 hover:text-white">
                           <LayoutDashboard size={14} className="text-neon-cyan" /> Bookings
                         </Link>
                         <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 rounded-lg transition-all text-red-400 hover:text-red-300"
                         >
                           <LogOut size={14} /> Logout
                         </button>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               ) : (
                 <Link href="/login" className="btn-premium btn-neon-cyan py-2 px-3 md:px-5 lg:px-6 text-[8px] md:text-[9px] lg:text-[10px] flex items-center gap-2">
                   <span className="hidden xs:inline">Sign In</span>
                   <User size={12} className="xs:hidden" />
                 </Link>
               )}
            </div>

            {/* Mobile Menu Toggle - Visible on everything below LG */}
            <button className="lg:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="font-display text-2xl tracking-premium text-white">ELITE<span className="text-neon-cyan">BMW</span></span>
               <button onClick={() => setIsOpen(false)} className="p-2 text-white"><X size={32} /></button>
            </div>

            <div className="flex flex-col space-y-8">
              {links.map((link, i) => (
                link.href ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-display text-white/50 hover:text-neon-cyan text-left flex items-center justify-between group py-2"
                  >
                    {link.name} <ChevronRight size={24} className="text-white/10 group-hover:text-neon-cyan transition-all" />
                  </Link>
                ) : (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollTo(link.id!)}
                    className="text-4xl font-display text-white/50 hover:text-neon-cyan text-left flex items-center justify-between group py-2"
                  >
                    {link.name} <ChevronRight size={24} className="text-white/10 group-hover:text-neon-cyan transition-all" />
                  </motion.button>
                )
              ))}
              
              <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-white/80">My Bookings</Link>
                    {user.role === 'admin' && <Link href="/admin" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-neon-purple">Admin Panel</Link>}
                    <button onClick={handleLogout} className="text-xl font-bold uppercase tracking-widest text-red-500 text-left">Logout</button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="btn-premium btn-neon-cyan text-center">Login / Register</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

