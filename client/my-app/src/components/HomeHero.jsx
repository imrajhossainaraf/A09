"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHero({ user }) {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      <div className="relative max-w-7xl mx-auto px-6 hero-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 px-4 py-2 text-sm font-bold border border-pink-200/25">
              ✨ Welcome to the Premier Rescue Network
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Find Your <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent italic font-serif">FurEver</span> Friend
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 max-w-xl text-lg leading-relaxed">
              Experience the joy of pet adoption. No complications, only pure love. Our platform matches you with the perfect life companion through trusted verified shelters.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {user ? (
                <Link 
                  href="/dashboard/my-listings" 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/pets" 
                    className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 dark:border-pink-500/20 dark:bg-slate-900/80 px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-pink-50/30"
                  >
                    Browse Pets
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-bold pt-2">
              <span className="friendly-badge px-3 py-2 rounded-xl border">🤝 Trusted Community</span>
              <span className="friendly-badge px-3 py-2 rounded-xl border">🔒 Verified Profiles</span>
              <span className="friendly-badge px-3 py-2 rounded-xl border">💖 Secure by Design</span>
            </div>
          </div>

          <div className="relative">
            {/* Elegant glass stats and features card grid */}
            <div className="glass-panel p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.35),_transparent_40%)]" />
              
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 z-10">
                <div className="glass-card rounded-3xl p-5 border border-pink-100/10">
                  <span className="text-3xl">🔍</span>
                  <h4 className="font-extrabold mt-3 text-slate-800 dark:text-slate-200">Smart Search</h4>
                  <p className="text-xs font-medium mt-1 text-slate-500 dark:text-slate-400">Filter pets by breed, age, size, and location easily.</p>
                </div>
                
                <div className="glass-card rounded-3xl p-5 border border-pink-100/10">
                  <span className="text-3xl">🛡️</span>
                  <h4 className="font-extrabold mt-3 text-slate-800 dark:text-slate-200">Secure Profiles</h4>
                  <p className="text-xs font-medium mt-1 text-slate-500 dark:text-slate-400">Verified owners and shelters ensure safer adoptions.</p>
                </div>
                
                <div className="glass-card rounded-3xl p-5 border border-pink-100/10">
                  <span className="text-3xl">💬</span>
                  <h4 className="font-extrabold mt-3 text-slate-800 dark:text-slate-200">Easy Messaging</h4>
                  <p className="text-xs font-medium mt-1 text-slate-500 dark:text-slate-400">Connect with adopters and coordinate meet-ups seamlessly.</p>
                </div>
                
                <div className="glass-card rounded-3xl p-5 border border-pink-100/10">
                  <span className="text-3xl">💝</span>
                  <h4 className="font-extrabold mt-3 text-slate-800 dark:text-slate-200">24/7 Support</h4>
                  <p className="text-xs font-medium mt-1 text-slate-500 dark:text-slate-400">Compassionate community guides at every step of adoption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
