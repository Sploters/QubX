# Design: Integração de Animações Quânticas no QubX

**Data:** 2026-04-24  
**Status:** Aprovado

---

## Objetivo

Portar 5 animações interativas do diretório `refs/` para o site QubX como componentes TypeScript React, integrando-as nos módulos MDX correspondentes. Adicionalmente, incorporar o texto explicativo das 17 cenas das refs no prose dos módulos MDX onde for relevante.

---

## Arquitetura

### Novos arquivos

```
lib/
  animation-helpers.ts          ← project3D, useClock, ProbBar (TypeScript, portado de refs/scenes/helpers.jsx)

components/mdx/
  BitVsQubit.tsx                ← SUBSTITUÍDO pela Cena 01 (bit clássico piscando + mini esfera de Bloch animada)
  BlochSphere.tsx               ← NOVO · Cena 02 (esfera interativa arrastável + 6 preset buttons)
  EntanglementBell.tsx          ← NOVO · Cena 06 (Alice/Bob emaranhados, medir, histograma)
  DoubleSlit.tsx                ← NOVO · Cena 13 (dupla fenda, toggle observador, acúmulo de partículas)
  QuantumWalk.tsx               ← NOVO · Cena 15 (caminhada clássica vs quântica, 38 passos)
  index.tsx                     ← exporta os 4 novos componentes adicionalmente

app/modulo/[slug]/page.tsx      ← adiciona BlochSphere, EntanglementBell, DoubleSlit, QuantumWalk ao mdxComponents
```

### Arquivos de conteúdo modificados

```
content/modules/
  01-a-nova-era-da-computacao.mdx     ← texto cena 01 + <BitVsQubit />
  02-o-mundo-quantico.mdx             ← texto cenas 13 + <DoubleSlit />
  03-qubits-alem-do-bit.mdx           ← texto cenas 02, 03, 04, 06, 16, 17 + <BlochSphere /> + <EntanglementBell />
  05-portas-e-algoritmos-quanticos.mdx← texto cenas 05, 07, 11
  06-o-desafio-da-construcao.mdx      ← texto cenas 08, 09
  08-a-ameaca-a-criptografia.mdx      ← texto cenas 10, 14
  10-alem-do-computador-quantico.mdx  ← texto cenas 12, 15 + <QuantumWalk />
```

---

## Mapeamento de Cores

As CSS variables das refs são mapeadas para hex direto, correspondendo ao tema QubX:

| Refs (`var(--*)`) | Hex |
|---|---|
| `--cyan` | `#06b6d4` |
| `--magenta` | `#ec4899` |
| `--amber` | `#f59e0b` |
| `--bg-2` | `#13131f` |
| `--bg-3` | `#1e1e30` |
| `--line` | `#1e1e30` |
| `--line-2` | `#2d2d45` |
| `--ink` | `#f1f5f9` |
| `--ink-2` | `#94a3b8` |
| `--ink-3` | `#475569` |
| `--green` | `#22c55e` |
| `--red` | `#ef4444` |

---

## Componentes: Especificação

### `lib/animation-helpers.ts`

Exporta:
- `project3D(x, y, z, yaw, pitch, scale, cx?, cy?): { x: number, y: number, z: number }` — projeção ortográfica 3D→2D com rotação yaw+pitch
- `useClock({ duration, loop }): { t, setT, play, setPlay, duration }` — hook de animação com requestAnimationFrame
- `ProbBar({ value, color, label, highlight }): JSX.Element` — barra de probabilidade para histogramas

### `components/mdx/BitVsQubit.tsx`

Substitui o existente. Layout flex-row (md+) / flex-col (mobile). Sem props.

- **Painel esquerdo:** bit clássico piscando 0/1 a cada ~1.5s via `useClock`, dentro de círculo com borda `#1e1e30`
- **Painel direito:** mini esfera de Bloch SVG (260×260) com vetor de estado animado usando `project3D`, polos |0⟩/|1⟩ coloridos
- Autoplay loop, sem scrubber nem interação do usuário
- Wrapper: `border border-border rounded-2xl bg-surface/20`

### `components/mdx/BlochSphere.tsx`

Drag para rotacionar (yaw/pitch via onMouseDown + window mousemove/mouseup). Sem props.

- SVG 460×460, responsivo via `maxWidth: 460` + `width: 100%`
- 6 botões preset: |0⟩, |1⟩, |+⟩, |−⟩, |+i⟩, |−i⟩ com animação de transição easeInOutQuad em 600ms
- Linhas de latitude + meridianos + eixos com labels
- Exibe θ e φ em graus abaixo do SVG
- Vetor de estado em amber (`#f59e0b`), polos em cyan/magenta

### `components/mdx/EntanglementBell.tsx`

3 botões: "Medir Alice", "↺ Reemaranhar", "Rodar 200×". Sem props.

- Estado: `phase` (ready | measuringA | done), `aliceResult`, `bobResult`, `history`
- Linha de emaranhamento animada (wave SVG em ready, pulso em measuringA, tracejada em done)
- Dois `QubitNode` (Alice/Bob): círculo com superposição flutuando quando em ready, resultado colorido quando medido
- Histograma de até 80 medições recentes + barras de concordância/discordância com `ProbBar`

### `components/mdx/DoubleSlit.tsx`

Sem props. Estado: `observed`, `hits[]`, `running`.

- SVG principal com fonte emissora, barreira com 2 fendas, tela de detecção
- Acúmulo de partículas em tempo real (6 por frame, máx 1500)
- Wavefronts circulares animados quando não-observado
- Toggle observador mostra/esconde detectores vermelhos + muda padrão de interferência → dois borrões gaussianos
- Botões: "Sem medir fenda" / "Medir qual fenda?" / "↺ Limpar" / "⏸ Pausar"
- Perfil de intensidade previsto renderizado ao lado da tela

### `components/mdx/QuantumWalk.tsx`

Sem props. Estado: `step` (0–38), `running`.

- Dois SVGs empilhados: distribuição clássica (binomial, barras vermelhas) + distribuição quântica (Hadamard, barras cyan)
- Avança 1 passo a cada 280ms automaticamente
- Botões: "▶ Recomeçar" / "⏸ Pausar" / "▶ Continuar"
- Legenda com passo atual / 38

---

## Conteúdo MDX: O que entra em cada módulo

### Módulo 01 — A Nova Era da Computação
- Conceito de bit vs qubit com fórmula α|0⟩+β|1⟩, |α|²+|β|²=1
- "Um qubit pode apontar para qualquer ponto da superfície de uma esfera"
- `<BitVsQubit />` posicionado após introdução do conceito

### Módulo 02 — O Mundo Quântico
- Experimento da dupla fenda explicado elétron por elétron: P(y) ∝ |ψ₁+ψ₂|²
- "Saber o caminho destrói a interferência" — qualquer interação que registre informação
- Citação de Feynman: "todo o mistério da mecânica quântica cabe nesse experimento"
- `<DoubleSlit />` posicionado após explicação teórica

### Módulo 03 — Qubits: Além do Bit
- Esfera de Bloch: θ e φ, fórmula cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
- Pontos notáveis: |0⟩/|1⟩ nos polos, |+⟩/|−⟩ no eixo x, |±i⟩ no eixo y
- Portas quânticas como rotações na esfera
- `<BlochSphere />` após explicação dos ângulos θ/φ
- Par de Bell |Φ+⟩ = (|00⟩+|11⟩)/√2, probabilidades P(00)=P(11)=50%
- "Não é comunicação instantânea": correlação só aparece ao comparar via canal clássico
- "Einstein chamou de ação fantasmagórica" + Bell 1964 + Aspect 1982 + Nobel 2022
- Desigualdade de Bell e o jogo CHSH (cena 16)
- Teorema da não-clonagem: prova por contradição com emaranhamento (cena 17)
- `<EntanglementBell />` após explicação do emaranhamento

### Módulo 05 — Portas e Algoritmos Quânticos
- Portas X, H, CNOT como matrizes unitárias 2×2 e 4×4
- Reversibilidade: toda porta quântica é seu próprio inverso (unitária)
- Interferência quântica em circuitos: amplitudes somam antes de medir
- Busca de Grover: √N passos (quadratic speedup vs N clássico)

### Módulo 06 — O Desafio da Construção
- Decoerência: tempo de coerência T₁/T₂, perda de fase por interação com ambiente
- Isolamento criogênico a ~15 mK, mais frio que o espaço interestelar
- Correção de erros quânticos (surface code), threshold ~1% de erro por gate
- Overhead: ~1000 qubits físicos por qubit lógico no surface code atual

### Módulo 08 — A Ameaça à Criptografia
- Algoritmo de Shor: fatoração em O((log N)³) vs exponencial clássico
- Por que RSA cai: problema do logaritmo discreto / fatoração
- BB84: protocolo de distribuição de chave quântica, detecção de espião por colapso de medição

### Módulo 10 — Além do Computador Quântico
- Teleporte quântico: protocolo de 3 passos, canal clássico obrigatório, não viola relatividade
- Caminhada quântica: σ∼n vs σ∼√n clássico (quadraticamente mais rápido)
- Aplicações: busca em grafos, universalidade para computação quântica, fotossíntese
- `<QuantumWalk />` após explicação da dispersão balística

---

## Decisões de Design

1. **Sem scrubber no BitVsQubit** — autoplay loop é suficiente para a demonstração simples; consistente com o componente atual.
2. **Sem scrubber nos demais componentes** — BlochSphere é drag-interativo, os outros têm botões próprios. Scrubber seria redundante e aumentaria a superfície de código sem ganho pedagógico.
3. **Texto das refs é reescrito/integrado**, não copiado verbatim — o objetivo é enriquecer o MDX existente, não duplicar.
4. **`project3D` e `useClock` em `lib/animation-helpers.ts`** — evita duplicação entre BitVsQubit e BlochSphere que ambos usam projeção 3D.
5. **Cores hardcoded em hex** — sem adicionar novas CSS variables ao globals.css; o mapeamento é estável e os componentes são autossuficientes.
