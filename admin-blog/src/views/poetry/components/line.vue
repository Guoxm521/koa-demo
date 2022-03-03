<template>
  <div v-show="!showEmpty" class="container" ref="dualAxesRef"></div>
  <div v-show="showEmpty" class="empty_container">
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, nextTick } from "vue"
import { Line, Pie, DualAxes } from "@antv/g2plot"
const props = defineProps({ dynastyTop: Array, dynastyCount: Array })
watch(props, (newProps, oldProps) => {
  if (
    newProps.dynastyTop.length > 0 &&
    newProps.dynastyCount.length > 0 &&
    showEmpty.value
  ) {
    let dynasty = newProps.dynastyCount
    let obj = {}
    dynasty.map((e: any) => {
      obj[e.dynasty_id] = e.dynasty
    })
    let list = []
    newProps.dynastyTop.map((e: any) => {
      e.top_list.map((i, index) => {
        i.dynasty = obj[i.dynasty_id]
        i.type = index
        list.push(i)
      })
    })
    renderDualAxes(list, newProps.dynastyCount)
  }
})
const dualAxesRef = ref<HTMLElement>()
const showEmpty = ref(true)

async function renderDualAxes(
  dynastyTop: Array<any>,
  dynastyCount: Array<any>
) {
  showEmpty.value = false
  await nextTick()
  const dualAxes = new DualAxes(dualAxesRef.value, {
    data: [dynastyTop, dynastyCount],
    xField: "dynasty",
    yField: ["count", "count"],
    geometryOptions: [
      {
        geometry: "column",
        isGroup: true,
        seriesField: "type",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  })
  dualAxes.render()
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
