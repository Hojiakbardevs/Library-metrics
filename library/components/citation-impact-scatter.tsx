"use client"

import { useMemo } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { Publication } from "@/types/publication"

interface CitationImpactScatterProps {
  publications: Publication[]
}

export function CitationImpactScatter({ publications }: CitationImpactScatterProps) {
  const chartData = useMemo(() => {
    // Create data points for the scatter plot
    return publications.map((pub) => ({
      x: pub.publicationYear,
      y: pub.totalCitations,
      z: pub.averagePerYear || 1, // Use average citations per year for bubble size
      title: pub.title,
      authors: pub.authors.join(", "),
    }))
  }, [publications])

  const chartConfig = {
    impact: {
      label: "Citation Impact",
      color: "hsl(var(--chart-3))",
    },
  }

  // Calculate domain for years (x-axis)
  const yearDomain = useMemo(() => {
    const years = publications.map((pub) => pub.publicationYear)
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    // Add some padding to the domain
    return [minYear - 1, maxYear + 1]
  }, [publications])

  // Calculate domain for citations (y-axis)
  const citationDomain = useMemo(() => {
    const citations = publications.map((pub) => pub.totalCitations)
    const maxCitation = Math.max(...citations)
    // Start from 0 and add some padding to the top
    return [0, maxCitation * 1.1]
  }, [publications])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citation Impact</CardTitle>
        <CardDescription>Relationship between publication year and citation count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="x"
                name="Year"
                domain={yearDomain}
                tickCount={10}
                label={{ value: "Publication Year", position: "insideBottom", offset: -10 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Citations"
                domain={citationDomain}
                label={{ value: "Total Citations", angle: -90, position: "insideLeft" }}
              />
              <ZAxis type="number" dataKey="z" range={[50, 500]} name="Average Citations per Year" />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-md border bg-background p-2 shadow-md">
                        <p className="font-medium">
                          {data.title.length > 50 ? data.title.substring(0, 50) + "..." : data.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.authors.length > 50 ? data.authors.substring(0, 50) + "..." : data.authors}
                        </p>
                        <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            Year: <span className="font-medium">{data.x}</span>
                          </div>
                          <div>
                            Citations: <span className="font-medium">{data.y}</span>
                          </div>
                          <div>
                            Avg per Year: <span className="font-medium">{data.z.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter name="Publications" data={chartData} fill="var(--color-impact)" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
