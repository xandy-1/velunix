# Velunix

Velunix é uma plataforma para descobrir filmes rapidamente sem perder tempo escolhendo.

## Tecnologias

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- TMDB API

## Funcionalidades

- Sorteador inteligente de filmes
- Filtros por:
  - gênero
  - streaming
  - duração
  - ano
  - nota
- Favoritos
- Assistidos
- Sistema de autenticação
- Limite gratuito para convidados
- Persistência de filtros
- Trailer integrado
- Streaming providers

## Instalação

Clone o projeto:

```bash
git clone https://github.com/seuusuario/velunix.git
```

Entre na pasta:

```bash
cd velunix
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local` baseado no `.env.example`.

Depois rode:

```bash
npm run dev
```

## Variáveis de ambiente

```env
NEXT_PUBLIC_TMDB_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Build

```bash
npm run build
```

## Licença

MIT