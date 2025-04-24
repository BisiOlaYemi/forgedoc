export interface DocItem {
  id: string;
  title: string;
  slug: string;
  content?: string;
  children?: DocItem[];
}

export interface DocSection {
  id: string;
  title: string;
  items: DocItem[];
}

export interface CodeBlock {
  language: string;
  code: string;
}