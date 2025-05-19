"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, Download, FileUp, Home, LineChart, LogOut, PieChart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationTrends } from "@/components/publication-trends"
import { CitationMetrics } from "@/components/citation-metrics"
import { AuthorNetwork } from "@/components/author-network"
import { ResearchAreas } from "@/components/research-areas"
import { ImpactClassification } from "@/components/impact-classification"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <BookOpen className="h-6 w-6" />
          <span>TUIT Bibliometric Analysis</span>
        </Link>
        <nav className="ml-auto flex gap-4 md:gap-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/authors">
              <Users className="h-5 w-5" />
              <span className="sr-only">Authors</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Link>
          </Button>
        </nav>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-12 items-center gap-2 px-4">
              <FileUp className="h-5 w-5" />
              <span className="text-sm font-medium">Upload Data</span>
            </div>
            <div className="flex h-12 items-center gap-2 rounded-md bg-accent px-4">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <LineChart className="h-5 w-5" />
              <span className="text-sm font-medium">Trends</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Authors</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <PieChart className="h-5 w-5" />
              <span className="text-sm font-medium">Research Areas</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Export Reports</span>
            </div>
          </div>
        </aside>
        <main className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bibliometric analysis of TUIT publications from Web of Science
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
                <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">487</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+12% from previous year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                >
                  <path d="M6 15h12"></path>
                  <path d="M6 9h12"></path>
                  <path d="M6 3h12"></path>
                  <path d="M6 21h12"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,254</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+18% from previous year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">H-Index</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                >
                  <path d="M2 20h.01"></path>
                  <path d="M7 20v-4"></path>
                  <path d="M12 20v-8"></path>
                  <path d="M17 20v-6"></path>
                  <path d="M22 20V8"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+2 from previous year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+8% from previous year</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="authors">Authors</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Publication Trends</CardTitle>
                    <CardDescription>Number of publications per year (2015-2024)</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <PublicationTrends />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Research Areas</CardTitle>
                    <CardDescription>Distribution of publications by research area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResearchAreas />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Citation Metrics</CardTitle>
                    <CardDescription>Citation trends over time (2015-2024)</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CitationMetrics />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Author Collaboration Network</CardTitle>
                    <CardDescription>Visualization of co-authorship patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuthorNetwork />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="publications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Publication Analysis</CardTitle>
                  <CardDescription>Detailed analysis of TUIT publications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500">Publication analysis content will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="citations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Citation Analysis</CardTitle>
                  <CardDescription>Detailed analysis of citations for TUIT publications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500">Citation analysis content will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="authors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Author Analysis</CardTitle>
                  <CardDescription>Detailed analysis of TUIT authors and their contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-gray-500">Author analysis content will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="impact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Classification</CardTitle>
                  <CardDescription>Classification of publications by impact level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImpactClassification />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
