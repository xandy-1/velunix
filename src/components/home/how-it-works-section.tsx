import { motion } from "framer-motion";

import {
  fadeUp,
  springTransition,
} from "@/lib/animations";

const STEPS = [
  {
    step: "1",
    icon: "⚙️",
    title: "Escolha filtros",
    text: "Defina tipo, nota, gênero, streaming, duração e ano. Ou deixe tudo no automático.",
  },
  {
    step: "2",
    icon: "🎲",
    title: "Receba uma recomendação",
    text: "O Velunix encontra uma opção compatível com o que você quer assistir.",
  },
  {
    step: "3",
    icon: "🍿",
    title: "Assista sem perder tempo",
    text: "Veja trailer, onde assistir e salve o que gostou para depois.",
  },
];

export function HowItWorksSection() {
  return (
    <motion.section
      variants={fadeUp}
      transition={springTransition}
      className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
    >
      <p className="text-center text-sm font-bold uppercase tracking-[0.35em] text-red-500">
        Como funciona
      </p>

      <h2 className="mt-3 text-center text-3xl font-black md:text-4xl">
        Você escolhe. O Velunix encontra.
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((item) => (
          <div
            key={item.step}
            className="relative rounded-2xl border border-white/10 bg-zinc-950/70 p-5"
          >
            <div className="absolute right-5 top-5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-black">
              {item.step}
            </div>

            <div className="text-4xl">
              {item.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}