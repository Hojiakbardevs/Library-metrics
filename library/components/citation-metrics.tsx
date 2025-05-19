"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const data = [
  { year: "2015", citations: 120 },
  { year: "2016", citations: 156 },
  { year: "2017", citations: 198 },
  { year: "2018", citations: 245 },
  { year: "2019", citations: 312 },
  { year: "2020", citations: 387 },
  { year: "2021", citations: 456 },
  { year: "2022", citations: 532 },
  { year: "2023", citations: 598 },
  { year: "2024", citations: 250 }, // Partial year
]

const chartConfig = {
  citations: {
    label: "Citations",
    color: "hsl(var(--chart-2))",
  },
}

export function CitationMetrics() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-citations)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-citations)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={30} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="citations"
            stroke="var(--color-citations)"
            fillOpacity={1}
            fill="url(#colorCitations)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
