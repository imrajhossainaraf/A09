import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex flex-col justify-center items-center text-center px-5 py-16 relative">
        <div className="relative z-10 max-w-lg mx-auto">
          {/* Glowing 404 */}
          <div className="relative mb-6 inline-block">
            <span className="text-[9rem] font-black leading-none bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent select-none">
              404
            </span>
            <div className="absolute inset-0 blur-3xl bg-pink-500/20 rounded-full -z-10" />
          </div>

          <div className="glass-panel rounded-[32px] p-8 border border-pink-200/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.4),_transparent_50%)] pointer-events-none" />
            <div className="relative">
              <div className="text-4xl mb-4">🐾</div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                Oops! Page Not Found
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                Looks like this pup wandered off! The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 hover:shadow-pink-500/35"
              >
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
