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
}
