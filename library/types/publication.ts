export interface Publication {
  title: string
  authors: string[]
  sourceTitle: string
  publicationYear: number
  totalCitations: number
  averagePerYear: number
  citationsByYear: Record<string, number>
  doi?: string
}

export interface Author {
  name: string
  publications: number
  citations: number
  hIndex: number
}

export interface YearlyData {
  year: string
  value: number
}

export interface CitationHeatmapData {
  publicationId: string
  title: string
  year: number
  citations: YearlyData[]
}
