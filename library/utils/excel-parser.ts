import * as XLSX from "xlsx"
import type { Publication } from "@/types/publication"

export const parseExcelFile = (file: File): Promise<Publication[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        // Assume first sheet contains the data
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        const publications: Publication[] = jsonData.map((row: any) => {
          // Extract citation by year data
          const citationsByYear: Record<string, number> = {}

          // Process year columns from 1990 to 2024
          for (let year = 1990; year <= 2024; year++) {
            const yearStr = year.toString()
            if (row[yearStr] !== undefined) {
              // Convert to number and ensure it's not NaN
              const citations = Number(row[yearStr])
              if (!isNaN(citations)) {
                citationsByYear[yearStr] = citations
              }
            }
          }

          // Clean and split authors
          const authorsString = row["Authors"] || ""
          const authors = authorsString
            .split(/[;,]/)
            .map((author: string) => author.trim())
            .filter((author: string) => author.length > 0)

          return {
            title: row["Title"] || "",
            authors,
            sourceTitle: row["Source Title"] || "",
            publicationYear: Number(row["Publication Year"]) || 0,
            totalCitations: Number(row["Total Citations"]) || 0,
            averagePerYear: Number(row["Average per Year"]) || 0,
            citationsByYear,
            doi: row["DOI"] || undefined,
          }
        })

        resolve(publications)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

export const calculateHIndex = (publications: Publication[]): number => {
  // Sort publications by citation count in descending order
  const sortedCitations = publications.map((pub) => pub.totalCitations).sort((a, b) => b - a)

  // Find h-index: largest h where h papers have at least h citations
  let hIndex = 0
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) {
      hIndex = i + 1
    } else {
      break
    }
  }

  return hIndex
}

export const getTopAuthors = (publications: Publication[], limit = 10): Record<string, number> => {
  const authorCounts: Record<string, number> = {}

  publications.forEach((pub) => {
    pub.authors.forEach((author) => {
      authorCounts[author] = (authorCounts[author] || 0) + 1
    })
  })

  // Sort authors by publication count and take top N
  return Object.fromEntries(
    Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit),
  )
}

export const getTotalCitationsByYear = (publications: Publication[]): Record<string, number> => {
  const citationsByYear: Record<string, number> = {}

  // Initialize all years from 1990 to 2024 with 0
  for (let year = 1990; year <= 2024; year++) {
    citationsByYear[year.toString()] = 0
  }

  // Sum citations for each year across all publications
  publications.forEach((pub) => {
    Object.entries(pub.citationsByYear).forEach(([year, count]) => {
      citationsByYear[year] = (citationsByYear[year] || 0) + count
    })
  })

  return citationsByYear
}

export const getPublicationsByYear = (publications: Publication[]): Record<string, number> => {
  const publicationsByYear: Record<string, number> = {}

  publications.forEach((pub) => {
    const year = pub.publicationYear.toString()
    publicationsByYear[year] = (publicationsByYear[year] || 0) + 1
  })

  return publicationsByYear
}

export const getCitationHeatmapData = (publications: Publication[]): CitationHeatmapData[] => {
  return publications.map((pub, index) => {
    const citations = Object.entries(pub.citationsByYear)
      .filter(([_, count]) => count > 0) // Only include years with citations
      .map(([year, count]) => ({
        year,
        value: count,
      }))

    return {
      publicationId: `pub-${index}`,
      title: pub.title,
      year: pub.publicationYear,
      citations,
    }
  })
}

interface CitationHeatmapData {
  publicationId: string
  title: string
  year: number
  citations: { year: string; value: number }[]
}
