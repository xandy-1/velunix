import type { Transition } from "framer-motion";

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 14,
};

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
  },
};