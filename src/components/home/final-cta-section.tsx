import { motion } from "framer-motion";

import {
  fadeUp,
  springTransition,
} from "@/lib/animations";

type Props = {
  onPick: () => void;
  onSearch: () => void;
};

export function FinalCtaSection({
  onPick,
  onSearch,
}: Props) {
  return (
    <motion.section
      variants={fadeUp}
      transition={springTransition}
      className="mt-10 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black">
            Pronto para encontrar algo para assistir?
          </h2>

          <p className="mt-3 text-zinc-400">
            Escolha agora ou pesquise um título específico.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onPick}
            className="rounded-2xl bg-red-600 px-6 py-4 font-bold text-white transition hover:scale-[1.03] hover:bg-red-500"
          >
            🎲 Escolher agora
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:scale-[1.03] hover:bg-white/10"
          >
            🔎 Pesquisar título
          </button>
        </div>
      </div>
    </motion.section>
  );
}