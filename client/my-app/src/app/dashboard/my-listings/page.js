"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const statusStyles = {
  Adopted: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const reqStatusStyles = {
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function MyListings() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetRequests, setSelectedPetRequests] = useState(null);
  const [requestsModalOpen, setRequestsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
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

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/owner/pets");
      setPets(res.data);
    } catch (err) {
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => { fetchPets(); }, 0);
  }, []);

  const handleOpenEdit = (pet) => {
    setSelectedPet(pet);
    setEditFormData({
      petName: pet.petName || "",
      species: pet.species || "Dog",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "Male",
      color: pet.color || "",
      imageURL: pet.imageURL || "",
      healthStatus: pet.healthStatus || "",
      vaccinationStatus: pet.vaccinationStatus || "",
      location: pet.location || "",
      adoptionFee: pet.adoptionFee || "",
      description: pet.description || "",
      ownerPhone: pet.ownerPhone || "",
      ownerAddress: pet.ownerAddress || "",
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/pets/${selectedPet._id}`, editFormData);
      toast.success("Pet updated successfully!");
      setEditModalOpen(false);
      fetchPets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pet");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
      toast.success("Pet deleted successfully");
      fetchPets();
    } catch (err) {
      toast.error("Failed to delete pet");
    }
  };

  const handleOpenRequests = async (petId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/owner");
      const petRequests = res.data.filter((req) => req.petId === petId);
      setSelectedPetRequests(petRequests);
      setRequestsModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch requests");
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, { status });
      toast.success(`Request ${status} successfully`);
      setRequestsModalOpen(false);
      fetchPets();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const totalListings = pets.length;
  const available = pets.filter((p) => p.status === "Available").length;
  const adopted = pets.filter((p) => p.status === "Adopted").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">My Listings 🐾</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Manage all the pets you&apos;ve listed for adoption.
          </p>
        </div>
        <Link
          href="/dashboard/add-pet"
          className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-md shadow-pink-500/20 hover:-translate-y-0.5 transition-all hidden sm:flex items-center gap-2"
        >
          <span>➕</span> Add Pet
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Listings", value: totalListings, icon: "🐾", color: "from-pink-500/10 to-fuchsia-500/5 border-pink-200/30 dark:border-pink-500/15", textColor: "text-pink-600 dark:text-pink-400" },
          { label: "Available", value: available, icon: "✅", color: "from-emerald-500/10 to-teal-500/5 border-emerald-200/30 dark:border-emerald-500/15", textColor: "text-emerald-600 dark:text-emerald-400" },
          { label: "Adopted", value: adopted, icon: "💝", color: "from-violet-500/10 to-purple-500/5 border-violet-200/30 dark:border-violet-500/15", textColor: "text-violet-600 dark:text-violet-400" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl bg-gradient-to-br ${stat.color} border p-4`}>
            <div className="text-xl mb-1">{stat.icon}</div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className={`text-2xl font-black mt-0.5 ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-transparent border-t-pink-500" />
          <p className="text-sm font-bold text-slate-500">Loading your listings...</p>
        </div>
      ) : pets.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-pink-200/20 dark:border-pink-500/10">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-pink-50/60 dark:bg-pink-950/20 text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400">
                <th className="px-5 py-4">Pet</th>
                <th className="px-5 py-4">Fee</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100/40 dark:divide-pink-500/10">
              {pets.map((pet) => (
                <tr key={pet._id} className="hover:bg-pink-50/30 dark:hover:bg-pink-950/10 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pet.imageURL}
                        alt={pet.petName}
                        className="w-11 h-11 rounded-xl object-cover border-2 border-pink-200/30"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm">{pet.petName}</p>
                        <p className="text-xs font-semibold text-slate-400">{pet.species} · {pet.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                    ${pet.adoptionFee}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-black px-3 py-1.5 rounded-full ${statusStyles[pet.status] || statusStyles.Available}`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleOpenRequests(pet._id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50 transition-colors"
                      >
                        Requests
                      </button>
                      <button
                        onClick={() => handleOpenEdit(pet)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/pet/${pet._id}`}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(pet._id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No listings yet</h3>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
            You haven&apos;t listed any pets yet. Add your first pet today and help them find a loving home!
          </p>
          <Link
            href="/dashboard/add-pet"
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 hover:-translate-y-0.5 transition-all"
          >
            Add Your First Pet
          </Link>
        </div>
      )}

      {/* Requests Modal */}
      {requestsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel rounded-[32px] p-6 max-w-lg w-full shadow-2xl border border-pink-200/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.4),_transparent_50%)] pointer-events-none" />
            <div className="relative">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Adoption Requests</h3>
                <button
                  onClick={() => setRequestsModalOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {selectedPetRequests && selectedPetRequests.length > 0 ? (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {selectedPetRequests.map((req) => (
                    <div key={req._id} className="p-4 rounded-2xl bg-pink-50/60 dark:bg-slate-900/60 border border-pink-100/50 dark:border-pink-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-extrabold text-sm text-slate-900 dark:text-white">{req.requesterName}</p>
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${reqStatusStyles[req.status] || reqStatusStyles.pending}`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{req.requesterEmail}</p>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        📅 Pickup: {new Date(req.pickupDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      {req.message && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2 border-l-2 border-pink-300 pl-2">
                          &quot;{req.message}&quot;
                        </p>
                      )}
                      {req.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleUpdateStatus(req._id, "approved")}
                            className="flex-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-xs font-extrabold transition-colors shadow-sm"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req._id, "rejected")}
                            className="flex-1 rounded-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xs font-extrabold transition-colors shadow-sm"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="font-bold text-slate-500 dark:text-slate-400">No requests for this pet yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-panel rounded-[32px] p-6 max-w-2xl w-full shadow-2xl border border-pink-200/20 relative my-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.4),_transparent_50%)] pointer-events-none" />
            <div className="relative">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Update Pet Listing 🐾</h3>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Pet Name</label>
                    <input type="text" name="petName" required value={editFormData.petName} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Species</label>
                    <select name="species" value={editFormData.species} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500">
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Breed</label>
                    <input type="text" name="breed" required value={editFormData.breed} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Color</label>
                    <input type="text" name="color" required value={editFormData.color} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Age (Years)</label>
                    <input type="number" name="age" required min="0" step="0.1" value={editFormData.age} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Gender</label>
                    <select name="gender" value={editFormData.gender} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Image URL</label>
                    <input type="url" name="imageURL" required value={editFormData.imageURL} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Health Status</label>
                    <input type="text" name="healthStatus" required value={editFormData.healthStatus} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Vaccination Status</label>
                    <input type="text" name="vaccinationStatus" required value={editFormData.vaccinationStatus} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Location</label>
                    <input type="text" name="location" required value={editFormData.location} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Adoption Fee ($)</label>
                    <input type="number" name="adoptionFee" required min="0" value={editFormData.adoptionFee} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Owner Phone</label>
                    <input type="tel" name="ownerPhone" required value={editFormData.ownerPhone} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Owner Address</label>
                  <input type="text" name="ownerAddress" required value={editFormData.ownerAddress} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Description</label>
                  <textarea name="description" required rows="3" value={editFormData.description} onChange={handleEditChange} className="w-full rounded-xl border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/80 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500" />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400 mb-1">Owner Email</label>
                  <input type="email" value={selectedPet?.ownerEmail || ""} readOnly className="w-full rounded-xl border border-pink-200/30 bg-pink-50/50 dark:border-pink-500/10 dark:bg-slate-900/40 px-3 py-2 text-sm text-slate-500 dark:text-slate-500 cursor-not-allowed" />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {updating ? "Saving Changes..." : "Save Changes ✨"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
