export interface GlossaryTerm {
  term: string
  definition: string
  slug: string
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
  'superposicao': {
    term: 'Superposição',
    definition: 'Capacidade de um sistema quântico de existir em múltiplos estados simultaneamente até que seja medido.',
    slug: 'superposicao',
  },
  'emaranhamento': {
    term: 'Emaranhamento',
    definition: 'Fenômeno onde partículas tornam-se conectadas de tal forma que o estado de uma instantaneamente influencia a outra, independente da distância.',
    slug: 'emaranhamento',
  },
  'qubit': {
    term: 'Qubit',
    definition: 'A unidade básica de informação quântica, que pode representar 0, 1 ou ambos ao mesmo tempo.',
    slug: 'qubit',
  },
  'supremacia-quantica': {
    term: 'Supremacia Quântica',
    definition: 'O ponto em que um computador quântico resolve um problema que um computador clássico levaria um tempo impraticável para resolver.',
    slug: 'supremacia-quantica',
  },
  'decoerencia': {
    term: 'Decoerência',
    definition: 'A perda do estado quântico devido à interferência do ambiente, transformando o qubit em um bit clássico comum.',
    slug: 'decoerencia',
  },
  'algoritmo-de-shor': {
    term: 'Algoritmo de Shor',
    definition: 'Um algoritmo quântico capaz de fatorar números inteiros exponencialmente mais rápido que os melhores algoritmos clássicos.',
    slug: 'algoritmo-de-shor',
  },
  'hardware': {
    term: 'Hardware',
    definition: 'A parte física do computador, incluindo chips, circuitos e os componentes que compõem o processador quântico.',
    slug: 'hardware',
  },
  'software': {
    term: 'Software',
    definition: 'O conjunto de instruções e programas que dizem ao hardware o que fazer, como algoritmos e compiladores.',
    slug: 'software',
  },
  'nuvem': {
    term: 'Nuvem',
    definition: 'Acesso remoto a computadores e processadores via internet, permitindo usar máquinas quânticas reais de qualquer lugar.',
    slug: 'nuvem',
  },
  'foton': {
    term: 'Fóton',
    definition: 'A partícula elementar da luz e de todas as outras formas de radiação eletromagnética, que se comporta como partícula e como onda.',
    slug: 'foton',
  },
  'nobel-2022': {
    term: 'Nobel de Física em 2022',
    definition: 'Prêmio concedido a Alain Aspect, John Clauser e Anton Zeilinger por experimentos com fótons emaranhados, estabelecendo a violação das desigualdades de Bell e sendo pioneiros na ciência da informação quântica.',
    slug: 'nobel-2022',
  },
  'spukhafte-fernwirkung': {
    term: 'Spukhafte Fernwirkung',
    definition: 'Pronúncia: /ʃpuːk.haf.tə fɛrn.vɪr.kʊŋ/. Termo em alemão para "ação fantasmagórica à distância", usado por Einstein para descrever seu ceticismo sobre o emaranhamento.',
    slug: 'spukhafte-fernwirkung',
  },
  'zero-absoluto': {
    term: 'Zero Absoluto (−273°C)',
    definition: 'A temperatura teórica mais baixa possível, onde o movimento térmico dos átomos cessa. Essencial para manter a estabilidade dos qubits supercondutores.',
    slug: 'zero-absoluto',
  },
}
