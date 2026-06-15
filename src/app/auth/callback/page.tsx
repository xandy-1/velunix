"use client";

import {
  Suspense,
  useEffect,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { usePostHog } from "posthog-js/react";

import { supabase } from "@/lib/supabase";

function AuthCallbackContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const posthog = usePostHog();

  useEffect(() => {
    async function finishLogin() {
      const code =
        searchParams.get("code");

      if (code) {
        const { data, error } =
          await supabase.auth.exchangeCodeForSession(
            code
          );

        if (!error && data.session) {
          posthog.capture(
            "user_signed_in",
            {
              method: "magic_link",
            }
          );
        }
      }

      router.replace("/");
    }

    finishLogin();
  }, [router, searchParams, posthog]);

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