<template>
  <div v-show="!showEmpty" class="container" ref="pieRef"></div>
  <div v-show="showEmpty" class="empty_container">
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, ref, defineProps, onMounted } from "vue"
import { Pie, measureTextWidth } from "@antv/g2plot"
import data from "../data.json"
const pieRef = ref<HTMLElement>()
const pie = ref<Pie>()
const porps = defineProps({
  dynastyCount: Array,
})
watch(
  () => porps.dynastyCount,
  (dynastyCount, prevDynastyCount) => {
    if (dynastyCount) {
      renderPieChart(dynastyCount)
    }
  }
)
const showEmpty = ref(true)
async function renderPieChart(dynastyCount) {
  const data = dynastyCount
  showEmpty.value = false
  await nextTick()
  pie.value = new Pie(pieRef.value!, {
    appendPadding: 10,
    data,
    angleField: "count",
    colorField: "dynasty",
    radius: 0.8,
    innerRadius: 0.65,
    meta: {
      value: {
        formatter: v => `${v}%`,
      },
    },

    label: {
      type: "inner",
      autoRotate: true,
      formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: "16px",
        },
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect()
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
          const text = datum ? datum.dynasty : "总计"
          return renderStatistic(d, text, { fontSize: 16 })
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "20px",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect()

          const text = datum
            ? ` ${datum.count}`
            : ` ${data.reduce((r, d) => r + d.count, 0)}`
          return renderStatistic(width, text, { fontSize: 20 })
        },
      },
    },
    pieStyle: {
      radius: [20],
    },
    color: [
      "#025DF4",
      "#DB6BCF",
      "#2498D1",
      "#FF745A",
      "#007E99",
      "#FFA8A8",
      "#2391FF",
    ],
    legend: {
      position: "right",
    },
    interactions: [
      { type: "element-selected" },
      { type: "element-active" },
      {
        type: "pie-statistic-active",
        cfg: {
          start: [
            { trigger: "element:mouseenter", action: "pie-statistic:change" },
            {
              trigger: "legend-item:mouseenter",
              action: "pie-statistic:change",
            },
          ],
          end: [
            { trigger: "element:mouseleave", action: "pie-statistic:reset" },
            {
              trigger: "legend-item:mouseleave",
              action: "pie-statistic:reset",
            },
          ],
        },
      },
    ],
  })
  pie.value.render()
}
function renderStatistic(containerWidth, text, style) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style)
  const R = containerWidth / 2
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(
          Math.pow(R, 2) /
            (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
        )
      ),
      1
    )
  }
  const textStyleStr = `width:${containerWidth}px;`
  return `<div style="${textStyleStr};display:flex;align-content: center;justify-content: center;font-size:${scale}em;line-height:${
    scale < 1 ? 1 : "inherit"
  };">${text}</div>`
}
</script>
<style scoped>
.empty_container,
.container {
  width: 100%;

  height: 100%;
}
.empty_container {
  /* display: flex;
  align-content: center;
  justify-content: center; */
}
</style>
