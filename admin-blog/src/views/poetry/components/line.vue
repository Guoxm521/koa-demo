<template>
  <div class="container" ref="lineRef"></div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import { Line, Pie } from "@antv/g2plot"
import data from "../data.json"
const lineRef = ref<HTMLElement>()
const line = ref<Line>()

function renderLineChart() {
  if (!lineRef.value) return
  line.value = new Line(lineRef.value, {
    data,
    autoFit: true,
    xField: "date",
    yField: "value",
    seriesField: "type",
    lineStyle: {
      lineWidth: 4,
    },
    area: {
      style: {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: "wave-in",
        duration: 2000,
      },
    },
  })
  line.value.render()
}
onMounted(() => {
  renderLineChart()
})
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
