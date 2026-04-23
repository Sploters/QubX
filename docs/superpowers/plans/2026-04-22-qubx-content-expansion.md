# QubX Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the QubX portal from 6 to 10 rich educational modules about Quantum Computing, with SVG inline diagrams and public-domain image URLs.

**Architecture:** Update `lib/modules.ts` with 10 new module entries and new slugs, delete the 6 old MDX files, and create 10 new MDX files under `content/modules/`. No UI component changes — the existing layout handles everything. SVG diagrams are written inline in MDX using JSX syntax (camelCase attributes). External images are referenced by public URL.

**Tech Stack:** Next.js 14 App Router, MDX via next-mdx-remote/rsc, Tailwind CSS, existing component set unchanged.

---

## File Map

| File | Action |
|------|--------|
| `lib/modules.ts` | Modify — replace MODULES array (6→10 entries, new slugs/metadata) |
| `lib/__tests__/modules.test.ts` | Modify — update tests for 10 modules |
| `content/modules/01-o-que-e-computacao-quantica.mdx` | Delete |
| `content/modules/02-fundamentos-quanticos.mdx` | Delete |
| `content/modules/03-representacao-da-informacao.mdx` | Delete |
| `content/modules/04-circuitos-e-portas.mdx` | Delete |
| `content/modules/05-programando-com-qiskit.mdx` | Delete |
| `content/modules/06-aplicacoes-reais.mdx` | Delete |
| `content/modules/01-a-nova-era-da-computacao.mdx` | Create |
| `content/modules/02-o-mundo-quantico.mdx` | Create |
| `content/modules/03-qubits-alem-do-bit.mdx` | Create |
| `content/modules/04-a-linguagem-quantica.mdx` | Create |
| `content/modules/05-portas-e-algoritmos-quanticos.mdx` | Create |
| `content/modules/06-o-desafio-da-construcao.mdx` | Create |
| `content/modules/07-a-corrida-quantica.mdx` | Create |
| `content/modules/08-a-ameaca-a-criptografia.mdx` | Create |
| `content/modules/09-programando-com-qiskit.mdx` | Create |
| `content/modules/10-alem-do-computador-quantico.mdx` | Create |

---

## Task 1: Update lib/modules.ts and Tests

**Files:**
- Modify: `lib/modules.ts`
- Modify: `lib/__tests__/modules.test.ts`

- [ ] **Step 1: Update the failing test first**

Replace `lib/__tests__/modules.test.ts` entirely:

```typescript
import { describe, it, expect } from 'vitest'
import { MODULES, getModuleBySlug, getAdjacentModules } from '../modules'

describe('MODULES', () => {
  it('has exactly 10 modules', () => {
    expect(MODULES).toHaveLength(10)
  })

  it('each module has required fields', () => {
    for (const m of MODULES) {
      expect(m.slug).toBeTruthy()
      expect(m.order).toBeGreaterThan(0)
      expect(m.title).toBeTruthy()
      expect(m.description).toBeTruthy()
    }
  })

  it('orders are sequential starting at 1', () => {
    const orders = MODULES.map((m) => m.order)
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})

describe('getModuleBySlug', () => {
  it('returns the correct module for first slug', () => {
    const m = getModuleBySlug('01-a-nova-era-da-computacao')
    expect(m?.order).toBe(1)
  })

  it('returns the correct module for last slug', () => {
    const m = getModuleBySlug('10-alem-do-computador-quantico')
    expect(m?.order).toBe(10)
  })

  it('returns undefined for unknown slug', () => {
    expect(getModuleBySlug('nope')).toBeUndefined()
  })
})

describe('getAdjacentModules', () => {
  it('first module has no prev', () => {
    const { prev } = getAdjacentModules('01-a-nova-era-da-computacao')
    expect(prev).toBeNull()
  })

  it('last module has no next', () => {
    const { next } = getAdjacentModules('10-alem-do-computador-quantico')
    expect(next).toBeNull()
  })

  it('middle module has both prev and next', () => {
    const { prev, next } = getAdjacentModules('05-portas-e-algoritmos-quanticos')
    expect(prev?.order).toBe(4)
    expect(next?.order).toBe(6)
  })

  it('returns both null for unknown slug', () => {
    const { prev, next } = getAdjacentModules('nonexistent-slug')
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test
```
Expected: FAIL — "expected 6 to equal 10"

- [ ] **Step 3: Replace lib/modules.ts with 10 modules**

Replace `lib/modules.ts` entirely:

```typescript
export interface Module {
  slug: string
  order: number
  title: string
  description: string
  videoUrl?: string
  images: string[]
}

export const MODULES: Module[] = [
  {
    slug: '01-a-nova-era-da-computacao',
    order: 1,
    title: 'A Nova Era da Computação',
    description: 'A corrida quântica global já começou. Entenda por que governos e gigantes da tecnologia investem bilhões nessa tecnologia e o que está em jogo.',
    videoUrl: 'https://www.youtube.com/embed/e3fz3dqhN44',
    images: ['/images/bit-vs-qubit.png'],
  },
  {
    slug: '02-o-mundo-quantico',
    order: 2,
    title: 'O Mundo Quântico',
    description: 'Antes dos qubits, existe a física quântica. Descubra os experimentos e princípios que revelaram que a realidade funciona de forma completamente diferente do que imaginamos.',
    videoUrl: 'https://www.youtube.com/embed/CfpvQFGNrXk',
    images: [],
  },
  {
    slug: '03-qubits-alem-do-bit',
    order: 3,
    title: 'Qubits: Além do Bit',
    description: 'Superposição, emaranhamento e decoerência — os três fenômenos que definem o que um qubit pode (e não pode) fazer.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/esfera-de-bloch.png', '/images/quantum-bits-qubits1.gif', '/images/quantum-bits-qubits2.gif'],
  },
  {
    slug: '04-a-linguagem-quantica',
    order: 4,
    title: 'A Linguagem Quântica',
    description: 'A notação de Dirac é o idioma da mecânica quântica. Aprenda a ler e escrever estados quânticos como um físico.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/dirac-notation.png', '/images/standard-basis-vectors.png', '/images/measuring-probabilistic-states.png'],
  },
  {
    slug: '05-portas-e-algoritmos-quanticos',
    order: 5,
    title: 'Portas e Algoritmos Quânticos',
    description: 'Como se manipula um qubit? Portas quânticas, comparação com lógica clássica e os primeiros algoritmos que demonstram vantagem quântica real.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/superdense-coding.png', '/images/ibm-device.png'],
  },
  {
    slug: '06-o-desafio-da-construcao',
    order: 6,
    title: 'O Desafio da Construção',
    description: 'Construir um computador quântico é um dos maiores desafios de engenharia da história. Criogenia, decoerência, correção de erros e as 4 tecnologias que competem pelo futuro.',
    images: [],
  },
  {
    slug: '07-a-corrida-quantica',
    order: 7,
    title: 'A Corrida Quântica',
    description: 'Google, IBM, Microsoft, China — a disputa pelo domínio quântico é a nova corrida espacial. Conheça os players, as apostas e quem está na frente.',
    videoUrl: 'https://www.youtube.com/embed/iaWpoPsSBf4',
    images: [],
  },
  {
    slug: '08-a-ameaca-a-criptografia',
    order: 8,
    title: 'A Ameaça à Criptografia',
    description: 'Um computador quântico poderoso pode quebrar a criptografia que protege a internet. O que é o Y2Q, o que já está em risco e como o mundo está se preparando.',
    videoUrl: 'https://www.youtube.com/embed/6qD9XElTpCE',
    images: [],
  },
  {
    slug: '09-programando-com-qiskit',
    order: 9,
    title: 'Programando com Qiskit',
    description: 'Mãos na massa: crie circuitos quânticos em Python com Qiskit, simule localmente e execute em hardware quântico real da IBM.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/linguagem-quantica.png'],
  },
  {
    slug: '10-alem-do-computador-quantico',
    order: 10,
    title: 'Além do Computador Quântico',
    description: 'Computação quântica é só o começo. Ressonância magnética, sensores quânticos, internet quântica e relógios atômicos — aplicações que já mudam o mundo.',
    videoUrl: 'https://www.youtube.com/embed/seersj3W-hg',
    images: ['/images/IBM-Q-System-One-display.png', '/images/computador-quantico-IBM-1.png'],
  },
]

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug)
}

export function getAdjacentModules(slug: string): { prev: Module | null; next: Module | null } {
  const index = MODULES.findIndex((m) => m.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? MODULES[index - 1] : null,
    next: index < MODULES.length - 1 ? MODULES[index + 1] : null,
  }
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test
```
Expected: PASS — 9 tests passing

- [ ] **Step 5: Commit**

```bash
git add lib/modules.ts lib/__tests__/modules.test.ts
git commit -m "feat: update module metadata for 10-module expansion"
```

---

## Task 2: Delete Old MDX Files + Create Module 1

**Files:**
- Delete: `content/modules/01-o-que-e-computacao-quantica.mdx` through `06-aplicacoes-reais.mdx`
- Create: `content/modules/01-a-nova-era-da-computacao.mdx`

- [ ] **Step 1: Delete all 6 old MDX files**

```bash
cd content/modules
rm 01-o-que-e-computacao-quantica.mdx
rm 02-fundamentos-quanticos.mdx
rm 03-representacao-da-informacao.mdx
rm 04-circuitos-e-portas.mdx
rm 05-programando-com-qiskit.mdx
rm 06-aplicacoes-reais.mdx
cd ../..
```

- [ ] **Step 2: Create Module 1 MDX**

Create `content/modules/01-a-nova-era-da-computacao.mdx`:

```mdx
## Um problema que levaria 10.000 anos para resolver

Em 2019, o processador quântico Sycamore do Google realizou um cálculo específico em **200 segundos**. O supercomputador mais poderoso do mundo levaria estimados **10.000 anos** para fazer o mesmo.

Esse momento — chamado de "supremacia quântica" — marcou o início de uma nova era da computação.

## O que é Computação Quântica?

Computadores convencionais processam informação em **bits**: cada bit é 0 ou 1. Um computador quântico usa **qubits**, que podem ser 0, 1 ou qualquer combinação dos dois ao mesmo tempo — graças a um fenômeno da física chamado **superposição**.

Isso permite que um computador quântico explore milhões de possibilidades simultaneamente, em vez de testá-las uma a uma.

![Bit clássico versus qubit](/images/bit-vs-qubit.png)

## A Corrida Global

A computação quântica é considerada tão estratégica quanto a corrida espacial dos anos 1960. Os principais players:

| País / Empresa | Investimento | Destaque |
|----------------|-------------|---------|
| 🇺🇸 IBM | $100B+ projetado | Roadmap mais público do setor |
| 🇺🇸 Google | Bilhões | Primeiro a anunciar "supremacia quântica" |
| 🇺🇸 Microsoft | Bilhões | Aposta em qubits topológicos |
| 🇨🇳 China | $15B governo | Maior investimento público único |
| 🇪🇺 União Europeia | €1B (Quantum Flagship) | Programa de 10 anos |
| 🇧🇷 Brasil | Em desenvolvimento | CBPF e universidades federais |

## Linha do Tempo: Marcos da Computação Quântica

<svg viewBox="0 0 760 260" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  {/* Linha principal */}
  <line x1="40" y1="130" x2="720" y2="130" stroke="#1e1e30" strokeWidth="3"/>
  {/* Seta */}
  <polygon points="720,124 733,130 720,136" fill="#1e1e30"/>

  {/* Marco 1981 */}
  <circle cx="80" cy="130" r="6" fill="#8b5cf6"/>
  <line x1="80" y1="124" x2="80" y2="60" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4"/>
  <text x="80" y="52" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontFamily="Inter, sans-serif">1981</text>
  <text x="80" y="38" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Feynman propõe</text>
  <text x="80" y="26" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">computação quântica</text>

  {/* Marco 1994 */}
  <circle cx="200" cy="130" r="6" fill="#8b5cf6"/>
  <line x1="200" y1="136" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4"/>
  <text x="200" y="215" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontFamily="Inter, sans-serif">1994</text>
  <text x="200" y="229" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Algoritmo de Shor</text>
  <text x="200" y="243" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">(ameaça ao RSA)</text>

  {/* Marco 2001 */}
  <circle cx="320" cy="130" r="6" fill="#8b5cf6"/>
  <line x1="320" y1="124" x2="320" y2="60" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4"/>
  <text x="320" y="52" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontFamily="Inter, sans-serif">2001</text>
  <text x="320" y="38" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">IBM executa</text>
  <text x="320" y="26" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Shor em 7 qubits</text>

  {/* Marco 2019 */}
  <circle cx="500" cy="130" r="8" fill="#06b6d4"/>
  <line x1="500" y1="136" x2="500" y2="200" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4"/>
  <text x="500" y="215" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontFamily="Inter, sans-serif">2019</text>
  <text x="500" y="229" textAnchor="middle" fill="#06b6d4" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold">Google: supremacia</text>
  <text x="500" y="243" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">quântica (53 qubits)</text>

  {/* Marco 2023 */}
  <circle cx="620" cy="130" r="8" fill="#06b6d4"/>
  <line x1="620" y1="124" x2="620" y2="60" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4"/>
  <text x="620" y="52" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontFamily="Inter, sans-serif">2023</text>
  <text x="620" y="38" textAnchor="middle" fill="#06b6d4" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold">IBM Condor</text>
  <text x="620" y="26" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">1.121 qubits</text>
</svg>

## Por que Agora?

Três fatores se combinaram para tornar a computação quântica prática:

1. **Hardware** — processadores com mais qubits e menos erros a cada ano
2. **Software** — frameworks como Qiskit (IBM) e Cirq (Google) tornaram a programação acessível
3. **Nuvem** — qualquer pessoa pode usar um computador quântico real hoje, via IBM Quantum ou Amazon Braket

> 💡 **Curiosidade:** O computador quântico não substitui o computador clássico. Ele resolve problemas específicos exponencialmente mais rápido — especialmente simulação molecular, otimização e criptografia.
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```
Expected: build passes (module 1 route renders, others still use old content during transition — that's OK, they'll be replaced in subsequent tasks).

- [ ] **Step 4: Commit**

```bash
git add content/modules/
git commit -m "feat: delete old MDX files, add module 1 - A Nova Era da Computação"
```

---

## Task 3: Module 2 — O Mundo Quântico (NEW)

**Files:**
- Create: `content/modules/02-o-mundo-quantico.mdx`

- [ ] **Step 1: Create Module 2 MDX**

Create `content/modules/02-o-mundo-quantico.mdx`:

```mdx
## O Experimento que Quebrou Nossa Visão da Realidade

Em 1801, Thomas Young fez um experimento simples: apontou luz para uma placa com duas fendas estreitas. O resultado esperado seriam duas listras de luz do outro lado.

O que ele viu foram **franjas de interferência** — padrão típico de ondas, não de partículas.

A luz se comportava como onda, mesmo sendo emitida como partículas (fótons).

<svg viewBox="0 0 680 280" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  {/* Fonte de luz */}
  <circle cx="60" cy="140" r="18" fill="#8b5cf6" opacity="0.8"/>
  <text x="60" y="174" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">Fonte</text>

  {/* Raios indo para a barreira */}
  <line x1="78" y1="140" x2="240" y2="100" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.6"/>
  <line x1="78" y1="140" x2="240" y2="140" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.6"/>
  <line x1="78" y1="140" x2="240" y2="180" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.6"/>

  {/* Barreira com duas fendas */}
  <rect x="240" y="40" width="14" height="70" fill="#1e1e30" rx="2"/>
  <rect x="240" y="130" width="14" height="20" fill="#1e1e30" rx="2"/>
  <rect x="240" y="170" width="14" height="70" fill="#1e1e30" rx="2"/>
  <text x="247" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">Barreira</text>
  <text x="247" y="272" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">c/ 2 fendas</text>

  {/* Ondas de interferência */}
  {[0,1,2,3,4,5,6,7].map((i) => (
    <ellipse key={i} cx="254" cy="110" rx={20 + i * 28} ry={20 + i * 22}
      fill="none" stroke="#8b5cf6" strokeWidth="1" opacity={0.5 - i*0.05}/>
  ))}
  {[0,1,2,3,4,5,6,7].map((i) => (
    <ellipse key={i} cx="254" cy="170" rx={20 + i * 28} ry={20 + i * 22}
      fill="none" stroke="#06b6d4" strokeWidth="1" opacity={0.5 - i*0.05}/>
  ))}

  {/* Tela de detecção */}
  <rect x="580" y="40" width="12" height="200" fill="#1e1e30" rx="2"/>
  <text x="586" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">Tela</text>

  {/* Padrão de interferência na tela */}
  {[0.9, 0.4, 0.85, 0.3, 0.95, 0.3, 0.85, 0.4, 0.9].map((op, i) => (
    <rect key={i} x="592" y={48 + i * 22} width="10" height="18"
      fill="#8b5cf6" opacity={op} rx="1"/>
  ))}

  {/* Labels fendas */}
  <text x="247" y="104" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="Inter, sans-serif">fenda A</text>
  <text x="247" y="166" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontFamily="Inter, sans-serif">fenda B</text>
</svg>

O surpreendente: mesmo disparando **um fóton por vez**, o padrão de interferência ainda aparece. Como uma partícula interfere consigo mesma? Só é possível se ela passar pelas **duas fendas simultaneamente**.

Isso é **superposição** — e é a base de toda a computação quântica.

## Dualidade Onda-Partícula

A física quântica revelou que elétrons, fótons e toda matéria subatômica se comportam ora como onda, ora como partícula — dependendo de como você observa.

- **Sem observação:** comporta-se como onda (existe em múltiplos lugares ao mesmo tempo)
- **Com observação/medição:** comporta-se como partícula (assume uma posição definida)

O ato de medir muda o resultado. Isso não é limitação do equipamento — é a natureza da realidade.

## O Princípio da Incerteza de Heisenberg

Werner Heisenberg (1927) formulou um dos princípios mais perturbadores da física:

> **Quanto mais precisamente você conhece a posição de uma partícula, menos precisamente pode conhecer sua velocidade — e vice-versa.**

Matematicamente: **Δx · Δp ≥ ℏ/2**

Isso não é uma limitação tecnológica. É um limite fundamental da natureza. Posição e momento não podem ter valores definidos simultaneamente.

## O Gato de Schrödinger

Erwin Schrödinger (1935) criou um experimento mental para ilustrar o absurdo da superposição:

Um gato está dentro de uma caixa fechada com um mecanismo quântico que pode ou não liberar veneno, com 50% de chance. **Enquanto a caixa estiver fechada, o gato está simultaneamente vivo e morto.**

Só quando você abre a caixa (faz a medição), o estado colapsa para um ou outro.

Schrödinger pretendia criticar a interpretação quântica. Sem querer, criou a metáfora perfeita para explicar superposição.

> 💡 **A conexão com qubits:** um qubit é como o gato de Schrödinger. Enquanto não é medido, existe em superposição de 0 e 1. Quando medido, colapsa para um valor definitivo.

## Quantização: Por que "Quântico"?

"Quantum" significa porção, pacote, quantidade discreta. A física quântica descobriu que energia não é contínua — ela existe em pacotes discretos chamados **quanta**.

Um elétron em um átomo não pode assumir qualquer nível de energia. Ele ocupa níveis específicos — como degraus de uma escada, não uma rampa.

Quando o elétron salta entre níveis, emite ou absorve um fóton com energia exatamente igual à diferença entre os níveis. É isso que gera as cores específicas que cada elemento emite quando excitado.

Esse princípio é explorado nos computadores quânticos supercondutores: os qubits são circuitos que se comportam como átomos artificiais, com níveis de energia quantizados que podemos controlar com pulsos de micro-ondas.
```

- [ ] **Step 2: Run build**

```bash
npm run build
```
Expected: build passes with module 2 now rendering.

- [ ] **Step 3: Commit**

```bash
git add content/modules/02-o-mundo-quantico.mdx
git commit -m "feat: add module 2 - O Mundo Quântico"
```

---

## Task 4: Module 3 — Qubits: Além do Bit

**Files:**
- Create: `content/modules/03-qubits-alem-do-bit.mdx`

- [ ] **Step 1: Create Module 3 MDX**

Create `content/modules/03-qubits-alem-do-bit.mdx`:

```mdx
## O que é um Qubit?

Um **qubit** (quantum bit) é a unidade básica de informação quântica. Assim como um bit clássico pode ser 0 ou 1, um qubit pode ser:

- **|0⟩** — estado base (análogo ao 0 clássico)
- **|1⟩** — estado excitado (análogo ao 1 clássico)
- **α|0⟩ + β|1⟩** — qualquer superposição dos dois, simultaneamente

Essa terceira possibilidade não existe na computação clássica. É ela que dá ao qubit seu poder.

## Superposição: Estar em Dois Lugares ao Mesmo Tempo

Matematicamente, um qubit em superposição é descrito por:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

Onde α e β são números complexos com |α|² + |β|² = 1.

- **|α|²** é a probabilidade de medir 0
- **|β|²** é a probabilidade de medir 1

Se α = β = 1/√2, o qubit tem 50% de chance de ser 0 e 50% de chance de ser 1. Mas enquanto não é medido, ele **é os dois ao mesmo tempo**.

![Animação: qubit em superposição](/images/quantum-bits-qubits1.gif)

![Transições de estado quântico](/images/quantum-bits-qubits2.gif)

## A Esfera de Bloch

A Esfera de Bloch é a representação visual mais intuitiva de um qubit. Cada ponto na superfície da esfera representa um estado quântico possível.

<svg viewBox="0 0 340 340" className="w-full max-w-sm mx-auto my-8">
  {/* Esfera */}
  <ellipse cx="170" cy="170" rx="130" ry="130" fill="none" stroke="#1e1e30" strokeWidth="2"/>
  {/* Elipse equatorial */}
  <ellipse cx="170" cy="170" rx="130" ry="40" fill="none" stroke="#1e1e30" strokeWidth="1.5" strokeDasharray="6"/>
  {/* Eixo vertical */}
  <line x1="170" y1="30" x2="170" y2="310" stroke="#1e1e30" strokeWidth="1.5" strokeDasharray="6"/>
  {/* Eixo horizontal */}
  <line x1="30" y1="170" x2="310" y2="170" stroke="#1e1e30" strokeWidth="1.5" strokeDasharray="6"/>

  {/* Polo norte - |0⟩ */}
  <circle cx="170" cy="38" r="6" fill="#06b6d4"/>
  <text x="188" y="34" fill="#06b6d4" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="bold">|0⟩</text>
  <text x="188" y="48" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">polo norte</text>

  {/* Polo sul - |1⟩ */}
  <circle cx="170" cy="302" r="6" fill="#8b5cf6"/>
  <text x="188" y="298" fill="#8b5cf6" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="bold">|1⟩</text>
  <text x="188" y="312" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">polo sul</text>

  {/* Estado de superposição */}
  <circle cx="240" cy="110" r="6" fill="#a78bfa"/>
  <line x1="170" y1="170" x2="240" y2="110" stroke="#a78bfa" strokeWidth="2.5"/>
  <text x="248" y="108" fill="#a78bfa" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">|ψ⟩</text>
  <text x="248" y="122" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">superposição</text>

  {/* Ângulo theta */}
  <path d="M 170 170 Q 185 145 195 138" fill="none" stroke="#475569" strokeWidth="1"/>
  <text x="195" y="155" fill="#475569" fontSize="11" fontFamily="Inter, sans-serif">θ</text>

  {/* Equador - superposição 50/50 */}
  <text x="32" y="165" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">equador</text>
  <text x="32" y="178" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">50/50</text>
</svg>

- **Polo norte** → |0⟩ (certeza de medir 0)
- **Polo sul** → |1⟩ (certeza de medir 1)
- **Equador** → superposição 50/50
- **Qualquer ponto** → superposição com probabilidades definidas pelo ângulo θ

**Portas quânticas** são rotações nessa esfera.

## Emaranhamento: A "Ação Fantasmagórica"

Albert Einstein chamou o emaranhamento de *Spukhafte Fernwirkung* — "ação fantasmagórica à distância". Ele achava impossível.

Estava errado.

Dois qubits emaranhados compartilham um único estado quântico. Medir um deles **instantaneamente** determina o estado do outro — independente da distância entre eles.

**Experimento de Aspect (1982):** Alain Aspect e sua equipe em Paris confirmaram experimentalmente que o emaranhamento é real. Fótons separados por dezenas de metros mostraram correlações que nenhuma teoria clássica consegue explicar. Aspect ganhou o Nobel de Física em 2022 por isso.

> ⚠️ **Importante:** O emaranhamento não permite transmissão de informação mais rápida que a luz. A correlação existe, mas o resultado de cada medição ainda é aleatório — você só descobre a correlação quando compara os resultados pelo canal clássico.

## Decoerência: O Inimigo do Qubit

A superposição é extremamente frágil. Qualquer interação com o ambiente — uma vibração, um fóton de calor, um campo eletromagnético — pode fazer o qubit "esquecer" que estava em superposição e colapsar para 0 ou 1.

Isso se chama **decoerência**.

É por isso que computadores quânticos operam a temperaturas próximas do zero absoluto (−273°C): reduzir ao máximo qualquer fonte de perturbação.

| Tipo de Qubit | Tempo de Coerência Típico |
|---------------|--------------------------|
| Supercondutor (IBM/Google) | 100–500 microsegundos |
| Íon aprisionado (IonQ) | Segundos a minutos |
| Fotônico | Femtossegundos a picossegundos |
| Spin nuclear (NMR) | Milissegundos a segundos |

Tempo de coerência maior = mais tempo para executar cálculos antes do qubit "desfazer" a superposição.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/03-qubits-alem-do-bit.mdx
git commit -m "feat: add module 3 - Qubits: Além do Bit"
```

---

## Task 5: Module 4 — A Linguagem Quântica

**Files:**
- Create: `content/modules/04-a-linguagem-quantica.mdx`

- [ ] **Step 1: Create Module 4 MDX**

Create `content/modules/04-a-linguagem-quantica.mdx`:

```mdx
## Por que precisamos de uma nova linguagem?

A física quântica descreve estados que não têm analogia na experiência cotidiana. Para isso, os físicos desenvolveram uma notação matemática compacta e poderosa: a **Notação de Dirac**, criada por Paul Dirac em 1939.

![Notação de Dirac](/images/dirac-notation.png)

## Ket, Bra e Braket

A notação usa três elementos:

**Ket `|ψ⟩`** — representa um estado quântico. É um vetor coluna:
```
|0⟩ = [1]    |1⟩ = [0]
      [0]          [1]
```

**Bra `⟨ψ|`** — o conjugado transposto do ket. É um vetor linha:
```
⟨0| = [1  0]    ⟨1| = [0  1]
```

**Braket `⟨φ|ψ⟩`** — produto interno entre dois estados. Representa a probabilidade de amplitude de transição de |ψ⟩ para |φ⟩.

Exemplos:
- `⟨0|0⟩ = 1` (estado |0⟩ medido como 0: certeza)
- `⟨1|0⟩ = 0` (estado |0⟩ medido como 1: impossível)

## Vetores de Estado

Os dois vetores base formam o chamado **espaço de Hilbert de dimensão 2** — o espaço matemático que descreve um qubit:

![Vetores base padrão](/images/standard-basis-vectors.png)

Um estado geral é uma combinação linear:
```
|ψ⟩ = α|0⟩ + β|1⟩ = [α]
                      [β]
```

**Exemplo:** o estado de Hadamard (superposição perfeita)
```
|+⟩ = (|0⟩ + |1⟩)/√2 = [1/√2]  ≈ [0.707]
                         [1/√2]    [0.707]
```

## Medição e Colapso

Medir um qubit em superposição é um ato irreversível.

![Medindo estados probabilísticos](/images/measuring-probabilistic-states.png)

Para o estado `|ψ⟩ = α|0⟩ + β|1⟩`:
- Probabilidade de obter **0** = |α|²
- Probabilidade de obter **1** = |β|²
- Após a medição, o qubit colapsa para |0⟩ ou |1⟩ — a superposição é destruída

**Você não pode clonar um estado quântico desconhecido.** O Teorema da Não-Clonagem (1982) prova que é impossível criar uma cópia perfeita de um estado quântico arbitrário sem destruir o original. Isso é uma limitação fundamental — e ao mesmo tempo um recurso para criptografia quântica.

## Informação Clássica vs. Quântica

<svg viewBox="0 0 680 220" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'16px'}}>
  {/* Cabeçalho */}
  <text x="170" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="bold">CLÁSSICO</text>
  <text x="510" y="30" textAnchor="middle" fill="#06b6d4" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="bold">QUÂNTICO</text>
  <line x1="20" y1="38" x2="660" y2="38" stroke="#1e1e30" strokeWidth="1"/>
  <line x1="340" y1="38" x2="340" y2="210" stroke="#1e1e30" strokeWidth="1"/>

  {/* Unidade básica */}
  <text x="170" y="62" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Bit: 0 ou 1</text>
  <text x="510" y="62" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Qubit: 0, 1 ou superposição</text>

  {/* Cópia */}
  <text x="170" y="92" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Cópia: trivial</text>
  <text x="510" y="92" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Cópia: impossível (No-Cloning)</text>

  {/* Medição */}
  <text x="170" y="122" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Medição: não perturba o estado</text>
  <text x="510" y="122" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Medição: colapsa o estado</text>

  {/* Informação paralela */}
  <text x="170" y="152" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">n bits: 1 estado por vez</text>
  <text x="510" y="152" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">n qubits: 2ⁿ estados simultâneos</text>

  {/* Erro */}
  <text x="170" y="182" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Ruído: simples de corrigir</text>
  <text x="510" y="182" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Ruído: requer QEC (correção complexa)</text>
</svg>

> 💡 **O poder do paralelismo:** 3 qubits em superposição representam 2³ = 8 estados simultaneamente. 300 qubits em superposição representam mais estados do que átomos no universo observável (2³⁰⁰ ≈ 10⁹⁰).
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/04-a-linguagem-quantica.mdx
git commit -m "feat: add module 4 - A Linguagem Quântica"
```

---

## Task 6: Module 5 — Portas e Algoritmos Quânticos

**Files:**
- Create: `content/modules/05-portas-e-algoritmos-quanticos.mdx`

- [ ] **Step 1: Create Module 5 MDX**

Create `content/modules/05-portas-e-algoritmos-quanticos.mdx`:

```mdx
## Portas Lógicas: Clássicas vs. Quânticas

Em computadores clássicos, operações são realizadas por **portas lógicas**: AND, OR, NOT, NAND. Em computadores quânticos, usamos **portas quânticas** — mas com diferenças fundamentais.

<svg viewBox="0 0 680 200" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'16px'}}>
  {/* Cabeçalho */}
  <text x="170" y="28" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">PORTAS CLÁSSICAS</text>
  <text x="510" y="28" textAnchor="middle" fill="#06b6d4" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">PORTAS QUÂNTICAS</text>
  <line x1="20" y1="36" x2="660" y2="36" stroke="#1e1e30" strokeWidth="1"/>
  <line x1="340" y1="36" x2="340" y2="190" stroke="#1e1e30" strokeWidth="1"/>

  <text x="170" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">AND, OR, NOT, NAND, XOR</text>
  <text x="510" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">X, H, CNOT, Toffoli, Phase</text>

  <text x="170" y="88" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Irreversíveis (AND: 2→1 bit)</text>
  <text x="510" y="88" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Reversíveis (sempre 1→1 qubit)</text>

  <text x="170" y="116" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Operam em bits: 0 ou 1</text>
  <text x="510" y="116" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Operam em superposições</text>

  <text x="170" y="144" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Matriz booleana (0s e 1s)</text>
  <text x="510" y="144" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Matriz unitária (complexa)</text>

  <text x="170" y="172" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">NAND é universal</text>
  <text x="510" y="172" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">H + CNOT + T é universal</text>
</svg>

## As Portas Fundamentais

**Porta X (NOT quântico)** — inverte o estado do qubit:
```
X|0⟩ = |1⟩    X|1⟩ = |0⟩

Matriz: X = [0  1]
            [1  0]
```

**Porta H (Hadamard)** — cria superposição perfeita:
```
H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩   (50% zero, 50% um)
H|1⟩ = (|0⟩ - |1⟩)/√2 = |−⟩

Matriz: H = 1/√2 × [1   1]
                    [1  -1]
```

**Porta CNOT (Controlled-NOT)** — emaranha dois qubits:
```
CNOT|00⟩ = |00⟩    CNOT|10⟩ = |11⟩
CNOT|01⟩ = |01⟩    CNOT|11⟩ = |10⟩
```
O primeiro qubit é o controle: só inverte o segundo se o primeiro for |1⟩.

**Porta Toffoli (CCNOT)** — controle duplo, inverte o terceiro qubit se os dois primeiros forem |1⟩. É o equivalente quântico do AND clássico — mas reversível.

**Portas de Fase (S, T)** — rotacionam a fase do qubit na esfera de Bloch sem alterar as probabilidades de medição. Essenciais para algoritmos mais avançados.

## Codificação Superdensa

A Codificação Superdensa usa emaranhamento para transmitir **2 bits clássicos** usando apenas **1 qubit**:

![Diagrama de Codificação Superdensa](/images/superdense-coding.png)

1. Alice e Bob compartilham um par de qubits emaranhados (Bell state)
2. Alice aplica uma de 4 portas no seu qubit, codificando 2 bits
3. Alice envia seu qubit para Bob
4. Bob mede os dois qubits e lê os 2 bits

Eficiência dobrada. Isso só é possível graças ao emaranhamento.

## O Primeiro Algoritmo com Vantagem Quântica

O **Algoritmo de Deutsch-Jozsa** (1992) foi o primeiro a demonstrar vantagem quântica real:

**Problema:** dada uma função f(x) que pode ser "constante" (sempre retorna 0 ou sempre 1) ou "balanceada" (retorna 0 metade das vezes e 1 na outra), determine qual é.

| Abordagem | Consultas à função |
|-----------|------------------|
| Clássico (pior caso) | 2ⁿ⁻¹ + 1 |
| Quântico (sempre) | **1** |

O computador quântico resolve em uma única consulta usando superposição e interferência. O clássico precisa testar metade de todos os possíveis inputs.

## IBM Quantum Composer

O IBM Quantum Composer é um editor visual gratuito de circuitos quânticos no navegador. Você pode arrastar e soltar portas, visualizar o estado do qubit na esfera de Bloch e executar em simulador ou hardware real.

👉 Acesse: [quantum-computing.ibm.com/composer](https://quantum-computing.ibm.com/composer/files/new)

**Experimento sugerido:** crie um circuito com uma porta H seguida de medição. Execute 1024 vezes. Veja os resultados oscilando próximo de 50/50 — isso é superposição em ação.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/05-portas-e-algoritmos-quanticos.mdx
git commit -m "feat: add module 5 - Portas e Algoritmos Quânticos"
```

---

## Task 7: Module 6 — O Desafio da Construção (NEW)

**Files:**
- Create: `content/modules/06-o-desafio-da-construcao.mdx`

- [ ] **Step 1: Create Module 6 MDX**

Create `content/modules/06-o-desafio-da-construcao.mdx`:

```mdx
## O Problema Central

Construir um computador quântico é um dos maiores desafios de engenharia da história da humanidade. O motivo: qubits são extremamente sensíveis a qualquer perturbação do ambiente.

Uma vibração. Um fóton de calor. Um campo eletromagnético externo. Qualquer um desses pode destruir o estado quântico do qubit em frações de segundo — isso se chama **decoerência**.

Para combater isso, computadores quânticos supercondutores operam a temperaturas que não existem naturalmente no universo.

## A Escala de Temperatura

<svg viewBox="0 0 680 300" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  {/* Barra de temperatura */}
  <defs>
    <linearGradient id="tempGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#06b6d4"/>
      <stop offset="40%" stopColor="#8b5cf6"/>
      <stop offset="100%" stopColor="#ef4444"/>
    </linearGradient>
  </defs>
  <rect x="40" y="120" width="600" height="30" fill="url(#tempGrad)" rx="4"/>

  {/* Marcadores */}
  {/* Qubits */}
  <line x1="55" y1="115" x2="55" y2="160" stroke="#06b6d4" strokeWidth="2"/>
  <text x="55" y="108" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="bold">Qubits IBM</text>
  <text x="55" y="96" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="Inter, sans-serif">0,015 K</text>
  <text x="55" y="84" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">−273,13°C</text>

  {/* Hélio líquido */}
  <line x1="130" y1="115" x2="130" y2="160" stroke="#a78bfa" strokeWidth="2"/>
  <text x="130" y="180" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="Inter, sans-serif">Hélio líquido</text>
  <text x="130" y="193" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">4 K / −269°C</text>

  {/* Nitrogênio */}
  <line x1="250" y1="115" x2="250" y2="160" stroke="#c4b5fd" strokeWidth="2"/>
  <text x="250" y="180" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="Inter, sans-serif">Nitrogênio liq.</text>
  <text x="250" y="193" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">77 K / −196°C</text>

  {/* Temperatura ambiente */}
  <line x1="430" y1="115" x2="430" y2="160" stroke="#f59e0b" strokeWidth="2"/>
  <text x="430" y="180" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="Inter, sans-serif">Temp. ambiente</text>
  <text x="430" y="193" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">293 K / 20°C</text>

  {/* Sol */}
  <line x1="630" y1="115" x2="630" y2="160" stroke="#ef4444" strokeWidth="2"/>
  <text x="630" y="108" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="bold">Superfície</text>
  <text x="630" y="96" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="Inter, sans-serif">do Sol</text>
  <text x="630" y="84" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">5.778 K</text>

  {/* Label eixo */}
  <text x="340" y="230" textAnchor="middle" fill="#475569" fontSize="11" fontFamily="Inter, sans-serif">← mais frio — — — — — mais quente →</text>
  <text x="340" y="260" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">Os qubits IBM operam mais frios que o espaço sideral (2,7 K)</text>
</svg>

O espaço sideral fica a cerca de 2,7 K. Os qubits supercondutores da IBM operam a **0,015 K** — quase 200 vezes mais frios que o vácuo do espaço.

Para alcançar isso, usa-se um equipamento chamado **diluição criogênica** (dilution refrigerator) — um sistema de resfriamento especialíssimo, do tamanho de uma geladeira, que custa entre US$500.000 e US$2 milhões.

## As 4 Tecnologias de Qubit

Não existe uma única forma de fazer um qubit. Diferentes empresas apostam em diferentes abordagens:

### 1. Supercondutores (IBM, Google, Rigetti)
Circuitos de supercondução resfriados a millikelvins. O qubit é formado por uma junção Josephson — um componente que se comporta como um átomo artificial com níveis de energia quantizados.

- ✅ Fabricação com técnicas similares a chips clássicos
- ✅ Controle por pulsos de micro-ondas
- ❌ Precisa de criogenia extrema
- ❌ Tempo de coerência limitado (microssegundos)

### 2. Íons Aprisionados (IonQ, Quantinuum, Oxford)
Átomos individuais (geralmente íterbio ou bário) suspensos por campos eletromagnéticos no vácuo e controlados por lasers.

- ✅ Tempo de coerência longo (segundos a minutos)
- ✅ Qubits idênticos por natureza (todos são o mesmo tipo de átomo)
- ❌ Portas mais lentas que supercondutores
- ❌ Difícil de escalar para muitos qubits

### 3. Fotônica (PsiQuantum, Xanadu)
Qubits codificados em fótons (partículas de luz). Podem operar em temperatura ambiente para partes do sistema.

- ✅ Operação em temperatura próxima do ambiente (parcialmente)
- ✅ Integração com telecomunicações de fibra óptica
- ❌ Difícil de criar interações controladas entre fótons
- ❌ Ainda em fase inicial de desenvolvimento prático

### 4. Topológicos (Microsoft)
Usa quasipartículas chamadas **férmions de Majorana** — partículas que são sua própria antipartícula. O qubit é codificado de forma distribuída, tornando-o inerentemente mais protegido contra erros.

- ✅ Proteção topológica: muito mais resistente a erros
- ✅ Potencial de longas coerências sem criogenia tão extrema
- ❌ Tecnologia ainda não demonstrada em escala
- ❌ Microsoft anunciou avanços em 2023–2025, mas ainda em P&D

## Correção de Erros Quânticos (QEC)

O maior problema prático: qubits cometem erros. Muito mais do que transistores clássicos.

Em computadores clássicos, redundância simples basta: copie o bit 3 vezes, veja qual maioria diz.

Em computadores quânticos, isso não funciona — você não pode copiar um qubit (Teorema da Não-Clonagem).

A solução é o **Quantum Error Correction (QEC)**: distribuir a informação de um único qubit lógico entre vários qubits físicos de forma que erros possam ser detectados sem colapsar o estado quântico.

| Código de Correção | Qubits físicos por qubit lógico |
|-------------------|---------------------------------|
| Código de superfície (Google/IBM) | ~1.000 |
| Código de Steane | 7 |
| Código de Shor | 9 |

Na prática: para rodar um algoritmo útil que exigiria 1.000 qubits lógicos livres de erro, você precisaria de **1 milhão de qubits físicos** com os códigos atuais.

O IBM Condor tem 1.121 qubits físicos. Estamos no início.

> 💡 **Por que isso importa:** a diferença entre os qubits "ruidosos" de hoje e os qubits lógicos com correção de erro total é a diferença entre uma calculadora quebrada e um supercomputador. Os próximos 10 anos são sobre fechar esse gap.

## Hardware Real: O Criostato IBM

<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/IBM_Q_quantum_computer.jpg/800px-IBM_Q_quantum_computer.jpg"
  alt="Criostato do computador quântico IBM Q System One"
  className="w-full rounded-xl border border-border my-6"
/>

O que parece uma escultura de arte moderna é, na verdade, um dos sistemas de engenharia mais sofisticados do mundo. Cada camada cilíndrica representa um estágio de resfriamento progressivo — da temperatura ambiente (topo) até os 15 millikelvins onde os qubits vivem (fundo).
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/06-o-desafio-da-construcao.mdx
git commit -m "feat: add module 6 - O Desafio da Construção"
```

---

## Task 8: Module 7 — A Corrida Quântica (NEW)

**Files:**
- Create: `content/modules/07-a-corrida-quantica.mdx`

- [ ] **Step 1: Create Module 7 MDX**

Create `content/modules/07-a-corrida-quantica.mdx`:

```mdx
## A Nova Corrida Espacial

Nos anos 1960, EUA e URSS gastaram bilhões para chegar à Lua primeiro. Hoje, a mesma lógica de poder geopolítico se aplica à computação quântica.

Quem dominar a computação quântica primeiro terá vantagem estratégica em:
- Quebra de criptografias militares adversárias
- Simulação de novos materiais e armas
- Otimização de cadeias de suprimento e logística militar
- Descoberta de medicamentos e vantagem em saúde pública

## Google: O Momento da Supremacia

**Setembro de 2019.** O Google publicou na revista *Nature* um resultado que chocou o mundo:

O processador quântico **Sycamore** (53 qubits) realizou uma tarefa específica em **200 segundos**. O supercomputador Summit, então o mais poderoso do mundo, levaria **10.000 anos** para fazer o mesmo.

<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sycamore_Processor.png/800px-Sycamore_Processor.png"
  alt="Processador quântico Google Sycamore"
  className="w-full rounded-xl border border-border my-6"
/>

*Ressalva importante:* a tarefa era artificial — calculada especificamente para ser fácil para o Sycamore e difícil para o clássico. O IBM questionou o resultado, dizendo que o clássico poderia fazer em 2,5 dias com técnicas diferentes. Mas o impacto simbólico foi real.

**2024 — Google Willow:** o próximo salto. O chip Willow de 105 qubits completou um benchmark em 5 minutos que levaria 10 septilhões (10²⁵) de anos para o clássico. Google afirmou também ter reduzido erros à medida que adicionou qubits — um marco histórico na correção de erros.

## IBM: O Roadmap Mais Ambicioso

A IBM tem o programa quântico mais transparente do setor, com um roadmap público detalhado:

| Ano | Chip | Qubits |
|-----|------|--------|
| 2019 | Falcon | 27 |
| 2021 | Eagle | 127 |
| 2022 | Osprey | 433 |
| 2023 | Condor | 1.121 |
| 2023 | Heron | 133 (menor, mas mais preciso) |
| 2025+ | Kookaburra | 4.158 (projetado) |

A estratégia IBM mudou: mais qubits nem sempre é melhor. O foco agora está em **qualidade** — qubits com menos erros e maior tempo de coerência — e em interligar múltiplos processadores em rede.

O IBM Quantum Network conecta mais de 200 organizações ao redor do mundo com acesso a hardware quântico real via nuvem.

## Microsoft: A Aposta Topológica

A Microsoft tomou a decisão mais arriscada e potencialmente mais recompensadora do setor: em vez de competir com supercondutores, está desenvolvendo uma arquitetura completamente diferente baseada em **qubits topológicos**.

Em 2025, a Microsoft anunciou ter criado o primeiro **topological qubit** operacional baseado em férmions de Majorana — partículas exóticas que existem na fronteira de materiais supercondutores especiais.

A vantagem: qubits topológicos têm proteção natural contra erros, reduzindo drasticamente a necessidade de correção de erros. Se funcionar em escala, a Microsoft poderia pular vários anos de desenvolvimento que seus concorrentes levarão para alcançar.

## China: O Maior Investimento Público

A China investiu mais de **US$15 bilhões** em computação quântica através de programas governamentais — o maior investimento público único do setor.

**Jiuzhang (2020):** computador quântico fotônico chinês. Realizou uma tarefa em 200 segundos que um clássico levaria 600 milhões de anos.

**Zuchongzhi 2.1 (2021):** processador supercondutor de 66 qubits que superou o Sycamore em tarefas similares.

A China também lidera em **comunicações quânticas**: possui a maior rede de comunicação quântica do mundo (2.000 km) e o primeiro satélite de comunicação quântica (Micius).

## As Startups que Desafiam os Gigantes

| Empresa | País | Tecnologia | Destaque |
|---------|------|-----------|---------|
| IonQ | EUA | Íons aprisionados | Primeira empresa quântica na bolsa (NYSE) |
| Quantinuum | EUA/UK | Íons aprisionados | H2: 56 qubits, menor taxa de erro do setor |
| Rigetti | EUA | Supercondutores | Pioneer em computação quântica como serviço |
| PsiQuantum | EUA | Fotônica | Parceria com GlobalFoundries para chips em escala |
| D-Wave | Canadá | Annealing quântico | Foco em otimização, já com clientes reais |

## Timeline da Corrida

<svg viewBox="0 0 720 200" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  <line x1="40" y1="100" x2="690" y2="100" stroke="#1e1e30" strokeWidth="2"/>
  <polygon points="690,94 703,100 690,106" fill="#1e1e30"/>

  {/* 2019 */}
  <circle cx="90" cy="100" r="7" fill="#8b5cf6"/>
  <line x1="90" y1="93" x2="90" y2="50" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="90" y="42" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2019</text>
  <text x="90" y="28" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Google Sycamore</text>

  {/* 2020 */}
  <circle cx="190" cy="100" r="7" fill="#8b5cf6"/>
  <line x1="190" y1="107" x2="190" y2="150" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="190" y="162" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2020</text>
  <text x="190" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">China Jiuzhang</text>

  {/* 2022 */}
  <circle cx="330" cy="100" r="7" fill="#06b6d4"/>
  <line x1="330" y1="93" x2="330" y2="50" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="330" y="42" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2022</text>
  <text x="330" y="28" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">IBM Osprey 433q</text>

  {/* 2023 */}
  <circle cx="460" cy="100" r="7" fill="#06b6d4"/>
  <line x1="460" y1="107" x2="460" y2="150" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="460" y="162" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2023</text>
  <text x="460" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">IBM Condor 1121q</text>

  {/* 2024 */}
  <circle cx="580" cy="100" r="9" fill="#a78bfa"/>
  <line x1="580" y1="93" x2="580" y2="50" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="580" y="42" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2024</text>
  <text x="580" y="28" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold">Google Willow</text>
  <text x="580" y="14" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">QEC milestone</text>
</svg>

> 💡 **O que esperar:** analistas projetam que computadores quânticos capazes de resolver problemas comercialmente relevantes (além de benchmarks artificiais) devem aparecer entre 2027 e 2033, quando a correção de erros estiver madura o suficiente.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/07-a-corrida-quantica.mdx
git commit -m "feat: add module 7 - A Corrida Quântica"
```

---

## Task 9: Module 8 — A Ameaça à Criptografia (NEW)

**Files:**
- Create: `content/modules/08-a-ameaca-a-criptografia.mdx`

- [ ] **Step 1: Create Module 8 MDX**

Create `content/modules/08-a-ameaca-a-criptografia.mdx`:

```mdx
## Como a Internet é Protegida Hoje

Toda vez que você acessa um site com "https://", envia um WhatsApp ou faz um PIX, sua comunicação é protegida por criptografia. A base dessa proteção é um problema matemático simples de formular, mas **extremamente difícil de resolver**.

**O problema da fatoração:** dado um número enorme N = p × q (produto de dois primos grandes), encontre p e q.

- Multiplicar dois primos de 1024 bits: fração de segundo
- Fatorar o resultado: com computadores clássicos atuais, levaria **bilhões de anos**

É nessa assimetria que o RSA — o algoritmo de criptografia mais usado na internet — se apoia desde 1977.

<svg viewBox="0 0 680 220" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  {/* Alice */}
  <rect x="20" y="80" width="100" height="60" rx="8" fill="#1e1e30" stroke="#8b5cf6" strokeWidth="1.5"/>
  <text x="70" y="106" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">Alice</text>
  <text x="70" y="122" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">mensagem</text>

  {/* Criptografia */}
  <rect x="170" y="70" width="140" height="80" rx="8" fill="#1e1e30" stroke="#8b5cf6" strokeWidth="1.5"/>
  <text x="240" y="100" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="bold">Criptografia</text>
  <text x="240" y="116" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">RSA / AES</text>
  <text x="240" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">chave pública</text>

  {/* Canal */}
  <line x1="120" y1="110" x2="170" y2="110" stroke="#475569" strokeWidth="2"/>
  <line x1="310" y1="110" x2="380" y2="110" stroke="#475569" strokeWidth="2"/>
  <rect x="380" y="90" width="120" height="40" rx="4" fill="#13131f" stroke="#475569" strokeWidth="1" strokeDasharray="4"/>
  <text x="440" y="106" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Inter, sans-serif">🔒 dados</text>
  <text x="440" y="120" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Inter, sans-serif">cifrados</text>
  <line x1="500" y1="110" x2="560" y2="110" stroke="#475569" strokeWidth="2"/>

  {/* Bob */}
  <rect x="560" y="80" width="100" height="60" rx="8" fill="#1e1e30" stroke="#06b6d4" strokeWidth="1.5"/>
  <text x="610" y="106" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="bold">Bob</text>
  <text x="610" y="122" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, sans-serif">chave privada</text>

  {/* Atacante */}
  <rect x="390" y="165" width="100" height="40" rx="6" fill="#1e1e30" stroke="#ef4444" strokeWidth="1.5"/>
  <text x="440" y="181" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="Inter, sans-serif">👾 Atacante</text>
  <text x="440" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">vê texto cifrado</text>
  <line x1="440" y1="130" x2="440" y2="165" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
</svg>

## O Algoritmo de Shor: A Ameaça

Em 1994, Peter Shor — matemático do Bell Labs — publicou um algoritmo para computadores quânticos capaz de fatorar números grandes de forma **exponencialmente mais rápida** que qualquer método clássico conhecido.

Um número RSA-2048 (o padrão atual):
- Computador clássico: **bilhões de anos**
- Computador quântico com Shor: **horas a dias**

O catch: o algoritmo de Shor precisa de um computador quântico com **milhões de qubits lógicos** (tolerantes a erros). Hoje temos alguns milhares de qubits físicos ruidosos.

**Ainda estamos seguros? Sim — por enquanto.** Mas o relógio está contando.

## Y2Q: O Prazo que Ninguém Sabe Ao Certo

Y2Q (Years to Quantum) é o termo para o momento em que computadores quânticos serão capazes de quebrar criptografias atuais. Estimativas variam drasticamente:

| Fonte | Estimativa Y2Q |
|-------|---------------|
| NIST (EUA) | 10–15 anos |
| Analistas mais pessimistas | 5–8 anos |
| Analistas mais otimistas | 20–30 anos |
| IBM (com QEC madura) | ~2033–2038 |

A incerteza é enorme. Mas há um problema muito mais urgente:

## "Harvest Now, Decrypt Later"

Agências de inteligência e atores maliciosos provavelmente já estão coletando dados cifrados hoje — com planos de descriptografá-los quando o computador quântico estiver disponível.

Isso é crítico para:
- **Segredos de Estado** (classificados por décadas)
- **Registros médicos** (dados sensíveis para sempre)
- **Segredos comerciais** (propriedade intelectual)
- **Comunicações diplomáticas**

Se um dado criptografado hoje precisar continuar secreto por 20 anos, ele já está em risco.

## A Resposta: Criptografia Pós-Quântica

Em 2024, o **NIST** (Instituto Nacional de Padrões dos EUA) padronizou os primeiros algoritmos resistentes a ataques quânticos:

| Algoritmo | Uso | Base matemática |
|-----------|-----|----------------|
| **CRYSTALS-Kyber** | Troca de chaves | Lattices (reticulados) |
| **CRYSTALS-Dilithium** | Assinaturas digitais | Lattices |
| **FALCON** | Assinaturas digitais | Lattices NTRU |
| **SPHINCS+** | Assinaturas digitais | Hash functions |

Esses algoritmos são difíceis tanto para computadores clássicos quanto para quânticos. A migração para eles já começou em governos e grandes empresas.

> ⚠️ **O medo do colapso da internet:** se o Y2Q chegar antes da migração para pós-quântica estar completa, praticamente toda comunicação digital cifrada com RSA/ECC (HTTPS, VPNs, emails, apps de banco) ficaria vulnerável. É por isso que a migração está sendo tratada como urgência de segurança nacional em vários países.

## O Que Está Sendo Feito

- 🇺🇸 **EUA:** memorando da Casa Branca (2022) exigiu que agências governamentais migrem para pós-quântico até 2035
- 🇪🇺 **União Europeia:** programa ENISA de migração pós-quântica em andamento
- 🏦 **Bancos:** grandes bancos já testam criptografia pós-quântica em sistemas críticos
- 🔒 **Signal, Apple, Google:** já implementaram camadas pós-quânticas em protocolos de mensageria (PQXDH, Kyber)

A revolução já começou — silenciosamente.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/08-a-ameaca-a-criptografia.mdx
git commit -m "feat: add module 8 - A Ameaça à Criptografia"
```

---

## Task 10: Module 9 — Programando com Qiskit (Expanded)

**Files:**
- Create: `content/modules/09-programando-com-qiskit.mdx`

- [ ] **Step 1: Create Module 9 MDX**

Create `content/modules/09-programando-com-qiskit.mdx`:

```mdx
## O que é Qiskit?

Qiskit é o SDK open-source da IBM para computação quântica, lançado em 2017. Com ele você pode:

- Criar circuitos quânticos em Python
- Simular localmente com ruído realista
- Executar em hardware quântico real via IBM Quantum Cloud
- Visualizar estados quânticos e resultados

![Linguagem de programação quântica](/images/linguagem-quantica.png)

## Instalação

```bash
pip install qiskit
pip install qiskit-aer          # simulador local (inclui modelos de ruído)
pip install qiskit-ibm-runtime  # acesso ao hardware IBM Quantum
pip install matplotlib          # visualizações
```

## Circuito 1: Superposição Simples

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Cria circuito: 1 qubit, 1 bit clássico
qc = QuantumCircuit(1, 1)

# Porta Hadamard: coloca qubit em superposição perfeita
qc.h(0)

# Medição
qc.measure(0, 0)

# Visualiza o circuito
print(qc.draw())
# ┌───┐ ░ ┌─┐
# ┤ H ├─░─┤M├
# └───┘ ░ └─┘

# Simula 1024 vezes
sim = AerSimulator()
result = sim.run(qc, shots=1024).result()
print(result.get_counts())
# Esperado: {'0': ~512, '1': ~512}
```

## Circuito 2: Estado de Bell (Emaranhamento)

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)

# Hadamard no qubit 0 → superposição
qc.h(0)

# CNOT: emaranha os dois qubits
qc.cx(0, 1)

# Mede os dois
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
result = sim.run(qc, shots=1024).result()
counts = result.get_counts()
print(counts)
# Esperado: {'00': ~512, '11': ~512}
# Nunca '01' ou '10' — os qubits estão emaranhados!
```

O resultado {'00': ~512, '11': ~512} demonstra o emaranhamento: os qubits **sempre** são medidos iguais — ambos 0 ou ambos 1 — independente de quantas vezes você rodar.

## Circuito 3: Algoritmo de Grover (Busca Quântica)

O algoritmo de Grover resolve o problema de **busca em um banco de dados não estruturado** com vantagem quadrática:

| Abordagem | Buscas necessárias |
|-----------|-------------------|
| Clássico (pior caso) | N buscas |
| Quântico (Grover) | √N buscas |

Para 1 milhão de itens: clássico = 1.000.000 buscas, Grover = ~1.000.

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
import numpy as np

# Grover em 2 qubits buscando |11⟩
qc = QuantumCircuit(2, 2)

# Passo 1: Hadamard em todos — superposição uniforme
qc.h([0, 1])

# Passo 2: Oráculo — marca |11⟩ com fase negativa
qc.cz(0, 1)

# Passo 3: Difusão — amplifica o estado marcado
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])

# Medição
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
result = sim.run(qc, shots=1024).result()
print(result.get_counts())
# Esperado: {'11': ~1024} — Grover amplificou o estado correto!
```

## Executando em Hardware Real

Para rodar em um computador quântico real da IBM:

```python
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2 as Sampler

# Autentique com sua conta IBM Quantum (gratuita em quantum.ibm.com)
service = QiskitRuntimeService(channel="ibm_quantum", token="SEU_TOKEN_AQUI")

# Escolhe o backend menos ocupado
backend = service.least_busy(operational=True, simulator=False)
print(f"Usando: {backend.name}")

# Compila o circuito para o hardware específico
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager
pm = generate_preset_pass_manager(backend=backend, optimization_level=1)
isa_circuit = pm.run(qc)

# Executa
sampler = Sampler(backend)
job = sampler.run([isa_circuit], shots=1024)
result = job.result()
print(result[0].data.c.get_counts())
```

> 💡 **Dica:** no hardware real, os resultados serão mais "ruidosos" — você verá alguns '01' e '10' que não deveriam existir. Isso é o ruído quântico em ação. É normal, e é exatamente o problema que a correção de erros resolve.

## Recursos para Continuar

- 📚 [IBM Quantum Learning](https://learning.quantum.ibm.com) — cursos gratuitos do introdutório ao avançado
- 🖥️ [IBM Quantum](https://quantum.ibm.com) — conta gratuita com acesso a hardware real
- 📖 [Qiskit Textbook](https://qiskit.org/learn) — livro completo open-source
- 🎥 [Canal Qiskit no YouTube](https://www.youtube.com/@qiskit) — tutoriais e palestras
- 🧪 [IBM Quantum Composer](https://quantum.ibm.com/composer) — editor visual de circuitos
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/09-programando-com-qiskit.mdx
git commit -m "feat: add module 9 - Programando com Qiskit"
```

---

## Task 11: Module 10 — Além do Computador Quântico

**Files:**
- Create: `content/modules/10-alem-do-computador-quantico.mdx`

- [ ] **Step 1: Create Module 10 MDX**

Create `content/modules/10-alem-do-computador-quantico.mdx`:

```mdx
## Quantum Vai Além da Computação

A mecânica quântica não é só computadores. Suas propriedades — superposição, emaranhamento, interferência — estão sendo exploradas em tecnologias que já mudam o mundo, muitas sem precisar de criogenia extrema.

## Ressonância Magnética Nuclear (RMN)

A **Ressonância Magnética Nuclear** é, tecnicamente, um computador quântico analógico. Ela usa os spins quânticos dos núcleos de hidrogênio no corpo humano para gerar imagens de tecidos moles com precisão incrível.

Como funciona:
1. Um campo magnético intenso alinha os spins dos prótons de hidrogênio
2. Pulsos de radiofrequência perturbam o alinhamento
3. Quando os prótons relaxam, emitem sinais de radiofrequência
4. Um computador reconstrói a imagem a partir dos sinais

**Temperatura de operação:** ambiente. Sem criogenia.

O campo magnético (o ímã supercondutivo) precisa de resfriamento, mas os fenômenos quânticos acontecem nos átomos do seu corpo — à 37°C.

> 💡 **Curiosidade:** o nome "ressonância magnética" substituiu "ressonância magnética nuclear" nos hospitais para não assustar os pacientes com a palavra "nuclear". A física é a mesma.

## Sensores Quânticos

Os sensores quânticos exploram a sensibilidade extrema dos estados quânticos para medir grandezas físicas com precisão sem precedentes.

| Sensor Quântico | O que mede | Aplicação |
|-----------------|------------|-----------|
| Gravímetro quântico | Variações gravitacionais | Detecção de petróleo/água subterrânea, navegação sem GPS |
| Magnetômetro quântico | Campos magnéticos fracos | Detecção de submarinos, neurociência (MEG) |
| Relógio atômico quântico | Tempo (frequência de transição atômica) | GPS, telecomunicações, internet |
| Interferômetro de átomos | Aceleração e rotação | Navegação inercial de precisão |

### Relógios Atômicos

O GPS funciona porque satélites carregam relógios atômicos (baseados em transições quânticas do césio-133) precisos a **1 nanossegundo por dia**.

Sem essa precisão quântica:
- O GPS derivaria metros por hora
- A internet global seria impossível (sincronização de pacotes)
- Transações financeiras de alta frequência falhariam

Cada vez que você usa o Google Maps, você está usando computação quântica — nos relógios que tornam o GPS possível.

## Internet Quântica e Teletransporte

O **teletransporte quântico** já foi demonstrado experimentalmente. Mas não funciona como no Star Trek.

O que realmente acontece: o **estado quântico** de uma partícula é transferido para outra partícula distante — mas não a partícula em si, e não mais rápido que a luz.

**Como funciona:**
1. Alice e Bob compartilham um par de partículas emaranhadas
2. Alice emaranha sua partícula (a ser teleportada) com a sua metade do par
3. Alice mede e obtém 2 bits clássicos
4. Alice envia esses 2 bits para Bob pelo canal clássico (limitado à velocidade da luz)
5. Bob aplica a operação correta à sua partícula e a recebe no estado original

O estado foi teleportado. A informação clássica viajou pelo canal comum. Nada viajou mais rápido que a luz.

**Internet quântica** usará emaranhamento e teletransporte quântico para criar redes de comunicação **absolutamente invioláveis** por princípio físico — não por dificuldade matemática.

A China tem a maior rede de comunicação quântica operacional do mundo (2.000 km de fibra + satélite Micius).

## Aplicações Reais: Empresas que Já Usam

**Mercedes-Benz** — otimização de rotas de produção e simulação de materiais para baterias de VE com parceria com IBM Quantum.

**Airbus** — otimização de rotas de voo e carregamento de bagagens com computação quântica.

**BBVA (banco)** — modelos de risco financeiro e detecção de fraude com algoritmos quânticos.

**Roche e Boehringer Ingelheim** — simulação molecular para descoberta de novos medicamentos usando parceria com IBM e Google.

**Goldman Sachs e JPMorgan** — precificação de derivativos financeiros e otimização de portfólios.

![IBM Q System One](/images/IBM-Q-System-One-display.png)

![Computador quântico IBM](/images/computador-quantico-IBM-1.png)

## Radar Quântico

Radares quânticos usam fótons emaranhados para detectar objetos furtivos (stealth) com muito menos ruído que radares convencionais.

A teoria: fótons emaranhados são tão sensíveis a perturbações que qualquer reflexo — mesmo mínimo — de um objeto pode ser detectado acima do ruído de fundo.

Ainda em fase de pesquisa, mas com implicações militares significativas se for viável em escala.

## O Futuro: Timeline

<svg viewBox="0 0 720 200" className="w-full my-8 rounded-xl" style={{background:'#13131f', padding:'20px'}}>
  <line x1="40" y1="100" x2="690" y2="100" stroke="#1e1e30" strokeWidth="2"/>
  <polygon points="690,94 703,100 690,106" fill="#1e1e30"/>

  <circle cx="100" cy="100" r="7" fill="#8b5cf6"/>
  <line x1="100" y1="93" x2="100" y2="50" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="100" y="42" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2025–2027</text>
  <text x="100" y="28" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">Vantagem quântica</text>
  <text x="100" y="16" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">em otimização</text>

  <circle cx="250" cy="100" r="7" fill="#8b5cf6"/>
  <line x1="250" y1="107" x2="250" y2="155" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="250" y="168" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2027–2030</text>
  <text x="250" y="182" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">QEC madura</text>

  <circle cx="420" cy="100" r="8" fill="#06b6d4"/>
  <line x1="420" y1="93" x2="420" y2="50" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="420" y="42" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2030–2033</text>
  <text x="420" y="28" textAnchor="middle" fill="#06b6d4" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold">Simulação molecular</text>
  <text x="420" y="14" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">para fármacos</text>

  <circle cx="590" cy="100" r="8" fill="#06b6d4"/>
  <line x1="590" y1="107" x2="590" y2="155" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4"/>
  <text x="590" y="168" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="Inter, sans-serif">2035+</text>
  <text x="590" y="182" textAnchor="middle" fill="#06b6d4" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="bold">Y2Q potencial</text>
</svg>

## Por Onde Começar?

A janela para aprender computação quântica está aberta agora. As primeiras gerações de especialistas que combinarem física quântica com programação serão imensamente valorizadas.

- 🎓 **Estudante:** comece com Qiskit (gratuito) e o IBM Quantum Learning
- 💻 **Desenvolvedor:** explore o IBM Quantum Network e o Amazon Braket
- 🔬 **Pesquisador:** papers no arXiv.org, categoria quant-ph
- 🏢 **Empresa:** o IBM Quantum Network conecta mais de 200 organizações a hardware real

A computação quântica não vai substituir o programador — vai criar uma nova categoria de profissional. E o melhor momento para se preparar é antes da demanda explodir.
```

- [ ] **Step 2: Commit**

```bash
git add content/modules/10-alem-do-computador-quantico.mdx
git commit -m "feat: add module 10 - Além do Computador Quântico"
```

---

## Task 12: Final Verification and Push

**Files:** none (verification only)

- [ ] **Step 1: Run full test suite**

```bash
npm test
```
Expected: 9 tests passing (updated for 10 modules)

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: 16 static pages (/, /trilha, 10 module pages, /_not-found + Next.js internal). All 10 module routes must appear.

- [ ] **Step 3: Verify all module files exist**

```bash
ls content/modules/
```
Expected: exactly 10 files, numbered 01 through 10, with new slugs.

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```
Expected: push succeeds. Vercel auto-deploys from the push.

- [ ] **Step 5: Verify Vercel deploy**

Wait 2-3 minutes for Vercel to build, then open the production URL. Verify:
- Home page loads
- /trilha shows all 10 modules with correct titles
- Navigate to module 2 (O Mundo Quântico) — verify the double-slit SVG renders
- Navigate to module 6 — verify the temperature scale SVG and the IBM cryostat image (external URL) loads
- Navigate to module 7 — verify the Google Sycamore image (external URL) loads
- Navigate to module 8 — verify the RSA flow SVG renders
- Prev/Next navigation works across all 10 modules
