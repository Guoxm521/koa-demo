<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content bg-purple" ref="lineRef"></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple" ref="pieRef"></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="row2">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-table :data="tableData" size="small" style="width: 100%">
            <el-table-column prop="date" label="ID"> </el-table-column>
            <el-table-column prop="name" label="朝代"> </el-table-column>
            <el-table-column prop="address" label="创建时间"> </el-table-column>
          </el-table></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <word-cloud></word-cloud>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">svg图片</div></el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import { Line, Pie } from "@antv/g2plot"
import data from "./data.json"
import wordCloud from "./components/wordCloud.vue"
import WordCloud from "./components/wordCloud.vue";
const lineRef = ref<HTMLElement>()
const line = ref<Line>()
const pieRef = ref<HTMLElement>()
const pie = ref<Pie>()

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
function renderPieChart() {
  const data = [
    { type: "学习", value: 20 },
    { type: "娱乐", value: 10 },
    { type: "工作", value: 30 },
    { type: "休息", value: 40 },
  ]
  pie.value = new Pie(pieRef.value!, {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.65,
    meta: {
      value: {
        formatter: v => `${v}%`,
      },
    },
    label: {
      type: "inner",
      autoRotate: false,
      formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    statistic: undefined,
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
      position: "bottom",
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
const tableData = ref([])
onMounted(() => {
  renderLineChart()
  renderPieChart()
})
</script>
<style lang="scss" scoped>
.main-content {
  background: none !important;
  height: fit-content !important;
  padding: 0 !important;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #fff;
}

.grid-content {
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  height: 360px;
  overflow-y: auto;
}
.row2 .grid-content {
  height: 420px;
}
.grid-content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.grid-content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: #535353;
}
.grid-content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #ededed;
}
</style>
