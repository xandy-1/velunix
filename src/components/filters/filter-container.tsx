"use client";

import { motion } from "framer-motion";

import {
  fadeUp,
  springTransition,
} from "@/lib/animations";

type FilterContainerProps = {
  title: string;
  children: React.ReactNode;
};

export function FilterContainer({
  title,
  children,
}: FilterContainerProps) {
  return (
    <motion.section
      variants={fadeUp}
      transition={springTransition}
      className="w-full rounded-3xl border border-white/5 bg-zinc-900/70 p-4 backdrop-blur"
    >
      <label className="mb-3 block text-sm font-medium text-zinc-300">
        {title}
      </label>

      {children}
    </motion.section>
  );
}