"use client"

import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Publication } from "@/types/publication"

interface TopAuthorsTableProps {
  publications: Publication[]
  limit?: number
}

export function TopAuthorsTable({ publications, limit = 10 }: TopAuthorsTableProps) {
  const topAuthors = useMemo(() => {
    const authorMap = new Map<string, { publications: number; citations: number }>()

    publications.forEach((pub) => {
      pub.authors.forEach((author) => {
        const data = authorMap.get(author) || { publications: 0, citations: 0 }
        data.publications += 1
        data.citations += pub.totalCitations
        authorMap.set(author, data)
      })
    })

    const authorsWithHIndex = Array.from(authorMap.entries()).map(([name, data]) => {
      const authorPublications = publications.filter((pub) => pub.authors.includes(name))
      const sortedCitations = authorPublications
        .map((pub) => pub.totalCitations)
        .sort((a, b) => b - a)

      let hIndex = 0
      for (let i = 0; i < sortedCitations.length; i++) {
        if (sortedCitations[i] >= i + 1) hIndex = i + 1
        else break
      }

      return {
        name,
        publications: data.publications,
        citations: data.citations,
        hIndex,
      }
    })

    return authorsWithHIndex
      .sort((a, b) => b.publications - a.publications)
      .slice(0, limit)
  }, [publications, limit])

  return (
    <Card className="border-b rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 px-6 py-4 ">
        <CardTitle className="text-lg font-semibold text-gray-800">Eng faol mualliflar</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Nashrlar soni bo‘yicha saralangan mualliflar ro‘yxati
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white border-b">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-sm text-gray-600 font-medium">
                Muallif
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-sm text-gray-600 font-medium">
                Nashrlar
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-sm text-gray-600 font-medium">
                Iqtiboslar
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-sm text-gray-600 font-medium">
                h-indeksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {topAuthors.map((author, index) => (
              <TableRow
                key={author.name}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <TableCell className="px-6 py-3 text-sm text-gray-800 font-medium">
                  {author.name}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm text-gray-700 text-right">
                  {author.publications}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm text-gray-700 text-right">
                  {author.citations}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm text-gray-700 text-right">
                  {author.hIndex}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
