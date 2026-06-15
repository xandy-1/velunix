import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 pb-20 pt-32 text-white">
        <article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 leading-relaxed text-zinc-300 md:p-10">
          <h1 className="text-4xl font-black text-white">
            Política de Privacidade
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Última atualização: 14 de junho de 2026
          </p>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              1. Sobre esta política
            </h2>

            <p>
              Esta Política de Privacidade explica como o Velunix coleta, utiliza e protege informações relacionadas aos usuários da plataforma.
            </p>

            <p>
              Ao usar o Velunix, você concorda com esta Política de Privacidade e com nossos{" "}
              <Link
                href="/terms"
                className="text-blue-400 hover:text-blue-300"
              >
                Termos de Uso
              </Link>
              .
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              2. Dados que podemos coletar
            </h2>

            <p>
              Podemos coletar informações como:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Email usado para login.</li>
              <li>Filmes favoritados.</li>
              <li>Filmes marcados como assistidos.</li>
              <li>Filtros utilizados na plataforma.</li>
              <li>Eventos de uso, como cliques, páginas visitadas e interações.</li>
              <li>Informações técnicas, como dispositivo, navegador, páginas acessadas e dados de desempenho.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              3. Como usamos os dados
            </h2>

            <p>
              Usamos os dados para:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Permitir login e identificação da conta.</li>
              <li>Salvar favoritos e filmes assistidos.</li>
              <li>Melhorar recomendações e experiência do produto.</li>
              <li>Entender como usuários navegam e interagem com o Velunix.</li>
              <li>Detectar erros, problemas técnicos e oportunidades de melhoria.</li>
              <li>Enviar comunicações relacionadas ao produto, novidades ou melhorias, quando aplicável.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              4. Emails e comunicações
            </h2>

            <p>
              Podemos usar seu email para autenticação, mensagens importantes sobre sua conta e, futuramente, comunicações sobre novidades, melhorias ou recursos do Velunix.
            </p>

            <p>
              Caso comunicações de marketing sejam enviadas, buscaremos oferecer uma forma de descadastro ou interrupção do recebimento.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              5. Cookies e tecnologias semelhantes
            </h2>

            <p>
              O Velunix pode usar cookies, armazenamento local e tecnologias semelhantes para manter sessões, lembrar preferências, medir uso, melhorar desempenho e entender interações com o produto.
            </p>

            <p>
              Também usamos ferramentas de analytics e observabilidade, como PostHog, para analisar uso da plataforma, eventos, desempenho, cliques e possíveis problemas de navegação.
            </p>

            <p>
              Você pode gerenciar cookies e dados armazenados pelo navegador nas configurações do seu próprio navegador.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              6. Serviços de terceiros
            </h2>

            <p>
              O Velunix utiliza serviços de terceiros para operar a plataforma, incluindo:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Supabase, para autenticação e banco de dados.</li>
              <li>Vercel, para hospedagem e deploy.</li>
              <li>PostHog, para analytics e melhoria do produto.</li>
              <li>TMDB, para dados, imagens e informações de filmes.</li>
              <li>Tally, para coleta de feedback.</li>
            </ul>

            <p>
              Esses serviços podem processar dados conforme suas próprias políticas de privacidade.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              7. Compartilhamento de dados
            </h2>

            <p>
              Não vendemos seus dados pessoais. Podemos compartilhar dados apenas quando necessário para operar o serviço, cumprir obrigações legais, proteger direitos ou utilizar provedores essenciais ao funcionamento do Velunix.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              8. Segurança
            </h2>

            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados, incluindo autenticação, controle de acesso e políticas de segurança no banco de dados.
            </p>

            <p>
              Ainda assim, nenhum sistema é totalmente imune a riscos.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              9. Direitos do usuário
            </h2>

            <p>
              Você pode solicitar acesso, correção ou exclusão de dados associados à sua conta, quando aplicável.
            </p>

            <p>
              Para isso, use o formulário de feedback disponível no perfil ou outro canal oficial informado pelo Velunix.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              10. Alterações nesta política
            </h2>

            <p>
              Podemos atualizar esta Política de Privacidade conforme o Velunix evolui. A data de atualização será indicada no topo desta página.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}