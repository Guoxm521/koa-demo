<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content">
          <lineVue
            :dynastyTop="dynastyTop"
            :dynastyCount="dynastyCount"
          ></lineVue></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content" ref="pieRef">
          <pie-vue :dynastyCount="dynastyCount"></pie-vue></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="row2">
      <el-col :span="8">
        <div class="grid-content">
          <category-table :dynastyList="dynastyList"></category-table></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content">
          <word-cloud :authorTop="authorTop"></word-cloud></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content">
          <img :src="welcoming_image" alt="" /></div
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import wordCloud from "./components/wordCloud.vue"
import categoryTable from "./components/categoryTable.vue"
import welcoming from "/@/assets/svg/welcoming.svg?component"
import WelcomingImage from "/@/assets/Welcoming.png"
import {
  getPoetryCategory,
  getDynastyTop,
  getCategoryCount,
} from "/@/api/poetry"
import lineVue from "./components/line.vue"
import pieVue from "./components/pie.vue"
const welcoming_image = ref(WelcomingImage)

// 朝代列表
const dynastyList = ref([])
getPoetryCategory({}).then((res: any) => {
  if (res.code === 200) {
    dynastyList.value = res.data.list
  }
})
// 各朝top
const dynastyTop = ref([])
getDynastyTop({ level: 5 }).then((res: any) => {
  if (res.code === 200) {
    dynastyTop.value = res.data.list
  }
})
// 各朝总数
const dynastyCount = ref([])
getCategoryCount({}).then((res: any) => {
  if (res.code === 200) {
    dynastyCount.value = res.data.list
  }
})

const authorTop = ref([])
getDynastyTop({ type: 2, level: 100 }).then((res: any) => {
  if (res.code === 200) {
    authorTop.value = res.data.list
  }
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

.grid-content {
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  height: 360px;
  overflow-y: auto;
  background: #fff;

  svg {
    transform: scale(0.2);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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
