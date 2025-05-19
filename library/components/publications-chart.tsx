"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
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
import { getPublicationsByYear } from "@/utils/excel-parser"

interface PublicationsChartProps {
  publications: Publication[]
}

export function PublicationsChart({ publications }: PublicationsChartProps) {
  const chartData = useMemo(() => {
    const publicationsByYear = getPublicationsByYear(publications)

    return Object.entries(publicationsByYear)
      .map(([year, count]) => ({
        year,
        publications: count,
      }))
      .sort((a, b) => Number(a.year) - Number(b.year))
  }, [publications])

  const chartConfig = {
    publications: {
      label: "Nashrlar soni",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yillarga ko‘ra nashrlar</CardTitle>
        <CardDescription>Har bir yilda chop etilgan nashrlar soni</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] sm:h-[360px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={true}
                tickSize={10}
                tickMargin={10}
                axisLine={true}
                tick={{ fontSize: 12 }}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tick={{ fontSize: 12 }}
                width={40}
              />
              <Tooltip
                formatter={(value: number) => [`${value} ta nashr`, "Nashrlar soni"]}
                labelFormatter={(label: string) => `Yil: ${label}`}
              />
              <Bar
                dataKey="publications"
                fill="var(--color-publications)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
            
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
