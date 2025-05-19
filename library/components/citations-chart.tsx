"use client"

import { useMemo } from "react"
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { Publication } from "@/types/publication"
import { getTotalCitationsByYear } from "@/utils/excel-parser"

interface CitationsChartProps {
  publications: Publication[]
}

export function CitationsChart({ publications }: CitationsChartProps) {
  const chartData = useMemo(() => {
    const citationsByYear = getTotalCitationsByYear(publications)

    return Object.entries(citationsByYear)
      .map(([year, count]) => ({
        year,
        citations: count,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year))
      .filter((item) => item.citations > 0)
  }, [publications])

  const chartConfig = {
    citations: {
      label: "Iqtiboslar",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yillar bo‘yicha iqtiboslar</CardTitle>
        <CardDescription>Har bir yilda olingan umumiy iqtiboslar soni</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[320px] sm:h-[360px] md:h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={true}
                axisLine={true}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={50}
                tickCount={10}
              />
              <YAxis tickLine={true} axisLine={true} tick={{ fontSize: 14 }} width={30} />
              <Tooltip
                formatter={(value) => [`${value} ta iqtibos`, "Iqtiboslar"]}
                labelFormatter={(label) => `Yil: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="citations"
                stroke="var(--color-citations)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
