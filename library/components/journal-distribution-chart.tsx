"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { Publication } from "@/types/publication"

interface JournalDistributionChartProps {
  publications: Publication[]
  limit?: number
}

// Ranglarni aniq HEX formatda beramiz
const COLORS = [
  "#09C6AB", // Teal
  "#068888", // Ocean
  "#FF9D23", // Yellow
  "#0093AB", // Dark Cyan
  "#370665", // Deep Purple
  "#35589A", // Royal Blue
  "#F14A16", // Bright Orange
  "#8BC34A", // Light Green (optional if extra needed)
  "#E91E63", // Pink (optional if extra needed)
  "#3F51B5", // Indigo (optional if extra needed)
]

export function JournalDistributionChart({ publications, limit = 10 }: JournalDistributionChartProps) {
  const chartData = useMemo(() => {
    const journalCounts: Record<string, number> = {}

    publications.forEach((pub) => {
      const journal = pub.sourceTitle || "Noma'lum"
      journalCounts[journal] = (journalCounts[journal] || 0) + 1
    })

    let journalData = Object.entries(journalCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    if (journalData.length > limit) {
      const topJournals = journalData.slice(0, limit - 1)
      const otherJournals = journalData.slice(limit - 1)
      const otherCount = otherJournals.reduce((sum, item) => sum + item.value, 0)

      journalData = [...topJournals, { name: "Boshqalar", value: otherCount }]
    }

    return journalData
  }, [publications, limit])

  return (
    <Card className="shadow-xl border border-gray-200">
      <CardHeader>
        <CardTitle>Jurnallar taqsimoti</CardTitle>
        <CardDescription>
          Nashrlar qaysi jurnallarda chop etilganligini ko‘rsatadi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ journals: { label: "Jurnallar", color: COLORS[0] } }} className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name.length > 20 ? name.substring(0, 20) + "..." : name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} ta nashr`, "Nashrlar soni"]}
                labelFormatter={(label) => `Jurnal: ${label}`}
              />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
