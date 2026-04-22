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
    slug: '01-a-nova-era-da-computacao',
    order: 1,
    title: 'A Nova Era da Computação',
    description: 'A corrida quântica global já começou. Entenda por que governos e gigantes da tecnologia investem bilhões nessa tecnologia e o que está em jogo.',
    videoUrl: 'https://www.youtube.com/embed/e3fz3dqhN44',
    images: ['/images/bit-vs-qubit.png'],
    references: [
      {
        title: 'Quantum Computing for Everyone (Bernhardt)',
        url: 'https://mitpress.mit.edu/9780262539531/quantum-computing-for-everyone/',
        type: 'book'
      },
      {
        title: 'Google: Quantum Supremacy Using a Programmable Superconducting Processor',
        url: 'https://www.nature.com/articles/s41586-019-1666-5',
        type: 'paper'
      }
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
      {
        title: 'The Feynman Lectures on Physics: Quantum Mechanics',
        url: 'https://www.feynmanlectures.caltech.edu/III_toc.html',
        type: 'book'
      },
      {
        title: 'Experiment of the Double Slit - Veritasium',
        url: 'https://www.youtube.com/watch?v=A9tKncAdlHQ',
        type: 'video'
      }
    ]
  },
  {
    slug: '03-qubits-alem-do-bit',
    order: 3,
    title: 'Qubits: Além do Bit',
    description: 'Superposição, emaranhamento e decoerência — os três fenômenos que definem o que um qubit pode (e não pode) fazer.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/esfera-de-bloch.png', '/images/quantum-bits-qubits1.gif', '/images/quantum-bits-qubits2.gif'],
    references: [
      {
        title: 'Preskill: Quantum Computing in the NISQ era and beyond',
        url: 'https://arxiv.org/abs/1801.00862',
        type: 'paper'
      },
      {
        title: 'IBM Quantum Learning: Introduction to Quantum Computing',
        url: 'https://learning.quantum.ibm.com/',
        type: 'article'
      }
    ]
  },
  {
    slug: '04-a-linguagem-quantica',
    order: 4,
    title: 'A Linguagem Quântica',
    description: 'A notação de Dirac é o idioma da mecânica quântica. Aprenda a ler e escrever estados quânticos como um físico.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/dirac-notation.png', '/images/standard-basis-vectors.png', '/images/measuring-probabilistic-states.png'],
    references: [
      {
        title: 'Dirac: The Principles of Quantum Mechanics',
        url: 'https://archive.org/details/PrinciplesOfQuantumMechanics',
        type: 'book'
      },
      {
        title: 'Nielsen & Chuang: Quantum Computation and Quantum Information',
        url: 'https://archive.org/details/quantumcomputati0000niel',
        type: 'book'
      }
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
      {
        title: 'Deutsch-Jozsa Algorithm - Qiskit Textbook',
        url: 'https://learn.qiskit.org/course/ch-algorithms/deutsch-jozsa-algorithm',
        type: 'article'
      },
      {
        title: 'Quantum Gates and Circuits Visualization',
        url: 'https://algassert.com/quirk',
        type: 'video'
      }
    ]
  },
  {
    slug: '06-o-desafio-da-construcao',
    order: 6,
    title: 'O Desafio da Construção',
    description: 'Construir um computador quântico é um dos maiores desafios de engenharia da história. Criogenia, decoerência, correção de erros e as 4 tecnologias que competem pelo futuro.',
    videoUrl: 'https://www.youtube.com/embed/seersj3W-hg',
    images: [],
    references: [
      {
        title: 'Science: Superconducting Qubits: Current State of Play',
        url: 'https://www.science.org/doi/10.1126/science.abb2823',
        type: 'paper'
      },
      {
        title: 'Intel: The Path to Practical Quantum Computing',
        url: 'https://www.intel.com/content/www/us/en/research/quantum-computing.html',
        type: 'article'
      }
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
      {
        title: 'Google Quantum AI - Official Site',
        url: 'https://quantumai.google/',
        type: 'article'
      },
      {
        title: 'China’s Quantum Leap - Nature News',
        url: 'https://www.nature.com/articles/d41586-021-02052-y',
        type: 'paper'
      }
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
      {
        title: 'NIST: Post-Quantum Cryptography Standardization',
        url: 'https://csrc.nist.gov/projects/post-quantum-cryptography',
        type: 'article'
      },
      {
        title: 'Shor: Algorithms for Quantum Computation (1994)',
        url: 'https://ieeexplore.ieee.org/document/365700',
        type: 'paper'
      }
    ]
  },
  {
    slug: '09-programando-com-qiskit',
    order: 9,
    title: 'Programando com Qiskit',
    description: 'Mãos na massa: crie circuitos quânticos em Python com Qiskit, simule localmente e execute em hardware quântico real da IBM.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/linguagem-quantica.png'],
    references: [
      {
        title: 'IBM Quantum Documentation (Qiskit)',
        url: 'https://docs.quantum.ibm.com/',
        type: 'article'
      },
      {
        title: 'Introduction to Quantum Computing (Coursera)',
        url: 'https://www.coursera.org/learn/quantum-computing-algorithms',
        type: 'video'
      }
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
      {
        title: 'Quantum Sensing: Review and Outlook',
        url: 'https://arxiv.org/abs/1611.02427',
        type: 'paper'
      },
      {
        title: 'The Quantum Internet - Science Magazine',
        url: 'https://www.science.org/doi/10.1126/science.aam9288',
        type: 'paper'
      }
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
