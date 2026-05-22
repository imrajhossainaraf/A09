"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PetCard from "@/components/PetCard";
import { motion } from "framer-motion";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest Listed" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "age_asc", label: "Age: Youngest First" },
];

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      let url = "https://furever-iusk.onrender.com/api/pets?";
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (species) url += `species=${encodeURIComponent(species)}`;

      const res = await axios.get(url);
      setPets(res.data);
    } catch (err) {
      console.error("Failed to fetch pets", err);
    } finally {
      setLoading(false);
    }
  }, [search, species]);

  useEffect(() => {
    setTimeout(() => {
      fetchPets();
    }, 0);
  }, [fetchPets]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const sortedPets = useMemo(() => {
    const copy = [...pets];
    switch (sortBy) {
      case "price_asc":
        return copy.sort((a, b) => (a.adoptionFee ?? 0) - (b.adoptionFee ?? 0));
      case "price_desc":
        return copy.sort((a, b) => (b.adoptionFee ?? 0) - (a.adoptionFee ?? 0));
      case "age_asc":
        return copy.sort((a, b) => (a.age ?? 0) - (b.age ?? 0));
      case "newest":
      default:
        return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [pets, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow py-16 relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Card */}
          <div className="mb-10 rounded-[40px] glass-panel p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.3),_transparent_35%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Explore All Pets</h1>
                <p className="mt-4 max-w-xl text-base font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                  Find the perfect companion with expressive search and playful filters built for true pet lovers.
                </p>
              </div>
              <div className="rounded-[32px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 p-6 text-white shadow-lg shadow-pink-500/20 border border-white/10">
                <p className="text-xs font-black uppercase tracking-[0.2em]">Adopt joy</p>
                <p className="mt-3 text-2xl font-extrabold leading-tight">Meet your next best friend today. 🐾</p>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <div className="mb-10 rounded-[32px] glass-panel p-6 md:p-8 shadow-lg border border-pink-100/10">
            <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2.5 px-1">Search by name</label>
                <input
                  type="text"
                  placeholder="Bella, Milo, Pumpkin..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2.5 px-1">Filter by species</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full rounded-full border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 appearance-none cursor-pointer"
                >
                  <option value="">All Species</option>
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                  <option value="Bird">Birds</option>
                  <option value="Rabbit">Rabbits</option>
                  <option value="Other">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2.5 px-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-full border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50 appearance-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-pink-500/20 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35 hover:opacity-95"
              >
                Search Pets
              </button>
            </form>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-pink-500" />
            </div>
          ) : sortedPets.length > 0 ? (
            <>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 px-1">
                Showing <span className="text-pink-500">{sortedPets.length}</span> pets
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {sortedPets.map((pet, index) => (
                  <motion.div
                    key={pet._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <PetCard pet={pet} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-[36px] border border-dashed border-pink-200/30 bg-white/40 dark:bg-slate-900/40 p-16 text-center text-slate-600 dark:text-slate-300 shadow-sm">
              <p className="text-xl font-bold">No pets found yet.</p>
              <p className="mt-3 text-sm font-medium text-slate-500">Try updating your search query or choosing another species.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
