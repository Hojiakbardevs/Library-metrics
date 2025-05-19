"use client"

import { useMemo } from "react"
import { BookOpen, FileText, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Publication } from "@/types/publication"
import { calculateHIndex } from "@/utils/excel-parser"

interface SummaryMetricsProps {
  publications: Publication[]
}

export function SummaryMetrics({ publications }: SummaryMetricsProps) {
  const metrics = useMemo(() => {
    const totalPublications = publications.length
    const totalCitations = publications.reduce((sum, pub) => sum + pub.totalCitations, 0)
    const uniqueAuthors = new Set<string>()
    publications.forEach((pub) => {
      pub.authors.forEach((author) => uniqueAuthors.add(author))
    })
    const hIndex = calculateHIndex(publications)

    return {
      totalPublications,
      totalCitations,
      uniqueAuthors: uniqueAuthors.size,
      hIndex,
    }
  }, [publications])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-zinc-700 dark:text-zinc-100">Umumiy nashrlar soni</CardTitle>
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white">{metrics.totalPublications}</div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-zinc-700 dark:text-zinc-100">Umumiy iqtiboslar soni</CardTitle>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white">{metrics.totalCitations}</div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-zinc-700 dark:text-zinc-100">Yagona mualliflar soni</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white">{metrics.uniqueAuthors}</div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-zinc-700 dark:text-zinc-100">h-indeksi</CardTitle>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white">{metrics.hIndex}</div>
        </CardContent>
      </Card>
    </div>
  )
}
