<template>
  <div>
    <div class="mt-4">
      <el-input v-model="params.url" placeholder="请输入请求路径" class="input-with-select">
        <template #prepend>
          <el-select v-model="params.method" placeholder="Select" style="width: 110px">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handle" />
        </template>
      </el-input>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="请求头" name="first"></el-tab-pane>
        <el-tab-pane label="请求参数" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div></div>
    <div>
      <header-table v-show="activeName === 'first'"></header-table>
      <params-table v-show="activeName === 'second'"></params-table>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import headerTable from './components/headerTable.vue'
import paramsTable from './components/paramsTable.vue'
import axios from 'axios'

const params = reactive({
  method: 'POST',
  url: ""
})

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const headerDaTa = []
const paramDaTa = []
const handle = () => {
  // 发送 POST 请求
  axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });
}
</script>

<style scoped>
</style>

