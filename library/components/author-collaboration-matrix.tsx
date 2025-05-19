"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Publication } from "@/types/publication";

interface AuthorCollaborationMatrixProps {
  publications: Publication[];
  limit?: number;
}

interface CollaborationCell {
  author1: string;
  author2: string;
  count: number;
}

export function AuthorCollaborationMatrix({
  publications,
  limit = 20,
}: AuthorCollaborationMatrixProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { topAuthors, collaborationMatrix } = useMemo(() => {
    const authorCounts: Record<string, number> = {};
    publications.forEach((pub) => {
      pub.authors.forEach((author) => {
        authorCounts[author] = (authorCounts[author] || 0) + 1;
      });
    });

    const topAuthors = Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name]) => name);

    const collaborationMatrix: CollaborationCell[] = [];

    publications.forEach((pub) => {
      const authors = pub.authors.filter((author) =>
        topAuthors.includes(author)
      );

      for (let i = 0; i < authors.length; i++) {
        for (let j = i + 1; j < authors.length; j++) {
          const author1 = authors[i];
          const author2 = authors[j];

          const existingIndex = collaborationMatrix.findIndex(
            (cell) =>
              (cell.author1 === author1 && cell.author2 === author2) ||
              (cell.author1 === author2 && cell.author2 === author1)
          );

          if (existingIndex >= 0) {
            collaborationMatrix[existingIndex].count += 1;
          } else {
            collaborationMatrix.push({
              author1,
              author2,
              count: 1,
            });
          }
        }
      }
    });

    return { topAuthors, collaborationMatrix };
  }, [publications, limit]);

  const filteredAuthors = useMemo(() => {
    if (!searchTerm) return topAuthors;
    return topAuthors.filter((author) =>
      author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [topAuthors, searchTerm]);

  const filteredCollaborations = useMemo(() => {
    return collaborationMatrix.filter(
      (cell) =>
        filteredAuthors.includes(cell.author1) &&
        filteredAuthors.includes(cell.author2)
    );
  }, [collaborationMatrix, filteredAuthors]);

  const getCollaborationCount = (author1: string, author2: string) => {
    if (author1 === author2) return "-";

    const collaboration = filteredCollaborations.find(
      (cell) =>
        (cell.author1 === author1 && cell.author2 === author2) ||
        (cell.author1 === author2 && cell.author2 === author1)
    );

    return collaboration ? collaboration.count : 0;
  };

  const getColorIntensity = (count: number | string) => {
    if (count === "-") return "bg-gray-100 dark:bg-gray-800";
    if (count === 0) return "bg-[#F7E74A]/20";
    if (typeof count === "number") {
      if (count <= 1) return "bg-[#09C6AB]/30";
      if (count <= 3) return "bg-[#068888]/40";
      if (count <= 5) return "bg-[#02556D]/50";
      if (count <= 10) return "bg-[#35589A]/60";
      if (count <= 15) return "bg-[#370665]/70";
      return "bg-[#F14A16]/80";
    }
    return "bg-gray-100 dark:bg-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mualliflar hamkorlik matritsasi</CardTitle>
        <CardDescription>
          Eng faol mualliflar o‘rtasidagi hammualliflik munosabatlarini ko‘rsatadi
        </CardDescription>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Muallif ismini qidiring..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 top-0 z-10 bg-white p-5 text-left text-sm font-medium">
                  Muallif
                </th>
                {filteredAuthors.map((author, index) => (
                  <th
                    key={index}
                    className="p-2 text-center text-xs font-medium"
                  >
                    <div className="w-24 rotate-45 transform whitespace-nowrap">
                      {author.length > 15
                        ? author.substring(0, 15) + "..."
                        : author}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map((author1, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="sticky left-0 z-10 bg-white p-5 text-sm font-medium">
                    {author1.length > 20
                      ? author1.substring(0, 20) + "..."
                      : author1}
                  </td>
                  {filteredAuthors.map((author2, colIndex) => {
                    const count = getCollaborationCount(author1, author2);
                    return (
                      <td
                        key={colIndex}
                        className={`p-2 text-center text-sm ${getColorIntensity(
                          count
                        )}`}
                        title={`${author1} va ${author2} o‘rtasida ${count} marta hammualliflik` }
                      >
                        {count}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#F7E74A]/20" />
            <span className="text-xs">0</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#09C6AB]/30" />
            <span className="text-xs">1</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#068888]/40" />
            <span className="text-xs">2–3</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#02556D]/50" />
            <span className="text-xs">4–5</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#35589A]/60" />
            <span className="text-xs">6–10</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#370665]/70" />
            <span className="text-xs">11–15</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 rounded-sm bg-[#F14A16]/80" />
            <span className="text-xs">15 dan ortiq</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
