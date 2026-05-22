"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-2xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/40";

const labelClass =
  "block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-2";

export default function AddPet() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    petName: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    color: "",
    imageURL: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
    ownerPhone: "",
    ownerAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/pets", formData);
      toast.success("Pet added successfully!");
      router.push("/dashboard/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add a Pet for Adoption 🐾</h2>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Fill in your pet&apos;s details to list them for adoption on FurEverFriends.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Pet Name</label>
            <input type="text" name="petName" required value={formData.petName} onChange={handleChange} className={inputClass} placeholder="e.g. Bella, Max..." />
          </div>
          <div>
            <label className={labelClass}>Species</label>
            <select name="species" value={formData.species} onChange={handleChange} className={inputClass}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Breed</label>
            <input type="text" name="breed" required value={formData.breed} onChange={handleChange} className={inputClass} placeholder="e.g. Golden Retriever" />
          </div>
          <div>
            <label className={labelClass}>Color</label>
            <input type="text" name="color" required value={formData.color} onChange={handleChange} className={inputClass} placeholder="e.g. Black, Golden..." />
          </div>
          <div>
            <label className={labelClass}>Age (Years)</label>
            <input type="number" name="age" required min="0" step="0.1" value={formData.age} onChange={handleChange} className={inputClass} placeholder="e.g. 2.5" />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input type="url" name="imageURL" required value={formData.imageURL} onChange={handleChange} className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className={labelClass}>Health Status</label>
            <input type="text" name="healthStatus" required value={formData.healthStatus} onChange={handleChange} className={inputClass} placeholder="e.g. Healthy, special needs..." />
          </div>
          <div>
            <label className={labelClass}>Vaccination Status</label>
            <input type="text" name="vaccinationStatus" required value={formData.vaccinationStatus} onChange={handleChange} className={inputClass} placeholder="e.g. Fully vaccinated" />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className={inputClass} placeholder="e.g. New York, NY" />
          </div>
          <div>
            <label className={labelClass}>Adoption Fee ($)</label>
            <input type="number" name="adoptionFee" required min="0" value={formData.adoptionFee} onChange={handleChange} className={inputClass} placeholder="e.g. 50" />
          </div>
          <div>
            <label className={labelClass}>Owner Phone</label>
            <input type="tel" name="ownerPhone" required value={formData.ownerPhone} onChange={handleChange} className={inputClass} placeholder="+1 555 000 0000" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Owner Address</label>
          <input type="text" name="ownerAddress" required value={formData.ownerAddress} onChange={handleChange} className={inputClass} placeholder="123 Street, City, State..." />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/40"
            placeholder="Tell adopters about your pet's personality, habits, and needs..."
          />
        </div>

        <div>
          <label className={labelClass}>Owner Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full rounded-2xl border border-pink-200/30 bg-pink-50/50 dark:border-pink-500/10 dark:bg-slate-900/40 px-4 py-3 text-sm text-slate-500 dark:text-slate-500 cursor-not-allowed"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? "Saving Pet..." : "Add Pet for Adoption ✨"}
          </button>
        </div>
      </form>
    </div>
  );
}
