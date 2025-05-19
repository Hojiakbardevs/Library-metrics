"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Publication } from "@/types/publication"
import * as XLSX from "xlsx"

interface ExportExcelProps {
  publications: Publication[]
  institutionName?: string
}

export function ExportExcel({ publications, institutionName = "TUIT" }: ExportExcelProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateExcel = async () => {
    setIsGenerating(true)

    try {
      const totalPublications = publications.length
      const totalCitations = publications.reduce((sum, pub) => sum + pub.totalCitations, 0)
      const uniqueAuthors = new Set<string>()
      publications.forEach((pub) => pub.authors.forEach((author) => uniqueAuthors.add(author)))

      // 1. Summary Sheet
      const summaryData = [
        ["Metric", "Value"],
        ["Total Publications", totalPublications],
        ["Total Citations", totalCitations],
        ["Unique Authors", uniqueAuthors.size],
        ["Average Citations per Publication", (totalCitations / totalPublications).toFixed(2)],
        ["Generated on", new Date().toLocaleString()],
      ]

      // 2. Top Publications Sheet
      const topPublications = [...publications]
        .sort((a, b) => b.totalCitations - a.totalCitations)
        .slice(0, 10)
      const topPubData = [
        ["Title", "Authors", "Year", "Citations"],
        ...topPublications.map((pub) => [
          pub.title,
          pub.authors.slice(0, 3).join(", ") + (pub.authors.length > 3 ? " et al." : ""),
          pub.publicationYear,
          pub.totalCitations,
        ]),
      ]

      // 3. Top Authors Sheet
      const authorMap = new Map<string, { publications: number; citations: number }>()
      publications.forEach((pub) => {
        pub.authors.forEach((author) => {
          const stats = authorMap.get(author) || { publications: 0, citations: 0 }
          stats.publications += 1
          stats.citations += pub.totalCitations
          authorMap.set(author, stats)
        })
      })
      const topAuthors = Array.from(authorMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.publications - a.publications)
        .slice(0, 10)

      const topAuthorsData = [
        ["Author", "Publications", "Citations", "Avg. Citations"],
        ...topAuthors.map((author) => [
          author.name,
          author.publications,
          author.citations,
          (author.citations / author.publications).toFixed(2),
        ]),
      ]

      // Create Workbook
      const workbook = XLSX.utils.book_new()
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
      const pubSheet = XLSX.utils.aoa_to_sheet(topPubData)
      const authorsSheet = XLSX.utils.aoa_to_sheet(topAuthorsData)

      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")
      XLSX.utils.book_append_sheet(workbook, pubSheet, "TopPublications")
      XLSX.utils.book_append_sheet(workbook, authorsSheet, "TopAuthors")

      const fileName = `${institutionName.replace(/\s+/g, "_")}_Bibliometric_Report.xlsx`
      XLSX.writeFile(workbook, fileName)
    } catch (error) {
      console.error("Excel export error:", error)
      alert("Excel faylni eksport qilishda xatolik yuz berdi.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generateExcel}
      disabled={isGenerating || publications.length === 0}
      className="flex items-center gap-2 bg-emerald-700 text-white hover:bg-emerald-600  px-4 py-2 shadow-md transition duration-200 ease-in-out rounded-md"
    >
      <Download className="h-4 w-4" />
      {isGenerating ? "Generating..." : "Export Report (Excel)"}
    </Button>
  )
}

export default ExportExcel