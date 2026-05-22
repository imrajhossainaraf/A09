"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const statusStyles = {
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/user");
      setRequests(res.data);
    } catch (err) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => { fetchRequests(); }, 0);
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      toast.success("Request cancelled");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to cancel request");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">My Adoption Requests 📋</h2>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Track the status of all your adoption applications.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-transparent border-t-pink-500" />
          <p className="text-sm font-bold text-slate-500">Loading your requests...</p>
        </div>
      ) : requests.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-pink-200/20 dark:border-pink-500/10">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-pink-50/60 dark:bg-pink-950/20 text-xs font-black uppercase tracking-[0.15em] text-pink-600 dark:text-pink-400">
                <th className="px-5 py-4">Pet Name</th>
                <th className="px-5 py-4">Request Date</th>
                <th className="px-5 py-4">Pickup Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100/40 dark:divide-pink-500/10">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-pink-50/30 dark:hover:bg-pink-950/10 transition-colors"
                >
                  <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                    {req.petName}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    }) : "N/A"}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {new Date(req.pickupDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-black px-3 py-1.5 rounded-full ${statusStyles[req.status] || statusStyles.pending}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/pet/${req.petId}`}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50 transition-colors"
                      >
                        View Pet
                      </Link>
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Cancel
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
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No requests yet</h3>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
            You haven&apos;t made any adoption requests yet. Browse our pets to find your perfect companion!
          </p>
          <Link
            href="/pets"
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 hover:-translate-y-0.5 transition-all"
          >
            Browse Pets
          </Link>
        </div>
      )}
    </div>
  );
}
