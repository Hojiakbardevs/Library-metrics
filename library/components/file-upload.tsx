"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { parseExcelFile } from "@/utils/excel-parser"
import type { Publication } from "@/types/publication"

interface FileUploadProps {
  onDataLoaded: (data: Publication[]) => void
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's an Excel file
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Please upload an Excel file (.xlsx or .xls)")
      return
    }

    setFileName(file.name)
    setIsLoading(true)
    setError(null)

    try {
      const publications = await parseExcelFile(file)
      onDataLoaded(publications)
    } catch (err) {
      console.error("Error parsing Excel file:", err)
      setError("Failed to parse the Excel file. Please check the format and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Upload Web of Science Data</h3>
            <p className="text-sm text-muted-foreground">
              Upload an Excel file exported from Web of Science containing bibliometric data
            </p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <label
              htmlFor="file-upload"
              className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background px-4 py-5 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">
                    {fileName ? fileName : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-xs text-muted-foreground">Excel files only (.xlsx, .xls)</span>
                </div>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            disabled={!fileName || isLoading}
            className="w-full max-w-sm"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {isLoading ? "Processing..." : "Upload File"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
