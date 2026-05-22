"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PetCard from "@/components/PetCard";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchEmail, setMatchEmail] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("https://furever-iusk.onrender.com/api/pets");
        setFeaturedPets(res.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch pets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    toast.success(`🎉 You've joined our VIP Matchmaker list! We'll notify ${matchEmail} when your perfect pet arrives.`, { duration: 5000 });
    setMatchEmail("");
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      <main className="grow relative">
        {/* Hero Section */}
        <section className="relative pb-24 pt-16 lg:pb-32 lg:pt-20">
          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              
              {/* Left Column: Title & Intro */}
              <div className="space-y-8 text-slate-900 dark:text-white">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/40 px-4 py-2 text-sm font-bold text-pink-700 dark:text-pink-300 border border-pink-200/20"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✨ Paw-friendly pets, happy homes
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl font-black leading-tight tracking-tight sm:text-6xl"
                >
                  Find Your <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent italic font-serif">FurEver</span> Friend
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                  Experience the joy of pet adoption. No complications, only pure love. Our platform matches you with the perfect life companion through verified owner listings and secure requests.
                </motion.p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/pets"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35 hover:opacity-95"
                  >
                    Browse Adoptables Now
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white/80 dark:border-pink-500/20 dark:bg-slate-900/80 px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-pink-50/20"
                  >
                    How It Works
                  </Link>
                </div>

                {/* Custom Redesigned Stats container */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4">
                  {[
                    { number: "12k+", desc: "Lives Saved" },
                    { number: "98.4%", desc: "Match Rate" },
                    { number: "24/7", desc: "Support Team" },
                    { number: "50+", desc: "Shelter Partners" },
                  ].map((item, idx) => (
                    <div key={idx} className="glass-panel rounded-2xl px-4 py-3 text-center border border-pink-100/10">
                      <p className="text-xl font-extrabold text-pink-600 dark:text-pink-400">{item.number}</p>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Premium Glowing Stats Display & Featured Pet (No Orange Cat) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="relative overflow-hidden rounded-[40px] glass-panel p-8 shadow-2xl border border-pink-100/10"
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.4),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.3),_transparent_30%)] animate-pulse" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 dark:bg-slate-950/90 p-5 text-white shadow-xl border border-white/10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-400">Elite Paw Score</p>
                      <p className="mt-1.5 text-4xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">9.8 / 10</p>
                    </div>
                    <span className="text-xl font-bold bg-pink-500/20 px-3.5 py-1.5 rounded-2xl border border-pink-500/30 text-pink-300">💖 Match Quality</span>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Happy Tails Ratio", value: "94%" },
                      { label: "Verified Homes", value: "100%" },
                    ].map((stat, idx) => (
                      <div key={idx} className="glass-card rounded-3xl p-4 border border-pink-100/10">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 p-5 text-white shadow-lg shadow-pink-500/20 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-200">Featured companion</p>
                    <p className="mt-2.5 text-xl font-extrabold">Milo the playful pup 🐾</p>
                    <p className="mt-1.5 text-sm text-slate-100/90 font-medium">Loves gentle belly rubs, endless park chases, and cuddly pizza nights.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Section / Meet Your New Soulmate */}
        <section className="py-24 bg-white/30 dark:bg-slate-950/20 backdrop-blur-sm border-y border-pink-100/10 relative">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center space-y-3">
              <span className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase uppercase">Seeking Connection</span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Meet Your New <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent italic font-serif">Soulmate</span></h2>
              <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300 font-medium">Browse through some of our charming companions looking for their forever family.</p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-pink-500" />
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPets.map((pet, index) => (
                  <motion.div
                    key={pet._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <PetCard pet={pet} />
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="mt-16 text-center">
              <Link 
                href="/pets" 
                className="inline-flex items-center gap-2 rounded-full border border-pink-200/50 bg-white/70 hover:bg-pink-50/50 dark:border-pink-500/20 dark:bg-slate-900/80 px-6 py-3 text-sm font-bold text-slate-900 dark:text-white transition-all hover:-translate-y-0.5"
              >
                Explore all adoptable pets
                <span className="text-pink-500">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Matchmaker Action Banner */}
        <section className="py-20 relative">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="glass-panel rounded-[40px] p-8 md:p-12 border border-pink-200/20 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.35),_transparent_35%)]" />
              
              <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center z-10">
                <div className="space-y-4">
                  <span className="inline-block bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase px-3 py-1 rounded-full border border-pink-200/20">
                    🎯 VIP Service
                  </span>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Waiting for someone specific?</h3>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                    Let our intelligent pet matchmaker do the search! Enter your contact details and criteria, and we'll send you instant VIP updates as soon as your perfect match arrives.
                  </p>
                </div>
                
                <form onSubmit={handleMatchSubmit} className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={matchEmail}
                    onChange={(e) => setMatchEmail(e.target.value)}
                    className="flex-grow rounded-full border border-pink-200/60 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-4 py-3.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-400/50"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    Get VIP Match
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Your Path to Pet Parenthood (How it works Redesign) */}
        <section id="how-it-works" className="py-24 bg-white/20 dark:bg-slate-950/10 backdrop-blur-sm border-t border-pink-100/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center space-y-3">
              <span className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase">Step-by-Step</span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Your Path to Pet Parenthood</h2>
              <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300 font-medium">We've refined the adoption process into a modern, stress-free sequence of steps.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  icon: "🔍",
                  title: "Discovery & Match",
                  description: "Explore our collection of adoptable companions. Apply filter combinations to find a friend fitted to your lifestyle.",
                },
                {
                  number: "02",
                  icon: "🤝",
                  title: "The Meet-and-Greet",
                  description: "Schedule a safe pickup or video greeting with the pet's current shelter or verified owner for mutual alignment.",
                },
                {
                  number: "03",
                  icon: "🏡",
                  title: "Lifetime Support",
                  description: "Gain access to vetted veterinary care guides, nutritional checklists, and a community support network.",
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="glass-card rounded-[32px] p-8 border border-pink-100/10 relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-6 text-7xl font-black text-pink-500/5 group-hover:text-pink-500/10 transition-colors duration-300">
                    {step.number}
                  </div>
                  <div className="text-4xl bg-pink-100 dark:bg-pink-950/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-pink-200/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-6 mb-3">{step.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Happy Tails: Redesigned Testimonials */}
        <section className="py-24 relative">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center space-y-3">
              <span className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase">Success Stories</span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Happy Tails 💖</h2>
              <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300 font-medium">Heartwarming updates from real families who found their perfect pet companion.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah Jenkins",
                  story: "After years of wanting a dog, Sarah found Max through PetAdopt. Now they're inseparable adventure buddies exploring hiking trails every weekend!",
                  pet: "Adopted Cooper (Golden Retriever)",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80"
                },
                {
                  name: "James & Whiskers",
                  story: "James adopted Whiskers as a lonely senior cat. Within weeks, Whiskers brought so much joy, comfort, and soothing purrs to his study room.",
                  pet: "Adopted Luna (Black Cat)",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80"
                },
                {
                  name: "The Thompson Family",
                  story: "We adopted siblings Pippin and Muffin. It was the absolute best decision for our kids. Pure laughter and happy tail-wags every single day!",
                  pet: "Adopted Pippin & Teddy",
                  rating: 5,
                  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80"
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card rounded-[32px] p-8 border border-pink-100/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-pink-500">★</span>
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed text-sm">
                      "{testimonial.story}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 border-t border-pink-100/10 pt-5 mt-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border border-pink-200/30"
                    />
                    <div>
                      <p className="font-extrabold text-sm text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-xs font-semibold text-pink-500 mt-0.5">{testimonial.pet}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Care Guides & Resources (expert advise redesign) */}
        <section className="py-24 bg-white/20 dark:bg-slate-950/15 backdrop-blur-sm border-t border-pink-100/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center space-y-3">
              <span className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase">Stewardship</span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Care Guides & Resources</h2>
              <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300 font-medium">Expert advice to help you provide the best possible care for your new companion.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "🏠",
                  title: "Preparing Your Home",
                  tips: ["Create safe cozy zones for new pets", "Pet-proof wires and hide chemicals", "Set up designated feeding bowls", "Provide stimulating enrichment toys"],
                },
                {
                  icon: "🥗",
                  title: "Nutrition & Healthy Diet",
                  tips: ["Select age-appropriate high quality kibble", "Maintain strict portion schedules", "Always provide clean freshwater bowls", "Limit sugary treats to reward good habits"],
                },
                {
                  icon: "🏃",
                  title: "Exercise & Play Routine",
                  tips: ["Daily active walking and running slots", "Keep indoor toys fresh and interactive", "Train basic behaviors with positive rewards", "Establish steady rest and nap routines"],
                },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card rounded-[32px] p-8 border border-pink-100/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-4xl bg-pink-100 dark:bg-pink-950/40 w-14 h-14 rounded-2xl flex items-center justify-center border border-pink-200/20 mb-6">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIdx) => (
                        <li key={tipIdx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
