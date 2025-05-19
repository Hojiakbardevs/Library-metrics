"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import type { Publication } from "@/types/publication"
import { getCitationHeatmapData } from "@/utils/excel-parser"

interface CitationHeatmapProps {
  publications: Publication[]
}

export function CitationHeatmap({ publications }: CitationHeatmapProps) {
  const [selectedPublication, setSelectedPublication] = useState<string | null>(null)

  const heatmapData = useMemo(() => {
    return getCitationHeatmapData(publications)
  }, [publications])

  const selectedData = useMemo(() => {
    if (!selectedPublication) {
      return heatmapData[0] // Standart holatda birinchi maqola tanlanadi
    }
    return heatmapData.find((data) => data.publicationId === selectedPublication) || heatmapData[0]
  }, [heatmapData, selectedPublication])

  // 1990-yildan hozirgi yilgacha bo‘lgan barcha yillarni olish
  const allYears = useMemo(() => {
    const years = []
    for (let year = 1990; year <= new Date().getFullYear(); year++) {
      years.push(year.toString())
    }
    return years
  }, [])

  // Har bir yil uchun iqtiboslar soni (agar bo‘lmasa, 0)
  const yearCitations = useMemo(() => {
    const citationMap: Record<string, number> = {}

    allYears.forEach((year) => {
      citationMap[year] = 0
    })

    selectedData.citations.forEach(({ year, value }) => {
      citationMap[year] = value
    })

    return citationMap
  }, [selectedData, allYears])

  // Iqtiboslar soniga qarab rang intensivligini hisoblash
// Yangilangan rang intensivligi funksiyasi
const getColorIntensity = (count: number) => {
  if (count === 0) return "bg-gray-200 dark:bg-gray-700"
  if (count <= 2) return "bg-emerald-200 dark:bg-emerald-700"
  if (count <= 5) return "bg-emerald-300 dark:bg-emerald-600"
  if (count <= 10) return "bg-emerald-400 dark:bg-emerald-500"
  if (count <= 20) return "bg-emerald-500 dark:bg-emerald-400"
  return "bg-emerald-600 dark:bg-emerald-300"
}


  return (
    <Card>
      <CardHeader>
        <CardTitle>Iqtiboslar Issiqlik Xaritası</CardTitle>
        <CardDescription>Har bir maqola bo‘yicha yillik iqtiboslar statistikasi</CardDescription>
        <Select value={selectedPublication || heatmapData[0]?.publicationId} onValueChange={setSelectedPublication}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Maqolani tanlang" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto bg-white dark:bg-gray-900">
            {heatmapData.map((data) => (
              <SelectItem key={data.publicationId} value={data.publicationId}>
                {data.title.length > 60 ? `${data.title.substring(0, 60)}...` : data.title} ({data.year})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm font-medium">{selectedData.title}</div>
          <div className="text-sm text-muted-foreground">{selectedData.year} yilda chop etilgan</div>
          <div className="grid grid-cols-5 gap-1 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-17">
            {allYears.map((year) => (
              <div key={year} className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 rounded-sm ${getColorIntensity(yearCitations[year])}`}
                  title={`${year}: ${yearCitations[year]} ta iqtibos`}
                />
                {Number(year) % 5 === 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">{year}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-gray-100 dark:bg-gray-800" />
              <span className="text-xs">0</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-green-100 dark:bg-green-900" />
              <span className="text-xs">1–2</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-green-200 dark:bg-green-800" />
              <span className="text-xs">3–5</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-green-300 dark:bg-green-700" />
              <span className="text-xs">6–10</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-green-400 dark:bg-green-600" />
              <span className="text-xs">11–20</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 rounded-sm bg-green-500 dark:bg-green-500" />
              <span className="text-xs">20+</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
