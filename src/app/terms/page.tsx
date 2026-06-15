import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-20 pt-32 text-white">
        <article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 leading-relaxed text-zinc-300 md:p-10">
          <h1 className="text-4xl font-black text-white">
            Termos de Uso
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Última atualização: 14 de junho de 2026
          </p>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              1. Sobre o Velunix
            </h2>

            <p>
              O Velunix é uma plataforma de descoberta de filmes criada para ajudar usuários a encontrar algo bom para assistir com menos tempo de escolha.
            </p>

            <p>
              Ao acessar ou utilizar o Velunix, você concorda com estes Termos de Uso e com a nossa{" "}
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Conta e acesso
            </h2>

            <p>
              Para usar algumas funcionalidades, como favoritos, filmes assistidos e recursos personalizados, você pode precisar criar uma conta usando email ou outros métodos de autenticação disponíveis.
            </p>

            <p>
              Você é responsável por manter o acesso ao seu email e por qualquer atividade realizada na sua conta.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Uso permitido
            </h2>

            <p>
              Você concorda em usar o Velunix apenas para fins legais e de forma que não prejudique o funcionamento da plataforma, outros usuários ou serviços terceiros utilizados pelo Velunix.
            </p>

            <p>
              Não é permitido tentar burlar limites técnicos, explorar vulnerabilidades, automatizar acessos abusivos, copiar indevidamente dados ou interferir na segurança do serviço.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Recomendações e conteúdo
            </h2>

            <p>
              As recomendações exibidas pelo Velunix são geradas com base em filtros, dados públicos de filmes e informações fornecidas por serviços terceiros.
            </p>

            <p>
              O Velunix não garante que todos os dados estejam sempre completos, atualizados ou livres de erros, incluindo disponibilidade em plataformas de streaming, notas, imagens, trailers e descrições.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Serviços de terceiros
            </h2>

            <p>
              O Velunix utiliza serviços terceiros para autenticação, banco de dados, hospedagem, analytics e dados de filmes. Esses serviços podem ter seus próprios termos e políticas.
            </p>

            <p>
              Dados, imagens e informações de filmes são fornecidos pela TMDB. O Velunix não é afiliado, endossado ou certificado pela TMDB.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. Planos, limites e futuras assinaturas
            </h2>

            <p>
              Algumas funcionalidades podem ser gratuitas durante o lançamento ou fase inicial do produto. No futuro, o Velunix poderá oferecer planos pagos, assinaturas, limites de uso ou recursos premium.
            </p>

            <p>
              Caso isso aconteça, as condições aplicáveis serão informadas de forma clara antes de qualquer cobrança.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Alterações no serviço
            </h2>

            <p>
              Podemos alterar, suspender ou remover funcionalidades do Velunix a qualquer momento, especialmente durante a evolução do MVP.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              8. Limitação de responsabilidade
            </h2>

            <p>
              O Velunix é oferecido como uma ferramenta de auxílio à descoberta de filmes. Não nos responsabilizamos por decisões tomadas com base nas recomendações, indisponibilidade temporária, erros de dados de terceiros ou alterações em catálogos de streaming.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              9. Contato
            </h2>

            <p>
              Para dúvidas, sugestões ou solicitações, entre em contato pelo formulário de feedback disponível no perfil do usuário.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}