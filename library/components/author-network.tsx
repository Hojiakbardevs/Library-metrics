"use client"

import { useMemo } from "react"

const nodes = [
  { id: "Author1", x: 50, y: 150, group: 1 },
  { id: "Author2", x: 150, y: 100, group: 1 },
  { id: "Author3", x: 150, y: 200, group: 1 },
  { id: "Author4", x: 300, y: 100, group: 2 },
  { id: "Author5", x: 300, y: 200, group: 2 },
  { id: "Author6", x: 450, y: 100, group: 3 },
  { id: "Author7", x: 450, y: 200, group: 3 },
  { id: "Author8", x: 550, y: 150, group: 3 },
  { id: "Author9", x: 700, y: 100, group: 4 },
  { id: "Author10", x: 700, y: 200, group: 4 },
]

const links = [
  { source: "Author1", target: "Author2" },
  { source: "Author1", target: "Author3" },
  { source: "Author2", target: "Author3" },
  { source: "Author4", target: "Author5" },
  { source: "Author4", target: "Author1" },
  { source: "Author6", target: "Author7" },
  { source: "Author6", target: "Author8" },
  { source: "Author7", target: "Author8" },
  { source: "Author9", target: "Author10" },
  { source: "Author9", target: "Author6" },
]

const groupColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]

export function AuthorNetwork() {
  const nodeMap = useMemo(() => {
    const map = new Map()
    nodes.forEach((n) => map.set(n.id, n))
    return map
  }, [])

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <svg width="800" height="300">
        {links.map((link, i) => {
          const source = nodeMap.get(link.source)
          const target = nodeMap.get(link.target)
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#999"
              strokeOpacity="0.6"
              strokeWidth={2}
            />
          )
        })}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={groupColors[node.group - 1]}
            />
            <text
              x={node.x + 10}
              y={node.y + 5}
              fontSize={10}
              fill="#333"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
