<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { LaunchActionType } from '@/types/launch'
import * as d3 from 'd3'
import { type D3DragEvent, type SimulationLinkDatum, type SimulationNodeDatum } from 'd3'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

// Constants -------------------------------------------------------------------

const props = defineProps<{ model: NodeLinkGraph }>()

export interface GraphNodeDatum extends SimulationNodeDatum {
  id: string
  group: string
  name?: string
  dark?: boolean
  condition?: string
  level?: number
}

export interface GraphLinkDatum extends SimulationLinkDatum<GraphNodeDatum> {
  source: string | GraphNodeDatum
  target: string | GraphNodeDatum
  value: number
}

export interface NodeLinkGraph {
  nodes: GraphNodeDatum[]
  links: GraphLinkDatum[]
}

// Component State -------------------------------------------------------------

const svgContainer = useTemplateRef('dependencyGraphContainer')
const selectedNode = ref<GraphNodeDatum | null>(null)
const zoom = ref<number>(1.0)
const svgWidth = ref<number>(320)
const svgHeight = ref<number>(100)

// Component Methods -----------------------------------------------------------

function onZoomIn(): void {
  if (zoom.value < 8.0) {
    zoom.value = zoom.value * 2.0
  }
}

function onZoomOut(): void {
  if (zoom.value > 0.125) {
    zoom.value = zoom.value / 2.0
  }
}

function onSelectNode(node: GraphNodeDatum | null): void {
  selectedNode.value = node
}

function groupColors(group: string): string {
  if (group === LaunchActionType.ARG) return '#f6f294'
  if (group === LaunchActionType.NODE) return '#00bd7e'
  if (group === LaunchActionType.INCLUDE) return '#7fafe3'
  return 'gray'
}

function buildModelElement(): SVGElement {
  // Specify the color scale.
  // const color = d3.scaleOrdinal(d3.schemeCategory10)
  const color = groupColors

  const nodeStrokeColor = (d: GraphNodeDatum): string => color(d.group)
  const nodeFillColor = (d: GraphNodeDatum): string => (d.dark ? 'var(--color-background)' : '#666')

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = props.model.links.map((d) => ({ ...d }))
  const nodes = props.model.nodes.map((d) => ({ ...d }))

  // Create a simulation with several forces.
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink<GraphNodeDatum, GraphLinkDatum>(links)
        .id((d) => d.id)
        .distance(50)
        .strength(1),
    )
    .force('charge', d3.forceManyBody().strength(-100))
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  // Create the SVG container.
  const svg = d3
    .create('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', [
      -svgWidth.value / 2, // min X
      -svgHeight.value / 2, // min Y
      svgWidth.value, // width
      svgHeight.value, // height
    ])

  // Add arrowheads for each link
  svg
    .append('defs')
    .selectAll('marker')
    .data(['link-arrowhead'])
    .enter()
    .append('marker')
    .attr('id', 'link-arrowhead')
    .attr('viewBox', '0 -3 6 6')
    .attr('refX', 22) // about half of the link distance
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-3L6,0L0,3')
    .style('stroke', 'var(--color-text)')
    .style('stroke-opacity', 0.6)
    .style('fill', 'var(--color-text)')

  // Add a line for each link
  const link = svg
    .append('g')
    .attr('stroke', 'var(--color-text)')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d) => Math.sqrt(d.value))
    .style('marker-end', 'url(#link-arrowhead)')

  // Add a circle for each node
  const node = svg
    .append('g')
    .attr('stroke-width', 2)
    .selectAll<SVGCircleElement, GraphNodeDatum>('circle')
    .data(nodes)
    .join('circle')
    .attr('r', (d) => (d.level || 0) * 5 + 10)
    .attr('stroke', nodeStrokeColor) // (d.dark ? '#333' : color(d.group))
    .attr('stroke-dasharray', (d) => (!d.condition ? '' : '2 1'))
    .attr('fill', nodeFillColor)

  node.append('title').text((d) => d.name || d.id)

  const drag = d3
    .drag<SVGCircleElement, GraphNodeDatum>()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)

  // Add a drag behavior.
  node.call(drag)

  function nodeClickHandler(el: SVGCircleElement, datum: GraphNodeDatum) {
    const i = datum.index
    const prev = selectedNode.value
    if (prev != null) {
      const k = prev.index!
      if (k === i) {
        return
      }
      d3.select<SVGCircleElement, GraphNodeDatum>(node.nodes()[k]).attr('fill', nodeFillColor(prev))
    }
    onSelectNode(datum)
    d3.select(el).attr('fill', nodeStrokeColor(datum))
  }

  node.on('click', (e /*, d*/) => {
    e.stopPropagation()
    // Drag started event is fired before click, so the click handler
    // has already run when we get here. This only has to stop
    // propagation, to prevent the root SVG click handler from firing
    // also, which would nullify the node selection.
    // nodeClickHandler(e.target, d);
  })

  svg.on('click', (e) => {
    e.stopPropagation()
    const prev = selectedNode.value
    if (prev != null) {
      const k = prev.index!
      d3.select<SVGCircleElement, GraphNodeDatum>(node.nodes()[k]).attr('fill', nodeFillColor(prev))
      onSelectNode(null)
    }
  })

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on('tick', () => {
    link
      .attr('x1', (d) => (d.source as GraphNodeDatum).x!)
      .attr('y1', (d) => (d.source as GraphNodeDatum).y!)
      .attr('x2', (d) => (d.target as GraphNodeDatum).x!)
      .attr('y2', (d) => (d.target as GraphNodeDatum).y!)
    node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
  })

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event: D3DragEvent<SVGCircleElement, GraphNodeDatum, GraphNodeDatum>) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
    const e = event.sourceEvent
    e.stopPropagation()
    nodeClickHandler(e.target, event.subject)
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event: D3DragEvent<SVGCircleElement, GraphNodeDatum, GraphNodeDatum>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event: D3DragEvent<SVGCircleElement, GraphNodeDatum, GraphNodeDatum>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  return svg.node()!
}

function resetSvgElement(): void {
  if (svgContainer.value != null) {
    updateSvgSize()
    const container = d3.select(svgContainer.value)
    container.selectAll('svg').remove()
    if (props.model != null) {
      container.append(buildModelElement)
    }
  }
}

function updateSvgSize(): void {
  const zoomFactor = 1.0 / zoom.value
  if (svgContainer.value != null) {
    const { width, height } = svgContainer.value.getBoundingClientRect()
    svgWidth.value = (width - 4) * zoomFactor
    svgHeight.value = (height - 4) * zoomFactor
  } else {
    svgWidth.value = 320 * zoomFactor
    svgHeight.value = 180 * zoomFactor
  }
}

// Setup -----------------------------------------------------------------------

function onZoomChanged(/*newValue: number*/): void {
  if (svgContainer.value != null) {
    // Specify the dimensions of the graph
    updateSvgSize()
    d3.select(svgContainer.value)
      .selectAll('svg')
      .attr('viewBox', [
        -svgWidth.value / 2, // min X
        -svgHeight.value / 2, // min Y
        svgWidth.value, // width
        svgHeight.value, // height
      ])
  }
}

watch(zoom, onZoomChanged)

watch(() => props.model, resetSvgElement, { flush: 'post' })

onMounted(resetSvgElement)
</script>

<!----------------------------------------------------------------------------->

<template>
  <div class="dependency-graph">
    <div class="toolbar">
      <button @click="onZoomOut">Zoom -</button>
      <button @click="onZoomIn">Zoom +</button>
    </div>
    <div class="panel" ref="dependencyGraphContainer">
      <p class="floating-label" v-if="selectedNode != null">
        Selected {{ selectedNode.group }}: {{ selectedNode.name || selectedNode.id }}
        <span class="annotation">
          {{ !selectedNode.condition ? 'always on' : 'conditional' }}
        </span>
      </p>
    </div>
  </div>
</template>

<!----------------------------------------------------------------------------->

<style>
.dependency-graph {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dependency-graph > .toolbar {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.dependency-graph > .toolbar > button {
  flex: 0 0 auto;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: 0.25s;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.dependency-graph > .toolbar > button:hover {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-green);
  color: var(--color-heading);
}

.dependency-graph > .panel {
  flex: 1;
  position: relative;
  display: flex;
}

.dependency-graph > .panel > .floating-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-green-hover);
  color: var(--color-heading);
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  pointer-events: none;
}

.dependency-graph > .panel > svg {
  flex: 1;
}
</style>
