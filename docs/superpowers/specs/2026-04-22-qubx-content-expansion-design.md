# QubX — Content Expansion Design

**Data:** 2026-04-22  
**Status:** Aprovado

---

## Visão Geral

Expansão do portal QubX de 6 para 10 módulos, com reestruturação completa da trilha de aprendizado. O objetivo é criar uma jornada progressiva e engajante — do hook de curiosidade até aplicações avançadas — usando conteúdo textual rico, diagramas SVG inline e imagens reais via URLs públicas (Wikimedia Commons, IBM press).

---

## Abordagem de Implementação

**Estrutura de arquivos:** os 6 arquivos MDX existentes são substituídos por 10 novos. Os slugs mudam (renumeração de 01–06 para 01–10 com títulos novos). `lib/modules.ts` é atualizado com os 10 módulos.

**Visuais:**
- **SVG inline em MDX:** diagramas técnicos escritos diretamente nos arquivos `.mdx` como componentes JSX
- **URLs públicas:** fotos de hardware real (Google Sycamore, IBM cryostat, Microsoft lab) referenciadas por URL direta do Wikimedia Commons ou imprensa oficial — sem download de arquivos
- **Imagens locais existentes:** mantidas em `public/images/` e reaproveitadas onde aplicável

---

## Estrutura dos 10 Módulos

### Fase 1 — O Contexto

**Módulo 1: A Nova Era da Computação**  
Slug: `01-a-nova-era-da-computacao`  
Origem: expansão do módulo 1 atual

Conteúdo:
- Hook: fato surpreendente sobre o que computadores quânticos podem fazer em minutos vs. milhões de anos classicamente
- O que é computação quântica (revisão rápida)
- A corrida global: Google, IBM, Microsoft, China — quem está na frente
- Timeline de marcos históricos (1981–2024) com SVG visual
- Por que agora? — convergência de hardware, software e investimento
- Bit vs qubit (imagens locais existentes)

---

**Módulo 2: O Mundo Quântico** *(NOVO)*  
Slug: `02-o-mundo-quantico`

Conteúdo:
- Hook: o experimento da dupla fenda — luz se comporta como onda e partícula ao mesmo tempo
- Dualidade onda-partícula com diagrama SVG inline
- Princípio da incerteza de Heisenberg — você não pode saber posição e velocidade simultaneamente
- O gato de Schrödinger — superposição explicada com analogia
- Níveis de energia atômicos e quantização
- Conexão: como esses princípios habilitam os qubits

---

### Fase 2 — Como Funciona

**Módulo 3: Qubits: Além do Bit**  
Slug: `03-qubits-alem-do-bit`  
Origem: expansão do módulo 2 atual

Conteúdo:
- Superposição explicada em profundidade com matemática acessível
- Emaranhamento: Einstein e "a ação fantasmagórica" — experimentos reais (Bell, Aspect 1982)
- Esfera de Bloch em SVG inline (melhorada visualmente)
- Decoerência: por que os qubits são tão frágeis
- Animações GIF locais existentes reaproveitadas

---

**Módulo 4: A Linguagem Quântica**  
Slug: `04-a-linguagem-quantica`  
Origem: expansão do módulo 3 atual

Conteúdo:
- Notação de Dirac explicada passo a passo
- Vetores de estado com exemplos numéricos
- Medição e colapso do estado quântico
- Tabela comparativa SVG: informação clássica vs. quântica
- Imagens locais existentes: dirac-notation.png, standard-basis-vectors.png

---

**Módulo 5: Portas e Algoritmos Quânticos**  
Slug: `05-portas-e-algoritmos-quanticos`  
Origem: expansão do módulo 4 atual

Conteúdo:
- Revisão das portas fundamentais (X, H, CNOT)
- Portas avançadas: Toffoli (CCNOT), Phase, T, S gates
- Tabela comparativa SVG: portas clássicas AND/OR/NOT vs. quânticas X/H/CNOT
- Por que portas quânticas são reversíveis (e clássicas não)
- Algoritmo de Deutsch-Jozsa — o primeiro exemplo de vantagem quântica
- Link para IBM Quantum Composer

---

### Fase 3 — Os Desafios Reais

**Módulo 6: O Desafio da Construção** *(NOVO)*  
Slug: `06-o-desafio-da-construcao`

Conteúdo:
- O problema central: manter qubits coerentes por tempo suficiente
- Por que −273°C? — diagrama SVG de escala de temperatura (sol, nitrogênio, hélio, temperatura dos qubits)
- As 4 principais tecnologias de qubit:
  - Supercondutores (IBM, Google) — como funcionam, vantagens/limitações
  - Íons aprisionados (IonQ, Quantinuum) — laser + átomos
  - Fotônica (PsiQuantum) — qubits de luz, sem criogenia total
  - Topológicos (Microsoft) — qubits de Majorana, mais estáveis
- Correção de erros quânticos (QEC) — por que 1000 qubits físicos = 1 qubit lógico
- Foto via URL: criostato IBM (Wikimedia Commons)

---

**Módulo 7: A Corrida Quântica** *(NOVO)*  
Slug: `07-a-corrida-quantica`

Conteúdo:
- Contexto geopolítico: EUA, China, Europa investindo bilhões
- Google — Sycamore (2019, 53 qubits, "supremacia quântica") + Willow (2024)
- IBM — roadmap Eagle → Osprey → Condor (1121 qubits) → Heron
- Microsoft — aposta nos qubits topológicos (anúncio 2023–2025)
- China — Jiuzhang (fotônico), Zuchongzhi
- Startups: IonQ, Rigetti, PsiQuantum, Quantinuum
- Timeline SVG: corrida 2019–2024
- Foto via URL: chip Google Sycamore (Wikimedia Commons)

---

**Módulo 8: A Ameaça à Criptografia** *(NOVO)*  
Slug: `08-a-ameaca-a-criptografia`

Conteúdo:
- Como a internet é protegida hoje — RSA e o problema da fatoração
- Diagrama SVG: fluxo de criptografia RSA simplificado
- Algoritmo de Shor: como um computador quântico quebra o RSA
- Y2Q (Years to Quantum): quando isso acontece de verdade?
- O que já está em risco agora: "harvest now, decrypt later"
- Criptografia pós-quântica: os 4 algoritmos padronizados pelo NIST em 2024 (CRYSTALS-Kyber, CRYSTALS-Dilithium, FALCON, SPHINCS+)
- O que empresas e governos estão fazendo
- O medo do colapso da internet: realidade ou exagero?

---

### Fase 4 — Prática e Futuro

**Módulo 9: Programando com Qiskit**  
Slug: `09-programando-com-qiskit`  
Origem: expansão do módulo 5 atual

Conteúdo:
- Conteúdo atual mantido (instalação, superposição, Bell state)
- Algoritmo de Grover — busca em banco de dados quântico (exemplo de código)
- Acesso a hardware real via IBM Quantum Cloud
- Dica: como rodar em simulador vs. hardware real

---

**Módulo 10: Além do Computador Quântico**  
Slug: `10-alem-do-computador-quantico`  
Origem: expansão do módulo 6 atual + conteúdo novo

Conteúdo:
- Revisão: aplicações atuais (Mercedes-Benz, farmacêuticas)
- RMN (Ressonância Magnética Nuclear) — quantum sem computador, sem criogenia extrema, já no hospital
- Sensores quânticos — GPS mais preciso, detecção de submarinos, gravimetria
- Internet quântica e teletransporte quântico — o que é e o que não é
- Relógios atômicos — base do GPS, telecomunicações e internet
- Computação quântica na descoberta de medicamentos
- Radar quântico — detecta objetos furtivos
- Timeline do futuro: 2025–2040

---

## Visuais Planejados (SVG inline)

| Módulo | Diagrama SVG |
|--------|-------------|
| 1 | Timeline de marcos 1981–2024 |
| 2 | Experimento da dupla fenda |
| 3 | Esfera de Bloch aprimorada |
| 5 | Tabela portas clássicas vs. quânticas |
| 6 | Escala de temperatura (sol → qubits) |
| 7 | Timeline da corrida quântica 2019–2024 |
| 8 | Fluxo RSA simplificado |

## Imagens via URL Pública

| Módulo | Imagem | Fonte |
|--------|--------|-------|
| 6 | Criostato IBM | Wikimedia Commons |
| 7 | Chip Google Sycamore | Wikimedia Commons |
| 7 | IBM Q System (adicional) | IBM Research press |

---

## Mudanças em lib/modules.ts

- Array `MODULES` atualizado de 6 para 10 entradas
- Novos slugs: `01-a-nova-era-da-computacao` até `10-alem-do-computador-quantico`
- Slugs antigos (01–06) são substituídos — URLs antigas mudam (site recém-publicado, sem tráfego estabelecido)
- Campos `videoUrl` e `images` atualizados para cada módulo

---

## Fora do Escopo

- Novos componentes de UI (layout permanece idêntico)
- Quizzes, simuladores ou interatividade adicional
- Internacionalização
- Busca de conteúdo
