"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-pink-500"></div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const links = [
    { name: "My Listings", href: "/dashboard/my-listings", icon: "🐾" },
    { name: "Add Pet", href: "/dashboard/add-pet", icon: "➕" },
    { name: "My Requests", href: "/dashboard/my-requests", icon: "📋" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-col md:flex-row gap-6 relative z-10">

        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass-panel rounded-[28px] p-4 border border-pink-200/20 sticky top-24 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.3),_transparent_50%)] pointer-events-none" />

            {/* User info */}
            <div className="relative flex items-center gap-3 mb-5 pb-5 border-b border-pink-200/20 dark:border-pink-500/10">
              <img
                src={user.photoURL || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=3&w=80&h=80&q=80"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-300/40"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <h3 className="relative text-xs font-black uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400 mb-3 px-3">
              Dashboard
            </h3>

            <nav className="relative space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-pink-500/15 to-violet-500/10 text-pink-600 dark:text-pink-400 border border-pink-200/30 dark:border-pink-500/20 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 hover:text-pink-600 dark:hover:text-pink-400"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow glass-panel rounded-[28px] p-6 md:p-8 border border-pink-200/20 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.3),_transparent_40%)] pointer-events-none" />
          <div className="relative">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
