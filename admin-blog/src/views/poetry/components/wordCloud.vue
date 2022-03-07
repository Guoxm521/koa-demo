<template>
  <div v-show="!showEmpty" class="container" ref="wordCloudRef"></div>
  <div v-show="showEmpty" class="empty_container">
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, watch, ref, onBeforeMount, onMounted } from "vue"
import { WordCloud } from "@antv/g2plot"

const porps = defineProps({
  authorTop: Array,
})
watch(
  () => porps.authorTop,
  (authorTop, prevauthorTop) => {
    if (authorTop) {
      renderWordCloud(authorTop)
    }
  }
)
const wordCloudRef = ref<HTMLElement>()
const wordCloud = ref<WordCloud>()
const showEmpty = ref(true)
async function renderWordCloud(authorTop: Array<any>) {
  showEmpty.value = false
  await nextTick()
  const wordCloud = new WordCloud(wordCloudRef.value, {
    data: authorTop,
    wordField: "author",
    weightField: "count",
    color: () => {
      let colors = [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#27ae60",
        "#f1c40f",
      ]
      let index = Math.floor(Math.random() * colors.length)
      return colors[index]
    },
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [24, 80],
    },
    // 设置交互类型
    interactions: [{ type: "element-active" }],
    state: {
      active: {
        // 这里可以设置 active 时的样式
        style: {
          lineWidth: 3,
        },
      },
    },
  })
  wordCloud.render()
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
