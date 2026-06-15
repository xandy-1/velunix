"use client";

import Link from "next/link";

import { useState } from "react";

import { AppButton } from "@/components/ui/button";

import { signInWithEmail } from "@/services/auth";

type LoginPromptProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginPrompt({
  open,
  onClose,
}: LoginPromptProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    if (loading || success) {
      return;
    }

    try {
      setLoading(true);

      await signInWithEmail(email);

      setSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar magic link:", error);
      alert("Erro ao enviar email.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-6 text-center text-white shadow-2xl">
          <h2 className="text-2xl font-bold">
            Confira seu email 📬
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Enviamos um link mágico para continuar seu login no Velunix.
          </p>

          <div className="mt-6">
            <AppButton onClick={onClose}>
              Fechar
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white shadow-2xl">
        <h2 className="text-center text-2xl font-bold">
          Entre ou crie sua conta
        </h2>

        <p className="mt-3 text-center text-sm leading-relaxed text-zinc-400">
          Digite seu email para receber um link mágico. Se você já tem conta, entraremos nela. Se ainda não tem, criaremos uma nova.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
          />

          <p className="text-center text-xs leading-relaxed text-zinc-500">
            Ao continuar, você concorda com os{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-blue-400 transition hover:text-blue-300"
            >
              Termos de Uso
            </Link>{" "}
            e com a{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-blue-400 transition hover:text-blue-300"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <AppButton
            onClick={handleSubmit}
            disabled={!email || loading}
          >
            {loading
              ? "Enviando..."
              : "Receber link mágico"}
          </AppButton>

          <AppButton
            variant="ghost"
            onClick={onClose}
          >
            Continuar depois
          </AppButton>
        </div>
      </div>
    </div>
  );
}