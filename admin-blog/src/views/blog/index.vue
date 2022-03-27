<template>
  <div>
    <pageMain>
      <template v-slot:main>
        <div style="position:relative">
          <div class="buttons">
            <el-button type="primary" @click="createArticle">文章发布</el-button>
          </div>
          <el-row>
            <el-col :span="2">
              <el-tabs
                v-model="activeName"
                tab-position="left"
                class="demo-tabs"
                @tab-click="handleClick"
              >
                <el-tab-pane label="文章" name="1"></el-tab-pane>
                <el-tab-pane :label="draftTitle" name="2"></el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="22">
              <blogArticle v-show="activeName === '1'"></blogArticle>
              <blogDrafts @setDraftsNum="getDraftsNum" v-show="activeName === '2'"></blogDrafts>
            </el-col>
          </el-row>
        </div>
      </template>
    </pageMain>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from "vue-router"
import type { TabsPaneContext } from 'element-plus'
import blogArticle from './components/blogArticle.vue'
import blogDrafts from './components/blogDrafts.vue'
const activeName = ref('1')
const route = useRouter()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const createArticle = () => {
  let routeData = route.resolve("/blog/add")
  window.open(routeData.href, '_blank');
}

const draftTitle = ref("草稿箱")
const getDraftsNum = (num) => {
  draftTitle.value = `草稿箱（${num}）`
}
</script>
<style scoped lang="scss">
::v-deep(.el-tabs__nav-wrap .is-left) {
  font-size: 16px;
}
.buttons {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
}
</style>
