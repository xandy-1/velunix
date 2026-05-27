"use client";

import { motion } from "framer-motion";

type MovieGridSkeletonProps = {
  items?: number;
};

export function MovieGridSkeleton({
  items = 10,
}: MovieGridSkeletonProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: items }).map(
        (_, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              delay: index * 0.04,
            }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
          >
            <div className="aspect-[2/3] w-full bg-zinc-800" />

            <div className="space-y-3 p-4">
              <div className="h-4 w-4/5 rounded bg-zinc-800" />

              <div className="h-3 w-1/3 rounded bg-zinc-800" />
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}