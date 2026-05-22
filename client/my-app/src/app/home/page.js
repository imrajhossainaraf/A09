"use client";

import Navbar from "@/components/navbar";
import HomeHero from "@/components/HomeHero";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-t-pink-500 border-r-transparent border-slate-300 rounded-full animate-spin mx-auto" />
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="w-full">
        <HomeHero user={user} />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-6">Why PetAdopt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card rounded-xl p-6">
              <h3 className="font-semibold">Curated Listings</h3>
              <p className="text-sm text-slate-600">Quality-first adoption posts with clear photos and health summaries.</p>
            </div>
            <div className="feature-card rounded-xl p-6">
              <h3 className="font-semibold">Verified Care</h3>
              <p className="text-sm text-slate-600">We verify shelters and foster profiles for safer adoptions.</p>
            </div>
            <div className="feature-card rounded-xl p-6">
              <h3 className="font-semibold">Community First</h3>
              <p className="text-sm text-slate-600">Trusted community moderation and adoption guides.</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div>
              <p className="font-semibold">PetAdopt</p>
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} PetAdopt. All rights reserved.</p>
            </div>
            <div className="text-sm text-slate-500">Built with ❤️ for animals</div>
          </div>
        </footer>
      </main>
    </div>
  );
}