import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-28 pt-8 text-center text-sm text-zinc-500 md:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">
        <p>
          © {new Date().getFullYear()} Velunix. Todos os direitos reservados.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/terms"
            className="transition hover:text-white"
          >
            Termos de Uso
          </Link>

          <Link
            href="/privacy"
            className="transition hover:text-white"
          >
            Política de Privacidade
          </Link>
        </div>

        <p className="max-w-2xl text-xs leading-relaxed text-zinc-600">
          Dados e imagens de filmes fornecidos pela TMDB. Este produto usa a API da TMDB, mas não é endossado ou certificado pela TMDB.
        </p>
      </div>
    </footer>
  );
}