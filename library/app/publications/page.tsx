"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronDown, Download, FileUp, Home, LineChart, LogOut, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const publications = [
  {
    id: 1,
    title: "Machine Learning Approaches for Network Security in IoT Environments",
    authors: "Khasanov A., Rahimov D., Ismoilova N.",
    journal: "Journal of Information Security",
    year: 2023,
    citations: 24,
    impact: "High",
  },
  {
    id: 2,
    title: "Blockchain-based Authentication for Smart Grid Systems",
    authors: "Rahimov D., Karimov R.",
    journal: "IEEE Transactions on Smart Grid",
    year: 2022,
    citations: 18,
    impact: "High",
  },
  {
    id: 3,
    title: "Deep Learning for Anomaly Detection in Telecommunication Networks",
    authors: "Ismoilova N., Abdullaeva G., Tursunov J.",
    journal: "Computer Networks",
    year: 2022,
    citations: 15,
    impact: "Medium",
  },
  {
    id: 4,
    title: "Quantum-resistant Cryptographic Protocols for IoT Security",
    authors: "Karimov R., Yusupova M.",
    journal: "Journal of Cryptographic Engineering",
    year: 2021,
    citations: 12,
    impact: "Medium",
  },
  {
    id: 5,
    title: "Software-Defined Networking for 5G Mobile Networks",
    authors: "Abdullaeva G., Nazarov O.",
    journal: "Mobile Networks and Applications",
    year: 2021,
    citations: 10,
    impact: "Medium",
  },
  {
    id: 6,
    title: "Artificial Intelligence in Smart City Infrastructure",
    authors: "Tursunov J., Mamatova F.",
    journal: "Smart Cities",
    year: 2020,
    citations: 8,
    impact: "Medium",
  },
  {
    id: 7,
    title: "Big Data Analytics for Predictive Maintenance in Industrial IoT",
    authors: "Yusupova M., Alimov B.",
    journal: "Journal of Big Data",
    year: 2020,
    citations: 7,
    impact: "Medium",
  },
  {
    id: 8,
    title: "Network Traffic Classification Using Deep Neural Networks",
    authors: "Nazarov O., Khasanov A.",
    journal: "Computer Communications",
    year: 2019,
    citations: 6,
    impact: "Low",
  },
  {
    id: 9,
    title: "Cybersecurity Frameworks for Critical Infrastructure Protection",
    authors: "Mamatova F., Rahimov D.",
    journal: "International Journal of Critical Infrastructure Protection",
    year: 2019,
    citations: 5,
    impact: "Low",
  },
  {
    id: 10,
    title: "Edge Computing for Real-time IoT Applications",
    authors: "Alimov B., Ismoilova N.",
    journal: "Internet of Things",
    year: 2018,
    citations: 4,
    impact: "Low",
  },
]

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("year")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterImpact, setFilterImpact] = useState("All")

  // Filter publications based on search term and impact filter
  const filteredPublications = publications.filter(
    (pub) =>
      (pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterImpact === "All" || pub.impact === filterImpact),
  )

  // Sort publications based on selected criteria
  const sortedPublications = filteredPublications.sort((a, b) => {
    if (sortBy === "year") {
      return sortOrder === "asc" ? a.year - b.year : b.year - a.year
    } else if (sortBy === "citations") {
      return sortOrder === "asc" ? a.citations - b.citations : b.citations - a.citations
    } else if (sortBy === "title") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }
    return 0
  })
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  function getImpactColor(impact: string): string | undefined {
    throw new Error("Function not implemented.")
  }

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
              <span className="sr-only">Dashboard</span>
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
            <div className="flex h-12 items-center gap-2 px-4">
              <Home className="h-5 w-5" />
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
            <div className="flex h-12 items-center gap-2 rounded-md bg-accent px-4">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Publications</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Export Reports</span>
            </div>
          </div>
        </aside>
        <main className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Publications</h1>
            <p className="text-gray-500 dark:text-gray-400">Browse and analyze TUIT publications and their impact</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search publications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    Impact: {filterImpact}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterImpact("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterImpact("High")}>High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterImpact("Medium")}>Medium</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterImpact("Low")}>Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    Sort by
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSort("year")}>Year</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("citations")}>Citations</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("title")}>Title</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Export</Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>TUIT Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Journal</TableHead>
                    <TableHead className="text-right">Year</TableHead>
                    <TableHead className="text-right">Citations</TableHead>
                    <TableHead className="text-right">Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPublications.map((pub) => (
                    <TableRow key={pub.id}>
                      <TableCell className="font-medium">{pub.title}</TableCell>
                      <TableCell>{pub.authors}</TableCell>
                      <TableCell>{pub.journal}</TableCell>
                      <TableCell className="text-right">{pub.year}</TableCell>
                      <TableCell className="text-right">{pub.citations}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={getImpactColor(pub.impact)}>{pub.impact}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
