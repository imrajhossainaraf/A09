import Link from "next/link";
import { motion } from "framer-motion";

export default function PetCard({ pet }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="group overflow-hidden rounded-[32px] glass-card"
    >
      <div className="relative h-64 overflow-hidden rounded-t-[32px]">
        <img src={pet.imageURL} alt={pet.petName} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-sm dark:bg-slate-900/95 dark:text-slate-100 border border-pink-200/20">
          {pet.species}
        </span>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">{pet.petName}</h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{pet.breed}</p>
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${pet.status === "Adopted" ? "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/20" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 border border-emerald-200/20"}`}>
            {pet.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="rounded-2xl bg-pink-50/50 px-3 py-2 dark:bg-pink-950/20 text-pink-600 dark:text-pink-300 border border-pink-100/10 text-center">Age: {pet.age} yrs</span>
          <span className="rounded-2xl bg-violet-50/50 px-3 py-2 dark:bg-violet-950/20 text-violet-600 dark:text-violet-300 border border-violet-100/10 text-center">Gender: {pet.gender}</span>
        </div>

        <Link
          href={`/pet/${pet._id}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 hover:opacity-95"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
