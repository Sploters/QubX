import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { MODULES, getModuleBySlug, getAdjacentModules } from '@/lib/modules'
import { getModuleContent } from '@/lib/mdx'
import { ModuleLayout } from '@/components/ModuleLayout'
import { Term, Callout, GlossaryIndex, BitVsQubit, SuperdenseCoding, MazeQuantum, BlochSphere, EntanglementBell, DoubleSlit, QuantumWalk, VisualDivider, ConceptBlock, StepFlow, KeyInsight } from '@/components/mdx'
import type { Metadata } from 'next'

const mdxComponents = {
  Term,
  Callout,
  GlossaryIndex,
  BitVsQubit,
  SuperdenseCoding,
  MazeQuantum,
  BlochSphere,
  EntanglementBell,
  DoubleSlit,
  QuantumWalk,
  VisualDivider,
  ConceptBlock,
  StepFlow,
  KeyInsight,
}

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const mod = getModuleBySlug(params.slug)
  if (!mod) return {}
  return {
    title: `${mod.title} — QubX`,
    description: mod.description,
  }
}

export default function ModulePage({ params }: PageProps) {
  const mod = getModuleBySlug(params.slug)
  if (!mod) notFound()

  const { prev, next } = getAdjacentModules(params.slug)
  const content = getModuleContent(params.slug)

  return (
    <ModuleLayout module={mod} prev={prev} next={next}>
      <MDXRemote 
        source={content} 
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} 
      />
    </ModuleLayout>
  )
}
