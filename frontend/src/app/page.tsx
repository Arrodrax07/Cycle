"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutRide from "@/components/AboutRide";
import BikeCollection from "@/components/BikeCollection";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import RouteSection from "@/components/RouteSection";
import BookingSection from "@/components/BookingSection";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div suppressHydrationWarning className="min-h-screen bg-[#050505]" />;
  }

  return (
    <main suppressHydrationWarning className="relative min-h-screen bg-transparent">
      {/* 
          SPATIAL 3D ENGINE 
          The Hero component now acts as the persistent 3D background 
      */}
      <div className="fixed inset-0 z-0">
        <div className="vignette-bg" />
        <Hero />
      </div>

      <Navbar />
      
      {/* 
          CONTENT LAYERS 
          Sections are transparent to allow the 3D background to show through.
          Pointer events are managed in globals.css (.content-layer)
      */}
      <div suppressHydrationWarning className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Landing Text is handled inside Hero component or as an overlay */}
        <div suppressHydrationWarning className="h-[100vh]" /> {/* Spacer for Hero Landing */}
        
        <div className="content-layer">
          <AboutRide />
          <BikeCollection />
          <Experience />
          <Gallery />
          <RouteSection />
          <BookingSection />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
