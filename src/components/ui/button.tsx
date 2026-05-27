"use client";

import { motion } from "framer-motion";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type AppButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-zinc-200",
  secondary:
    "bg-zinc-800 text-white hover:bg-zinc-700",
  danger:
    "bg-red-600 text-white hover:bg-red-500",
  ghost:
    "bg-transparent text-zinc-400 hover:text-white",
};

export function AppButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  disabled = false,
}: AppButtonProps) {
  const baseClassName = `
    rounded-xl px-6 py-3 font-semibold
    transition duration-300
    disabled:cursor-not-allowed disabled:opacity-50
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={baseClassName}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled ? undefined : { scale: 1.05 }
      }
      whileTap={
        disabled ? undefined : { scale: 0.97 }
      }
      className={baseClassName}
    >
      {children}
    </motion.button>
  );
}