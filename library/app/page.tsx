"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/file-upload";
import { PublicationsChart } from "@/components/publications-chart";
import { CitationsChart } from "@/components/citations-chart";
import { TopAuthorsTable } from "@/components/top-authors-table";
import { CitationHeatmap } from "@/components/citation-heatmap";
import { SummaryMetrics } from "@/components/summary-metrics";
import { JournalDistributionChart } from "@/components/journal-distribution-chart";
import { CitationImpactScatter } from "@/components/citation-impact-scatter";
import { CitationGrowthChart } from "@/components/citation-growth-chart";
import { AuthorCollaborationMatrix } from "@/components/author-collaboration-matrix";
import { KeywordTrendChart } from "@/components/keyword-trend-chart";
import type { Publication } from "@/types/publication";
import ExportExcel from "@/components/export-pdf";

export default function Home() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  const handleDataLoaded = (data: Publication[]) => {
    setPublications(data);
    setActiveTab("overview");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-center gap-4 border-b bg-white px-16">
        <div className="flex items-center gap-2 font-semibold">
          <img src="/logo1.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl">TATU Ilmmetrik Tahlil</span>
        </div>
      </header>
      <main className="flex-1 p-6">
        {publications.length === 0 ? (
          <div className="container mx-auto max-w-3xl py-10 flex flex-col items-center">
            <img
              src="/tuitlogo.png"
              alt="TATU logotipi"
              className="mb-4 h-20 w-20"
            />
            <h1 className="mb-6 text-3xl font-bold">
              Web of Science Ilmmetrik Tahlili
            </h1>
            <p className="mb-8 text-muted-foreground text-center">
              Web of Science dan yuklab olingan faylni yuklang va nashrlar
              tendensiyasi, iqtiboslar statistikasi va mualliflar hissasini
              tahlil qiling. Ushbu platforma yilma-yil iqtiboslar ma’lumotini
              o‘z ichiga olgan Excel fayllarni qo‘llab-quvvatlaydi.
            </p>
            <FileUpload onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <div className="container mx-auto space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/logo1.png" alt="Logo" className="h-8 w-8" />
                  <h1 className="text-3xl font-bold">Ilmmetrik Tahlil</h1>
                </div>
                <p className="text-muted-foreground">
                  Web of Science ma’lumotlar bazasidan olingan{" "}
                  {publications.length} ta nashr tahlili
                </p>
              </div>
              <ExportExcel publications={publications} />
            </div>

            <SummaryMetrics publications={publications} />

            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
              >
              <TabsList className="grid w-full grid-cols-2 h-12 md:grid-cols-6">
                <TabsTrigger
                  value="overview"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Umumiy ko‘rinish
                </TabsTrigger>

                <TabsTrigger
                  value="publications"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Nashrlar
                </TabsTrigger>

                <TabsTrigger
                  value="citations"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Iqtiboslar
                </TabsTrigger>

                <TabsTrigger
                  value="authors"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Mualliflar
                </TabsTrigger>

                <TabsTrigger
                  value="journals"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Jurnallar
                </TabsTrigger>

                <TabsTrigger
                  value="advanced"
                  className="text-lg border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-muted data-[state=active]:text-blue-600 transition-all">
                  Kengaytirilgan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-10">
                <div className="grid gap-6 md:grid-cols-2">
                  <PublicationsChart publications={publications} />
                  <CitationsChart publications={publications} />
                </div>
                <TopAuthorsTable publications={publications} limit={5} />
                <JournalDistributionChart
                  publications={publications}
                  limit={5}
                />
              </TabsContent>

              <TabsContent value="publications" className="space-y-6">
                <PublicationsChart publications={publications} />
                <KeywordTrendChart publications={publications} />
              </TabsContent>

              <TabsContent value="citations" className="space-y-6">
                <CitationsChart publications={publications} />
                <CitationImpactScatter publications={publications} />
                <CitationGrowthChart publications={publications} />
              </TabsContent>

              <TabsContent value="authors" className="space-y-6">
                <TopAuthorsTable publications={publications} limit={10} />
                <AuthorCollaborationMatrix publications={publications} />
              </TabsContent>

              <TabsContent value="journals" className="space-y-6">
                <JournalDistributionChart
                  publications={publications}
                  limit={10}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <CitationHeatmap publications={publications} />
                <CitationGrowthChart publications={publications} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
