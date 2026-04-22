# QubX — Portal Educativo de Computação Quântica

**Data:** 2026-04-22  
**Status:** Aprovado

---

## Visão Geral

QubX é um portal educativo sobre Computação Quântica originado de um TCC acadêmico. O objetivo é tornar o tema acessível a um público misto — desde leigos até desenvolvedores com experiência em TI — através de conteúdo visual e progressivo, sem exigir cadastro ou conhecimento prévio.

---

## Público-Alvo

- Pessoas sem background técnico (curiosos)
- Estudantes de TI/Computação sem contato com o tema quântico
- Desenvolvedores/profissionais de TI que querem entender o básico e avançar até ferramentas como Qiskit

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Estilo | Tailwind CSS |
| Conteúdo | MDX via `next-mdx-remote` |
| Hospedagem | Vercel (gratuito) |
| Repositório | GitHub |

O conteúdo dos módulos vive em arquivos `.mdx` dentro de `content/modules/`. Adicionar um novo módulo é criar um novo arquivo — sem alterar código.

---

## Estrutura de Módulos

Trilha sugerida com 6 módulos. O usuário pode segui-la em ordem ou explorar livremente.

| # | Módulo | Conteúdo-chave | Assets do refs/ |
|---|--------|---------------|-----------------|
| 1 | O que é Computação Quântica? | Contexto histórico, bit vs qubit | `bit-vs-qubit.png`, `qubit-vs-bit_tbmnl_en-us.png` |
| 2 | Fundamentos Quânticos | Superposição, emaranhamento, esfera de Bloch | `Esfera de Bloch.png`, `quantum-bits-qubits1.gif`, `quantum-bits-qubits2.gif` |
| 3 | Representação da Informação | Notação de Dirac, vetores base, estados probabilísticos | `Dirac notation (first part).png`, `standard basis vectors.png`, `Measuring probabilistic states.png` |
| 4 | Circuitos e Portas Quânticas | Portas lógicas quânticas, IBM Quantum Composer | `4_Qubit2C_4_Bus2C_4_Resonator_IBM_Device.png`, `SuperDense Coding.png` |
| 5 | Programando com Qiskit | Introdução ao Qiskit, links para IBM Quantum | `Linguagem de Programação Voltada para Computação Quântica.png` |
| 6 | Aplicações Reais | Mercedes-Benz, criptografia, música quântica | `IBM-Q-System-One-display.png`, `computador-quantico-IBM-1.png` |

---

## Arquitetura de Páginas

```
/                        → Home: apresentação + CTA "Começar trilha"
/trilha                  → Lista de módulos com progresso visual
/modulo/[slug]           → Página de módulo individual
```

### Componentes principais

- **Header:** logo QubX + link para /trilha, fixo no topo
- **ModuleCard:** card na página /trilha com título, descrição curta e indicador de "visitado"
- **ModuleLayout:** layout do módulo — duas colunas (conteúdo | imagem/vídeo), navegação Anterior/Próximo no rodapé
- **Sidebar:** menu lateral dentro de /modulo/[slug] listando todos os módulos para navegação livre
- **ProgressTracker:** lê/escreve em `localStorage` para marcar módulos visitados — sem login, sem backend

### Vídeos incorporados

Cada módulo pode ter um vídeo do YouTube embutido via `<iframe>`, usando os links já reunidos em `refs/Vídeos Links.txt`.

---

## Navegação & UX

- **Trilha sugerida:** o usuário segue a ordem numérica dos módulos
- **Exploração livre:** sidebar sempre visível dentro de qualquer módulo, permitindo saltar para qualquer parte
- **Progresso:** `localStorage` marca módulos como "visitados" — feedback visual simples (check ou cor diferente no card/sidebar)
- **Responsivo:** layout mobile-first; sidebar colapsa em menu hambúrguer em telas pequenas

---

## Identidade Visual

- **Tema:** escuro (fundo `#0a0a0f`, destaques em roxo `#8b5cf6` e ciano `#06b6d4`)
- **Tipografia:** Inter (sans-serif moderna)
- **Imagens:** assets do `refs/` usados diretamente nos módulos (copiados para `public/images/`)
- **Gifs:** `quantum-bits-qubits1.gif` e `quantum-bits-qubits2.gif` usados como elementos animados
- **Estética:** minimalista, remetendo ao universo quântico — sem excesso de decoração

---

## Estrutura de Diretórios

```
qubx/
├── app/
│   ├── page.tsx                  # Home
│   ├── trilha/
│   │   └── page.tsx              # Lista de módulos
│   └── modulo/
│       └── [slug]/
│           └── page.tsx          # Módulo individual
├── content/
│   └── modules/
│       ├── 01-o-que-e-computacao-quantica.mdx
│       ├── 02-fundamentos-quanticos.mdx
│       ├── 03-representacao-da-informacao.mdx
│       ├── 04-circuitos-e-portas.mdx
│       ├── 05-programando-com-qiskit.mdx
│       └── 06-aplicacoes-reais.mdx
├── components/
│   ├── Header.tsx
│   ├── ModuleCard.tsx
│   ├── ModuleLayout.tsx
│   ├── Sidebar.tsx
│   └── ProgressTracker.tsx
├── public/
│   └── images/                   # Assets copiados de refs/
└── tailwind.config.ts
```

---

## Fora do Escopo (v1)

- Quizzes ou testes de conhecimento
- Simulador de circuitos quânticos
- Sistema de login ou perfil de usuário
- Backend ou banco de dados
- Internacionalização (i18n)

---

## Critérios de Sucesso

- Todos os 6 módulos renderizando corretamente com seus assets
- Progresso persistido via `localStorage` entre sessões
- Navegação livre (sidebar) e trilha sugerida (Anterior/Próximo) funcionando
- Deploy estável na Vercel com domínio gratuito
- Site responsivo em mobile e desktop
