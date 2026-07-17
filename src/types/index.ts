export interface Project {
  name: string
  problem: string
  tags: string[]
  filter: 'flutter' | 'web' | 'ai'
  link: string
  demo?: string
  icon: string
  image: string | null
}

export interface Certificate {
  name: string
  org: string
  year: string
  img: string
}
