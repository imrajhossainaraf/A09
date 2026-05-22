"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
          callback: handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-button-container"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signin",
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Successfully logged in!");
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const response = await fetch("https://furever-iusk.onrender.com/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.confirmation) {
        setUser(data.user);
        toast.success("Successfully logged in with Google!");
        router.push("/");
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow grid place-items-center px-5 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl grid gap-6 rounded-[40px] glass-panel p-6 shadow-2xl border border-pink-200/20 md:grid-cols-[1fr_1fr] md:p-10 relative overflow-hidden"
        >
          {/* Decorative overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.4),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.3),_transparent_40%)] pointer-events-none" />

          {/* Left Panel: Branding */}
          <div className="relative rounded-[28px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 p-8 text-white shadow-xl shadow-pink-500/20 border border-white/10 overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_50%)]" />
            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest">
                🐾 Welcome Back!
              </div>
              <h2 className="text-3xl font-black leading-tight">
                Sign in to continue your pet rescue adventure.
              </h2>
              <p className="text-pink-100/90 font-medium text-sm leading-relaxed">
                Find your next furry friend and manage adoption requests in a beautiful and friendly experience.
              </p>
            </div>
            <div className="relative mt-8 flex gap-4">
              {[
                { icon: "🐶", label: "Dogs" },
                { icon: "🐱", label: "Cats" },
                { icon: "🐰", label: "Rabbits" },
              ].map((item) => (
                <div key={item.label} className="flex-1 bg-white/15 border border-white/20 rounded-2xl p-3 text-center">
                  <div className="text-2xl">{item.icon}</div>
                  <p className="text-xs font-bold mt-1 text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="relative flex flex-col justify-center space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back 👋</h2>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Log in to your FurEverFriends account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2 px-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400 mb-2 px-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-full border border-pink-200/50 bg-white/90 dark:border-pink-500/20 dark:bg-slate-900/90 px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200/50"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35"
              >
                Log In
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-pink-200/40 dark:bg-pink-500/15" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-pink-200/40 dark:bg-pink-500/15" />
            </div>

            <div id="google-button-container" className="flex justify-center" />

            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-extrabold text-pink-600 hover:underline dark:text-pink-400">
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
