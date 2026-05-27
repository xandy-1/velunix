"use client";

import {
  Suspense,
  useEffect,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  useEffect(() => {
    async function finishLogin() {
      const code =
        searchParams.get("code");

      if (code) {
        await supabase.auth.exchangeCodeForSession(
          code
        );
      }

      router.replace("/");
    }

    finishLogin();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      Entrando...
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Entrando...
        </main>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}