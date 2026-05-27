"use client";

import { motion } from "framer-motion";

export function MovieCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.8,
      }}
      className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl"
    >
      <div className="h-[500px] w-full bg-zinc-800" />

      <div className="flex flex-col gap-4 p-5">
        <div className="h-8 w-3/4 rounded-xl bg-zinc-800" />

        <div className="flex gap-3">
          <div className="h-4 w-16 rounded bg-zinc-800" />

          <div className="h-4 w-20 rounded bg-zinc-800" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-zinc-800" />

          <div className="h-3 w-full rounded bg-zinc-800" />

          <div className="h-3 w-2/3 rounded bg-zinc-800" />
        </div>

        <div className="flex gap-3 pt-2">
          <div className="h-12 flex-1 rounded-2xl bg-zinc-800" />

          <div className="h-12 flex-1 rounded-2xl bg-zinc-800" />
        </div>
      </div>
    </motion.div>
  );
}