"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export function AuthorNetwork() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Sample data for the network visualization
    const nodes = [
      { id: "Author1", group: 1 },
      { id: "Author2", group: 1 },
      { id: "Author3", group: 1 },
      { id: "Author4", group: 2 },
      { id: "Author5", group: 2 },
      { id: "Author6", group: 3 },
      { id: "Author7", group: 3 },
      { id: "Author8", group: 3 },
      { id: "Author9", group: 4 },
      { id: "Author10", group: 4 },
    ]

    const links = [
      { source: "Author1", target: "Author2", value: 5 },
      { source: "Author1", target: "Author3", value: 3 },
      { source: "Author2", target: "Author3", value: 2 },
      { source: "Author4", target: "Author5", value: 4 },
      { source: "Author4", target: "Author1", value: 1 },
      { source: "Author6", target: "Author7", value: 3 },
      { source: "Author6", target: "Author8", value: 2 },
      { source: "Author7", target: "Author8", value: 4 },
      { source: "Author9", target: "Author10", value: 5 },
      { source: "Author9", target: "Author6", value: 1 },
    ]

    // Get the dimensions of the container
    const width = svgRef.current.clientWidth
    const height = 300

    // Create a force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create the SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

    // Define color scale for groups
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Create the links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))

    // Create the nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d) => color(d.group))
      .call(drag(simulation))

    // Add tooltips
    node.append("title").text((d) => d.id)

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
    })

    // Drag functionality
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}
