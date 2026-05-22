"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Pets", href: "/pets" },
  ];

  if (user) {
    navLinks.push({ name: "My Requests", href: "/dashboard/my-requests" });
    navLinks.push({ name: "Add Pet", href: "/dashboard/add-pet" });
  }

  return (
    <nav style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }} className="sticky top-0 z-50 w-full backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-extrabold" style={{ color: "var(--text-primary)" }}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 via-fuchsia-500 to-violet-600 text-white shadow-lg shadow-pink-500/25">
            🐾
          </span>
          <span className="bg-gradient-to-r from-pink-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent font-black tracking-tight dark:from-pink-400 dark:via-fuchsia-400 dark:to-violet-400">
            FurEverFriends
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ color: pathname === link.href ? "var(--accent)" : "var(--text-secondary)" }}
              className={`text-sm font-semibold transition-all duration-200 hover:opacity-80 ${pathname === link.href ? "scale-105" : ""}`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-all hover:-translate-y-0.5 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((value) => !value)}
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-sm"
              >
                <img
                  src={user.photoURL || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=3&w=144&h=144&q=80"}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl"
                >
                  <div style={{ borderBottom: "1px solid var(--border)" }} className="px-4 py-3">
                    <p style={{ color: "var(--text-primary)" }} className="truncate text-sm font-semibold">{user.name}</p>
                    <p style={{ color: "var(--text-secondary)" }} className="truncate text-xs">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard/my-listings"
                    onClick={() => setDropdownOpen(false)}
                    style={{ color: "var(--text-secondary)" }}
                    className="block px-4 py-3 text-sm transition hover:bg-pink-500/10"
                  >
                    My Listings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-bold text-rose-600 transition hover:bg-pink-50/50 dark:hover:bg-pink-950/20"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35 hover:opacity-95"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
          className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition hover:scale-105 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
          className="md:hidden px-5 py-4 backdrop-blur-xl"
        >
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: "var(--text-secondary)" }}
                className="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-pink-500/10"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard/my-listings"
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--text-secondary)" }}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-pink-500/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl bg-rose-100 px-4 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-200 dark:hover:bg-rose-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
