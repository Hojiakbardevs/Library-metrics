"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const data = [
  { year: "2015", publications: 28 },
  { year: "2016", publications: 32 },
  { year: "2017", publications: 37 },
  { year: "2018", publications: 42 },
  { year: "2019", publications: 48 },
  { year: "2020", publications: 53 },
  { year: "2021", publications: 62 },
  { year: "2022", publications: 68 },
  { year: "2023", publications: 74 },
  { year: "2024", publications: 43 }, // Partial year
]

const chartConfig = {
  publications: {
    label: "Publications",
    color: "hsl(var(--chart-1))",
  },
}

export function PublicationTrends() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={30} />
          <Tooltip />
          <Bar dataKey="publications" fill="var(--color-publications)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
