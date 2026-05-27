"use client";

import { motion } from "framer-motion";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <motion.div
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
        }}
        className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5"
      >
        <div className="mb-4 h-3 w-24 rounded bg-zinc-800" />

        <div className="h-5 w-52 rounded bg-zinc-800" />
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          delay: 0.2,
        }}
        className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5"
      >
        <div className="mb-4 h-3 w-32 rounded bg-zinc-800" />

        <div className="h-5 w-40 rounded bg-zinc-800" />
      </motion.div>
    </div>
  );
}