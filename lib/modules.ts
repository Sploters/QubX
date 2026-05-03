export interface Reference {
  title: string
  url: string
  type: 'article' | 'book' | 'video' | 'paper'
}

export interface Module {
  slug: string
  order: number
  title: string
  description: string
  videoUrl?: string
  images: string[]
  references?: Reference[]
}

export const MODULES: Module[] = [
  {
    slug: '00-a-genese-do-mundo-quantico',
    order: 0,
    title: 'A Gênese do Mundo Quântico',
    description: 'De Richard Feynman ao limite do silício. Descubra por que precisamos de computadores quânticos e como chegamos até aqui.',
    videoUrl: 'https://www.youtube.com/embed/JhHMJCUmq28',
    images: [],
    references: [
      { title: 'Richard Feynman: Simulating Physics with Computers (1981)', url: 'https://pma.vub.ac.be/courses/quantum-computing/Feynman1981.pdf', type: 'paper' },
      { title: 'The Feynman Lectures on Physics: Quantum Behavior', url: 'https://www.feynmanlectures.caltech.edu/III_01.html', type: 'book' },
      { title: 'Kurzgesagt: Quantum Computers Explained (vídeo)', url: 'https://www.youtube.com/watch?v=JhHMJCUmq28', type: 'video' },
    ]
  },
  {
    slug: '01-a-nova-era-da-computacao',
    order: 1,
    title: 'A Nova Era da Computação',
    description: 'A corrida quântica global já começou. Entenda por que governos e gigantes da tecnologia investem bilhões nessa tecnologia e o que está em jogo.',
    videoUrl: 'https://www.youtube.com/embed/e3fz3dqhN44',
    images: ['/images/bit-vs-qubit.png'],
    references: [
      { title: 'Google: Quantum Supremacy (Nature, 2019)', url: 'https://www.nature.com/articles/s41586-019-1666-5', type: 'paper' },
      { title: 'Google: Quantum Error Correction com Willow (Nature, 2024)', url: 'https://www.nature.com/articles/s41586-024-08449-y', type: 'paper' },
      { title: 'Kurzgesagt: Quantum Computers Explained (vídeo)', url: 'https://www.youtube.com/watch?v=JhHMJCUmq28', type: 'video' },
      { title: 'Quantum Computing for Everyone — Bernhardt (MIT Press)', url: 'https://mitpress.mit.edu/9780262539531/quantum-computing-for-everyone/', type: 'book' },
      { title: 'IBM Quantum Network — empresas e casos reais', url: 'https://www.ibm.com/quantum/network', type: 'article' },
    ]
  },
  {
    slug: '02-o-mundo-quantico',
    order: 2,
    title: 'O Mundo Quântico',
    description: 'Antes dos qubits, existe a física quântica. Descubra os experimentos e princípios que revelaram que a realidade funciona de forma completamente diferente do que imaginamos.',
    videoUrl: 'https://www.youtube.com/embed/CfpvQFGNrXk',
    images: [],
    references: [
      { title: 'Veritasium: O Experimento da Dupla Fenda (vídeo)', url: 'https://www.youtube.com/watch?v=A9tKncAdlHQ', type: 'video' },
      { title: 'The Feynman Lectures on Physics: Quantum Behavior (Cap. 1)', url: 'https://www.feynmanlectures.caltech.edu/III_01.html', type: 'book' },
      { title: 'PBS Space Time: Schrödinger\'s Cat (vídeo)', url: 'https://www.youtube.com/watch?v=UjaAxUO6-Uw', type: 'video' },
      { title: 'Carlo Rovelli: Helgoland', url: 'https://www.amazon.com.br/Helgoland-Rovelli-Carlo/dp/0593328884', type: 'book' },
      { title: 'Heisenberg: Über den anschaulichen Inhalt (Physics Today)', url: 'https://physicstoday.scitation.org/doi/10.1063/1.3086963', type: 'paper' },
    ]
  },
  {
    slug: '03-qubits-alem-do-bit',
    order: 3,
    title: 'Qubits: Além do Bit',
    description: 'Superposição, emaranhamento e decoerência — os três fenômenos que definem o que um qubit pode (e não pode) fazer.',
    videoUrl: 'https://www.youtube.com/embed/zOGNoDO7mcU',
    images: ['/images/esfera-de-bloch.png', '/images/quantum-bits-qubits1.gif', '/images/quantum-bits-qubits2.gif'],
    references: [
      { title: 'Aspect et al.: Experimental Tests of Bell\'s Inequalities (PRL, 1982)', url: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.91', type: 'paper' },
      { title: 'Preskill: Quantum Computing in the NISQ Era and Beyond (arXiv)', url: 'https://arxiv.org/abs/1801.00862', type: 'paper' },
      { title: 'IBM Research: What is a Qubit? (vídeo)', url: 'https://www.youtube.com/watch?v=zOGNoDO7mcU', type: 'video' },
      { title: 'MinutePhysics: Bell\'s Theorem — The Quantum Venn Diagram Paradox (vídeo)', url: 'https://www.youtube.com/watch?v=zcqZHYo7ONs', type: 'video' },
      { title: 'IBM Quantum Learning: Basics of Quantum Information', url: 'https://learning.quantum.ibm.com/course/basics-of-quantum-information', type: 'article' },
    ]
  },
  {
    slug: '04-a-linguagem-quantica',
    order: 4,
    title: 'A Linguagem Quântica',
    description: 'A notação de Dirac é o idioma da mecânica quântica. Aprenda a ler e escrever estados quânticos como um físico.',
    videoUrl: 'https://www.youtube.com/embed/spUNpyF58BY',
    images: [],
    references: [
      { title: '3Blue1Brown: Quantum Computing (vídeo)', url: 'https://www.youtube.com/watch?v=spUNpyF58BY', type: 'video' },
      { title: 'Dirac: The Principles of Quantum Mechanics (archive.org)', url: 'https://archive.org/details/PrinciplesOfQuantumMechanics', type: 'book' },
      { title: 'MIT OpenCourseWare: Quantum Physics I', url: 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/', type: 'article' },
      { title: 'Quirk — Simulador de Circuitos Quânticos', url: 'https://algassert.com/quirk', type: 'article' },
    ]
  },
  {
    slug: '05-portas-e-algoritmos-quanticos',
    order: 5,
    title: 'Portas e Algoritmos Quânticos',
    description: 'Como se manipula um qubit? Portas quânticas, comparação com lógica clássica e os primeiros algoritmos que demonstram vantagem quântica real.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/superdense-coding.png', '/images/ibm-device.png'],
    references: [
      { title: 'Deutsch & Jozsa: Rapid Solution of Problems by Quantum Computation (1992)', url: 'https://royalsocietypublishing.org/doi/10.1098/rspa.1992.0167', type: 'paper' },
      { title: 'Nielsen & Chuang: Quantum Computation and Quantum Information', url: 'https://www.amazon.com.br/Quantum-Computation-Information-10th-Anniversary/dp/1107002176', type: 'book' },
      { title: 'IBM Quantum Composer — editor visual gratuito', url: 'https://quantum.ibm.com/composer', type: 'article' },
      { title: 'Quirk — Simulador de Circuitos Quânticos', url: 'https://algassert.com/quirk', type: 'article' },
      { title: 'Qiskit: Understanding Quantum Gates (vídeo)', url: 'https://www.youtube.com/watch?v=mAHC1dWKNYE', type: 'video' },
    ]
  },
  {
    slug: '06-o-desafio-da-construcao',
    order: 6,
    title: 'O Desafio da Construção',
    description: 'Construir um computador quântico é um dos maiores desafios de engenharia da história. Criogenia, decoerência, correção de erros e as 4 tecnologias que competem pelo futuro.',
    videoUrl: 'https://www.youtube.com/embed/UUXIk1BI02E',
    images: [],
    references: [
      { title: 'Kjaergaard et al.: Superconducting Qubits: Current State of Play (2020)', url: 'https://www.annualreviews.org/doi/10.1146/annurev-conmatphys-031119-050605', type: 'paper' },
      { title: 'Google: QEC Below the Surface Code Threshold (Nature, 2023)', url: 'https://www.nature.com/articles/s41586-022-05434-1', type: 'paper' },
      { title: 'IBM Research: Inside a Quantum Computer (vídeo)', url: 'https://www.youtube.com/watch?v=2B680SL4K1I', type: 'video' },
      { title: 'IonQ: How Trapped-Ion Quantum Computers Work', url: 'https://ionq.com/technology', type: 'article' },
      { title: 'Microsoft: Topological Qubits Research', url: 'https://www.microsoft.com/en-us/research/research-area/quantum-computing/', type: 'article' },
    ]
  },
  {
    slug: '07-a-corrida-quantica',
    order: 7,
    title: 'A Corrida Quântica',
    description: 'Google, IBM, Microsoft, China — a disputa pelo domínio quântico é a nova corrida espacial. Conheça os players, as apostas e quem está na frente.',
    videoUrl: 'https://www.youtube.com/embed/iaWpoPsSBf4',
    images: [],
    references: [
      { title: 'Google: Quantum Supremacy (Nature, 2019)', url: 'https://www.nature.com/articles/s41586-019-1666-5', type: 'paper' },
      { title: 'Google: Quantum Error Correction com Willow (Nature, 2024)', url: 'https://www.nature.com/articles/s41586-024-08449-y', type: 'paper' },
      { title: 'IBM Quantum Roadmap', url: 'https://www.ibm.com/quantum/roadmap', type: 'article' },
      { title: 'Gibney: China\'s Quantum Satellite (Nature News)', url: 'https://www.nature.com/articles/d41586-021-02052-y', type: 'paper' },
      { title: 'The Quantum Insider — cobertura do mercado quântico', url: 'https://thequantuminsider.com/', type: 'article' },
    ]
  },
  {
    slug: '08-a-ameaca-a-criptografia',
    order: 8,
    title: 'A Ameaça à Criptografia',
    description: 'Um computador quântico poderoso pode quebrar a criptografia que protege a internet. O que é o Y2Q, o que já está em risco e como o mundo está se preparando.',
    videoUrl: 'https://www.youtube.com/embed/6qD9XElTpCE',
    images: [],
    references: [
      { title: 'Shor: Algorithms for Quantum Computation (IEEE, 1994)', url: 'https://ieeexplore.ieee.org/document/365700', type: 'paper' },
      { title: 'NIST: Post-Quantum Cryptography Standardization', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography', type: 'article' },
      { title: 'Computerphile: Quantum Computing and Cryptography (vídeo)', url: 'https://www.youtube.com/watch?v=lvTqbM5Dq4Q', type: 'video' },
      { title: 'NSA: Commercial National Security Algorithm Suite 2.0', url: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF', type: 'article' },
      { title: 'CISA: Post-Quantum Cryptography Initiative', url: 'https://www.cisa.gov/quantum', type: 'article' },
    ]
  },
  {
    slug: '09-programando-com-qiskit',
    order: 9,
    title: 'Programando com Qiskit',
    description: 'Mãos na massa: crie circuitos quânticos em Python com Qiskit, simule localmente e execute em hardware quântico real da IBM.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: [],
    references: [
      { title: 'IBM Quantum Learning — cursos gratuitos', url: 'https://learning.quantum.ibm.com', type: 'article' },
      { title: 'Qiskit Documentation', url: 'https://docs.quantum.ibm.com/', type: 'article' },
      { title: 'Canal Qiskit no YouTube', url: 'https://www.youtube.com/@qiskit', type: 'video' },
      { title: 'IBM Quantum Composer — editor visual', url: 'https://quantum.ibm.com/composer', type: 'article' },
      { title: 'Qiskit Textbook — livro completo open-source', url: 'https://qiskit.org/learn', type: 'book' },
    ]
  },
  {
    slug: '10-alem-do-computador-quantico',
    order: 10,
    title: 'Além do Computador Quântico',
    description: 'Computação quântica é só o começo. Ressonância magnética, sensores quânticos, internet quântica e relógios atômicos — aplicações que já mudam o mundo.',
    videoUrl: 'https://www.youtube.com/embed/seersj3W-hg',
    images: ['/images/IBM-Q-System-One-display.png', '/images/computador-quantico-IBM-1.png'],
    references: [
      { title: 'Kimble: The Quantum Internet (Nature, 2008)', url: 'https://www.nature.com/articles/nature07127', type: 'paper' },
      { title: 'Degen et al.: Quantum Sensing (Reviews of Modern Physics, 2017)', url: 'https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.89.035002', type: 'paper' },
      { title: 'Veritasium: Quantum Teleportation — How It Really Works (vídeo)', url: 'https://www.youtube.com/watch?v=DxQK1WDYI_k', type: 'video' },
      { title: 'Amazon Braket — computação quântica na nuvem', url: 'https://aws.amazon.com/braket/', type: 'article' },
      { title: 'Quanta Magazine: Quantum Computing Coverage', url: 'https://www.quantamagazine.org/tag/quantum-computing/', type: 'article' },
    ]
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
