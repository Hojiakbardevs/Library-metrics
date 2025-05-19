"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const data = [
  { name: "Computer Science", value: 35 },
  { name: "Telecommunications", value: 25 },
  { name: "Engineering", value: 20 },
  { name: "Mathematics", value: 10 },
  { name: "Physics", value: 5 },
  { name: "Other", value: 5 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
]

const chartConfig = {
  areas: {
    label: "Research Areas",
    color: "hsl(var(--chart-1))",
  },
}

export function ResearchAreas() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
