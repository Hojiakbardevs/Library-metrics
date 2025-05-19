"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartContainer } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const impactData = [
  { name: "High Impact", value: 48, color: "hsl(var(--chart-1))" },
  { name: "Medium Impact", value: 195, color: "hsl(var(--chart-2))" },
  { name: "Low Impact", value: 244, color: "hsl(var(--chart-3))" },
]

const sleepingBeauties = [
  {
    title: "Novel approach to information security in IoT networks",
    year: 2016,
    initialCitations: 3,
    peakYear: 2021,
    peakCitations: 45,
  },
  {
    title: "Quantum computing applications in telecommunications",
    year: 2015,
    initialCitations: 2,
    peakYear: 2020,
    peakCitations: 38,
  },
  {
    title: "Machine learning for network traffic analysis",
    year: 2017,
    initialCitations: 4,
    peakYear: 2022,
    peakCitations: 52,
  },
]

const chartConfig = {
  impact: {
    label: "Impact Classification",
    color: "hsl(var(--chart-1))",
  },
}

export function ImpactClassification() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={impactData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Sleeping Beauties</CardTitle>
            <CardDescription>Papers with delayed recognition (citation spike after 5+ years)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Peak Citations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sleepingBeauties.map((paper, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{paper.title}</TableCell>
                    <TableCell>{paper.year}</TableCell>
                    <TableCell>{paper.peakCitations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
