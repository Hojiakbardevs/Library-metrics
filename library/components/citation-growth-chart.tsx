"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { Publication } from "@/types/publication"

interface CitationGrowthChartProps {
  publications: Publication[]
}

export function CitationGrowthChart({ publications }: CitationGrowthChartProps) {
  const chartData = useMemo(() => {
    // Get all years from 1990 to current year
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1989 }, (_, i) => (1990 + i).toString())

    // Group publications by year
    const publicationsByYear: Record<string, Publication[]> = {}
    publications.forEach((pub) => {
      const year = pub.publicationYear.toString()
      if (!publicationsByYear[year]) {
        publicationsByYear[year] = []
      }
      publicationsByYear[year].push(pub)
    })

    // Calculate cumulative citations for each year
    const cumulativeData = years.map((year) => {
      // Initialize data point for this year
      const dataPoint: Record<string, any> = { year }

      // Calculate citations received in this year for each publication year
      Object.keys(publicationsByYear).forEach((pubYear) => {
        if (Number(pubYear) <= Number(year)) {
          const pubsFromYear = publicationsByYear[pubYear]
          const citationsInYear = pubsFromYear.reduce((sum, pub) => {
            return sum + (pub.citationsByYear[year] || 0)
          }, 0)

          dataPoint[`y${pubYear}`] = citationsInYear
        }
      })

      return dataPoint
    })

    // Filter out years with no citations
    return cumulativeData.filter((data) => {
      const totalCitations = Object.keys(data)
        .filter((key) => key.startsWith("y"))
        .reduce((sum, key) => sum + data[key], 0)

      return totalCitations > 0
    })
  }, [publications])

  // Create chart config with colors for each publication year
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {}

    // Get unique publication years
    const pubYears = [...new Set(publications.map((pub) => pub.publicationYear.toString()))]

    // Sort years
    pubYears.sort()

    // Assign colors to each year
    const colorPalette = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--chart-6))",
      "hsl(var(--chart-7))",
      "hsl(var(--chart-8))",
    ]

    pubYears.forEach((year, index) => {
      config[`y${year}`] = {
        label: `Publications from ${year}`,
        color: colorPalette[index % colorPalette.length],
      }
    })

    return config
  }, [publications])

  // Get keys for stacked areas (publication years)
  const areaKeys = useMemo(() => {
    return Object.keys(chartConfig).sort()
  }, [chartConfig])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citation Growth Over Time</CardTitle>
        <CardDescription>How citations accumulate over time for publications from different years</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={50}
                label={{ value: "Citations", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const yearKey = name as string
                  const pubYear = yearKey.substring(1) // Remove the 'y' prefix
                  return [`${value} citations`, `Publications from ${pubYear}`]
                }}
                labelFormatter={(label) => `Year: ${label}`}
              />
              {areaKeys.map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stackId="1"
                  stroke={`var(--color-${key})`}
                  fill={`var(--color-${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
