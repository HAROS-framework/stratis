<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import * as d3 from 'd3'
import { onMounted, useTemplateRef } from 'vue'

// Type Defs -------------------------------------------------------------------

export interface DataPoint {
  key: string
  value: number
}

// Component State -------------------------------------------------------------

const props = defineProps<{ data: DataPoint[] }>()

const domChart = useTemplateRef('chart')

// Event Handling --------------------------------------------------------------

onMounted(() => {
  const containerHeight = domChart.value!.getBoundingClientRect().height || 0
  const rem = parseFloat(getComputedStyle(domChart.value!).fontSize)

  d3.select(domChart.value).append(() => {
    // Declare the chart dimensions and margins.
    const width = 800
    const height = containerHeight - rem
    const marginTop = 0 // 2.5 * rem
    const marginRight = 0
    const marginBottom = 2 * rem
    const marginLeft = 2.5 * rem
    const alphabet = props.data

    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          alphabet,
          ([d]) => -d.value,
          (d) => d.key,
        ),
      ) // descending frequency
      .range([marginLeft, width - marginRight])
      .padding(0.1)

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(alphabet, (d) => d.value) || 1])
      .range([height - marginBottom, marginTop])

    // Create the SVG container.
    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
    // .attr('style', 'max-width: 100%; height: auto;')

    // Add a rect for each bar.
    svg
      .append('g')
      .attr('class', 'bars')
      .selectAll()
      .data(alphabet)
      .join('rect')
      .attr('x', (d) => x(d.key) || 0)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    // Add the x-axis and label.
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))

    // Add the y-axis and label, and remove the domain line.
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y.valueOf() * 100).toFixed()))
      .call((g) => g.select('.domain').remove())
    /*.call((g) =>
        g
          .append('text')
          .attr('x', -marginLeft)
          .attr('y', 1 * rem)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('↑ Frequency (%)'),
      )*/

    // Return the SVG element.
    return svg.node()
  })
})
</script>

<template>
  <div class="header" ref="header">
    <h2>Overview</h2>
    <p>↑ Frequency (%)</p>
  </div>
  <div class="chart" ref="chart"></div>
</template>

<style>
.chart {
  font-size: 1rem;
  flex: 1;
}

.chart > svg {
  max-width: 100%;
  height: auto;
}

.chart > svg > .bars {
  fill: var(--color-green);
}

.chart > svg text {
  font-size: 1rem;
}
</style>
