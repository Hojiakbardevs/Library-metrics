"use client"

import { useMemo } from "react"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { Publication } from "@/types/publication"

interface KeywordTrendChartProps {
  publications: Publication[]
}

export function KeywordTrendChart({ publications }: KeywordTrendChartProps) {
  const { chartData, keywords } = useMemo(() => {
    // Extract potential keywords from titles
    const extractKeywords = (title: string): string[] => {
      // Common words to exclude
      const stopWords = new Set([
        "a",
        "an",
        "the",
        "and",
        "or",
        "but",
        "of",
        "in",
        "on",
        "at",
        "to",
        "for",
        "with",
        "by",
        "about",
        "as",
        "into",
        "like",
        "through",
        "after",
        "over",
        "between",
        "out",
        "against",
        "during",
        "without",
        "before",
        "under",
        "around",
        "among",
        "analysis",
        "study",
        "research",
        "approach",
        "method",
        "using",
        "based",
        "case",
      ])

      // Extract words, remove punctuation, and filter out stop words and short words
      return title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => !stopWords.has(word) && word.length > 3)
    }

    // Count keywords by year
    const keywordsByYear: Record<string, Record<string, number>> = {}
    const allKeywords = new Set<string>()

    publications.forEach((pub) => {
      const year = pub.publicationYear.toString()
      const keywords = extractKeywords(pub.title)

      if (!keywordsByYear[year]) {
        keywordsByYear[year] = {}
      }

      keywords.forEach((keyword) => {
        allKeywords.add(keyword)
        keywordsByYear[year][keyword] = (keywordsByYear[year][keyword] || 0) + 1
      })
    })

    // Get top keywords by total frequency
    const keywordCounts: Record<string, number> = {}
    allKeywords.forEach((keyword) => {
      keywordCounts[keyword] = Object.values(keywordsByYear).reduce(
        (sum, yearCounts) => sum + (yearCounts[keyword] || 0),
        0,
      )
    })

    const topKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([keyword]) => keyword)

    // Prepare chart data
    const years = [...new Set(publications.map((pub) => pub.publicationYear.toString()))]
    years.sort()

    const chartData = years.map((year) => {
      const dataPoint: Record<string, any> = { year }

      topKeywords.forEach((keyword) => {
        dataPoint[keyword] = keywordsByYear[year]?.[keyword] || 0
      })

      return dataPoint
    })

    return { chartData, keywords: topKeywords }
  }, [publications])

  // Create chart config with colors for each keyword
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {}

    const colorPalette = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ]

    keywords.forEach((keyword, index) => {
      config[keyword] = {
        label: keyword,
        color: colorPalette[index % colorPalette.length],
      }
    })

    return config
  }, [keywords])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Trends</CardTitle>
        <CardDescription>Frequency of top keywords in publication titles over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={30}
                label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name) => [`${value} occurrences`, name]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              {keywords.map((keyword) => (
                <Line
                  key={keyword}
                  type="monotone"
                  dataKey={keyword}
                  stroke={`var(--color-${keyword})`}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
