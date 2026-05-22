"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PetDetails() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ pickupDate: "", message: "" });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        toast.error("Failed to fetch pet details");
        router.push("/pets");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPet();
    }
  }, [id, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email === pet.ownerEmail) {
      return toast.error("You cannot adopt your own pet!");
    }
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/requests", {
        petId: pet._id,
        petName: pet.petName,
        ownerEmail: pet.ownerEmail,
        pickupDate: formData.pickupDate,
        message: formData.message,
      });
      toast.success("Adoption request submitted successfully!");
      router.push("/dashboard/my-requests");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-4 text-center z-10">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-pink-500" />
            <p className="text-slate-700 dark:text-slate-200 font-bold">Loading pet profile details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow py-12 relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* Title Header Block */}
          <div className="mb-10 rounded-[40px] glass-panel p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.3),_transparent_35%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-600 dark:text-pink-400">Pet Profile Info</p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">{pet.petName}</h1>
              </div>
              <div className="inline-flex items-center rounded-full bg-pink-100 px-5 py-3 text-sm font-extrabold text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200/20">
                🐾 {pet.status} to adopt
              </div>
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[1.3fr_0.9fr]">
            <div className="space-y-8">
              
              {/* Pet Image Frame */}
              <div className="overflow-hidden rounded-[36px] border border-pink-200/20 bg-white/50 dark:bg-slate-950/50 shadow-2xl relative p-3">
                <img src={pet.imageURL} alt={pet.petName} className="h-[450px] w-full object-cover rounded-[28px]" />
              </div>

              {/* Pet Details Panel */}
              <div className="rounded-[36px] glass-panel p-8 shadow-lg border border-pink-100/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.3),_transparent_40%)]" />
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{pet.petName}</h2>
                    <p className="text-base font-semibold text-slate-500 dark:text-slate-400">{pet.breed} - {pet.species}</p>
                  </div>
                  
                  {/* Grid of Key Info badges */}
                  <div className="grid gap-3 grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-2">
                    {[
                      { label: "Age", value: `${pet.age} yrs` },
                      { label: "Gender", value: pet.gender },
                      { label: "Color", value: pet.color },
                      { label: "Fee", value: `$${pet.adoptionFee}` },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl bg-pink-50/50 p-4 text-slate-700 dark:bg-pink-950/30 dark:text-slate-200 border border-pink-100/10 text-center min-w-[90px]">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-500">{item.label}</p>
                        <p className="mt-1.5 text-base font-extrabold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl bg-white/40 dark:bg-slate-950/40 p-6 border border-pink-100/5">
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Who is {pet.petName}?</h3>
                    <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{pet.description}</p>
                  </div>
                  <div className="rounded-3xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 p-6 text-white shadow-lg border border-white/10">
                    <h3 className="text-lg font-extrabold mb-2">Paw Personality 🐾</h3>
                    <p className="text-sm leading-relaxed font-semibold opacity-95">Loves gentle indoor play, cosy sunny naps, and making instant friends - absolutely wonderful for a loving, warm home.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request & Form Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-[36px] glass-panel p-8 shadow-2xl border border-pink-100/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.3),_transparent_35%)]" />
                <div className="relative">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Adoption Request Form</h2>
                  <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                    Complete the details below to submit your adoption request and start Milo's beautiful adoption journey.
                  </p>

                  {pet.status === "Adopted" ? (
                    <div className="mt-6 rounded-3xl bg-rose-50/80 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/30 p-4 text-center font-bold text-rose-700 dark:text-rose-300">
                      🎉 This lovely friend has already found a warm, welcoming home!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2 px-1">Pickup date</label>
                        <input
                          type="date"
                          required
                          value={formData.pickupDate}
                          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                          className="w-full rounded-full border border-pink-200/50 bg-white/95 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-400/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2 px-1">Message</label>
                        <textarea
                          required
                          rows="4"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us why you would be a great owner..."
                          className="w-full rounded-[24px] border border-pink-200/50 bg-white/95 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-400/50"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-4 text-white font-extrabold shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5"
                      >
                        {submitting ? "Submitting Request..." : "Adopt Now"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Owner Contacts Grid */}
              <div className="rounded-[36px] glass-panel p-6 shadow-md border border-pink-100/10 relative overflow-hidden">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Owner Contact Details</h3>
                <div className="space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <p>📧 Email: <span className="text-pink-600 dark:text-pink-400">{pet.ownerEmail}</span></p>
                  <p>📞 Phone: <span className="text-pink-600 dark:text-pink-400">{pet.ownerPhone}</span></p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
