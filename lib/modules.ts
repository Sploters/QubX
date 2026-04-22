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
    slug: '01-o-que-e-computacao-quantica',
    order: 1,
    title: 'O que é Computação Quântica?',
    description: 'Entenda a diferença entre bits e qubits e por que a computação quântica representa uma nova era da computação.',
    videoUrl: 'https://www.youtube.com/embed/e3fz3dqhN44',
    images: ['/images/bit-vs-qubit.png', '/images/qubit-vs-bit.png'],
  },
  {
    slug: '02-fundamentos-quanticos',
    order: 2,
    title: 'Fundamentos Quânticos',
    description: 'Superposição, emaranhamento e a Esfera de Bloch — os três pilares da mecânica quântica aplicada.',
    videoUrl: 'https://www.youtube.com/embed/CfpvQFGNrXk',
    images: ['/images/esfera-de-bloch.png', '/images/quantum-bits-qubits1.gif'],
  },
  {
    slug: '03-representacao-da-informacao',
    order: 3,
    title: 'Representação da Informação',
    description: 'Notação de Dirac, vetores base e como representar estados quânticos matematicamente.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/dirac-notation.png', '/images/standard-basis-vectors.png', '/images/measuring-probabilistic-states.png'],
  },
  {
    slug: '04-circuitos-e-portas',
    order: 4,
    title: 'Circuitos e Portas Quânticas',
    description: 'Como funcionam as portas lógicas quânticas e como montar circuitos no IBM Quantum Composer.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/superdense-coding.png', '/images/ibm-device.png'],
  },
  {
    slug: '05-programando-com-qiskit',
    order: 5,
    title: 'Programando com Qiskit',
    description: 'Introdução prática ao Qiskit, o SDK open-source da IBM para criar e executar circuitos quânticos.',
    videoUrl: 'https://www.youtube.com/embed/6qD9XElTpCE',
    images: ['/images/linguagem-quantica.png'],
  },
  {
    slug: '06-aplicacoes-reais',
    order: 6,
    title: 'Aplicações Reais',
    description: 'Empresas como Mercedes-Benz já usam computação quântica. Conheça os casos reais e o que está por vir.',
    videoUrl: 'https://www.youtube.com/embed/iaWpoPsSBf4',
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
