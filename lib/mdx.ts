import fs from 'fs'
import path from 'path'

export function getModuleContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'modules', `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf-8')
}
