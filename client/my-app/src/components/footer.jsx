export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950/95 dark:bg-black/80 text-slate-100 py-16 border-t border-pink-500/10 backdrop-blur-xl">
      {/* Aurora decorations */}
      <div className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-violet-500/15 to-pink-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand Column */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-pink-500/20">
              <span className="text-lg">🐾</span>
              FurEverFriends
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-xs">
              Helping furry friends find warm, loving homes with joyful adoption tools and a trusted community that cares.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { label: "FB", href: "#" },
                { label: "TW", href: "#" },
                { label: "IG", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-500/20 bg-slate-900/80 text-xs font-black text-slate-400 transition-all hover:border-pink-400/40 hover:bg-pink-950/30 hover:text-pink-400"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Platform</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Browse All Pets", href: "/pets" },
                { label: "Add a Pet", href: "/dashboard/add-pet" },
                { label: "My Requests", href: "/dashboard/my-requests" },
                { label: "My Listings", href: "/dashboard/my-listings" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-400 transition-all hover:text-pink-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "#" },
                { label: "Blog & Stories", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-400 transition-all hover:text-pink-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Contact</h3>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-pink-500">📧</span>
                contact@fureverfriends.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">📞</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pink-500">📍</span>
                123 Adoption Way, Pet City
              </li>
            </ul>
            {/* Newsletter mini CTA */}
            <div className="mt-4 rounded-2xl bg-slate-900/80 border border-pink-500/15 p-4">
              <p className="text-xs font-black text-white mb-1">Join the paw pack 🐾</p>
              <p className="text-xs font-medium text-slate-400">Discover pets, share stories, help every animal feel loved.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60 pt-8">
          <p className="text-xs font-semibold text-slate-500">
            © {new Date().getFullYear()} FurEverFriends. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-bold text-slate-500">Built with <span className="text-pink-500">💖</span> for animals</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
