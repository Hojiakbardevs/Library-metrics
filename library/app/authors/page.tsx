"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronDown, Download, FileUp, Home, LineChart, LogOut, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const authors = [
  { id: 1, name: "Dr. Alisher Khasanov", publications: 42, citations: 356, hIndex: 12, department: "Computer Science" },
  {
    id: 2,
    name: "Prof. Dilshod Rahimov",
    publications: 38,
    citations: 412,
    hIndex: 14,
    department: "Telecommunications",
  },
  {
    id: 3,
    name: "Dr. Nodira Ismoilova",
    publications: 35,
    citations: 287,
    hIndex: 10,
    department: "Information Security",
  },
  {
    id: 4,
    name: "Prof. Rustam Karimov",
    publications: 31,
    citations: 245,
    hIndex: 9,
    department: "Computer Engineering",
  },
  {
    id: 5,
    name: "Dr. Gulnora Abdullaeva",
    publications: 28,
    citations: 198,
    hIndex: 8,
    department: "Software Engineering",
  },
  {
    id: 6,
    name: "Prof. Jahongir Tursunov",
    publications: 26,
    citations: 176,
    hIndex: 7,
    department: "Artificial Intelligence",
  },
  { id: 7, name: "Dr. Malika Yusupova", publications: 24, citations: 154, hIndex: 6, department: "Data Science" },
  {
    id: 8,
    name: "Prof. Otabek Nazarov",
    publications: 22,
    citations: 143,
    hIndex: 6,
    department: "Network Engineering",
  },
  { id: 9, name: "Dr. Feruza Mamatova", publications: 20, citations: 132, hIndex: 5, department: "Cybersecurity" },
  { id: 10, name: "Prof. Bobur Alimov", publications: 18, citations: 121, hIndex: 5, department: "IoT Systems" },
]

export default function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  type SortField = "publications" | "citations" | "hIndex" | "name" | "department"
  const [sortBy, setSortBy] = useState<SortField>("publications")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter authors based on search term
  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort authors based on selected criteria
const sortedAuthors = [...filteredAuthors].sort((a, b) => {
  const factor = sortOrder === "asc" ? 1 : -1
  const aValue = a[sortBy]
  const bValue = b[sortBy]
  if (typeof aValue === "string" && typeof bValue === "string") {
    return factor * aValue.localeCompare(bValue)
  }
  return factor * ((aValue as number) - (bValue as number))
})

const handleSort = (field: SortField) => {
  if (sortBy === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  } else {
    setSortBy(field)
    setSortOrder("desc")
  }
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
            <div className="flex h-12 items-center gap-2 rounded-md bg-accent px-4">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Authors</span>
            </div>
            <div className="flex h-12 items-center gap-2 px-4">
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Export Reports</span>
            </div>
          </div>
        </aside>
        <main className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Browse and analyze TUIT authors and their research contributions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search authors or departments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort("publications")}>Publications</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("citations")}>Citations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("hIndex")}>H-Index</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Export</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>TUIT Authors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Publications</TableHead>
                    <TableHead className="text-right">Citations</TableHead>
                    <TableHead className="text-right">H-Index</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAuthors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell className="font-medium">{author.name}</TableCell>
                      <TableCell>{author.department}</TableCell>
                      <TableCell className="text-right">{author.publications}</TableCell>
                      <TableCell className="text-right">{author.citations}</TableCell>
                      <TableCell className="text-right">{author.hIndex}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/authors/${author.id}`}>View Profile</Link>
                        </Button>
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
