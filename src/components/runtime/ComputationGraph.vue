<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<!--
Some example graph visualizations to keep an eye on.

# Hierarchical Edge Bundling
https://observablehq.com/@d3/hierarchical-edge-bundling/2?intent=fork

Circular layout, ideal to show node-to-node relations.
Colored edges indicate the direction of the arrow.

# Arc Diagram
https://observablehq.com/@d3/arc-diagram

Another useful representation of node-to-node connections.
Maybe not as good as the radial representation, but provides additional space
for node information, and this example also has a neat sorting feature.

# Disjoint force-directed graph
https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

Standard force graph, but this one accounts for disjoint nodes, which is a
must-have in incomplete models.
This type of graph can include all kinds of resources (topics, etc.).
Other examples on the web include circle nodes of diffent sizes, which might
be interesting to add.

# Bump Charts
https://observablehq.com/d/aa2ed4c606d995c0

This example is not what we actually want, but might provide a code basis for
another interesting visualization, with nodes as boxes on one side and other
resources (topics, etc.) as boxes on the other side.

It might be easier to navigate than a standard force graph, and each box would
highlight what is connected to it. Reusing ideas from previous examples, links
should use a color gradient to indicate the direction of information flow.
For example, nodes would be grey and topics colored. Advertise links fade from
grey to color, and subscribe links do the opposite.
-->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import * as d3 from 'd3'
import { type D3DragEvent, type SimulationLinkDatum, type SimulationNodeDatum } from 'd3'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

// Constants -------------------------------------------------------------------

interface LogicVariable {
  name: string
}

type ConditionDataType = null | LogicVariable | Array<string | LogicVariable>

interface NodeDataType extends SimulationNodeDatum {
  id: string
  group: string
  condition: ConditionDataType
}

interface LinkDataType extends SimulationLinkDatum<NodeDataType> {
  source: string | NodeDataType
  target: string | NodeDataType
  value: number
}

interface CGDataType {
  nodes: NodeDataType[]
  links: LinkDataType[]
}

function exampleCG(): CGDataType {
  return {
    nodes: [
      {
        id: 'package_1/node_1',
        group: 'package_1',
        condition: null,
      },
      {
        id: 'package_1/node_2',
        group: 'package_1',
        condition: { name: 'z' },
      },
      {
        id: 'package_2/node_1',
        group: 'package_2',
        condition: ['and', { name: 'x' }, { name: 'y' }],
      },
    ],
    links: [
      {
        source: 'package_1/node_1',
        target: 'package_1/node_2',
        value: 2,
      },
      {
        source: 'package_1/node_1',
        target: 'package_2/node_1',
        value: 2,
      },
    ],
  }
}

// Component State -------------------------------------------------------------

const svgContainer = useTemplateRef('computationGraphContainer')
const selectedNode = ref<NodeDataType | null>(null)
const zoom = ref<number>(1.0)
const svgWidth = ref<number>(320)
const svgHeight = ref<number>(180)
const model = ref<CGDataType>(exampleCG())

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

function onSelectNode(node: NodeDataType | null): void {
  selectedNode.value = node
}

function buildModelElement(): SVGElement {
  // Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10)

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = model.value.links.map((d) => ({ ...d }))
  const nodes = model.value.nodes.map((d) => ({ ...d }))

  // Create a simulation with several forces.
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink<NodeDataType, LinkDataType>(links).id((d) => d.id),
    )
    .force('charge', d3.forceManyBody())
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

  // Add a line for each link, and a circle for each node.
  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d) => Math.sqrt(d.value))

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll<SVGCircleElement, NodeDataType>('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('stroke-dasharray', (d) => (d.condition == null ? '' : '2 1'))
    .attr('fill', (d) => color(d.group))

  node.append('title').text((d) => d.id)

  const drag = d3
    .drag<SVGCircleElement, NodeDataType>()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)

  // Add a drag behavior.
  node.call(drag)

  function nodeClickHandler(el: SVGCircleElement, datum: NodeDataType) {
    const i = datum.index
    const prev = selectedNode.value
    if (prev != null) {
      const k = prev.index!
      if (k === i) {
        return
      }
      d3.select<SVGCircleElement, NodeDataType>(node.nodes()[k]).attr('fill', (d) => color(d.group))
    }
    onSelectNode(datum)
    d3.select(el).attr('fill', '#c9c9c9')
  }

  node.on('click', (e, d) => {
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
      d3.select<SVGCircleElement, NodeDataType>(node.nodes()[k]).attr('fill', (d) => color(d.group))
      onSelectNode(null)
    }
  })

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on('tick', () => {
    link
      .attr('x1', (d) => (d.source as NodeDataType).x!)
      .attr('y1', (d) => (d.source as NodeDataType).y!)
      .attr('x2', (d) => (d.target as NodeDataType).x!)
      .attr('y2', (d) => (d.target as NodeDataType).y!)
    node.attr('cx', (d) => d.x!).attr('cy', (d) => d.y!)
  })

  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event: D3DragEvent<SVGCircleElement, NodeDataType, NodeDataType>) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
    const e = event.sourceEvent
    e.stopPropagation()
    nodeClickHandler(e.target, event.subject)
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event: D3DragEvent<SVGCircleElement, NodeDataType, NodeDataType>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event: D3DragEvent<SVGCircleElement, NodeDataType, NodeDataType>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  return svg.node()!
}

function resetSvgElement(): void {
  if (svgContainer.value != null) {
    const { width, height } = svgContainer.value.getBoundingClientRect()
    svgWidth.value = width - 4
    svgHeight.value = height - 4
    const container = d3.select(svgContainer.value)
    container.selectAll('svg').remove()
    if (model.value != null) {
      container.append(buildModelElement)
    }
  }
}

// Setup -----------------------------------------------------------------------

function onZoomChanged(newValue: number): void {
  if (svgContainer.value != null) {
    // Specify the dimensions of the graph
    const zoomFactor = 1.0 / newValue
    svgWidth.value = 320 * zoomFactor
    svgHeight.value = 180 * zoomFactor
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

watch(model, resetSvgElement, { flush: 'post' })

onMounted(resetSvgElement)
</script>

<!----------------------------------------------------------------------------->

<template>
  <div class="computation-graph">
    <div class="header">
      <h2>Computation Graph</h2>
      <div class="toolbar">
        <button @click="onZoomOut">Zoom -</button>
        <button @click="onZoomIn">Zoom +</button>
      </div>
    </div>
    <div class="panel" ref="computationGraphContainer">
      <p class="floating-label">
        Selected node:
        {{ !!selectedNode ? selectedNode.id : 'none' }}
        <span v-if="!!selectedNode" class="annotation">
          {{ !selectedNode.condition ? 'always on' : 'conditional' }}
        </span>
      </p>
    </div>
  </div>
</template>

<!----------------------------------------------------------------------------->

<style>
.computation-graph {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.computation-graph > .header {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.computation-graph > .header > h2 {
  flex: 1;
}

.computation-graph > .header > .toolbar {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.computation-graph > .header > .toolbar > button {
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

.computation-graph > .header > .toolbar > button:hover {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-green);
  color: var(--color-heading);
}

.computation-graph > .panel {
  flex: 1;
  position: relative;
  display: flex;
}

.computation-graph > .panel > .floating-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-green-hover);
  color: var(--color-heading);
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  pointer-events: none;
}

.computation-graph > .panel > svg {
  flex: 1;
}
</style>
